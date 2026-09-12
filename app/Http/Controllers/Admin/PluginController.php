<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\PluginManager;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PluginController extends Controller
{
    /**
     * Display listing of all installed plugins.
     */
    public function index(PluginManager $pluginManager): Response
    {
        $plugins = $pluginManager->scanPlugins();

        return Inertia::render('Admin/Plugins/Index', [
            'plugins' => $plugins,
            'pluginsPath' => $pluginManager->getPluginsPath(),
        ]);
    }

    /**
     * Toggle plugin active/inactive status.
     */
    public function toggle(Request $request, PluginManager $pluginManager): RedirectResponse
    {
        $validated = $request->validate([
            'plugin' => ['required', 'string'],
        ]);

        try {
            $isActive = $pluginManager->togglePlugin($validated['plugin']);
            $statusText = $isActive ? 'activated' : 'deactivated';
            return back()->with('success', "Plugin '{$validated['plugin']}' has been {$statusText} successfully.");
        } catch (\Throwable $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Upload and unpack a plugin ZIP package.
     */
    public function upload(Request $request, PluginManager $pluginManager): RedirectResponse
    {
        $request->validate([
            'plugin_zip' => ['required', 'file', 'mimes:zip', 'max:30720'], // Max 30MB
        ]);

        try {
            $info = $pluginManager->uploadPlugin($request->file('plugin_zip'));
            return back()->with('success', "Plugin '{$info['name']}' uploaded and installed successfully!");
        } catch (\Throwable $e) {
            return back()->withErrors(['plugin_zip' => $e->getMessage()]);
        }
    }

    /**
     * Delete an installed plugin.
     */
    public function destroy(string $plugin, PluginManager $pluginManager): RedirectResponse
    {
        try {
            $pluginManager->deletePlugin($plugin);
            return back()->with('success', "Plugin '{$plugin}' has been removed.");
        } catch (\Throwable $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}
