<?php

namespace App\Services;

use App\Models\Setting;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use RuntimeException;
use ZipArchive;

class PluginManager
{
    /**
     * Get the root plugins directory path.
     */
    public function getPluginsPath(): string
    {
        return base_path('plugins');
    }

    /**
     * Scan and retrieve all valid installed plugins.
     */
    public function scanPlugins(): array
    {
        $pluginsPath = $this->getPluginsPath();

        if (!File::isDirectory($pluginsPath)) {
            File::makeDirectory($pluginsPath, 0755, true);
        }

        $activePluginIds = $this->getActivePluginIds();
        $pluginDirs = File::directories($pluginsPath);
        $plugins = [];

        foreach ($pluginDirs as $dir) {
            $manifestPath = $dir . '/plugin.json';

            if (!File::exists($manifestPath)) {
                continue;
            }

            try {
                $manifest = json_decode(File::get($manifestPath), true);
                if (!is_array($manifest) || empty($manifest['id']) || empty($manifest['name'])) {
                    continue;
                }

                $pluginId = $manifest['id'];
                $isActive = in_array($pluginId, $activePluginIds, true);

                $plugins[] = [
                    'id' => $pluginId,
                    'name' => $manifest['name'],
                    'version' => $manifest['version'] ?? '1.0.0',
                    'author' => $manifest['author'] ?? 'Community',
                    'description' => $manifest['description'] ?? '',
                    'is_builtin' => !empty($manifest['is_builtin']),
                    'is_active' => $isActive,
                    'blocks' => $manifest['blocks'] ?? [],
                    'manage_url' => $manifest['manage_url'] ?? null,
                    'settings' => $manifest['settings'] ?? [],
                    'path' => $dir,
                ];
            } catch (\Throwable $e) {
                // Ignore malformed plugins
                continue;
            }
        }

        return $plugins;
    }

    /**
     * Get array of active plugin IDs.
     */
    public function getActivePluginIds(): array
    {
        $active = Setting::get('active_plugins', ['hello-rakitan', 'rakitan-extended-blocks']);
        $list = is_array($active) ? $active : (json_decode($active, true) ?? ['hello-rakitan', 'rakitan-extended-blocks']);

        $disabled = Setting::get('disabled_plugins', []);
        $disabledList = is_array($disabled) ? $disabled : (json_decode($disabled, true) ?? []);

        // Auto-include rakitan-extended-blocks if installed and not explicitly disabled
        if (File::exists($this->getPluginsPath() . '/rakitan-extended-blocks/plugin.json')
            && !in_array('rakitan-extended-blocks', $disabledList, true)
            && !in_array('rakitan-extended-blocks', $list, true)) {
            $list[] = 'rakitan-extended-blocks';
            Setting::set('active_plugins', $list);
        }

        // Auto-include slider-builder if installed and not explicitly disabled
        if (File::exists($this->getPluginsPath() . '/slider-builder/plugin.json')
            && !in_array('slider-builder', $disabledList, true)
            && !in_array('slider-builder', $list, true)) {
            $list[] = 'slider-builder';
            Setting::set('active_plugins', $list);
        }

        return array_values(array_unique($list));
    }

    /**
     * Toggle plugin active state.
     */
    public function togglePlugin(string $pluginId): bool
    {
        $activePlugins = $this->getActivePluginIds();
        $disabled = Setting::get('disabled_plugins', []);
        $disabledList = is_array($disabled) ? $disabled : (json_decode($disabled, true) ?? []);

        if (in_array($pluginId, $activePlugins, true)) {
            $activePlugins = array_values(array_filter($activePlugins, fn ($id) => $id !== $pluginId));
            if (!in_array($pluginId, $disabledList, true)) {
                $disabledList[] = $pluginId;
            }
            $newStatus = false;
        } else {
            // Verify plugin exists
            $plugins = $this->scanPlugins();
            $exists = false;
            foreach ($plugins as $p) {
                if ($p['id'] === $pluginId) {
                    $exists = true;
                    break;
                }
            }

            if (!$exists) {
                throw new RuntimeException("Plugin '{$pluginId}' is not installed.");
            }

            $activePlugins[] = $pluginId;
            $disabledList = array_values(array_filter($disabledList, fn ($id) => $id !== $pluginId));
            $newStatus = true;
        }

        Setting::set('active_plugins', array_values(array_unique($activePlugins)));
        Setting::set('disabled_plugins', array_values(array_unique($disabledList)));
        return $newStatus;
    }

