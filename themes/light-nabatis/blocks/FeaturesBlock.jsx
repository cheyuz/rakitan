import React from 'react';
import {
    Sprout,
    Leaf,
    SunMedium,
    Droplets,
    ShieldCheck,
    HeartHandshake,
    Sparkles,
    Recycle,
} from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import SubComponentSlot from '@/Blocks/SubComponents/SubComponentSlot';
import DefaultElementWrapper from '@/Blocks/Components/DefaultElementWrapper';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

// Resolver icon herbal botani
const getFeatureIcon = (name) => {
    const props = { className: 'w-6 h-6 text-[#2d6a4f]' };
    switch (name) {
        case 'Sprout': return <Sprout {...props} />;
        case 'Leaf': return <Leaf {...props} />;
        case 'SunMedium': return <SunMedium {...props} />;
        case 'Droplets': return <Droplets {...props} />;
        case 'ShieldCheck': return <ShieldCheck {...props} />;
        case 'Recycle': return <Recycle {...props} />;
        default: return <Sparkles {...props} />;
    }
};

export default function FeaturesBlock({ props = {}, blockId }) {
    const {
        badgeText = 'Keunggulan Nabatis',
        title = 'Kebaikan Murni dari Alam Terpilih',
        subtitle = 'Diproses dengan standar higienis dan teknologi ramah lingkungan guna menjaga keaslian nutrisi herbal.',
        columns = '3',
        padding = 'lg',
        features = [
            {
                id: '1',
                title: 'Bahan Baku Nabati Murni',
                description: 'Dipetik langsung dari perkebunan organik lokal binaan yang bebas pestisida kimia sintetis.',
                icon: 'Sprout',
            },
            {
                id: '2',
                title: 'Ekstraksi Dingin Alami',
                description: 'Metode cold-press modern tanpa pemanasan ekstrem untuk menjaga keutuhan enzim dan bioaktif alami.',
                icon: 'Droplets',
            },
            {
                id: '3',
                title: 'Ramah Siklus Bumi',
                description: 'Setiap kemasan dapat terurai secara alami dan diproduksi dengan jejak karbon terendah.',
                icon: 'Recycle',
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

    const handleFeatureItemChange = (idx, field, val) => {
        const updated = [...features];
        updated[idx] = { ...updated[idx], [field]: val };
        handlePropChange('features', updated);
    };

    const gridColsClass = {
        '2': 'grid-cols-1 md:grid-cols-2 max-w-4xl',
        '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl',
        '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl',
    }[columns] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl';

    const paddingClasses = {
        sm: 'py-12 md:py-16',
        md: 'py-16 md:py-20',
        lg: 'py-20 md:py-28',
    }[padding] || 'py-20 md:py-28';

    return (
        <section className={`relative overflow-hidden bg-[#f4f7f4] text-[#182a1d] ${paddingClasses}`}>
            {/* Ambient Soft Glow */}
            <div className="pointer-events-none absolute top-10 left-10 w-96 h-96 bg-[#d8f3dc]/40 rounded-full blur-3xl" />
            <div className="pointer-events-none absolute bottom-10 right-10 w-96 h-96 bg-[#e9d8a6]/20 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {isCustom ? (
                    <div className="w-full">
                        <SubComponentSlot
                            blockId={blockId}
                            subComponents={subComponents}
                            emptyPlaceholder="+ Tambahkan Sub-Komponen ke Blok Fitur Light Nabatis"
                        />
                    </div>
                ) : (
                    <>
                        {/* Section Header */}
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            {(badgeText || isEditing) && (
                                <DefaultElementWrapper
                                    blockId={blockId}
                                    elementKey="badgeText"
                                    label="Badge"
                                    isCustom={isCustom}
                                >
                                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#ffffff] text-[#2d6a4f] border border-[#b7e4c7] mb-4 shadow-sm">
                                        <Leaf className="w-3.5 h-3.5 text-[#52b788]" />
                                        <InlineText
                                            value={badgeText}
                                            onChange={(val) => handlePropChange('badgeText', val)}
                                            placeholder="Section Badge"
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
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14281a] tracking-tight mb-4 font-['Outfit',sans-serif]">
                                    <InlineText
                                        value={title}
                                        onChange={(val) => handlePropChange('title', val)}
                                        placeholder="Section Title"
                                        as="span"
                                    />
                                </h2>
                            </DefaultElementWrapper>

                            {/* Triple color strip center indicator */}
                            <div className="flex items-center justify-center gap-1.5 mb-4">
                                <div className="h-1 w-10 rounded-full bg-[#2d6a4f]" />
                                <div className="h-1 w-5 rounded-full bg-[#52b788]" />
                                <div className="h-1 w-2 rounded-full bg-[#d4a373]" />
                            </div>

                            <DefaultElementWrapper
                                blockId={blockId}
                                elementKey="subtitle"
                                label="Subtitle"
                                isCustom={isCustom}
                            >
                                <p className="text-sm sm:text-base text-[#4a6351] leading-relaxed">
                                    <InlineText
                                        value={subtitle}
                                        onChange={(val) => handlePropChange('subtitle', val)}
                                        placeholder="Section Subtitle"
                                        as="span"
                                    />
                                </p>
                            </DefaultElementWrapper>
                        </div>

                        {/* Asymmetric Organic Leaf Cards Grid */}
                        <div className={`grid gap-6 sm:gap-8 mx-auto ${gridColsClass}`}>
                            {features.map((item, idx) => (
                                <div
                                    key={item.id || idx}
                                    className="relative flex flex-col justify-between p-7 rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg bg-white border border-[#dce8dd] shadow-sm hover:shadow-xl hover:shadow-[#2d6a4f]/10 transition-all duration-300 group hover:-translate-y-1 overflow-hidden"
                                >
                                    {/* Top Triple Color Strip Accent */}
                                    <div
                                        style={{ height: '4px', background: 'linear-gradient(90deg, #2d6a4f 0%, #52b788 50%, #d4a373 100%)' }}
                                        className="absolute top-0 left-0 right-0 opacity-90 group-hover:opacity-100 transition-opacity"
                                    />

                                    <div>
                                        {/* Icon Container with Dual Soft Green Rings */}
                                        <div className="w-13 h-13 w-fit p-3 rounded-2xl bg-[#edf7ef] border border-[#b7e4c7] mb-6 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#d8f3dc] transition-all duration-300">
                                            {getFeatureIcon(item.icon)}
                                        </div>

                                        <h3 className="text-lg font-bold text-[#14281a] mb-2.5 font-['Outfit',sans-serif] group-hover:text-[#2d6a4f] transition-colors">
                                            <InlineText
                                                value={item.title}
                                                onChange={(val) => handleFeatureItemChange(idx, 'title', val)}
                                                placeholder="Feature Title"
                                            />
                                        </h3>

                                        <p className="text-xs sm:text-sm text-[#4a6351] leading-relaxed font-normal">
                                            <InlineText
                                                value={item.description}
                                                onChange={(val) => handleFeatureItemChange(idx, 'description', val)}
                                                placeholder="Feature description text..."
                                                as="span"
                                            />
                                        </p>
                                    </div>

                                    {/* Bottom Leaf Watermark Indicator */}
                                    <div className="mt-6 pt-4 border-t border-[#edf2ee] flex items-center justify-between text-[11px] font-semibold text-[#52b788]">
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#52b788]" />
                                            Standar Nabatis
                                        </span>
                                        <Leaf className="w-4 h-4 opacity-40 group-hover:opacity-80 transition-opacity" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
