import React from 'react';
import { Star, Quote, Leaf, Sprout } from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import SubComponentSlot from '@/Blocks/SubComponents/SubComponentSlot';
import DefaultElementWrapper from '@/Blocks/Components/DefaultElementWrapper';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

export default function TestimonialsBlock({ props = {}, blockId }) {
    const {
        badgeText = 'Cerita Sahabat Nabatis',
        title = 'Kata Mereka yang Telah Memilih Pola Sehat Alami',
        subtitle = 'Kisah nyata perubahan energi dan kebugaran tubuh setelah beralih ke nutrisi nabati terpadu.',
        padding = 'lg',
        testimonials = [
            {
                id: '1',
                name: 'dr. Sarah Amanda',
                role: 'Praktisi Medis & Wellness Coach',
                avatar: 'https://images.unsplash.com/photo-1594824813501-4895697669d6?auto=format&fit=crop&w=200&q=80',
                quote: 'Komposisi nabati murninya sangat mudah diserap tubuh. Pasien saya yang intoleransi laktosa sangat terbantu dengan kesegaran produk Nabatis.',
                rating: 5,
            },
            {
                id: '2',
                name: 'Reza Hendrawan',
                role: 'Marathon Runner & Athlete',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
                quote: 'Pemulihan otot setelah lari jarak jauh terasa jauh lebih cepat tanpa efek kembung. Rasanya segar alami dan tidak eneg sama sekali!',
                rating: 5,
            },
            {
                id: '3',
                name: 'Dewi Kartika',
                role: 'Ibu Rumah Tangga & Food Creator',
                avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
                quote: 'Anak-anak saya yang biasanya susah makan sayur dan kacang-kacangan jadi suka minum smoothies nabati setiap pagi. Sangat direkomendasikan!',
                rating: 5,
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

    const handleTestimonialChange = (idx, field, val) => {
        const updated = [...testimonials];
        updated[idx] = { ...updated[idx], [field]: val };
        handlePropChange('testimonials', updated);
    };

    const paddingClasses = {
        sm: 'py-12 md:py-16',
        md: 'py-16 md:py-20',
        lg: 'py-20 md:py-28',
    }[padding] || 'py-20 md:py-28';

    return (
        <section className={`relative overflow-hidden bg-[#f4f7f4] text-[#182a1d] ${paddingClasses}`}>
            {/* Ambient Halos */}
            <div className="pointer-events-none absolute top-10 right-10 w-96 h-96 bg-[#d8f3dc]/50 rounded-full blur-3xl" />
            <div className="pointer-events-none absolute bottom-10 left-10 w-96 h-96 bg-[#edf7ef]/70 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {isCustom ? (
                    <div className="w-full">
                        <SubComponentSlot
                            blockId={blockId}
                            subComponents={subComponents}
                            emptyPlaceholder="+ Tambahkan Sub-Komponen ke Blok Testimonial Light Nabatis"
                        />
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            {(badgeText || isEditing) && (
                                <DefaultElementWrapper
                                    blockId={blockId}
                                    elementKey="badgeText"
                                    label="Badge"
                                    isCustom={isCustom}
                                >
                                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#ffffff] text-[#2d6a4f] border border-[#b7e4c7] mb-4 shadow-sm">
                                        <Quote className="w-3.5 h-3.5 text-[#52b788]" />
                                        <InlineText
                                            value={badgeText}
                                            onChange={(val) => handlePropChange('badgeText', val)}
                                            placeholder="Testimonials Badge"
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
                                        placeholder="Testimonials Title"
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
                                        placeholder="Testimonials Subtitle"
                                        as="span"
                                    />
                                </p>
                            </DefaultElementWrapper>
                        </div>

                        {/* Testimonials Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {testimonials.map((item, idx) => (
                                <div
                                    key={item.id || idx}
                                    className="relative flex flex-col justify-between p-7 rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg bg-white border-l-4 border-l-[#2d6a4f] border-t border-r border-b border-[#dce8dd] shadow-sm hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
                                >
                                    {/* Subtle Top Strip */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2d6a4f] via-[#52b788] to-[#d4a373] opacity-60" />

                                    <div>
                                        {/* Star Rating */}
                                        <div className="flex items-center gap-1 mb-4">
                                            {[...Array(item.rating || 5)].map((_, sIdx) => (
                                                <Star key={sIdx} className="w-4 h-4 fill-[#d4a373] text-[#d4a373]" />
                                            ))}
                                        </div>

                                        <p className="text-sm text-[#243d2c] leading-relaxed italic mb-6">
                                            "{item.quote}"
                                        </p>
                                    </div>

                                    {/* Author Profile */}
                                    <div className="flex items-center gap-3 pt-4 border-t border-[#edf2ee]">
                                        <img
                                            src={item.avatar}
                                            alt={item.name}
                                            className="w-11 h-11 rounded-full object-cover border-2 border-[#b7e4c7] p-0.5"
                                        />
                                        <div>
                                            <h4 className="text-sm font-bold text-[#14281a] font-['Outfit',sans-serif]">
                                                {item.name}
                                            </h4>
                                            <p className="text-[11px] text-[#526b58]">
                                                {item.role}
                                            </p>
                                        </div>
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
