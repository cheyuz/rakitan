import React from 'react';
import { Check, Sparkles, Sprout, ArrowRight } from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import SubComponentSlot from '@/Blocks/SubComponents/SubComponentSlot';
import DefaultElementWrapper from '@/Blocks/Components/DefaultElementWrapper';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

export default function PricingBlock({ props = {}, blockId }) {
    const {
        badgeText = 'Pilihan Paket Nutrisi',
        title = 'Investasi Sehat untuk Kebugaran Alami Anda',
        subtitle = 'Pilih paket asupan nabati berkualitas yang sesuai dengan ritme dan kebutuhan gaya hidup Anda.',
        padding = 'lg',
        plans = [
            {
                id: '1',
                name: 'Paket Pemula',
                price: 'Rp 149.000',
                period: '/minggu',
                description: 'Cocok bagi Anda yang ingin memulai transisi menuju pola konsumsi nabati sehat.',
                features: ['3 Box Sari Kedelai Murni Organik', 'Buku Panduan Pola Makan Nabatis', 'Pengiriman Terjadwal Mingguan', 'Dukungan Konsultasi Gizi Dasar'],
                buttonText: 'Pilih Paket Pemula',
                buttonUrl: '#',
                isPopular: false,
            },
            {
                id: '2',
                name: 'Paket Keluarga Sehat',
                price: 'Rp 389.000',
                period: '/bulan',
                description: 'Pilihan paling disukai keluarga Indonesia untuk asupan nabati harian lengkap.',
                features: ['12 Box Campuran Susu Oat & Almond', 'Bonus Ekstrak Matcha Organik', 'Pengiriman Cepat Prioritas Dingin', 'Konsultasi Ahli Gizi Personal 1-on-1', 'Akses Komunitas Nabatis Sehat'],
                buttonText: 'Langganan Sekarang',
                buttonUrl: '#',
                isPopular: true,
            },
            {
                id: '3',
                name: 'Paket Wellness Pro',
                price: 'Rp 799.000',
                period: '/bulan',
                description: 'Program nutrisi holistik intensif dengan suplemen botani premium.',
                features: ['Paket Lengkap Superfood Harian', 'Supervisi Diet Khusus Dokter Gizi', 'Diskon Khusus Toko Mitra 20%', 'Kemasan Khusus Eco-Cooler Eksklusif'],
                buttonText: 'Hubungi Konsultan Kami',
                buttonUrl: '#',
                isPopular: false,
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

    const handlePlanChange = (idx, field, val) => {
        const updated = [...plans];
        updated[idx] = { ...updated[idx], [field]: val };
        handlePropChange('plans', updated);
    };

    const paddingClasses = {
        sm: 'py-12 md:py-16',
        md: 'py-16 md:py-20',
        lg: 'py-20 md:py-28',
    }[padding] || 'py-20 md:py-28';

    return (
        <section className={`relative overflow-hidden bg-[#ffffff] text-[#182a1d] ${paddingClasses}`}>
            {/* Background Ambient Tints */}
            <div className="pointer-events-none absolute -top-20 right-1/4 w-[38rem] h-[22rem] bg-[#d8f3dc]/40 rounded-full blur-3xl" />
            <div className="pointer-events-none absolute bottom-10 left-1/4 w-96 h-96 bg-[#eef7f0]/70 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {isCustom ? (
                    <div className="w-full">
                        <SubComponentSlot
                            blockId={blockId}
                            subComponents={subComponents}
                            emptyPlaceholder="+ Tambahkan Sub-Komponen ke Blok Pricing Light Nabatis"
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
                                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#edf7ef] text-[#2d6a4f] border border-[#b7e4c7] mb-4 shadow-sm">
                                        <Sprout className="w-3.5 h-3.5 text-[#52b788]" />
                                        <InlineText
                                            value={badgeText}
                                            onChange={(val) => handlePropChange('badgeText', val)}
                                            placeholder="Pricing Badge"
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
                                        placeholder="Pricing Title"
                                        as="span"
                                    />
                                </h2>
                            </DefaultElementWrapper>

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
                                        placeholder="Pricing Subtitle"
                                        as="span"
                                    />
                                </p>
                            </DefaultElementWrapper>
                        </div>

                        {/* Pricing Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
                            {plans.map((plan, idx) => {
                                const isPopular = plan.isPopular;
                                return (
                                    <div
                                        key={plan.id || idx}
                                        className={`relative flex flex-col justify-between p-8 rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg transition-all duration-300 ${
                                            isPopular
                                                ? 'bg-gradient-to-b from-[#f0f8f2] to-white border-2 border-[#52b788] shadow-xl shadow-[#2d6a4f]/15 scale-105 z-20'
                                                : 'bg-white border border-[#dce8dd] shadow-sm hover:shadow-md hover:border-[#b7e4c7] z-10'
                                        }`}
                                    >
                                        {/* Multi-Color Strip Top Bar */}
                                        <div className={`absolute top-0 left-0 right-0 h-1.5 ${
                                            isPopular
                                                ? 'bg-gradient-to-r from-[#2d6a4f] via-[#52b788] via-[#e9d8a6] to-[#d4a373]'
                                                : 'bg-[#dce8dd]'
                                        }`} />

                                        {isPopular && (
                                            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#2d6a4f] text-white shadow-md flex items-center gap-1.5">
                                                <Sparkles className="w-3 h-3 text-[#e9d8a6]" />
                                                <span>Pilihan Terpopuler</span>
                                            </div>
                                        )}

                                        <div>
                                            <div className="mb-6">
                                                <h3 className="text-xl font-bold text-[#14281a] mb-2 font-['Outfit',sans-serif]">
                                                    <InlineText
                                                        value={plan.name}
                                                        onChange={(val) => handlePlanChange(idx, 'name', val)}
                                                        placeholder="Plan Name"
                                                    />
                                                </h3>
                                                <p className="text-xs text-[#526b58] leading-relaxed">
                                                    <InlineText
                                                        value={plan.description}
                                                        onChange={(val) => handlePlanChange(idx, 'description', val)}
                                                        placeholder="Plan Description"
                                                        as="span"
                                                    />
                                                </p>
                                            </div>

                                            <div className="flex items-baseline gap-1.5 pb-6 mb-6 border-b border-[#edf2ee]">
                                                <span className="text-3xl sm:text-4xl font-black text-[#14281a] font-['Outfit',sans-serif]">
                                                    <InlineText
                                                        value={plan.price}
                                                        onChange={(val) => handlePlanChange(idx, 'price', val)}
                                                        placeholder="Rp 0"
                                                    />
                                                </span>
                                                <span className="text-xs font-semibold text-[#526b58]">
                                                    <InlineText
                                                        value={plan.period}
                                                        onChange={(val) => handlePlanChange(idx, 'period', val)}
                                                        placeholder="/bulan"
                                                    />
                                                </span>
                                            </div>

                                            <div className="space-y-3 mb-8">
                                                {(plan.features || []).map((feat, fIdx) => (
                                                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-[#2b4131]">
                                                        <div className="p-0.5 rounded-full bg-[#edf7ef] border border-[#b7e4c7] text-[#2d6a4f] mt-0.5 flex-shrink-0">
                                                            <Check className="w-3 h-3 stroke-[3]" />
                                                        </div>
                                                        <span>{feat}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <a
                                            href={isEditing ? undefined : (plan.buttonUrl || '#')}
                                            onClick={(e) => {
                                                if (isEditing) e.preventDefault();
                                            }}
                                            className={`inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-tl-xl rounded-br-xl rounded-tr-md rounded-bl-md text-xs font-bold transition-all duration-200 active:scale-95 ${
                                                isPopular
                                                    ? 'bg-[#2d6a4f] hover:bg-[#1b4332] text-white shadow-md shadow-[#2d6a4f]/20 border-t-2 border-[#74c69d]'
                                                    : 'bg-[#edf7ef] hover:bg-[#d8f3dc] text-[#2d6a4f] border border-[#b7e4c7]'
                                            }`}
                                        >
                                            <InlineText
                                                value={plan.buttonText}
                                                onChange={(val) => handlePlanChange(idx, 'buttonText', val)}
                                                placeholder="Pilih Paket"
                                            />
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </a>
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
