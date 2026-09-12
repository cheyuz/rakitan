import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Plus, Trash2, CheckCircle2, Clock, CircleDot, ArrowRight, Milestone } from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

export const TimelineComponent = ({ props = {}, blockId }) => {
    const {
        badge = 'JOURNEY & WORKFLOW',
        title = 'How It Works: From Concept to Production',
        subtitle = 'Follow our structured 4-step workflow to assemble modern digital experiences with speed and confidence.',
        orientation = 'vertical',
        bgStyle = 'glass',
        padding = 'lg',
        steps = [
            {
                step: '01',
                title: 'Choose Architecture & Theme',
                description: 'Select from pre-engineered starter palettes or start from a blank modular canvas tailored to your project requirements.',
                tag: 'Step 1',
                status: 'completed',
            },
            {
                step: '02',
                title: 'Assemble Puzzle Blocks',
                description: 'Drag and drop independent blocks, customize spacing, tweak typography, and live-edit visual content directly on the canvas.',
                tag: 'Step 2',
                status: 'completed',
            },
            {
                step: '03',
                title: 'Integrate Dynamic Capabilities',
                description: 'Plug in interactive lead capture forms, configure automated SEO metadata, and preview instantly on mobile and desktop.',
                tag: 'Step 3',
                status: 'in_progress',
            },
            {
                step: '04',
                title: '1-Click Zero-Downtime Launch',
                description: 'Deploy lightning-fast production bundles with global edge caching, automated security headers, and instant asset optimization.',
                tag: 'Step 4',
                status: 'upcoming',
            },
        ],
    } = props;

    const { onUpdateBlockProp, isEditing } = useCanvasEdit();

    const handlePropChange = (key, val) => {
        if (onUpdateBlockProp && blockId) {
            onUpdateBlockProp(blockId, key, val);
        }
    };

    const handleStepChange = (idx, field, val) => {
        const newSteps = [...steps];
        newSteps[idx] = { ...newSteps[idx], [field]: val };
        handlePropChange('steps', newSteps);
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

    const statusBadge = (status) => {
        switch (status) {
            case 'completed':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3 h-3" /> Completed
                    </span>
                );
            case 'in_progress':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800 animate-pulse">
                        <Clock className="w-3 h-3" /> In Progress
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                        <CircleDot className="w-3 h-3" /> Upcoming
                    </span>
                );
        }
    };

    return (
        <section className={`${bgClasses[bgStyle] || bgClasses.glass} ${padClasses[padding] || padClasses.lg} relative overflow-hidden`}>
            <div className="max-w-6xl mx-auto">
                {(badge || title || subtitle) && (
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        {badge && (
                            <div className="inline-block mb-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50">
                                    <Milestone className="w-3.5 h-3.5" />
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

                {orientation === 'horizontal' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                        {steps.map((item, idx) => (
                            <div key={idx} className="relative flex flex-col bg-white dark:bg-slate-800/90 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-indigo-500/20 shadow-lg">
                                        {item.step || `0${idx + 1}`}
                                    </span>
                                    {statusBadge(item.status)}
                                </div>

                                <div className="text-xs font-bold uppercase tracking-wider text-indigo-500 mb-1">
                                    <InlineText
                                        value={item.tag || `Step ${idx + 1}`}
                                        onChange={(val) => handleStepChange(idx, 'tag', val)}
                                        isEditable={isEditing}
                                    />
                                </div>

                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                    <InlineText
                                        value={item.title}
                                        onChange={(val) => handleStepChange(idx, 'title', val)}
                                        isEditable={isEditing}
                                    />
                                </h3>

                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-auto">
                                    <InlineText
                                        value={item.description}
                                        onChange={(val) => handleStepChange(idx, 'description', val)}
                                        isEditable={isEditing}
                                    />
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="relative pl-6 sm:pl-10 space-y-10 before:absolute before:left-3 sm:before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:via-purple-500 before:to-slate-300 dark:before:to-slate-700">
                        {steps.map((item, idx) => (
                            <div key={idx} className="relative group">
                                <div className="absolute -left-6 sm:-left-10 top-1.5 w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-slate-900 border-4 border-indigo-600 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs sm:text-sm shadow-md">
                                    {idx + 1}
                                </div>

                                <div className="bg-white dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all">
                                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-md border border-indigo-100 dark:border-indigo-800/40">
                                            <InlineText
                                                value={item.tag || `Milestone ${idx + 1}`}
                                                onChange={(val) => handleStepChange(idx, 'tag', val)}
                                                isEditable={isEditing}
                                            />
                                        </span>
                                        {statusBadge(item.status)}
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                        <InlineText
                                            value={item.title}
                                            onChange={(val) => handleStepChange(idx, 'title', val)}
                                            isEditable={isEditing}
                                        />
                                    </h3>

                                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                                        <InlineText
                                            value={item.description}
                                            onChange={(val) => handleStepChange(idx, 'description', val)}
                                            isEditable={isEditing}
                                        />
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export const TimelineSettings = ({ props = {}, onChange }) => {
    const {
        badge = '',
        title = '',
        subtitle = '',
        orientation = 'vertical',
        bgStyle = 'glass',
        padding = 'lg',
        steps = [],
    } = props;

    const handleStepChange = (idx, field, val) => {
        const newSteps = [...steps];
        newSteps[idx] = { ...newSteps[idx], [field]: val };
        onChange('steps', newSteps);
    };

    const handleAddStep = () => {
        const newSteps = [
            ...steps,
            {
                step: `0${steps.length + 1}`,
                title: 'New Milestone / Step',
                description: 'Add specific details or instructions for this phase.',
                tag: `Phase ${steps.length + 1}`,
                status: 'upcoming',
            },
        ];
        onChange('steps', newSteps);
    };

    const handleRemoveStep = (idx) => {
        onChange('steps', steps.filter((_, i) => i !== idx));
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
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Orientation</label>
                    <select
                        value={orientation}
                        onChange={(e) => onChange('orientation', e.target.value)}
                        className="w-full text-xs rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    >
                        <option value="vertical">Vertical Timeline</option>
                        <option value="horizontal">Horizontal Steps Grid</option>
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
                        Workflow Steps ({steps.length})
                    </label>
                    <button
                        type="button"
                        onClick={handleAddStep}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100"
                    >
                        <Plus className="w-3.5 h-3.5" /> Add Step
                    </button>
                </div>

                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {steps.map((item, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60 space-y-2">
                            <div className="flex items-center justify-between gap-2">
                                <input
                                    type="text"
                                    placeholder="Step # (01)"
                                    value={item.step || ''}
                                    onChange={(e) => handleStepChange(idx, 'step', e.target.value)}
                                    className="w-16 text-xs font-bold rounded border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                                />
                                <input
                                    type="text"
                                    placeholder="Tag (e.g. Step 1)"
                                    value={item.tag || ''}
                                    onChange={(e) => handleStepChange(idx, 'tag', e.target.value)}
                                    className="flex-1 text-xs rounded border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                                />
                                <select
                                    value={item.status || 'upcoming'}
                                    onChange={(e) => handleStepChange(idx, 'status', e.target.value)}
                                    className="text-xs rounded border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                                >
                                    <option value="completed">Completed</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="upcoming">Upcoming</option>
                                </select>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveStep(idx)}
                                    className="p-1 text-slate-400 hover:text-red-500 rounded"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <input
                                type="text"
                                placeholder="Title"
                                value={item.title}
                                onChange={(e) => handleStepChange(idx, 'title', e.target.value)}
                                className="w-full text-xs font-medium rounded border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                            />
                            <textarea
                                placeholder="Description"
                                value={item.description}
                                onChange={(e) => handleStepChange(idx, 'description', e.target.value)}
                                rows={2}
                                className="w-full text-xs rounded border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
