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
            'admin_email' => Setting::get('admin_email', 'admin@rakitan.test'),
            'default_status' => Setting::get('default_status', 'draft'),
            'footer_text' => Setting::get('footer_text', '© 2026 Rakitan CMS. Built for the open-source community.'),
            'active_theme' => Setting::get('active_theme', 'default_dark'),
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
            'admin_email' => ['required', 'email', 'max:255'],
            'default_status' => ['required', 'in:draft,published'],
            'footer_text' => ['nullable', 'string', 'max:500'],
            'active_theme' => ['nullable', 'string', 'in:default_dark,default_light'],
        ]);

        foreach ($validated as $key => $value) {
            Setting::set($key, (string) $value);
        }

        return back()->with('success', 'Settings have been updated successfully.');
    }
}
