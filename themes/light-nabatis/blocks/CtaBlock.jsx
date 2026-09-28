import React from 'react';
import { ArrowRight, Leaf, Sparkles, CheckCircle2 } from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import SubComponentSlot from '@/Blocks/SubComponents/SubComponentSlot';
import DefaultElementWrapper from '@/Blocks/Components/DefaultElementWrapper';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

export default function CtaBlock({ props = {}, blockId }) {
    const {
        badgeText = 'Mulailah Hari Ini',
        title = 'Siap Menikmati Kemurnian Nutrisi Nabati Terbaik?',
        subtitle = 'Bergabunglah bersama lebih dari 10.000+ sahabat Nabatis di seluruh Indonesia yang telah merasakan vitalitas tubuh lebih segar dan berstamina.',
        buttonText = 'Dapatkan Paket Perdana Sekarang',
        buttonUrl = '#',
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

    const paddingClasses = {
        sm: 'py-12 md:py-16',
        md: 'py-16 md:py-20',
        lg: 'py-20 md:py-28',
    }[padding] || 'py-20 md:py-28';

    return (
        <section className={`relative overflow-hidden bg-[#ffffff] text-[#182a1d] ${paddingClasses}`}>
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {isCustom ? (
                    <div className="w-full">
                        <SubComponentSlot
                            blockId={blockId}
                            subComponents={subComponents}
                            emptyPlaceholder="+ Tambahkan Sub-Komponen ke Blok CTA Light Nabatis"
                        />
                    </div>
                ) : (
                    <div
                        style={{ background: 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 50%, #204e38 100%)', color: '#ffffff' }}
                        className="relative overflow-hidden rounded-3xl p-8 sm:p-14 text-white shadow-2xl shadow-[#2d6a4f]/25 border border-[#40916c]/40 text-center"
                    >
                        {/* Signature Multi-Color Strip Top Accent */}
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#52b788] via-[#b7e4c7] via-[#e9d8a6] to-[#d4a373]" />

                        {/* Ambient Halos */}
                        <div className="pointer-events-none absolute -top-16 -right-16 w-80 h-80 bg-[#52b788]/20 rounded-full blur-2xl" />
                        <div className="pointer-events-none absolute -bottom-16 -left-16 w-80 h-80 bg-[#d4a373]/15 rounded-full blur-2xl" />

                        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
                            {(badgeText || isEditing) && (
                                <DefaultElementWrapper
                                    blockId={blockId}
                                    elementKey="badgeText"
                                    label="Badge"
                                    isCustom={isCustom}
                                >
                                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-[#d8f3dc] border border-white/20 mb-6 backdrop-blur-md">
                                        <Leaf className="w-3.5 h-3.5 text-[#74c69d]" />
                                        <InlineText
                                            value={badgeText}
                                            onChange={(val) => handlePropChange('badgeText', val)}
                                            placeholder="CTA Badge"
                                        />
                                    </div>
                                </DefaultElementWrapper>
                            )}

                            <DefaultElementWrapper
                                blockId={blockId}
                                elementKey="title"
                                label="Title"
                                isCustom={isCustom}
                            >
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-5 leading-tight font-['Outfit',sans-serif]">
                                    <InlineText
                                        value={title}
                                        onChange={(val) => handlePropChange('title', val)}
                                        placeholder="CTA Headline"
                                        as="span"
                                    />
                                </h2>
                            </DefaultElementWrapper>

                            <DefaultElementWrapper
                                blockId={blockId}
                                elementKey="subtitle"
                                label="Subtitle"
                                isCustom={isCustom}
                            >
                                <p className="text-sm sm:text-base text-[#d8f3dc]/90 leading-relaxed mb-8 max-w-xl font-normal">
                                    <InlineText
                                        value={subtitle}
                                        onChange={(val) => handlePropChange('subtitle', val)}
                                        placeholder="CTA Subtitle..."
                                        as="span"
                                    />
                                </p>
                            </DefaultElementWrapper>

                            {(buttonText || isEditing) && (
                                <DefaultElementWrapper
                                    blockId={blockId}
                                    elementKey="buttonText"
                                    label="Button"
                                    isCustom={isCustom}
                                >
                                    <a
                                        href={isEditing ? undefined : (buttonUrl || '#')}
                                        onClick={(e) => {
                                            if (isEditing) e.preventDefault();
                                        }}
                                        style={{ backgroundColor: '#d8f3dc', color: '#14281a' }}
                                        className="inline-flex items-center gap-2.5 px-8 py-4 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md text-sm font-bold shadow-lg shadow-black/20 hover:scale-105 transition-all duration-200 active:scale-95 group border-t-2 border-[#b7e4c7]"
                                    >
                                        <InlineText
                                            value={buttonText}
                                            onChange={(val) => handlePropChange('buttonText', val)}
                                            placeholder="Tombol CTA"
                                        />
                                        <ArrowRight className="w-4 h-4 text-[#2d6a4f] group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </DefaultElementWrapper>
                            )}

                            {/* Trust Perks */}
                            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#b7e4c7]">
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4 text-[#74c69d]" />
                                    <span>Bebas Pengawet</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4 text-[#74c69d]" />
                                    <span>Jaminan Kesegaran 100%</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4 text-[#74c69d]" />
                                    <span>Gratis Ongkir Jabodetabek</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
