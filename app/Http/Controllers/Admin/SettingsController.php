<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    /**
     * Display the CMS Settings page.
     */
    public function index(): Response
    {
        $settings = [
            'site_title' => Setting::get('site_title', 'Rakitan CMS'),
            'site_tagline' => Setting::get('site_tagline', 'Next-Generation Modular Visual CMS'),
            'site_logo' => Setting::get('site_logo', ''),
            'site_favicon' => Setting::get('site_favicon', ''),
            'admin_email' => Setting::get('admin_email', 'admin@rakitan.test'),
            'default_status' => Setting::get('default_status', 'draft'),
            'footer_text' => Setting::get('footer_text', '© 2026 Rakitan CMS. Built for the open-source community.'),
            'active_theme' => Setting::get('active_theme', 'default-dark'),

            // Header Layout Customization
            'header_sticky' => Setting::get('header_sticky', '1'),
            'header_style' => Setting::get('header_style', 'glass'),
            'header_width' => Setting::get('header_width', 'contained'),
            'header_show_cta' => Setting::get('header_show_cta', '0'),
            'header_cta_text' => Setting::get('header_cta_text', 'Get Started'),
            'header_cta_url' => Setting::get('header_cta_url', '/contact'),

            // Body Layout Customization
            'body_layout' => Setting::get('body_layout', 'default'),
            'body_max_width' => Setting::get('body_max_width', '7xl'),

            // Footer Layout Customization
            'footer_enabled' => Setting::get('footer_enabled', '1'),
            'footer_style' => Setting::get('footer_style', 'default'),
            'footer_show_branding' => Setting::get('footer_show_branding', '1'),
            'footer_show_socials' => Setting::get('footer_show_socials', '1'),
        ];

        return Inertia::render('Admin/Settings', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update CMS Settings.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'site_title' => ['required', 'string', 'max:255'],
            'site_tagline' => ['nullable', 'string', 'max:255'],
            'site_logo' => ['nullable', 'string', 'max:500'],
            'site_favicon' => ['nullable', 'string', 'max:500'],
            'admin_email' => ['required', 'email', 'max:255'],
            'default_status' => ['required', 'in:draft,published'],
            'footer_text' => ['nullable', 'string', 'max:500'],
            'active_theme' => ['nullable', 'string', 'max:100'],

            // Layout Settings Validation
            'header_sticky' => ['nullable', 'in:0,1,true,false'],
            'header_style' => ['nullable', 'string', 'in:glass,solid,transparent'],
            'header_width' => ['nullable', 'string', 'in:contained,full'],
            'header_show_cta' => ['nullable', 'in:0,1,true,false'],
            'header_cta_text' => ['nullable', 'string', 'max:100'],
            'header_cta_url' => ['nullable', 'string', 'max:255'],
            'body_layout' => ['nullable', 'string', 'in:default,boxed,sidebar'],
            'body_max_width' => ['nullable', 'string', 'in:7xl,6xl,5xl,full'],
            'footer_enabled' => ['nullable', 'in:0,1,true,false'],
            'footer_style' => ['nullable', 'string', 'in:default,minimal,glass'],
            'footer_show_branding' => ['nullable', 'in:0,1,true,false'],
            'footer_show_socials' => ['nullable', 'in:0,1,true,false'],
        ]);

        foreach ($validated as $key => $value) {
            Setting::set($key, $value !== null ? (string) $value : '');
        }

        return back()->with('success', 'Settings have been updated successfully.');
    }
}
