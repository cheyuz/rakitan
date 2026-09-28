import React from 'react';
import { Leaf, Image as ImageIcon } from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import SubComponentSlot from '@/Blocks/SubComponents/SubComponentSlot';
import DefaultElementWrapper from '@/Blocks/Components/DefaultElementWrapper';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

export default function GalleryBlock({ props = {}, blockId }) {
    const {
        title = 'Koleksi Visual & Portofolio Nabatis',
        subtitle = 'Dokumentasi visual proses kurasi bahan segar dan produk higienis alami kami',
        columns = 3,
        gap = 'md',
        images = [
            {
                url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
                caption: 'Bahan Baku Nabati Organik',
                alt: 'Bahan Baku Nabati Organik',
            },
            {
                url: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=800&q=80',
                caption: 'Formulasi Jus Dingin Segar',
                alt: 'Formulasi Jus Dingin Segar',
            },
            {
                url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
                caption: 'Kelestarian Ekosistem Hijau',
                alt: 'Kelestarian Ekosistem Hijau',
            },
        ],
        isCustom = false,
        subComponents = [],
    } = props;

    const { onUpdateBlockProp, isEditing } = useCanvasEdit();

    const handlePropChange = (key, val) => {
        if (onUpdateBlockProp && blockId) {
            onUpdateBlockProp(blockId, key, val);
        }
    };

    const handleImageCaptionChange = (idx, val) => {
        const updated = [...images];
        updated[idx] = { ...updated[idx], caption: val };
        handlePropChange('images', updated);
    };

    const colClasses = {
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
    }[columns] || 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

    const gapClasses = {
        sm: 'gap-4',
        md: 'gap-6',
        lg: 'gap-8',
    }[gap] || 'gap-6';

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#ffffff] text-[#182a1d] transition-colors duration-200">
            <div className="max-w-7xl mx-auto">
                {isCustom ? (
                    <div className="w-full">
                        <SubComponentSlot
                            blockId={blockId}
                            subComponents={subComponents}
                            emptyPlaceholder="+ Tambahkan Sub-Komponen ke Blok Galeri Light Nabatis"
                        />
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#edf7ef] text-[#2d6a4f] border border-[#b7e4c7] mb-4 shadow-sm">
                                <Leaf className="w-3.5 h-3.5 text-[#52b788]" />
                                <span>Galeri Visual Nabatis</span>
                            </div>

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
                                        placeholder="Judul Galeri"
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
                                        placeholder="Deskripsi galeri..."
                                        as="span"
                                    />
                                </p>
                            </DefaultElementWrapper>
                        </div>

                        {/* Gallery Grid */}
                        <div className={`grid ${colClasses} ${gapClasses}`}>
                            {images.map((img, idx) => (
                                <div
                                    key={idx}
                                    className="group relative flex flex-col rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg bg-[#f7faf7] border border-[#dce8dd] shadow-sm hover:shadow-xl hover:shadow-[#2d6a4f]/10 transition-all duration-300 overflow-hidden hover:-translate-y-1.5"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden bg-[#eef3ee]">
                                        <img
                                            src={img.url}
                                            alt={img.alt || img.caption || 'Foto Galeri'}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* Multi-Color Strip Under Image */}
                                        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2d6a4f] via-[#52b788] to-[#d4a373]" />
                                    </div>

                                    {(img.caption || isEditing) && (
                                        <div className="p-4 bg-white border-t border-[#edf2ee]">
                                            <p className="text-xs font-semibold text-[#182a1d] text-center line-clamp-1 font-['Outfit',sans-serif]">
                                                <InlineText
                                                    value={img.caption}
                                                    onChange={(val) => handleImageCaptionChange(idx, val)}
                                                    placeholder="Keterangan gambar..."
                                                />
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
