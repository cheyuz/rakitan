import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Plus, Trash2, Layers, Sparkles } from 'lucide-react';

const DynamicIcon = ({ name, className = 'w-6 h-6' }) => {
    const IconComponent = LucideIcons[name] || LucideIcons.Sparkles;
    return <IconComponent className={className} />;
};

export const FeaturesComponent = ({ props = {} }) => {
    const {
        badge = 'CORE CAPABILITIES',
        title = 'Everything You Need for Modern Web Experiences',
        subtitle = 'Built from the ground up for maximum flexibility, instant responsiveness, and zero plugin bloat.',
        columns = 3,
        items = [
            {
                icon: 'Layers',
                title: 'Puzzle-Driven Architecture',
                description: 'Each block is an independent component with defined props, default state, and clean JSON payloads.',
                badge: 'Core',
            },
            {
                icon: 'Zap',
                title: 'Blazing Fast Performance',
                description: 'Powered by Laravel 11 and Inertia.js React for instantaneous client-side navigation without API overhead.',
                badge: 'Fast',
            },
            {
                icon: 'ShieldCheck',
                title: 'Enterprise-Grade Security',
                description: 'Built-in DOMPurify sanitization, automatic CSRF verification, and secure server-side session controls.',
                badge: 'Secure',
            },
        ],
    } = props;

    const colClasses = {
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    }[columns] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-100 transition-colors duration-200">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    {badge && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-indigo-900/40 text-indigo-400 border border-indigo-500/20 mb-4">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{badge}</span>
                        </div>
                    )}
                    {title && (
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                            {title}
                        </h2>
                    )}
                    {subtitle && (
                        <p className="text-base sm:text-lg text-slate-400">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Grid of Items */}
                <div className={`grid gap-8 ${colClasses}`}>
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="group relative flex flex-col p-8 bg-slate-900/80 rounded-2xl border border-slate-800 shadow-sm hover:shadow-2xl hover:border-indigo-500/40 transition-all duration-300"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-12 h-12 rounded-xl bg-indigo-950/60 text-indigo-400 border border-indigo-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                    <DynamicIcon name={item.icon} className="w-6 h-6" />
                                </div>
                                {item.badge && (
                                    <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                                        {item.badge}
                                    </span>
                                )}
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                                {item.title}
                            </h3>

                            <p className="text-sm text-slate-400 leading-relaxed flex-grow">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export const FeaturesSettings = ({ props, updateProps }) => {
    const items = props.items || [];

    const handleUpdateItem = (index, updatedField) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], ...updatedField };
        updateProps({ items: newItems });
    };

    const handleAddItem = () => {
        const newItems = [
            ...items,
            {
                icon: 'Sparkles',
                title: 'New Feature Item',
                description: 'Describe the key benefit of this capability to visitors.',
                badge: 'New',
            },
        ];
        updateProps({ items: newItems });
    };

    const handleRemoveItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        updateProps({ items: newItems });
    };

    return (
        <div className="space-y-4 text-xs">
            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Top Badge Text</label>
                <input
                    type="text"
                    value={props.badge || ''}
                    onChange={(e) => updateProps({ badge: e.target.value })}
                    placeholder="e.g. KEY FEATURES"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
            </div>

            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Section Title</label>
                <input
                    type="text"
                    value={props.title || ''}
                    onChange={(e) => updateProps({ title: e.target.value })}
                    placeholder="Features heading..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
            </div>

            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Subtitle / Description</label>
                <textarea
                    rows={2}
                    value={props.subtitle || ''}
                    onChange={(e) => updateProps({ subtitle: e.target.value })}
                    placeholder="Short description..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none leading-relaxed"
                />
            </div>

            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Grid Columns</label>
                <div className="grid grid-cols-3 gap-2">
                    {[2, 3, 4].map((col) => (
                        <button
                            key={col}
                            type="button"
                            onClick={() => updateProps({ columns: col })}
                            className={`py-1.5 rounded-xl text-xs font-semibold transition-all ${
                                (props.columns || 3) === col
                                    ? 'bg-indigo-600 text-white shadow-sm'
                                    : 'bg-slate-900 border border-slate-700/80 text-slate-300 hover:bg-slate-800'
                            }`}
                        >
                            {col} Columns
                        </button>
                    ))}
                </div>
            </div>

            {/* Item Editor List */}
            <div className="pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-white">Feature Items ({items.length})</span>
                    <button
                        type="button"
                        onClick={handleAddItem}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-600/20 text-indigo-400 font-semibold hover:bg-indigo-600 hover:text-white transition-all"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Item</span>
                    </button>
                </div>

                <div className="space-y-3">
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 space-y-2.5 relative"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-[11px] text-slate-400">Item #{idx + 1}</span>
                                {items.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveItem(idx)}
                                        className="text-red-400 hover:text-red-300 p-1"
                                        title="Delete Item"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-[11px] font-medium text-slate-400 mb-1">Lucide Icon Name</label>
                                    <input
                                        type="text"
                                        value={item.icon || 'Sparkles'}
                                        onChange={(e) => handleUpdateItem(idx, { icon: e.target.value })}
                                        placeholder="Layers, Zap..."
                                        className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-slate-900 border border-slate-700/80 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-medium text-slate-400 mb-1">Badge Tag</label>
                                    <input
                                        type="text"
                                        value={item.badge || ''}
                                        onChange={(e) => handleUpdateItem(idx, { badge: e.target.value })}
                                        placeholder="Modular"
                                        className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-slate-900 border border-slate-700/80 text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-medium text-slate-400 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={item.title || ''}
                                    onChange={(e) => handleUpdateItem(idx, { title: e.target.value })}
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-slate-900 border border-slate-700/80 text-white font-semibold"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-medium text-slate-400 mb-1">Description</label>
                                <textarea
                                    rows={2}
                                    value={item.description || ''}
                                    onChange={(e) => handleUpdateItem(idx, { description: e.target.value })}
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-slate-900 border border-slate-700/80 text-white leading-relaxed"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
