<?php

namespace App\Services;

use App\Models\Setting;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use RuntimeException;
use ZipArchive;

class ThemeManager
{
    /**
     * Get the themes directory path.
     */
    public function getThemesPath(): string
    {
        return base_path('themes');
    }

    /**
     * Scan and retrieve all valid installed themes.
     */
    public function scanThemes(): array
    {
        $themesPath = $this->getThemesPath();

        if (!File::isDirectory($themesPath)) {
            File::makeDirectory($themesPath, 0755, true);
        }

        $activeThemeId = $this->getActiveThemeId();
        $themeDirs = File::directories($themesPath);
        $themes = [];

        foreach ($themeDirs as $dir) {
            $manifestPath = $dir . '/theme.json';

            if (!File::exists($manifestPath)) {
                continue;
            }

            try {
                $manifest = json_decode(File::get($manifestPath), true);
                if (!is_array($manifest) || empty($manifest['id']) || empty($manifest['name'])) {
                    continue;
                }

                $themeId = $manifest['id'];
                $hasScreenshot = File::exists($dir . '/screenshot.png') || File::exists($dir . '/screenshot.jpg');
                $hasStyle = File::exists($dir . '/style.css');

                $themes[] = [
                    'id' => $themeId,
                    'name' => $manifest['name'],
                    'version' => $manifest['version'] ?? '1.0.0',
                    'author' => $manifest['author'] ?? 'Unknown',
                    'description' => $manifest['description'] ?? '',
                    'is_builtin' => !empty($manifest['is_builtin']),
                    'is_active' => $themeId === $activeThemeId,
                    'settings' => $manifest['settings'] ?? [],
                    'screenshot_url' => $hasScreenshot ? "/themes/{$themeId}/screenshot" : null,
                    'style_url' => $hasStyle ? "/themes/{$themeId}/style.css" : null,
                    'path' => $dir,
                ];
            } catch (\Throwable $e) {
                // Ignore malformed theme files
                continue;
            }
        }

        return $themes;
    }

    /**
     * Get the active theme ID from settings.
     */
    public function getActiveThemeId(): string
    {
        $id = Setting::get('active_theme', 'default-dark');
        // Handle legacy alias if needed
        if ($id === 'default_dark') $id = 'default-dark';
        if ($id === 'default_light') $id = 'default-light';
        return $id;
    }

    /**
     * Get details of the active theme.
     */
    public function getActiveTheme(): array
    {
        $activeId = $this->getActiveThemeId();
        $themes = $this->scanThemes();

        foreach ($themes as $theme) {
            if ($theme['id'] === $activeId) {
                return $theme;
            }
        }

        // Fallback to default-dark
        return [
            'id' => 'default-dark',
            'name' => 'Rakitan Cyber Dark',
            'version' => '1.0.0',
            'author' => 'Cecep Yusuf',
            'description' => 'Default fallback dark theme',
            'is_builtin' => true,
            'is_active' => true,
            'settings' => [
                'colorScheme' => 'dark',
                'primaryColor' => '#6366f1',
                'backgroundColor' => '#020617',
                'surfaceColor' => '#0f172a',
                'textColor' => '#f8fafc',
            ],
            'screenshot_url' => '/themes/default-dark/screenshot',
            'style_url' => '/themes/default-dark/style.css',
        ];
    }

    /**
     * Activate a theme by ID.
     */
    public function activateTheme(string $themeId): bool
    {
        if ($themeId === 'default_light') $themeId = 'default-light';
        if ($themeId === 'default_dark') $themeId = 'default-dark';

        $themes = $this->scanThemes();
        $found = false;

        foreach ($themes as $theme) {
            if ($theme['id'] === $themeId) {
                $found = true;
                break;
            }
        }

        if (!$found) {
            throw new RuntimeException("Theme '{$themeId}' is not installed in the themes directory.");
        }

        Setting::set('active_theme', $themeId);
        return true;
    }

    /**
     * Upload and extract a theme ZIP package.
     */
    public function uploadTheme(UploadedFile $zipFile): array
    {
        if (!class_exists('ZipArchive')) {
            throw new RuntimeException('PHP ZipArchive extension is required to unpack themes.');
        }

        $zip = new ZipArchive();
        $res = $zip->open($zipFile->getRealPath());

        if ($res !== true) {
            throw new RuntimeException('Failed to open theme ZIP archive.');
        }

        $tempExtractPath = storage_path('app/temp_theme_' . uniqid());
        File::makeDirectory($tempExtractPath, 0755, true);

        // Extract with Zip Slip prevention
        for ($i = 0; $i < $zip->numFiles; $i++) {
            $filename = $zip->getNameIndex($i);

            // Prevent path traversal
            if (str_contains($filename, '..') || str_starts_with($filename, '/') || str_starts_with($filename, '\\')) {
                continue;
            }

            $zip->extractTo($tempExtractPath, $filename);
        }

        $zip->close();

        // Locate theme.json
        $manifestPath = null;
        if (File::exists($tempExtractPath . '/theme.json')) {
            $manifestPath = $tempExtractPath . '/theme.json';
            $themeSourceDir = $tempExtractPath;
        } else {
            // Check in immediate subdirectories
            $subdirs = File::directories($tempExtractPath);
            foreach ($subdirs as $subdir) {
                if (File::exists($subdir . '/theme.json')) {
                    $manifestPath = $subdir . '/theme.json';
                    $themeSourceDir = $subdir;
                    break;
                }
            }
        }

        if (!$manifestPath) {
            File::deleteDirectory($tempExtractPath);
            throw new RuntimeException("Theme archive is missing a valid 'theme.json' manifest file.");
        }

        $manifest = json_decode(File::get($manifestPath), true);
        if (!is_array($manifest) || empty($manifest['id']) || empty($manifest['name'])) {
            File::deleteDirectory($tempExtractPath);
            throw new RuntimeException("Invalid 'theme.json': 'id' and 'name' properties are required.");
        }

        $themeId = Str::slug($manifest['id']);
        $destinationDir = $this->getThemesPath() . '/' . $themeId;

        // If target directory already exists, replace it
        if (File::isDirectory($destinationDir)) {
            File::deleteDirectory($destinationDir);
        }

        File::moveDirectory($themeSourceDir, $destinationDir);
        File::deleteDirectory($tempExtractPath);

        return [
            'id' => $themeId,
            'name' => $manifest['name'],
            'version' => $manifest['version'] ?? '1.0.0',
            'author' => $manifest['author'] ?? 'Unknown',
            'description' => $manifest['description'] ?? '',
        ];
    }

    /**
     * Delete a custom theme directory.
     */
    public function deleteTheme(string $themeId): bool
    {
        $activeThemeId = $this->getActiveThemeId();

        if ($themeId === $activeThemeId) {
            throw new RuntimeException("Cannot delete the currently active theme. Activate another theme first.");
        }

        if (in_array($themeId, ['default-dark', 'default-light'])) {
            throw new RuntimeException("Built-in system themes cannot be deleted.");
        }

        $dir = $this->getThemesPath() . '/' . $themeId;

        if (File::isDirectory($dir)) {
            return File::deleteDirectory($dir);
        }

        return false;
    }
}
