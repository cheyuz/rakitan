<?php

namespace Plugins\SeoOptimizer;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\Post;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Inertia\Inertia;
use Inertia\Response;

class SeoController extends Controller
{
    /**
     * Get default SEO settings.
     */
    public static function getSettings(): array
    {
        $defaults = [
            'site_name' => Setting::get('site_title', 'Rakitan CMS'),
            'title_separator' => '-',
            'default_meta_description' => 'Rakitan CMS empowers creators with independent modular blocks, lightning performance, and complete visual freedom.',
            'og_default_image' => '/images/rakitan-logo.png',
            'twitter_card' => 'summary_large_image',
            'google_verification' => '',
            'robots_indexing' => 'index, follow',
            'auto_sitemap' => true,
        ];

        $saved = Setting::get('seo_settings', []);
        $savedArray = is_array($saved) ? $saved : (json_decode($saved, true) ?? []);

        return array_merge($defaults, $savedArray);
    }

    /**
     * Generate dynamic XML Sitemap.
     */
    public function sitemap(): HttpResponse
    {
        $settings = self::getSettings();
        if (empty($settings['auto_sitemap'])) {
            return response('Sitemap generation is disabled.', 404);
        }

        $pages = Page::where('status', 'published')->orderBy('updated_at', 'desc')->get();
        $posts = Post::where('status', 'published')->orderBy('updated_at', 'desc')->get();

        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

        // Home
        $xml .= "  <url>\n";
        $xml .= "    <loc>" . htmlspecialchars(url('/')) . "</loc>\n";
        $xml .= "    <lastmod>" . now()->toDateString() . "</lastmod>\n";
        $xml .= "    <changefreq>daily</changefreq>\n";
        $xml .= "    <priority>1.0</priority>\n";
        $xml .= "  </url>\n";

        // Blog Index
        $xml .= "  <url>\n";
        $xml .= "    <loc>" . htmlspecialchars(url('/blog')) . "</loc>\n";
        $xml .= "    <lastmod>" . now()->toDateString() . "</lastmod>\n";
        $xml .= "    <changefreq>daily</changefreq>\n";
        $xml .= "    <priority>0.9</priority>\n";
        $xml .= "  </url>\n";

        // Pages
        foreach ($pages as $page) {
            if ($page->slug === 'home') {
                continue;
            }
            $xml .= "  <url>\n";
            $xml .= "    <loc>" . htmlspecialchars(url('/' . ltrim($page->slug, '/'))) . "</loc>\n";
            $xml .= "    <lastmod>" . ($page->updated_at ? $page->updated_at->toDateString() : now()->toDateString()) . "</lastmod>\n";
            $xml .= "    <changefreq>weekly</changefreq>\n";
            $xml .= "    <priority>0.8</priority>\n";
            $xml .= "  </url>\n";
        }

        // Posts
        foreach ($posts as $post) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>" . htmlspecialchars(url('/blog/' . $post->slug)) . "</loc>\n";
            $xml .= "    <lastmod>" . ($post->updated_at ? $post->updated_at->toDateString() : now()->toDateString()) . "</lastmod>\n";
            $xml .= "    <changefreq>monthly</changefreq>\n";
            $xml .= "    <priority>0.7</priority>\n";
            $xml .= "  </url>\n";
        }

        $xml .= '</urlset>';

        return response($xml, 200)->header('Content-Type', 'application/xml; charset=UTF-8');
    }

    /**
     * Generate dynamic robots.txt.
     */
    public function robots(): HttpResponse
    {
        $settings = self::getSettings();
        $indexing = $settings['robots_indexing'] ?? 'index, follow';

        $content = "User-agent: *\n";
        if (str_contains($indexing, 'noindex')) {
            $content .= "Disallow: /\n";
        } else {
            $content .= "Allow: /\n";
            $content .= "Disallow: /admin/\n";
            $content .= "Disallow: /install/\n";
            $content .= "Disallow: /api/\n";
        }

        $content .= "\nSitemap: " . url('/sitemap.xml') . "\n";

        return response($content, 200)->header('Content-Type', 'text/plain; charset=UTF-8');
    }

    /**
     * Admin SEO Configuration Page.
     */
    public function adminIndex(): Response
    {
        $settings = self::getSettings();
        $pagesCount = Page::where('status', 'published')->count();
        $postsCount = Post::where('status', 'published')->count();

        return Inertia::render('Admin/Seo/Index', [
            'settings' => $settings,
            'sitemapUrl' => url('/sitemap.xml'),
            'robotsUrl' => url('/robots.txt'),
            'stats' => [
                'indexedPages' => $pagesCount,
                'indexedPosts' => $postsCount,
                'totalUrls' => $pagesCount + $postsCount + 2,
            ],
        ]);
    }

    /**
     * Update SEO Settings.
     */
    public function adminUpdate(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'site_name' => ['nullable', 'string', 'max:255'],
            'title_separator' => ['required', 'string', 'max:10'],
            'default_meta_description' => ['nullable', 'string', 'max:500'],
            'og_default_image' => ['nullable', 'string', 'max:500'],
            'twitter_card' => ['required', 'string', \Illuminate\Validation\Rule::in(['summary', 'summary_large_image'])],
            'google_verification' => ['nullable', 'string', 'max:255'],
            'robots_indexing' => ['required', 'string', \Illuminate\Validation\Rule::in(['index, follow', 'noindex, nofollow', 'noindex, follow'])],
            'auto_sitemap' => ['nullable', 'boolean'],
        ]);
        $validated['auto_sitemap'] = (bool) ($validated['auto_sitemap'] ?? true);

        Setting::set('seo_settings', $validated);

        return back()->with('success', 'SEO Optimizer settings updated successfully!');
    }
}
