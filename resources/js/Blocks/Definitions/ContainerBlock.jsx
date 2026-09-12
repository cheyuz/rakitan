import React from 'react';
import { LayoutGrid, Sparkles, Box, Maximize2 } from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import SubComponentSlot from '@/Blocks/SubComponents/SubComponentSlot';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

export const ContainerComponent = ({ props = {}, blockId }) => {
    const {
        badgeText = '',
        title = '',
        subtitle = '',
        columns = 1,
        layoutType = 'stack', // 'stack' | 'grid' | 'row'
        alignment = 'center', // 'left' | 'center' | 'right'
        bgStyle = 'transparent', // 'transparent' | 'dark' | 'glass' | 'gradient' | 'card'
        padding = 'md', // 'none' | 'sm' | 'md' | 'lg'
        containerWidthType = 'boxed', // 'boxed' | 'fluid'
        maxWidth = 'wide', // 'narrow' | 'standard' | 'wide' | 'extra-wide' | 'custom'
        customMaxWidth = '1280px',
        subComponents = [],
    } = props;

    const { onUpdateBlockProp } = useCanvasEdit();

    const handlePropUpdate = (key, val) => {
        if (onUpdateBlockProp && blockId) {
            onUpdateBlockProp(blockId, key, val);
        }
    };

    const bgStyles = {
        transparent: 'bg-transparent text-slate-100',
        dark: 'bg-slate-900/80 text-slate-100 border-y border-slate-800',
        glass: 'bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl text-slate-100 my-4 shadow-2xl',
        gradient: 'bg-gradient-to-b from-indigo-950/30 via-slate-950 to-slate-950 text-white',
        card: 'bg-slate-900 border border-slate-800 rounded-3xl p-8 text-slate-100 shadow-xl my-4',
    }[bgStyle] || 'bg-transparent text-slate-100';

    const paddingClasses = {
        none: 'py-0',
        sm: 'py-8 px-4 sm:px-6',
        md: 'py-16 px-4 sm:px-6 lg:px-8',
        lg: 'py-24 px-4 sm:px-6 lg:px-8',
    }[padding] || 'py-16 px-4 sm:px-6 lg:px-8';

    const alignClasses = {
        left: 'text-left items-start',
        center: 'text-center items-center mx-auto',
        right: 'text-right items-end ml-auto',
    }[alignment] || 'text-center items-center mx-auto';

    const layoutGridClass = {
        1: 'grid grid-cols-1 gap-6',
        2: 'grid grid-cols-1 md:grid-cols-2 gap-6',
        3: 'grid grid-cols-1 md:grid-cols-3 gap-6',
        4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6',
    }[columns] || 'grid grid-cols-1 gap-6';

    const layoutContainerClass =
        layoutType === 'grid'
            ? layoutGridClass
            : layoutType === 'row'
            ? 'flex flex-wrap items-center gap-4'
            : 'flex flex-col space-y-4';

    // Width & Max-Width calculations
    const isFluid = containerWidthType === 'fluid';
    const maxWidthClasses = {
        narrow: 'max-w-3xl',           // ~768px
        standard: 'max-w-5xl',         // ~1024px
        wide: 'max-w-7xl',             // ~1280px
        'extra-wide': 'max-w-[1536px]', // ~1536px
        custom: '',
    }[maxWidth] || 'max-w-7xl';

    const innerContainerClass = isFluid
        ? 'w-full px-4 sm:px-6 lg:px-8'
        : `mx-auto w-full px-4 sm:px-6 lg:px-8 ${maxWidthClasses}`;

    const innerCustomStyle =
        !isFluid && maxWidth === 'custom' && customMaxWidth
            ? { maxWidth: customMaxWidth }
            : undefined;

    return (
        <section className={`relative overflow-hidden transition-all duration-200 ${bgStyles} ${paddingClasses}`}>
            <div className={innerContainerClass} style={innerCustomStyle}>
                {/* Optional Container Header */}
                {(badgeText || title || subtitle) && (
                    <div className={`flex flex-col ${alignClasses} max-w-2xl mb-10`}>
                        {badgeText && (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
                                <Sparkles className="w-3.5 h-3.5" />
                                <InlineText
                                    value={badgeText}
                                    onChange={(val) => handlePropUpdate('badgeText', val)}
                                    placeholder="Badge"
                                />
                            </div>
                        )}

                        {title && (
                            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
                                <InlineText
                                    value={title}
                                    onChange={(val) => handlePropUpdate('title', val)}
                                    as="span"
                                    placeholder="Container Title"
                                />
                            </h2>
                        )}

                        {subtitle && (
                            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                                <InlineText
                                    value={subtitle}
                                    onChange={(val) => handlePropUpdate('subtitle', val)}
                                    as="span"
                                    placeholder="Container subtitle / description..."
                                    multiline
                                />
                            </p>
                        )}
                    </div>
                )}

                {/* Slot for Dynamic Sub-Components */}
                <div className={`w-full ${layoutContainerClass}`}>
                    <SubComponentSlot
                        blockId={blockId}
                        subComponents={subComponents}
                        emptyPlaceholder="Click here to insert dynamic sub-components..."
                    />
                </div>
            </div>
        </section>
    );
};

