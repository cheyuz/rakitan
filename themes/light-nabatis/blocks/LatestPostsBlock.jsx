import React from 'react';
import { Calendar, User, ArrowRight, BookOpen, Leaf, Sparkles } from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import SubComponentSlot from '@/Blocks/SubComponents/SubComponentSlot';
import DefaultElementWrapper from '@/Blocks/Components/DefaultElementWrapper';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

export default function LatestPostsBlock({ props = {}, blockId }) {
    const {
        badgeText = 'Jurnal & Artikel Terbaru',
        title = 'Wawasan & Inspirasi Pola Hidup Sehat Nabati',
        subtitle = 'Kumpulan tips gizi, resep olahan nabati praktis, dan riset medis terbaru untuk kesehatan Anda.',
        padding = 'lg',
        posts = [
            {
                id: '1',
                title: '5 Manfaat Menakjubkan Memulai Pagi dengan Susu Oat Dingin',
                excerpt: 'Kandungan beta-glukan pada oat terbukti efektif menstabilkan kadar gula darah dan memberikan rasa kenyang lebih lama.',
                image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
                date: '14 Sep 2026',
                author: 'Tim Ahli Gizi',
                category: 'Nutrisi Sehat',
            },
            {
                id: '2',
                title: 'Resep Smoothie Hijau Matcha & Bayam Organik Kaya Antioksidan',
                excerpt: 'Racikan segar 5 menit yang kaya klorofil untuk mendetoksifikasi tubuh dan memulihkan energi setelah beraktivitas padat.',
                image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=600&q=80',
                date: '11 Sep 2026',
                author: 'Chef Nabatis',
                category: 'Resep Herbal',
            },
            {
                id: '3',
                title: 'Bagaimana Pola Konsumsi Nabati Mendukung Kelestarian Bumi',
                excerpt: 'Langkah sederhana memilih makanan nabatis dapat menghemat ratusan liter air bersih dan menekan emisi gas rumah kaca harian.',
                image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
                date: '08 Sep 2026',
                author: 'Eco Specialist',
                category: 'Gaya Hidup Hijau',
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

    const paddingClasses = {
        sm: 'py-12 md:py-16',
        md: 'py-16 md:py-20',
        lg: 'py-20 md:py-28',
    }[padding] || 'py-20 md:py-28';

    return (
        <section className={`relative overflow-hidden bg-[#f4f7f4] text-[#182a1d] ${paddingClasses}`}>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {isCustom ? (
                    <div className="w-full">
                        <SubComponentSlot
                            blockId={blockId}
                            subComponents={subComponents}
                            emptyPlaceholder="+ Tambahkan Sub-Komponen ke Blok Artikel Light Nabatis"
                        />
                    </div>
                ) : (
                    <>
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            {(badgeText || isEditing) && (
                                <DefaultElementWrapper
                                    blockId={blockId}
                                    elementKey="badgeText"
                                    label="Badge"
                                    isCustom={isCustom}
                                >
                                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#ffffff] text-[#2d6a4f] border border-[#b7e4c7] mb-4 shadow-sm">
                                        <BookOpen className="w-3.5 h-3.5 text-[#52b788]" />
                                        <InlineText
                                            value={badgeText}
                                            onChange={(val) => handlePropChange('badgeText', val)}
                                            placeholder="Articles Badge"
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
                                        placeholder="Articles Title"
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
                                        placeholder="Articles Subtitle"
                                        as="span"
                                    />
                                </p>
                            </DefaultElementWrapper>
                        </div>

                        {/* Articles Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {posts.map((post, idx) => (
                                <article
                                    key={post.id || idx}
                                    className="group relative flex flex-col rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg bg-white border border-[#dce8dd] shadow-sm hover:shadow-xl hover:shadow-[#2d6a4f]/10 transition-all duration-300 overflow-hidden hover:-translate-y-1.5"
                                >
                                    {/* Image with Category Strip Tag */}
                                    <div className="relative aspect-video overflow-hidden bg-[#eef3ee]">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {post.category && (
                                            <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold bg-[#ffffff]/90 backdrop-blur-md text-[#2d6a4f] border border-[#b7e4c7] shadow-sm">
                                                {post.category}
                                            </span>
                                        )}
                                        {/* Multi-Color Strip Under Image */}
                                        <div
                                            style={{ height: '3.5px', background: 'linear-gradient(90deg, #2d6a4f 0%, #52b788 50%, #d4a373 100%)' }}
                                            className="absolute bottom-0 left-0 right-0 z-10"
                                        />
                                    </div>

                                    <div className="p-6 flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-3 text-[11px] text-[#526b58] mb-3">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3 text-[#52b788]" />
                                                    {post.date}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <User className="w-3 h-3 text-[#52b788]" />
                                                    {post.author}
                                                </span>
                                            </div>

                                            <h3 className="text-base font-bold text-[#14281a] mb-2 leading-snug font-['Outfit',sans-serif] group-hover:text-[#2d6a4f] transition-colors">
                                                {post.title}
                                            </h3>

                                            <p className="text-xs text-[#4a6351] leading-relaxed line-clamp-2 mb-4 font-normal">
                                                {post.excerpt}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-[#edf2ee] flex items-center justify-between text-xs font-bold text-[#2d6a4f]">
                                            <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                                                Baca Selengkapnya
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </span>
                                            <Leaf className="w-4 h-4 text-[#74c69d] opacity-50 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
