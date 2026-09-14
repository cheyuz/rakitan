import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import SubComponentSlot from '@/Blocks/SubComponents/SubComponentSlot';
import DefaultElementWrapper from '@/Blocks/Components/DefaultElementWrapper';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

/**
 * Clean Light Theme Override: HeroBlock
 *
 * Minimalist, airy, modern light aesthetic with soft ambient blurs,
 * crisp Slate-900 typography, and polished rounded CTA buttons.
 */
export default function HeroBlock({ props = {}, blockId }) {
    const {
        badgeText = '✨ Next-Gen Modular CMS',
        title = 'Craft Your Dream Website Like Building a Puzzle',
        subtitle = 'Rakitan CMS empowers developers and creators with independent modular blocks, lightning performance, and complete visual freedom.',
        primaryButtonText = 'Get Started Now',
        primaryButtonUrl = '#',
        secondaryButtonText = 'Explore Docs',
        secondaryButtonUrl = '#',
        alignment = 'center',
        padding = 'lg',
        subComponents = [],
        isCustom = false,
    } = props;

    const { onUpdateBlockProp, isEditing } = useCanvasEdit();

    const handlePropChange = (key, val) => {
        if (onUpdateBlockProp && blockId) {
            onUpdateBlockProp(blockId, key, val);
        }
    };

    const alignClasses = {
        left: 'text-left items-start',
        center: 'text-center items-center mx-auto',
        right: 'text-right items-end ml-auto',
    }[alignment] || 'text-center items-center mx-auto';

    const paddingClasses = {
        sm: 'py-12 md:py-16',
        md: 'py-20 md:py-24',
        lg: 'py-24 md:py-32',
    }[padding] || 'py-24 md:py-32';

    return (
        <section className={`relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-indigo-50/20 text-slate-900 ${paddingClasses}`}>
            {/* Ambient Soft Glow Elements */}
            <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[38rem] h-[22rem] bg-indigo-200/35 rounded-full blur-3xl" />
            <div className="pointer-events-none absolute top-1/3 right-10 w-72 h-72 bg-sky-200/25 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {isCustom ? (
                    <div className="w-full">
                        <SubComponentSlot
                            blockId={blockId}
                            subComponents={subComponents}
                            emptyPlaceholder="+ Tambahkan Sub-Komponen ke Blok Hero Light Ini"
                        />
                    </div>
                ) : (
                    <div className={`flex flex-col ${alignClasses} max-w-3xl`}>
                        {/* Modern Frosted Badge */}
                        {(badgeText || isEditing) && (
                            <DefaultElementWrapper
                                blockId={blockId}
                                elementKey="badgeText"
                                label="Badge"
                                isCustom={isCustom}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-indigo-50/90 text-indigo-700 border border-indigo-200/70 mb-6 shadow-xs backdrop-blur-sm">
                                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                                    <InlineText
                                        value={badgeText}
                                        onChange={(val) => handlePropChange('badgeText', val)}
                                        placeholder="Hero Badge Text"
                                    />
                                </div>
                            </DefaultElementWrapper>
                        )}

                        {/* Crisp Headline */}
                        <DefaultElementWrapper
                            blockId={blockId}
                            elementKey="title"
                            label="Headline"
                            isCustom={isCustom}
                        >
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-[1.15] mb-6">
                                <InlineText
                                    value={title}
                                    onChange={(val) => handlePropChange('title', val)}
                                    placeholder="Hero Headline Title"
                                    as="span"
                                />
                            </h1>
                        </DefaultElementWrapper>

                        {/* Airy Subtitle */}
                        {(subtitle || isEditing) && (
                            <DefaultElementWrapper
                                blockId={blockId}
                                elementKey="subtitle"
                                label="Subtitle"
                                isCustom={isCustom}
                            >
                                <p className="text-lg sm:text-xl font-normal text-slate-600 leading-relaxed mb-10">
                                    <InlineText
                                        value={subtitle}
                                        onChange={(val) => handlePropChange('subtitle', val)}
                                        placeholder="Write introductory subtitle..."
                                        multiline
                                        as="span"
                                    />
                                </p>
                            </DefaultElementWrapper>
                        )}

                        {/* Action Buttons */}
                        <DefaultElementWrapper
                            blockId={blockId}
                            elementKey="buttons"
                            label="Action Buttons"
                            isCustom={isCustom}
                        >
                            <div className="flex flex-wrap items-center gap-3.5">
                                {(primaryButtonText || isEditing) && (
                                    <a
                                        href={isEditing ? undefined : (primaryButtonUrl || '#')}
                                        onClick={(e) => {
                                            if (isEditing) e.preventDefault();
                                        }}
                                        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-md shadow-indigo-600/25 transition-all duration-200"
                                    >
                                        <InlineText
                                            value={primaryButtonText}
                                            onChange={(val) => handlePropChange('primaryButtonText', val)}
                                            placeholder="Primary Button"
                                        />
                                        <ArrowRight className="w-4 h-4" />
                                    </a>
                                )}

                                {(secondaryButtonText || isEditing) && (
                                    <a
                                        href={isEditing ? undefined : (secondaryButtonUrl || '#')}
                                        onClick={(e) => {
                                            if (e && isEditing) e.preventDefault();
                                        }}
                                        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all duration-200"
                                    >
                                        <InlineText
                                            value={secondaryButtonText}
                                            onChange={(val) => handlePropChange('secondaryButtonText', val)}
                                            placeholder="Secondary Button"
                                        />
                                    </a>
                                )}
                            </div>
                        </DefaultElementWrapper>
                    </div>
                )}
            </div>
        </section>
    );
}
