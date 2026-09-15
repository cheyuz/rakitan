<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Menu;
use App\Models\Page;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicPageController extends Controller
{
    /**
     * Render dinamis halaman CMS berdasarkan slug.
     */
    public function show(Request $request, ?string $slug = null): Response
    {
        $targetSlug = $slug ? trim($slug, '/') : 'home';

        // Cari halaman berdasarkan slug
        $query = Page::where('slug', $targetSlug);

        // Jika pengunjung bukan admin login, hanya izinkan halaman berstatus published
        if (!$request->user()) {
            $query->where('status', 'published');
        }

        $page = $query->first();

        // Jika slug 'home' tidak ditemukan, coba ambil halaman published pertama
        if (!$page && $targetSlug === 'home') {
            $page = Page::where('status', 'published')->first();
        }

        if (!$page) {
            abort(404, "Halaman '{$targetSlug}' tidak ditemukan.");
        }

        return $this->renderPage($request, $page);
    }

    /**
     * Render data Page ke view Inertia Public/Show.
     */
    public function renderPage(Request $request, Page $page): Response
    {
        // Ambil menu navigasi dari database Menu dengan fallback ke halaman published
        $fallbackNav = Page::where('status', 'published')
            ->select('id', 'title', 'slug')
            ->orderBy('id', 'asc')
            ->get()
            ->map(fn ($p) => [
                'label' => $p->title,
                'url' => $p->slug === 'home' ? '/' : '/' . $p->slug,
            ])
            ->toArray();

        $headerNav = Menu::getItems('header', $fallbackNav);
        $footerNav = Menu::getItems('footer', $fallbackNav);

        // Data widget jika layout adalah sidebar
        $recentPosts = [];
        $categories = [];
        if (($page->layout ?? 'default') === 'sidebar') {
            $recentPosts = Post::published()
                ->latest('published_at')
                ->take(5)
                ->get(['id', 'title', 'slug', 'featured_image', 'published_at', 'created_at'])
                ->map(fn ($p) => [
                    'id' => $p->id,
                    'title' => $p->title,
                    'slug' => $p->slug,
                    'featured_image' => $p->featured_image,
                    'published_at' => $p->published_at ? $p->published_at->format('d M Y') : $p->created_at->format('d M Y'),
                ]);

            $categories = Category::withCount(['posts' => fn ($q) => $q->published()])
                ->orderBy('name', 'asc')
                ->get(['id', 'name', 'slug', 'posts_count']);
        }

        return Inertia::render('Public/Show', [
            'page' => [
                'id' => $page->id,
                'title' => $page->title,
                'slug' => $page->slug,
                'meta_title' => $page->meta_title ?? $page->title,
                'meta_description' => $page->meta_description ?? '',
                'layout' => $page->layout ?? 'default',
                'status' => $page->status,
                'blocks' => $page->blocks ?? [],
            ],
            'navigation' => $headerNav,
            'footerNavigation' => $footerNav,
            'recentPosts' => $recentPosts,
            'categories' => $categories,
            'isAdmin' => (bool) $request->user(),
        ]);
    }
}
