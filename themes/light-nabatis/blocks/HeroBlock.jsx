import React from 'react';
import { Sparkles, ArrowRight, Sprout, Leaf, CheckCircle2 } from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import SubComponentSlot from '@/Blocks/SubComponents/SubComponentSlot';
import DefaultElementWrapper from '@/Blocks/Components/DefaultElementWrapper';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

/**
 * Light Nabatis Theme Override: HeroBlock
 * Fresh botanical modern soft green aesthetic, triple-color strips,
 * and asymmetric organic contours.
 */
export default function HeroBlock({ props = {}, blockId }) {
    const {
        badgeText = '🌿 100% Organik & Alami',
        title = 'Kebaikan Alam Nabati untuk Gaya Hidup Sehat & Berkelanjutan',
        subtitle = 'Koleksi nutrisi murni berbahan dasar nabati pilihan dengan formulasi segar, higienis, dan ramah lingkungan untuk keseimbangan tubuh setiap hari.',
        primaryButtonText = 'Mulai Jelajahi',
        primaryButtonUrl = '#',
        secondaryButtonText = 'Pelajari Cerita Kami',
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
        <section className={`relative overflow-hidden bg-gradient-to-b from-[#eef7f0] via-[#f7faf7] to-[#ffffff] text-[#182a1d] ${paddingClasses}`}>
            {/* Top Multi-Color Strip Accent */}
            <div
                style={{ height: '5px', background: 'linear-gradient(90deg, #2d6a4f 0%, #52b788 40%, #b7e4c7 70%, #d4a373 100%)' }}
                className="absolute top-0 left-0 right-0 z-20 shadow-xs"
            />

            {/* Ambient Botanical Soft Halos */}
            <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[46rem] h-[26rem] bg-[#b7e4c7]/35 rounded-full blur-3xl -z-0" />
            <div className="pointer-events-none absolute top-1/4 right-8 w-80 h-80 bg-[#d8f3dc]/60 rounded-full blur-3xl -z-0" />
            <div className="pointer-events-none absolute bottom-10 left-8 w-72 h-72 bg-[#e9d8a6]/25 rounded-full blur-3xl -z-0" />

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {isCustom ? (
                    <div className="w-full">
                        <SubComponentSlot
                            blockId={blockId}
                            subComponents={subComponents}
                            emptyPlaceholder="+ Tambahkan Sub-Komponen ke Blok Hero Light Nabatis Ini"
                        />
                    </div>
                ) : (
                    <div className={`flex flex-col ${alignClasses} max-w-3xl`}>
                        {/* Organic Leaf Badge with Color Strip Border */}
                        {(badgeText || isEditing) && (
                            <DefaultElementWrapper
                                blockId={blockId}
                                elementKey="badgeText"
                                label="Badge"
                                isCustom={isCustom}
                            >
                                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-[#ffffff]/90 text-[#2d6a4f] border border-[#b7e4c7] mb-6 shadow-sm shadow-[#2d6a4f]/5 backdrop-blur-md">
                                    <span className="flex h-2 w-2 rounded-full bg-[#52b788] animate-pulse" />
                                    <InlineText
                                        value={badgeText}
                                        onChange={(val) => handlePropChange('badgeText', val)}
                                        placeholder="Hero Badge Text"
                                    />
                                    {/* Mini Triple Strip Indicator */}
                                    <div className="flex items-center gap-1 pl-1.5 border-l border-[#d8e2dc]">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#52b788]" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#d4a373]" />
                                    </div>
                                </div>
                            </DefaultElementWrapper>
                        )}

                        {/* Fresh Botanical Headline */}
                        <DefaultElementWrapper
                            blockId={blockId}
                            elementKey="title"
                            label="Headline"
                            isCustom={isCustom}
                        >
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#14281a] leading-[1.18] mb-6 font-['Outfit',sans-serif]">
                                <InlineText
                                    value={title}
                                    onChange={(val) => handlePropChange('title', val)}
                                    placeholder="Hero Headline Title"
                                    as="span"
                                />
                            </h1>
                        </DefaultElementWrapper>

                        {/* Decorative Botanical Strip Divider */}
                        <div className="flex items-center gap-1.5 mb-6">
                            <div className="h-1 w-12 rounded-full bg-[#2d6a4f]" />
                            <div className="h-1 w-6 rounded-full bg-[#52b788]" />
                            <div className="h-1 w-2 rounded-full bg-[#d4a373]" />
                        </div>

                        {/* Subtitle */}
                        <DefaultElementWrapper
                            blockId={blockId}
                            elementKey="subtitle"
                            label="Subtitle"
                            isCustom={isCustom}
                        >
                            <p className="text-base sm:text-lg text-[#4a6351] leading-relaxed mb-10 max-w-2xl font-normal">
                                <InlineText
                                    value={subtitle}
                                    onChange={(val) => handlePropChange('subtitle', val)}
                                    placeholder="Hero subtitle description text..."
                                    as="span"
                                />
                            </p>
                        </DefaultElementWrapper>

                        {/* Dual Action Buttons with Asymmetric Leaf Curves */}
                        <div className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
                            {(primaryButtonText || isEditing) && (
                                <DefaultElementWrapper
                                    blockId={blockId}
                                    elementKey="primaryButtonText"
                                    label="Primary Button"
                                    isCustom={isCustom}
                                >
                                    <a
                                        href={isEditing ? undefined : (primaryButtonUrl || '#')}
                                        onClick={(e) => {
                                            if (isEditing) e.preventDefault();
                                        }}
                                        style={{ backgroundColor: '#2d6a4f', color: '#ffffff' }}
                                        className="btn-nabatis-primary inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md text-sm font-bold text-white shadow-lg shadow-[#2d6a4f]/25 hover:opacity-95 transition-all duration-200 active:scale-95 group border-t-2 border-[#74c69d]"
                                    >
                                        <InlineText
                                            value={primaryButtonText}
                                            onChange={(val) => handlePropChange('primaryButtonText', val)}
                                            placeholder="Primary CTA"
                                        />
                                        <ArrowRight className="w-4 h-4 text-[#b7e4c7] group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </DefaultElementWrapper>
                            )}

                            {(secondaryButtonText || isEditing) && (
                                <DefaultElementWrapper
                                    blockId={blockId}
                                    elementKey="secondaryButtonText"
                                    label="Secondary Button"
                                    isCustom={isCustom}
                                >
                                    <a
                                        href={isEditing ? undefined : (secondaryButtonUrl || '#')}
                                        onClick={(e) => {
                                            if (isEditing) e.preventDefault();
                                        }}
                                        style={{ backgroundColor: '#ffffff', color: '#2d6a4f', borderColor: '#b7e4c7' }}
                                        className="btn-nabatis-secondary inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-tl-md rounded-br-md rounded-tr-2xl rounded-bl-2xl text-sm font-semibold border shadow-xs transition-all duration-200 active:scale-95 hover:bg-[#edf7ef]"
                                    >
                                        <Sprout className="w-4 h-4 text-[#52b788]" />
                                        <InlineText
                                            value={secondaryButtonText}
                                            onChange={(val) => handlePropChange('secondaryButtonText', val)}
                                            placeholder="Secondary CTA"
                                        />
                                    </a>
                                </DefaultElementWrapper>
                            )}
                        </div>

                        {/* Botanical Highlights / Trust Strip */}
                        <div className="mt-12 pt-6 border-t border-[#dce8dd] flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-medium text-[#4a6351]">
                            <div className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-[#40916c]" />
                                <span>100% Bebas Bahan Kimia Sintetis</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-[#40916c]" />
                                <span>Kemasan Biodegradable & Daur Ulang</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-[#40916c]" />
                                <span>Tersertifikasi Halal & BPOM Organik</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
