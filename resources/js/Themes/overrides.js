/**
 * Theme Component Overrides Resolver
 *
 * Implements WordPress-style template hierarchy and block overrides.
 * Automatically scans and registers custom block component overrides
 * defined within /themes/<theme-id>/blocks/index.js via Vite's import.meta.glob.
 */

// Automatically discover all theme block override modules
const themeModules = import.meta.glob('/themes/*/blocks/index.js', { eager: true });

const themeOverridesMap = {};

for (const path in themeModules) {
    // Extracts theme ID from path: '/themes/{theme-id}/blocks/index.js'
    const match = path.match(/\/themes\/([^/]+)\/blocks\/index\.js/);
    if (match && match[1]) {
        const themeId = match[1];
        const module = themeModules[path];
        const blocks = module.default || module.blocks || module;

        themeOverridesMap[themeId] = blocks;

        // Support both dash and underscore identifiers (e.g. default-light and default_light)
        const altId = themeId.includes('-')
            ? themeId.replace(/-/g, '_')
            : themeId.replace(/_/g, '-');
        themeOverridesMap[altId] = blocks;
    }
}

/**
 * Resolve custom block component override for an active theme.
 *
 * @param {string} themeId - Active theme ID (e.g. 'default-light')
 * @param {string} blockType - Block identifier (e.g. 'hero', 'features', 'pricing')
 * @returns {React.Component|null}
 */
export function getThemeBlockOverride(themeId, blockType) {
    if (!themeId || !blockType) return null;

    const themeBlocks = themeOverridesMap[themeId];
    if (themeBlocks && themeBlocks[blockType]) {
        return themeBlocks[blockType];
    }

    return null;
}

/**
 * Check if a theme provides an override for a block type.
 */
export function hasThemeBlockOverride(themeId, blockType) {
    return Boolean(getThemeBlockOverride(themeId, blockType));
}

export default themeOverridesMap;
