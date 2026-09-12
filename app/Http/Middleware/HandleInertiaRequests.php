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

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'active_theme' => $activeTheme['id'],
            'theme' => $activeTheme,
            'site_title' => \App\Models\Setting::get('site_title', 'Rakitan CMS'),
            'active_plugins' => app(\App\Services\PluginManager::class)->getActivePluginIds(),
        ];
    }
}
