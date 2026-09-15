<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\PluginManager;
use App\Services\ThemeManager;
use Inertia\Inertia;
use Inertia\Response;

class DocumentationController extends Controller
{
    /**
     * Display the In-CMS Developer Documentation page.
     */
    public function index(PluginManager $pluginManager, ThemeManager $themeManager): Response
    {
        return Inertia::render('Admin/Documentation', [
            'system' => [
                'version' => '1.0.0',
                'phpVersion' => PHP_VERSION,
                'laravelVersion' => app()->version(),
            ],
            'installedPlugins' => $pluginManager->scanPlugins(),
            'installedThemes' => $themeManager->scanThemes(),
            'activeTheme' => $themeManager->getActiveThemeId(),
        ]);
    }
}
