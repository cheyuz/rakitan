import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import SubComponentSlot from '@/Blocks/SubComponents/SubComponentSlot';
import DefaultElementWrapper from '@/Blocks/Components/DefaultElementWrapper';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

/**
 * Clean Light Theme Override: CtaBlock
 *
 * Modern high-converting curved card with vibrant indigo-violet gradient,
 * crisp white high-contrast typography, and floating ambient light accents.
 */
export default function CtaBlock({ props = {}, blockId }) {
    const {
        title = 'Ready to Build Something Extraordinary?',
        description = 'Join thousands of creators and developers who design, launch, and scale modular websites with Rakitan CMS.',
        primaryButtonText = 'Start Building For Free',
        primaryButtonUrl = '#',
        secondaryButtonText = 'Explore Marketplace',
        secondaryButtonUrl = '#',
        subComponents = [],
        isCustom = false,
    } = props;

    const { onUpdateBlockProp, isEditing } = useCanvasEdit();

    const handlePropChange = (key, val) => {
        if (onUpdateBlockProp && blockId) {
            onUpdateBlockProp(blockId, key, val);
        }
    };

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/50 transition-colors duration-200">
            <div className="max-w-6xl mx-auto rounded-3xl p-10 sm:p-14 lg:p-16 bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-800 text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden">
                {/* Decorative Ambient Shapes */}
                <div className="pointer-events-none absolute -right-16 -bottom-16 w-80 h-80 bg-white/10 rounded-full blur-2xl" />
                <div className="pointer-events-none absolute -left-12 -top-12 w-64 h-64 bg-violet-400/20 rounded-full blur-2xl" />

                <div className="relative z-10 max-w-3xl text-center mx-auto">
                    {isCustom ? (
                        <div className="w-full">
                            <SubComponentSlot
                                blockId={blockId}
                                subComponents={subComponents}
                                emptyPlaceholder="+ Tambahkan Sub-Komponen ke Blok CTA Light Ini"
                            />
                        </div>
                    ) : (
                        <>
                            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/15 text-white border border-white/20 mb-6 backdrop-blur-sm">
                                <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
                                <span>Get Started in Minutes</span>
                            </div>

                            <DefaultElementWrapper
                                blockId={blockId}
                                elementKey="title"
                                label="CTA Title"
                                isCustom={isCustom}
                            >
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
                                    <InlineText
                                        value={title}
                                        onChange={(val) => handlePropChange('title', val)}
                                        placeholder="CTA Title"
                                        as="span"
                                    />
                                </h2>
                            </DefaultElementWrapper>

                            {(description || isEditing) && (
                                <DefaultElementWrapper
                                    blockId={blockId}
                                    elementKey="description"
                                    label="CTA Description"
                                    isCustom={isCustom}
                                >
                                    <p className="text-base sm:text-lg text-indigo-100/90 leading-relaxed mb-10 max-w-2xl mx-auto">
                                        <InlineText
                                            value={description}
                                            onChange={(val) => handlePropChange('description', val)}
                                            placeholder="Write an enticing description..."
                                            multiline
                                            as="span"
                                        />
                                    </p>
                                </DefaultElementWrapper>
                            )}

                            <DefaultElementWrapper
                                blockId={blockId}
                                elementKey="buttons"
                                label="CTA Buttons"
                                isCustom={isCustom}
                            >
                                <div className="flex flex-wrap items-center justify-center gap-4">
                                    {(primaryButtonText || isEditing) && (
                                        <a
                                            href={isEditing ? undefined : (primaryButtonUrl || '#')}
                                            onClick={(e) => {
                                                if (isEditing) e.preventDefault();
                                            }}
                                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-indigo-700 bg-white hover:bg-indigo-50 active:scale-95 shadow-lg shadow-black/10 transition-all duration-200"
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
                                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm text-white hover:bg-white/10 border border-white/30 transition-all duration-200"
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
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