export const ContainerSettings = ({ props = {}, updateProps }) => {
    const {
        badgeText = '',
        title = '',
        subtitle = '',
        columns = 1,
        layoutType = 'stack',
        alignment = 'center',
        bgStyle = 'transparent',
        padding = 'md',
        containerWidthType = 'boxed',
        maxWidth = 'wide',
        customMaxWidth = '1280px',
    } = props;

    return (
        <div className="space-y-4 text-xs">
            {/* Container Width & Sizing */}
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Container Width</span>
                    </label>
                    <span className="text-[10px] font-mono text-indigo-400 font-semibold uppercase">
                        {containerWidthType}
                    </span>
                </div>

                {/* Width Type Switcher: Boxed vs Fluid */}
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
                    <button
                        type="button"
                        onClick={() => updateProps({ containerWidthType: 'boxed' })}
                        className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            containerWidthType !== 'fluid'
                                ? 'bg-indigo-600 text-white shadow-sm'
                                : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        <Box className="w-3.5 h-3.5" />
                        <span>Fixed / Boxed</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => updateProps({ containerWidthType: 'fluid' })}
                        className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            containerWidthType === 'fluid'
                                ? 'bg-indigo-600 text-white shadow-sm'
                                : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Fluid (100%)</span>
                    </button>
                </div>

                {/* Max-Width options (active if boxed) */}
                {containerWidthType !== 'fluid' ? (
                    <div className="space-y-2 pt-1 border-t border-slate-800/80">
                        <div>
                            <label className="block text-[11px] font-medium text-slate-300 mb-1">
                                Max-Width Preset
                            </label>
                            <select
                                value={maxWidth || 'wide'}
                                onChange={(e) => updateProps({ maxWidth: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:ring-1 focus:ring-indigo-500"
                            >
                                <option value="narrow">Narrow (768px - Reading / Text)</option>
                                <option value="standard">Standard (1024px - Classic)</option>
                                <option value="wide">Wide (1280px - Modern Standard)</option>
                                <option value="extra-wide">Extra Wide (1536px - Broad)</option>
                                <option value="custom">Custom Width (px / %)</option>
                            </select>
                        </div>

                        {maxWidth === 'custom' && (
                            <div>
                                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                                    Custom Max-Width
                                </label>
                                <input
                                    type="text"
                                    value={customMaxWidth || ''}
                                    onChange={(e) => updateProps({ customMaxWidth: e.target.value })}
                                    placeholder="e.g. 1400px, 90%, 1120px"
                                    className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                                />
                                <p className="text-[10px] text-slate-500 mt-1">
                                    Enter any valid CSS width like <code className="text-indigo-400">1440px</code>, <code className="text-indigo-400">92%</code>, or <code className="text-indigo-400">85rem</code>.
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded-xl border border-slate-800/60 leading-relaxed">
                        🌐 <strong>Fluid Mode:</strong> Content spans 100% of the screen width with responsive side paddings, ideal for full-bleed hero banners, wide dashboards, or expansive media grids.
                    </p>
                )}
            </div>

            {/* Layout Type & Columns */}
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block font-semibold text-slate-300 mb-1">Layout Type</label>
                    <select
                        value={layoutType}
                        onChange={(e) => updateProps({ layoutType: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white"
                    >
                        <option value="stack">Vertical Stack</option>
                        <option value="grid">Column Grid</option>
                        <option value="row">Horizontal Row</option>
                    </select>
                </div>

                <div>
                    <label className="block font-semibold text-slate-300 mb-1">Columns</label>
                    <select
                        value={columns}
                        onChange={(e) => updateProps({ columns: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white"
                    >
                        <option value={1}>1 Column</option>
                        <option value={2}>2 Columns</option>
                        <option value={3}>3 Columns</option>
                        <option value={4}>4 Columns</option>
                    </select>
                </div>
            </div>

            {/* Alignment & Background Style */}
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block font-semibold text-slate-300 mb-1">Content Alignment</label>
                    <select
                        value={alignment}
                        onChange={(e) => updateProps({ alignment: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white"
                    >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                    </select>
                </div>

                <div>
                    <label className="block font-semibold text-slate-300 mb-1">Background Style</label>
                    <select
                        value={bgStyle}
                        onChange={(e) => updateProps({ bgStyle: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white"
                    >
                        <option value="transparent">Transparent</option>
                        <option value="dark">Dark (Slate-900)</option>
                        <option value="glass">Glassmorphism</option>
                        <option value="gradient">Modern Gradient</option>
                        <option value="card">Card Box</option>
                    </select>
                </div>
            </div>

            {/* Padding Spacing */}
            <div>
                <label className="block font-semibold text-slate-300 mb-1">Vertical Padding</label>
                <select
                    value={padding}
                    onChange={(e) => updateProps({ padding: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white"
                >
                    <option value="none">No Padding</option>
                    <option value="sm">Small (py-8)</option>
                    <option value="md">Medium / Standard (py-16)</option>
                    <option value="lg">Large (py-24)</option>
                </select>
            </div>

            {/* Optional Header Content */}
            <div className="pt-2 border-t border-slate-800 space-y-3">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Header Content (Optional)
                </h4>

                <div>
                    <label className="block font-semibold text-slate-300 mb-1">Badge Text</label>
                    <input
                        type="text"
                        value={badgeText}
                        onChange={(e) => updateProps({ badgeText: e.target.value })}
                        placeholder="e.g. ✨ MODULAR CONTAINER"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white"
                    />
                </div>

                <div>
                    <label className="block font-semibold text-slate-300 mb-1">Container Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => updateProps({ title: e.target.value })}
                        placeholder="Section headline..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white"
                    />
                </div>

                <div>
                    <label className="block font-semibold text-slate-300 mb-1">Subtitle / Description</label>
                    <textarea
                        value={subtitle}
                        onChange={(e) => updateProps({ subtitle: e.target.value })}
                        rows={2}
                        placeholder="Optional descriptive explanation..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white resize-none"
                    />
                </div>
            </div>
        </div>
    );
};
