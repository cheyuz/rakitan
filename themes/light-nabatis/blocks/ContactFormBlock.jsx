import React, { useState } from 'react';
import { Send, Mail, User, MessageSquare, CheckCircle2, Sprout } from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import SubComponentSlot from '@/Blocks/SubComponents/SubComponentSlot';
import DefaultElementWrapper from '@/Blocks/Components/DefaultElementWrapper';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

export default function ContactFormBlock({ props = {}, blockId }) {
    const {
        badgeText = 'Hubungi Tim Nabatis',
        title = 'Mari Berdiskusi Mengenai Pola Hidup Nabati Anda',
        subtitle = 'Punya pertanyaan seputar produk, kemitraan, atau konsultasi gizi? Kirimkan pesan Anda kepada kami.',
        buttonText = 'Kirim Pesan Sekarang',
        padding = 'lg',
        subComponents = [],
        isCustom = false,
    } = props;

    const { onUpdateBlockProp, isEditing } = useCanvasEdit();
    const [submitted, setSubmitted] = useState(false);

    const handlePropChange = (key, val) => {
        if (onUpdateBlockProp && blockId) {
            onUpdateBlockProp(blockId, key, val);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
    };

    const paddingClasses = {
        sm: 'py-12 md:py-16',
        md: 'py-16 md:py-20',
        lg: 'py-20 md:py-28',
    }[padding] || 'py-20 md:py-28';

    return (
        <section className={`relative overflow-hidden bg-[#ffffff] text-[#182a1d] ${paddingClasses}`}>
            <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {isCustom ? (
                    <div className="w-full">
                        <SubComponentSlot
                            blockId={blockId}
                            subComponents={subComponents}
                            emptyPlaceholder="+ Tambahkan Sub-Komponen ke Blok Kontak Light Nabatis"
                        />
                    </div>
                ) : (
                    <div className="relative rounded-3xl bg-white border border-[#dce8dd] shadow-xl shadow-[#2d6a4f]/5 overflow-hidden p-8 sm:p-12">
                        {/* Top Multi-Color Strip */}
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2d6a4f] via-[#52b788] via-[#b7e4c7] to-[#d4a373]" />

                        <div className="text-center max-w-xl mx-auto mb-10">
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
                                            placeholder="Contact Badge"
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
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14281a] tracking-tight mb-3 font-['Outfit',sans-serif]">
                                    <InlineText
                                        value={title}
                                        onChange={(val) => handlePropChange('title', val)}
                                        placeholder="Contact Title"
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
                                <p className="text-xs sm:text-sm text-[#4a6351] leading-relaxed">
                                    <InlineText
                                        value={subtitle}
                                        onChange={(val) => handlePropChange('subtitle', val)}
                                        placeholder="Contact Subtitle"
                                        as="span"
                                    />
                                </p>
                            </DefaultElementWrapper>
                        </div>

                        {submitted && (
                            <div className="mb-6 p-4 rounded-xl bg-[#edf7ef] border border-[#b7e4c7] text-[#2d6a4f] text-xs flex items-center gap-2 font-medium">
                                <CheckCircle2 className="w-4 h-4 text-[#40916c]" />
                                <span>Terima kasih! Pesan Anda telah kami terima dan tim Nabatis akan segera menghubungi Anda.</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#182a1d] mb-1.5">
                                        Nama Lengkap
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            required
                                            placeholder="Nama Anda"
                                            className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-[#f7faf7] border border-[#dce8dd] text-[#182a1d] outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent transition-all"
                                        />
                                        <User className="w-4 h-4 text-[#74c69d] absolute left-3 top-3" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-[#182a1d] mb-1.5">
                                        Alamat Email
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            required
                                            placeholder="email@domain.com"
                                            className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-[#f7faf7] border border-[#dce8dd] text-[#182a1d] outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent transition-all"
                                        />
                                        <Mail className="w-4 h-4 text-[#74c69d] absolute left-3 top-3" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-[#182a1d] mb-1.5">
                                    Pesan / Pertanyaan
                                </label>
                                <textarea
                                    rows={4}
                                    required
                                    placeholder="Tuliskan pertanyaan atau rencana program gizi Anda di sini..."
                                    className="w-full px-3 py-2.5 text-xs rounded-xl bg-[#f7faf7] border border-[#dce8dd] text-[#182a1d] outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent transition-all"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 px-6 rounded-tl-xl rounded-br-xl rounded-tr-md rounded-bl-md text-xs font-bold text-white bg-[#2d6a4f] hover:bg-[#1b4332] shadow-md shadow-[#2d6a4f]/20 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 border-t-2 border-[#74c69d]"
                            >
                                <InlineText
                                    value={buttonText}
                                    onChange={(val) => handlePropChange('buttonText', val)}
                                    placeholder="Kirim Pesan"
                                />
                                <Send className="w-3.5 h-3.5 text-[#b7e4c7]" />
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </section>
    );
}
