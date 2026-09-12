import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Plus, Trash2, Check, X, Sparkles, Scale } from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

export const ComparisonTableComponent = ({ props = {}, blockId }) => {
    const {
        badge = 'FEATURE BREAKDOWN',
        title = 'Compare Plans & Capabilities',
        subtitle = 'Evaluate our modular plans side-by-side to choose the best foundation for your team.',
        plans = ['Starter', 'Professional', 'Enterprise'],
        highlightPlan = 'Professional',
        bgStyle = 'glass',
        padding = 'lg',
        features = [
            { name: 'Unlimited Modular Canvas Pages', starter: true, pro: true, enterprise: true },
            { name: 'Live Canvas Inline Editing', starter: true, pro: true, enterprise: true },
            { name: 'Dynamic Sub-Components Suite', starter: true, pro: true, enterprise: true },
            { name: 'Extended Block Suite Plugin', starter: false, pro: true, enterprise: true },
            { name: 'Custom Domain & Multi-Tenant', starter: false, pro: true, enterprise: true },
            { name: 'Role-Based Access Control (RBAC)', starter: false, pro: false, enterprise: true },
            { name: 'Dedicated 24/7 SLA & Custom Code Review', starter: false, pro: false, enterprise: true },
        ],
    } = props;

    const { onUpdateBlockProp, isEditing } = useCanvasEdit();

    const handlePropChange = (key, val) => {
        if (onUpdateBlockProp && blockId) {
            onUpdateBlockProp(blockId, key, val);
        }
    };

    const handleFeatureChange = (idx, field, val) => {
        const newFeatures = [...features];
        newFeatures[idx] = { ...newFeatures[idx], [field]: val };
        handlePropChange('features', newFeatures);
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

    const renderVal = (val) => {
        if (val === true) {
            return (
                <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                </span>
            );
        }
        if (val === false) {
            return (
                <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto">
                    <X className="w-4 h-4 stroke-[2]" />
                </span>
            );
        }
        return <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{val}</span>;
    };

    const getPlanKey = (planName) => {
        const lower = planName.toLowerCase();
        if (lower.includes('start') || lower.includes('comm')) return 'starter';
        if (lower.includes('pro')) return 'pro';
        if (lower.includes('enter')) return 'enterprise';
        return lower;
    };

    return (
        <section className={`${bgClasses[bgStyle] || bgClasses.glass} ${padClasses[padding] || padClasses.lg} relative overflow-hidden`}>
            <div className="max-w-6xl mx-auto">
                {(badge || title || subtitle) && (
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        {badge && (
                            <div className="inline-block mb-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50">
                                    <Scale className="w-3.5 h-3.5" />
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

                <div className="bg-white dark:bg-slate-800/90 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40">
                                    <th className="py-5 px-6 text-sm font-bold text-slate-700 dark:text-slate-200 w-2/5">
                                        Features & Capabilities
                                    </th>
                                    {plans.map((plan, idx) => {
                                        const isHighlight = plan.toLowerCase() === highlightPlan.toLowerCase();
                                        return (
                                            <th
                                                key={idx}
                                                className={`py-5 px-6 text-center text-sm font-extrabold ${
                                                    isHighlight
                                                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30'
                                                        : 'text-slate-900 dark:text-white'
                                                }`}
                                            >
                                                <div className="flex flex-col items-center gap-1">
                                                    {isHighlight && (
                                                        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-600 text-white shadow-sm">
                                                            <Sparkles className="w-2.5 h-2.5" /> Popular
                                                        </span>
                                                    )}
                                                    <span>{plan}</span>
                                                </div>
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                                {features.map((feat, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                                        <td className="py-4 px-6 font-medium text-slate-800 dark:text-slate-200">
                                            <InlineText
                                                value={feat.name}
                                                onChange={(val) => handleFeatureChange(idx, 'name', val)}
                                                isEditable={isEditing}
                                            />
                                        </td>
                                        {plans.map((plan, pIdx) => {
                                            const pKey = getPlanKey(plan);
                                            const isHighlight = plan.toLowerCase() === highlightPlan.toLowerCase();
                                            const val = feat[pKey] !== undefined ? feat[pKey] : feat[plan];
                                            return (
                                                <td
                                                    key={pIdx}
                                                    className={`py-4 px-6 text-center ${
                                                        isHighlight ? 'bg-indigo-50/30 dark:bg-indigo-950/20' : ''
                                                    }`}
                                                >
                                                    {renderVal(val)}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const ComparisonTableSettings = ({ props = {}, onChange }) => {
    const {
        badge = '',
        title = '',
        subtitle = '',
        plans = ['Starter', 'Professional', 'Enterprise'],
        highlightPlan = 'Professional',
        bgStyle = 'glass',
        padding = 'lg',
        features = [],
    } = props;

    const handleFeatureChange = (idx, field, val) => {
        const newFeatures = [...features];
        newFeatures[idx] = { ...newFeatures[idx], [field]: val };
        onChange('features', newFeatures);
    };

    const handleAddFeature = () => {
        const newFeatures = [
            ...features,
            {
                name: 'New Feature Capability',
                starter: false,
                pro: true,
                enterprise: true,
            },
        ];
        onChange('features', newFeatures);
    };

    const handleRemoveFeature = (idx) => {
        onChange('features', features.filter((_, i) => i !== idx));
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
                        placeholder="Badge text"
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
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Highlight Plan</label>
                    <select
                        value={highlightPlan}
                        onChange={(e) => onChange('highlightPlan', e.target.value)}
                        className="w-full text-xs rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    >
                        {plans.map((p, i) => (
                            <option key={i} value={p}>
                                {p}
                            </option>
                        ))}
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
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Feature Rows ({features.length})
                    </label>
                    <button
                        type="button"
                        onClick={handleAddFeature}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100"
                    >
                        <Plus className="w-3.5 h-3.5" /> Add Row
                    </button>
                </div>

                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {features.map((item, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60 space-y-2">
                            <div className="flex items-center justify-between gap-2">
                                <input
                                    type="text"
                                    placeholder="Feature name"
                                    value={item.name}
                                    onChange={(e) => handleFeatureChange(idx, 'name', e.target.value)}
                                    className="flex-1 text-xs font-medium rounded border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveFeature(idx)}
                                    className="p-1 text-slate-400 hover:text-red-500 rounded"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-xs">
                                <label className="flex items-center gap-1.5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={Boolean(item.starter)}
                                        onChange={(e) => handleFeatureChange(idx, 'starter', e.target.checked)}
                                        className="rounded border-slate-300 text-indigo-600"
                                    />
                                    <span className="truncate">Starter</span>
                                </label>
                                <label className="flex items-center gap-1.5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={Boolean(item.pro)}
                                        onChange={(e) => handleFeatureChange(idx, 'pro', e.target.checked)}
                                        className="rounded border-slate-300 text-indigo-600"
                                    />
                                    <span className="truncate">Pro</span>
                                </label>
                                <label className="flex items-center gap-1.5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={Boolean(item.enterprise)}
                                        onChange={(e) => handleFeatureChange(idx, 'enterprise', e.target.checked)}
                                        className="rounded border-slate-300 text-indigo-600"
                                    />
                                    <span className="truncate">Enterprise</span>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
