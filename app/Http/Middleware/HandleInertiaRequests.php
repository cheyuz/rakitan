<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $themeManager = app(\App\Services\ThemeManager::class);
        $activeTheme = $themeManager->getActiveTheme();

        $activePlugins = app(\App\Services\PluginManager::class)->getActivePluginIds();
        $seoData = null;
        if (in_array('seo-optimizer', $activePlugins, true)) {
            $saved = \App\Models\Setting::get('seo_settings', []);
            $savedArray = is_array($saved) ? $saved : (json_decode($saved, true) ?? []);
            $seoData = array_merge([
                'site_name' => \App\Models\Setting::get('site_title', 'Rakitan CMS'),
                'title_separator' => '-',
                'default_meta_description' => 'Rakitan CMS empowers creators with independent modular blocks, lightning performance, and complete visual freedom.',
                'og_default_image' => '/images/rakitan-logo.png',
                'twitter_card' => 'summary_large_image',
                'google_verification' => '',
                'robots_indexing' => 'index, follow',
            ], $savedArray);
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'active_theme' => $activeTheme['id'],
            'theme' => $activeTheme,
            'site_title' => \App\Models\Setting::get('site_title', 'Rakitan CMS'),
            'site_logo' => \App\Models\Setting::get('site_logo', ''),
            'site_favicon' => \App\Models\Setting::get('site_favicon', ''),
            'footer_text' => \App\Models\Setting::get('footer_text', '© 2026 Rakitan CMS. Built for the open-source community.'),
            'layout_settings' => [
                'header_sticky' => \App\Models\Setting::get('header_sticky', '1') === '1' || \App\Models\Setting::get('header_sticky', '1') === 'true',
                'header_style' => \App\Models\Setting::get('header_style', 'glass'),
                'header_width' => \App\Models\Setting::get('header_width', 'contained'),
                'header_show_cta' => \App\Models\Setting::get('header_show_cta', '0') === '1' || \App\Models\Setting::get('header_show_cta', '0') === 'true',
                'header_cta_text' => \App\Models\Setting::get('header_cta_text', 'Get Started'),
                'header_cta_url' => \App\Models\Setting::get('header_cta_url', '/contact'),
                'body_layout' => \App\Models\Setting::get('body_layout', 'default'),
                'body_max_width' => \App\Models\Setting::get('body_max_width', '7xl'),
                'footer_enabled' => \App\Models\Setting::get('footer_enabled', '1') === '1' || \App\Models\Setting::get('footer_enabled', '1') === 'true',
                'footer_style' => \App\Models\Setting::get('footer_style', 'default'),
                'footer_show_branding' => \App\Models\Setting::get('footer_show_branding', '1') === '1' || \App\Models\Setting::get('footer_show_branding', '1') === 'true',
                'footer_show_socials' => \App\Models\Setting::get('footer_show_socials', '1') === '1' || \App\Models\Setting::get('footer_show_socials', '1') === 'true',
            ],
            'active_plugins' => $activePlugins,
            'plugin_menus' => app(\App\Services\PluginManager::class)->getActiveAdminMenus($request->user()),
            'seo' => $seoData,
        ];
    }
}
