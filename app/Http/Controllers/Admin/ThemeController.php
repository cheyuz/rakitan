<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ThemeController extends Controller
{
    /**
     * Display available themes and active theme settings.
     */
    public function index(): Response
    {
        $activeTheme = Setting::get('active_theme', 'default_dark');

        $themes = [
            [
                'id' => 'default_dark',
                'name' => 'Rakitan Cyber Dark',
                'version' => '1.0.0',
                'author' => 'Rakitan Core',
                'description' => 'Deep midnight slate tones (#020617), subtle glowing indigo borders, and high-contrast dark aesthetic engineered for modern visual builders.',
                'preview_bg' => 'bg-slate-950',
                'preview_card' => 'bg-slate-900 border-slate-800',
                'preview_text' => 'text-white',
                'preview_accent' => 'bg-indigo-600',
                'badge' => 'Default Built-in',
            ],
            [
                'id' => 'default_light',
                'name' => 'Rakitan Clean Light',
                'version' => '1.0.0',
                'author' => 'Rakitan Core',
                'description' => 'Crisp minimalist white aesthetic, airy backgrounds (#ffffff & #f8fafc), subtle slate-200 dividers, and refined soft ambient shadows.',
                'preview_bg' => 'bg-slate-100',
                'preview_card' => 'bg-white border-slate-200',
                'preview_text' => 'text-slate-900',
                'preview_accent' => 'bg-indigo-600',
                'badge' => 'New Light Edition',
            ],
        ];

        return Inertia::render('Admin/Themes/Index', [
            'themes' => $themes,
            'activeTheme' => $activeTheme,
        ]);
    }

    /**
     * Activate a new theme.
     */
    public function activate(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'theme' => ['required', 'string', 'in:default_dark,default_light'],
        ]);

        Setting::set('active_theme', $validated['theme']);

        return back()->with('success', "Theme changed to '{$validated['theme']}' successfully!");
    }
}
