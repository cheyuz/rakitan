import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Sparkles } from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import SubComponentSlot from '@/Blocks/SubComponents/SubComponentSlot';
import DefaultElementWrapper from '@/Blocks/Components/DefaultElementWrapper';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

const DynamicIcon = ({ name, className = 'w-6 h-6' }) => {
    const IconComponent = LucideIcons[name] || LucideIcons.Sparkles;
    return <IconComponent className={className} />;
};

// Curated soft pastel color styles for icons in light theme
const iconStyles = [
    { bg: 'bg-indigo-50 text-indigo-600 ring-indigo-100', badge: 'bg-indigo-50/80 text-indigo-700 border-indigo-200' },
    { bg: 'bg-emerald-50 text-emerald-600 ring-emerald-100', badge: 'bg-emerald-50/80 text-emerald-700 border-emerald-200' },
    { bg: 'bg-amber-50 text-amber-600 ring-amber-100', badge: 'bg-amber-50/80 text-amber-700 border-amber-200' },
    { bg: 'bg-rose-50 text-rose-600 ring-rose-100', badge: 'bg-rose-50/80 text-rose-700 border-rose-200' },
    { bg: 'bg-sky-50 text-sky-600 ring-sky-100', badge: 'bg-sky-50/80 text-sky-700 border-sky-200' },
    { bg: 'bg-violet-50 text-violet-600 ring-violet-100', badge: 'bg-violet-50/80 text-violet-700 border-violet-200' },
];

/**
 * Clean Light Theme Override: FeaturesBlock
 *
 * Crisp white cards with soft borders, pastel icon badges,
 * subtle micro-elevations, and readable modern typography.
 */
export default function FeaturesBlock({ props = {}, blockId }) {
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
        subComponents = [],
        isCustom = false,
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
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    }[columns] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-100 transition-colors duration-200">
            <div className="max-w-7xl mx-auto">
                {isCustom ? (
                    <div className="w-full max-w-6xl mx-auto">
                        <SubComponentSlot
                            blockId={blockId}
                            subComponents={subComponents}
                            emptyPlaceholder="+ Tambahkan Sub-Komponen ke Blok Fitur Light Ini"
                        />
                    </div>
                ) : (
                    <>
                        {/* Section Header */}
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            {(badge || isEditing) && (
                                <DefaultElementWrapper
                                    blockId={blockId}
                                    elementKey="badge"
                                    label="Badge"
                                    isCustom={isCustom}
                                >
                                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-indigo-50 text-indigo-700 border border-indigo-200/80 mb-4 shadow-xs">
                                        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                                        <InlineText
                                            value={badge}
                                            onChange={(val) => handlePropChange('badge', val)}
                                            placeholder="Category Badge"
                                        />
                                    </div>
                                </DefaultElementWrapper>
                            )}

                            <DefaultElementWrapper
                                blockId={blockId}
                                elementKey="title"
                                label="Feature Title"
                                isCustom={isCustom}
                            >
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-4">
                                    <InlineText
                                        value={title}
                                        onChange={(val) => handlePropChange('title', val)}
                                        placeholder="Section Heading"
                                    />
                                </h2>
                            </DefaultElementWrapper>

                            {(subtitle || isEditing) && (
                                <DefaultElementWrapper
                                    blockId={blockId}
                                    elementKey="subtitle"
                                    label="Subtitle"
                                    isCustom={isCustom}
                                >
                                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                                        <InlineText
                                            value={subtitle}
                                            onChange={(val) => handlePropChange('subtitle', val)}
                                            placeholder="Describe the main benefits and value proposition..."
                                            multiline
                                        />
                                    </p>
                                </DefaultElementWrapper>
                            )}
                        </div>

                        {/* Feature Cards Grid */}
                        <div className={`grid ${colClasses} gap-8`}>
                            {items.map((item, idx) => {
                                const styleTheme = iconStyles[idx % iconStyles.length];

                                return (
                                    <div
                                        key={idx}
                                        className="group relative flex flex-col p-8 rounded-2xl bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-indigo-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <div className="flex items-center justify-between mb-6">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ring-1 ${styleTheme.bg} shadow-xs transition-transform group-hover:scale-110 duration-200`}>
                                                <DynamicIcon name={item.icon} className="w-6 h-6" />
                                            </div>

                                            {item.badge && (
                                                <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${styleTheme.badge}`}>
                                                    {item.badge}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-900 mb-2.5">
                                            <InlineText
                                                value={item.title}
                                                onChange={(val) => handleItemChange(idx, 'title', val)}
                                                placeholder="Feature Title"
                                            />
                                        </h3>

                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            <InlineText
                                                value={item.description}
                                                onChange={(val) => handleItemChange(idx, 'description', val)}
                                                placeholder="Feature Description"
                                                multiline
                                            />
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
