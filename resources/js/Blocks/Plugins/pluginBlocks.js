/**
 * Dynamic Plugin Loader for Rakitan CMS
 * Automatically discovers, imports, and registers blocks from all installed plugins in /plugins/
 * Every plugin is completely self-contained in its own folder under /plugins/<plugin-id>/
 */

// Auto-discover all installed plugin entrypoints via Vite eager glob
const pluginModules = import.meta.glob('/plugins/*/index.{js,jsx}', { eager: true });

export const INSTALLED_PLUGINS = {};
export const PLUGIN_BLOCKS_DEFINITIONS = {};

// Register all discovered plugins and their blocks
for (const path in pluginModules) {
    try {
        const mod = pluginModules[path];
        const pluginData = mod.default || mod;
        const pluginId = pluginData.id || mod.id;

        if (pluginId && (pluginData.blocks || mod.blocks)) {
            INSTALLED_PLUGINS[pluginId] = pluginData;
            PLUGIN_BLOCKS_DEFINITIONS[pluginId] = pluginData.blocks || mod.blocks;
        }
    } catch (err) {
        console.warn(`[Rakitan PluginLoader] Failed to initialize plugin from ${path}:`, err);
    }
}

/**
 * Get all active plugin block definitions based on active plugin IDs
 */
export function getActivePluginBlocks(activePluginIds = []) {
    const list = Array.isArray(activePluginIds) ? activePluginIds : [];
    const blocks = {};

    for (const pluginId of list) {
        if (PLUGIN_BLOCKS_DEFINITIONS[pluginId]) {
            Object.assign(blocks, PLUGIN_BLOCKS_DEFINITIONS[pluginId]);
        }
    }

    return blocks;
}

/**
 * Get all available plugin block definitions regardless of active status (for renderer fallback)
 */
export function getAllPluginBlockDefinitions() {
    const blocks = {};
    for (const pluginId in PLUGIN_BLOCKS_DEFINITIONS) {
        Object.assign(blocks, PLUGIN_BLOCKS_DEFINITIONS[pluginId]);
    }
    return blocks;
}
