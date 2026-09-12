<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\ThemeManager;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ThemeController extends Controller
{
    /**
     * Display all installed themes from /themes directory.
     */
    public function index(ThemeManager $themeManager): Response
    {
        $themes = $themeManager->scanThemes();
        $activeTheme = $themeManager->getActiveTheme();

        return Inertia::render('Admin/Themes/Index', [
            'themes' => $themes,
            'activeTheme' => $activeTheme,
            'themesPath' => $themeManager->getThemesPath(),
        ]);
    }

    /**
     * Activate an installed theme.
     */
    public function activate(Request $request, ThemeManager $themeManager): RedirectResponse
    {
        $validated = $request->validate([
            'theme' => ['required', 'string'],
        ]);

        try {
            $themeManager->activateTheme($validated['theme']);
            return back()->with('success', "Theme '{$validated['theme']}' has been activated successfully!");
        } catch (\Throwable $e) {
            return back()->withErrors(['theme' => $e->getMessage()]);
        }
    }

    /**
     * Upload and unpack a new theme ZIP archive.
     */
    public function upload(Request $request, ThemeManager $themeManager): RedirectResponse
    {
        $request->validate([
            'theme_zip' => ['required', 'file', 'mimes:zip', 'max:30720'], // Max 30MB
        ]);

        try {
            $themeInfo = $themeManager->uploadTheme($request->file('theme_zip'));
            return back()->with('success', "Theme '{$themeInfo['name']}' uploaded and installed successfully!");
        } catch (\Throwable $e) {
            return back()->withErrors(['theme_zip' => $e->getMessage()]);
        }
    }

    /**
     * Delete a custom installed theme.
     */
    public function destroy(string $theme, ThemeManager $themeManager): RedirectResponse
    {
        try {
            $themeManager->deleteTheme($theme);
            return back()->with('success', "Theme '{$theme}' has been deleted.");
        } catch (\Throwable $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Serve screenshot image for a theme.
     */
    public function screenshot(string $theme, ThemeManager $themeManager): BinaryFileResponse|HttpResponse
    {
        $theme = basename($theme);
        if (!preg_match('/^[a-zA-Z0-9_\-]+$/', $theme)) {
            abort(404);
        }

        $themesPath = $themeManager->getThemesPath();
        $screenshotPng = $themesPath . '/' . $theme . '/screenshot.png';
        $screenshotJpg = $themesPath . '/' . $theme . '/screenshot.jpg';

        if (File::exists($screenshotPng)) {
            return response()->file($screenshotPng);
        } elseif (File::exists($screenshotJpg)) {
            return response()->file($screenshotJpg);
        }

        // Fallback logo
        return response()->file(public_path('images/rakitan-logo.png'));
    }

    /**
     * Serve style.css for a theme.
     */
    public function style(string $theme, ThemeManager $themeManager): HttpResponse
    {
        $theme = basename($theme);
        if (!preg_match('/^[a-zA-Z0-9_\-]+$/', $theme)) {
            abort(404);
        }

        $themesPath = $themeManager->getThemesPath();
        $cssPath = $themesPath . '/' . $theme . '/style.css';

        if (File::exists($cssPath)) {
            return response(File::get($cssPath), 200, [
                'Content-Type' => 'text/css; charset=UTF-8',
                'Cache-Control' => 'no-cache, private',
            ]);
        }

        return response('/* Theme style not found */', 200, [
            'Content-Type' => 'text/css; charset=UTF-8',
        ]);
    }
}
