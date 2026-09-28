import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Leaf } from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import SubComponentSlot from '@/Blocks/SubComponents/SubComponentSlot';
import DefaultElementWrapper from '@/Blocks/Components/DefaultElementWrapper';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

export default function FaqBlock({ props = {}, blockId }) {
    const {
        badgeText = 'Pertanyaan Umum',
        title = 'Hal yang Sering Ditanyakan Seputar Nabatis',
        subtitle = 'Temukan jawaban lengkap terkait proses pengolahan, cara penyimpanan, dan manfaat pola makan nabati.',
        padding = 'lg',
        items = [
            {
                question: 'Apakah produk Nabatis aman dikonsumsi setiap hari?',
                answer: 'Sangat aman. Seluruh produk kami dibuat dari bahan organik murni tanpa bahan pengawet sintesis, pemanis buatan, atau zat pewarna kimia.',
            },
            {
                question: 'Bagaimana cara menjaga kesegaran produk setelah dibuka?',
                answer: 'Simpan di dalam lemari pendingin (kulkas) pada suhu 2°C - 4°C dan konsumsi dalam waktu 3-4 hari untuk mendapatkan kualitas rasa dan nutrisi terbaik.',
            },
            {
                question: 'Apakah kemasan Nabatis benar-benar ramah lingkungan?',
                answer: 'Ya, seluruh botol dan pouch kami menggunakan material bersertifikasi biodegradable dan dapat didaur ulang hingga 100%.',
            },
            {
                question: 'Bagaimana sistem langganan mingguan dan bulanan?',
                answer: 'Anda dapat mengatur jadwal pengiriman berkala secara otomatis via dashboard, serta mengubah varian rasa atau menjeda langganan kapan saja tanpa biaya penalti.',
            },
        ],
        subComponents = [],
        isCustom = false,
    } = props;

    const { onUpdateBlockProp, isEditing } = useCanvasEdit();
    const [openIndex, setOpenIndex] = useState(0);

    const handlePropChange = (key, val) => {
        if (onUpdateBlockProp && blockId) {
            onUpdateBlockProp(blockId, key, val);
        }
    };

    const handleItemChange = (idx, field, val) => {
        const updated = [...items];
        updated[idx] = { ...updated[idx], [field]: val };
        handlePropChange('items', updated);
    };

    const paddingClasses = {
        sm: 'py-12 md:py-16',
        md: 'py-16 md:py-20',
        lg: 'py-20 md:py-28',
    }[padding] || 'py-20 md:py-28';

    return (
        <section className={`relative overflow-hidden bg-[#f4f7f4] text-[#182a1d] ${paddingClasses}`}>
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {isCustom ? (
                    <div className="w-full">
                        <SubComponentSlot
                            blockId={blockId}
                            subComponents={subComponents}
                            emptyPlaceholder="+ Tambahkan Sub-Komponen ke Blok FAQ Light Nabatis"
                        />
                    </div>
                ) : (
                    <>
                        <div className="text-center max-w-2xl mx-auto mb-14">
                            {(badgeText || isEditing) && (
                                <DefaultElementWrapper
                                    blockId={blockId}
                                    elementKey="badgeText"
                                    label="Badge"
                                    isCustom={isCustom}
                                >
                                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#ffffff] text-[#2d6a4f] border border-[#b7e4c7] mb-4 shadow-sm">
                                        <HelpCircle className="w-3.5 h-3.5 text-[#52b788]" />
                                        <InlineText
                                            value={badgeText}
                                            onChange={(val) => handlePropChange('badgeText', val)}
                                            placeholder="FAQ Badge"
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
                                        placeholder="FAQ Title"
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
                                        placeholder="FAQ Subtitle"
                                        as="span"
                                    />
                                </p>
                            </DefaultElementWrapper>
                        </div>

                        {/* Accordion List with Left Strip Accents */}
                        <div className="space-y-4">
                            {items.map((item, idx) => {
                                const isOpen = openIndex === idx;
                                return (
                                    <div
                                        key={idx}
                                        className={`rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-white border transition-all duration-200 overflow-hidden ${
                                            isOpen
                                                ? 'border-[#52b788] shadow-md shadow-[#2d6a4f]/10 border-l-4 border-l-[#2d6a4f]'
                                                : 'border-[#dce8dd] hover:border-[#b7e4c7]'
                                        }`}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                                            className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#14281a] font-['Outfit',sans-serif]"
                                        >
                                            <span className="flex items-center gap-3">
                                                <Leaf className={`w-4 h-4 transition-colors ${isOpen ? 'text-[#2d6a4f]' : 'text-[#a3b8a7]'}`} />
                                                <InlineText
                                                    value={item.question}
                                                    onChange={(val) => handleItemChange(idx, 'question', val)}
                                                    placeholder="Pertanyaan FAQ..."
                                                />
                                            </span>
                                            <ChevronDown className={`w-4 h-4 text-[#52b788] transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {isOpen && (
                                            <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#4a6351] leading-relaxed border-t border-[#edf2ee]">
                                                <InlineText
                                                    value={item.answer}
                                                    onChange={(val) => handleItemChange(idx, 'answer', val)}
                                                    placeholder="Jawaban penjelasan FAQ..."
                                                    as="span"
                                                />
                                            </div>
                                        )}
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