    /**
     * Upload and extract a plugin ZIP package.
     */
    public function uploadPlugin(UploadedFile $zipFile): array
    {
        if (!class_exists('ZipArchive')) {
            throw new RuntimeException('PHP ZipArchive extension is required to install plugins.');
        }

        $zip = new ZipArchive();
        $res = $zip->open($zipFile->getRealPath());

        if ($res !== true) {
            throw new RuntimeException('Failed to open plugin ZIP archive.');
        }

        $tempExtractPath = storage_path('app/temp_plugin_' . uniqid());
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

        // Locate plugin.json
        $manifestPath = null;
        $pluginSourceDir = null;

        if (File::exists($tempExtractPath . '/plugin.json')) {
            $manifestPath = $tempExtractPath . '/plugin.json';
            $pluginSourceDir = $tempExtractPath;
        } else {
            $subdirs = File::directories($tempExtractPath);
            foreach ($subdirs as $subdir) {
                if (File::exists($subdir . '/plugin.json')) {
                    $manifestPath = $subdir . '/plugin.json';
                    $pluginSourceDir = $subdir;
                    break;
                }
            }
        }

        if (!$manifestPath) {
            File::deleteDirectory($tempExtractPath);
            throw new RuntimeException("Plugin archive is missing a valid 'plugin.json' manifest file.");
        }

        $manifest = json_decode(File::get($manifestPath), true);
        if (!is_array($manifest) || empty($manifest['id']) || empty($manifest['name'])) {
            File::deleteDirectory($tempExtractPath);
            throw new RuntimeException("Invalid 'plugin.json': 'id' and 'name' are required fields.");
        }

        $pluginId = Str::slug($manifest['id']);
        $destinationDir = $this->getPluginsPath() . '/' . $pluginId;

        if (File::isDirectory($destinationDir)) {
            File::deleteDirectory($destinationDir);
        }

        File::moveDirectory($pluginSourceDir, $destinationDir);
        File::deleteDirectory($tempExtractPath);

        return [
            'id' => $pluginId,
            'name' => $manifest['name'],
            'version' => $manifest['version'] ?? '1.0.0',
            'author' => $manifest['author'] ?? 'Unknown',
            'description' => $manifest['description'] ?? '',
        ];
    }

    /**
     * Delete an installed plugin directory.
     */
    public function deletePlugin(string $pluginId): bool
    {
        $activePlugins = $this->getActivePluginIds();
        if (in_array($pluginId, $activePlugins, true)) {
            $activePlugins = array_values(array_filter($activePlugins, fn ($id) => $id !== $pluginId));
            Setting::set('active_plugins', $activePlugins);
        }

        $dir = $this->getPluginsPath() . '/' . $pluginId;

        if (File::isDirectory($dir)) {
            return File::deleteDirectory($dir);
        }

        return false;
    }

    /**
     * Dynamically load routes from all active plugins if routes.php exists.
     */
    public function loadPluginRoutes(): void
    {
        $activePlugins = $this->getActivePluginIds();
        $pluginsPath = $this->getPluginsPath();

        foreach ($activePlugins as $pluginId) {
            $routesFile = $pluginsPath . '/' . $pluginId . '/routes.php';
            if (File::exists($routesFile)) {
                require $routesFile;
            }
        }
    }
}
