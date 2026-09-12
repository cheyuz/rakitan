import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Plus, Trash2, TrendingUp, ShieldCheck, Users, Zap, Award } from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

const DynamicIcon = ({ name, className = 'w-6 h-6' }) => {
    const IconComponent = LucideIcons[name] || LucideIcons.TrendingUp;
    return <IconComponent className={className} />;
};

export const StatsCounterComponent = ({ props = {}, blockId }) => {
    const {
        badge = 'PROVEN TRACK RECORD',
        title = 'Trusted by High-Performing Teams Globally',
        subtitle = 'Key benchmarks and metrics demonstrating our platform performance, scale, and customer satisfaction.',
        columns = 4,
        layoutStyle = 'card',
        bgStyle = 'glass',
        padding = 'lg',
        items = [
            {
                value: '99.99%',
                label: 'Uptime SLA Guarantee',
                description: 'Enterprise reliability with distributed failover',
                icon: 'ShieldCheck',
            },
            {
                value: '250K+',
                label: 'Active Web Builders',
                description: 'Empowering creators and agencies across 120 countries',
                icon: 'Users',
            },
            {
                value: '< 45ms',
                label: 'Ultra-Low TTFB',
                description: 'Optimized server-side hydration & edge caching layer',
                icon: 'Zap',
            },
            {
                value: '4.95/5',
                label: 'Client Satisfaction',
                description: 'Verified reviews on Trustpilot and G2 Crowd',
                icon: 'Award',
            },
        ],
    } = props;

    const { onUpdateBlockProp, isEditing } = useCanvasEdit();

    const handlePropChange = (key, val) => {
        if (onUpdateBlockProp && blockId) {
            onUpdateBlockProp(blockId, key, val);
        }
    };

    const handleItemChange = (idx, field, val) => {
        const newItems = [...items];
        newItems[idx] = { ...newItems[idx], [field]: val };
        handlePropChange('items', newItems);
    };

    const colClasses = {
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    };

    const padClasses = {
        sm: 'py-8 px-4',
        md: 'py-14 px-4 sm:px-6',
        lg: 'py-20 px-4 sm:px-6 lg:px-8',
    };

    const bgClasses = {
        none: 'bg-transparent',
        muted: 'bg-slate-50 dark:bg-slate-900/50',
        glass: 'bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-y border-slate-200/50 dark:border-slate-800/50',
        dark: 'bg-slate-950 text-white',
        gradient: 'bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-cyan-500/10 dark:from-indigo-950/40 dark:via-purple-950/20 dark:to-cyan-950/30',
    };

    const cardStyles = {
        card: 'bg-white dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all group',
        minimal: 'p-4 rounded-xl text-center hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors',
        bordered: 'p-6 rounded-2xl border-2 border-dashed border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/20 dark:bg-indigo-950/10',
    };

    return (
        <section className={`${bgClasses[bgStyle] || bgClasses.glass} ${padClasses[padding] || padClasses.lg} relative overflow-hidden`}>
            <div className="max-w-7xl mx-auto">
                {(badge || title || subtitle) && (
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        {badge && (
                            <div className="inline-block mb-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50">
                                    <TrendingUp className="w-3.5 h-3.5" />
                                    <InlineText
                                        value={badge}
                                        onChange={(val) => handlePropChange('badge', val)}
                                        isEditable={isEditing}
                                    />
                                </span>
                            </div>
                        )}
                        {title && (
                            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
                                <InlineText
                                    value={title}
                                    onChange={(val) => handlePropChange('title', val)}
                                    isEditable={isEditing}
                                />
                            </h2>
                        )}
                        {subtitle && (
                            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                <InlineText
                                    value={subtitle}
                                    onChange={(val) => handlePropChange('subtitle', val)}
                                    isEditable={isEditing}
                                />
                            </p>
                        )}
                    </div>
                )}

                <div className={`grid ${colClasses[columns] || colClasses[4]} gap-6`}>
                    {items.map((item, idx) => (
                        <div key={idx} className={cardStyles[layoutStyle] || cardStyles.card}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 dark:bg-indigo-400/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                    <DynamicIcon name={item.icon || 'TrendingUp'} className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400">
                                    #{idx + 1}
                                </span>
                            </div>

                            <div className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
                                <InlineText
                                    value={item.value}
                                    onChange={(val) => handleItemChange(idx, 'value', val)}
                                    isEditable={isEditing}
                                />
                            </div>

                            <div className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
                                <InlineText
                                    value={item.label}
                                    onChange={(val) => handleItemChange(idx, 'label', val)}
                                    isEditable={isEditing}
                                />
                            </div>

                            <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                <InlineText
                                    value={item.description}
                                    onChange={(val) => handleItemChange(idx, 'description', val)}
                                    isEditable={isEditing}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export const StatsCounterSettings = ({ props = {}, onChange }) => {
    const {
        badge = '',
        title = '',
        subtitle = '',
        columns = 4,
        layoutStyle = 'card',
        bgStyle = 'glass',
        padding = 'lg',
        items = [],
    } = props;

    const handleItemChange = (idx, field, val) => {
        const newItems = [...items];
        newItems[idx] = { ...newItems[idx], [field]: val };
        onChange('items', newItems);
    };

    const handleAddItem = () => {
        const newItems = [
            ...items,
            {
                value: '100+',
                label: 'New Metric',
                description: 'Brief description of this achievement',
                icon: 'TrendingUp',
            },
        ];
        onChange('items', newItems);
    };

    const handleRemoveItem = (idx) => {
        onChange('items', items.filter((_, i) => i !== idx));
    };

    return (
        <div className="space-y-5 text-sm">
            <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Section Header
                </label>
                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="Badge text (optional)"
                        value={badge}
                        onChange={(e) => onChange('badge', e.target.value)}
                        className="w-full text-xs rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    />
                    <input
                        type="text"
                        placeholder="Main title"
                        value={title}
                        onChange={(e) => onChange('title', e.target.value)}
                        className="w-full text-xs rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-medium"
                    />
                    <textarea
                        placeholder="Subtitle description"
                        value={subtitle}
                        onChange={(e) => onChange('subtitle', e.target.value)}
                        rows={2}
                        className="w-full text-xs rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Columns</label>
                    <select
                        value={columns}
                        onChange={(e) => onChange('columns', Number(e.target.value))}
                        className="w-full text-xs rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    >
                        <option value={2}>2 Columns</option>
                        <option value={3}>3 Columns</option>
                        <option value={4}>4 Columns</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Layout Style</label>
                    <select
                        value={layoutStyle}
                        onChange={(e) => onChange('layoutStyle', e.target.value)}
                        className="w-full text-xs rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    >
                        <option value="card">Standard Card</option>
                        <option value="minimal">Minimalist</option>
                        <option value="bordered">Dashed Border</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Background</label>
                    <select
                        value={bgStyle}
                        onChange={(e) => onChange('bgStyle', e.target.value)}
                        className="w-full text-xs rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    >
                        <option value="none">None (Transparent)</option>
                        <option value="muted">Muted Slate</option>
                        <option value="glass">Modern Glass</option>
                        <option value="gradient">Gradient Glow</option>
                        <option value="dark">Deep Dark</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Padding</label>
                    <select
                        value={padding}
                        onChange={(e) => onChange('padding', e.target.value)}
                        className="w-full text-xs rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    >
                        <option value="sm">Compact (sm)</option>
                        <option value="md">Normal (md)</option>
                        <option value="lg">Spacious (lg)</option>
                    </select>
                </div>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Stats Items ({items.length})
                    </label>
                    <button
                        type="button"
                        onClick={handleAddItem}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100"
                    >
                        <Plus className="w-3.5 h-3.5" /> Add Stat
                    </button>
                </div>

                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {items.map((item, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60 space-y-2">
                            <div className="flex items-center justify-between gap-2">
                                <input
                                    type="text"
                                    placeholder="Value (e.g. 99.9%)"
                                    value={item.value}
                                    onChange={(e) => handleItemChange(idx, 'value', e.target.value)}
                                    className="flex-1 text-xs font-bold rounded border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                                />
                                <input
                                    type="text"
                                    placeholder="Icon (Lucide)"
                                    value={item.icon || 'TrendingUp'}
                                    onChange={(e) => handleItemChange(idx, 'icon', e.target.value)}
                                    className="w-24 text-xs rounded border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveItem(idx)}
                                    className="p-1 text-slate-400 hover:text-red-500 rounded"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <input
                                type="text"
                                placeholder="Label"
                                value={item.label}
                                onChange={(e) => handleItemChange(idx, 'label', e.target.value)}
                                className="w-full text-xs font-medium rounded border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                            />
                            <input
                                type="text"
                                placeholder="Short description"
                                value={item.description}
                                onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                                className="w-full text-xs rounded border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
