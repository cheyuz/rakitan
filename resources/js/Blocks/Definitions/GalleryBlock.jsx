import React from 'react';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import SubComponentSlot from '@/Blocks/SubComponents/SubComponentSlot';
import DefaultElementWrapper from '@/Blocks/Components/DefaultElementWrapper';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

export const GalleryComponent = ({ props = {}, blockId }) => {
    const {
        title = 'Media Showcase & Gallery',
        subtitle = 'A visual documentation of product interfaces and creative assets',
        columns = 3,
        gap = 'md',
        images = [
            {
                url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
                caption: 'Visual Page Builder Interface',
                alt: 'Page Builder Interface',
            },
            {
                url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
                caption: 'Analytics & Performance Metrics',
                alt: 'Analytics Dashboard',
            },
            {
                url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
                caption: 'Modular React Components',
                alt: 'Developer Code View',
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-100 transition-colors duration-200">
            <div className="max-w-7xl mx-auto">
                {isCustom ? (
                    <div className="w-full">
                        <SubComponentSlot
                            blockId={blockId}
                            subComponents={subComponents}
                            emptyPlaceholder="+ Tambahkan Sub-Komponen ke Blok Galeri Ini"
                        />
                    </div>
                ) : (
                    <>
                        {(title || subtitle || isEditing) && (
                            <div className="text-center max-w-2xl mx-auto mb-12">
                                {(title || isEditing) && (
                                    <DefaultElementWrapper
                                        blockId={blockId}
                                        elementKey="title"
                                        label="Headline"
                                        isCustom={isCustom}
                                    >
                                        <h2 className="text-3xl font-extrabold text-white tracking-tight mb-3">
                                            <InlineText
                                                value={title}
                                                onChange={(val) => handlePropChange('title', val)}
                                                placeholder="Gallery Title"
                                            />
                                        </h2>
                                    </DefaultElementWrapper>
                                )}
                                {(subtitle || isEditing) && (
                                    <DefaultElementWrapper
                                        blockId={blockId}
                                        elementKey="subtitle"
                                        label="Subtitle"
                                        isCustom={isCustom}
                                    >
                                        <p className="text-base text-slate-400">
                                            <InlineText
                                                value={subtitle}
                                                onChange={(val) => handlePropChange('subtitle', val)}
                                                placeholder="Gallery Subtitle"
                                            />
                                        </p>
                                    </DefaultElementWrapper>
                                )}
                            </div>
                        )}

                        <DefaultElementWrapper
                            blockId={blockId}
                            elementKey="images"
                            label="Gallery Images"
                            isCustom={isCustom}
                        >
                            <div className={`grid ${colClasses} ${gapClasses}`}>
                                {images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className="group relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-sm aspect-[4/3]"
                                    >
                                        <img
                                            src={img.url}
                                            alt={img.alt || img.caption || `Gallery image ${idx + 1}`}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                        {img.caption && (
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                                                <p className="text-white text-sm font-medium leading-snug">
                                                    {img.caption}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </DefaultElementWrapper>
                    </>
                )}
            </div>
        </section>
    );
};

export const GallerySettings = ({ props, updateProps }) => {
    const images = props.images || [];

    const handleUpdateImage = (index, updatedField) => {
        const newImages = [...images];
        newImages[index] = { ...newImages[index], ...updatedField };
        updateProps({ images: newImages });
    };

    const handleAddImage = () => {
        const newImages = [
            ...images,
            {
                url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
                caption: 'New Image Caption',
                alt: 'Image description',
            },
        ];
        updateProps({ images: newImages });
    };

    const handleRemoveImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        updateProps({ images: newImages });
    };

    return (
        <div className="space-y-4 text-xs">
            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Gallery Title</label>
                <input
                    type="text"
                    value={props.title || ''}
                    onChange={(e) => updateProps({ title: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
            </div>

            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Subtitle</label>
                <input
                    type="text"
                    value={props.subtitle || ''}
                    onChange={(e) => updateProps({ subtitle: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
                <div>
                    <label className="block font-semibold text-slate-300 mb-1.5">Columns</label>
                    <select
                        value={props.columns || 3}
                        onChange={(e) => updateProps({ columns: Number(e.target.value) })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    >
                        <option value={2}>2 Columns</option>
                        <option value={3}>3 Columns</option>
                        <option value={4}>4 Columns</option>
                    </select>
                </div>
                <div>
                    <label className="block font-semibold text-slate-300 mb-1.5">Item Spacing (Gap)</label>
                    <select
                        value={props.gap || 'md'}
                        onChange={(e) => updateProps({ gap: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    >
                        <option value="sm">Small (sm)</option>
                        <option value="md">Medium (md)</option>
                        <option value="lg">Large (lg)</option>
                    </select>
                </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-white">Images List ({images.length})</span>
                    <button
                        type="button"
                        onClick={handleAddImage}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-600/20 text-indigo-400 font-semibold hover:bg-indigo-600 hover:text-white transition-all"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Image</span>
                    </button>
                </div>

                <div className="space-y-3">
                    {images.map((img, idx) => (
                        <div
                            key={idx}
                            className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 space-y-2.5 relative"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-[11px] text-slate-400">Photo #{idx + 1}</span>
                                {images.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(idx)}
                                        className="text-red-400 hover:text-red-300 p-1"
                                        title="Remove Photo"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>

                            <div>
                                <label className="block text-[11px] font-medium text-slate-400 mb-1">Image URL</label>
                                <input
                                    type="url"
                                    value={img.url || ''}
                                    onChange={(e) => handleUpdateImage(idx, { url: e.target.value })}
                                    placeholder="https://..."
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-slate-900 border border-slate-700/80 text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-medium text-slate-400 mb-1">Caption</label>
                                <input
                                    type="text"
                                    value={img.caption || ''}
                                    onChange={(e) => handleUpdateImage(idx, { caption: e.target.value })}
                                    placeholder="Brief caption..."
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-slate-900 border border-slate-700/80 text-white"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
