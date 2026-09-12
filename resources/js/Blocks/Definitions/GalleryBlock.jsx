import React from 'react';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';

export const GalleryComponent = ({ props = {} }) => {
    const {
        title = 'Galeri Media & Showcase',
        subtitle = 'Koleksi dokumentasi visual produk dan aktivitas',
        columns = 3,
        gap = 'md',
        images = [
            {
                url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
                caption: 'Visual Page Builder',
                alt: 'Page Builder Interface',
            },
            {
                url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
                caption: 'Analitik Konten',
                alt: 'Analytics Dashboard',
            },
            {
                url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
                caption: 'Kustomisasi Blok React',
                alt: 'Developer Code View',
            },
        ],
    } = props;

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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 transition-colors duration-200">
            <div className="max-w-7xl mx-auto">
                {(title || subtitle) && (
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        {title && (
                            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="text-base text-slate-600 dark:text-slate-400">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}

                <div className={`grid ${colClasses} ${gapClasses}`}>
                    {images.map((img, idx) => (
                        <div
                            key={idx}
                            className="group relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm aspect-[4/3]"
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
                caption: 'Foto Baru',
                alt: 'Deskripsi gambar',
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
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Judul Galeri</label>
                <input
                    type="text"
                    value={props.title || ''}
                    onChange={(e) => updateProps({ title: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
            </div>

            <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Subjudul</label>
                <input
                    type="text"
                    value={props.subtitle || ''}
                    onChange={(e) => updateProps({ subtitle: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Jumlah Kolom</label>
                    <select
                        value={props.columns || 3}
                        onChange={(e) => updateProps({ columns: Number(e.target.value) })}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                        <option value={2}>2 Kolom</option>
                        <option value={3}>3 Kolom</option>
                        <option value={4}>4 Kolom</option>
                    </select>
                </div>
                <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Jarak Antar Gambar (Gap)</label>
                    <select
                        value={props.gap || 'md'}
                        onChange={(e) => updateProps({ gap: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                        <option value="sm">Kecil (sm)</option>
                        <option value="md">Sedang (md)</option>
                        <option value="lg">Besar (lg)</option>
                    </select>
                </div>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Daftar Foto ({images.length})</span>
                    <button
                        type="button"
                        onClick={handleAddImage}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-medium hover:bg-indigo-100 transition-colors"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tambah Foto</span>
                    </button>
                </div>

                <div className="space-y-3">
                    {images.map((img, idx) => (
                        <div
                            key={idx}
                            className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2 relative"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-[11px] text-slate-500">Foto #{idx + 1}</span>
                                {images.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(idx)}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>

                            <div>
                                <label className="block text-[11px] text-slate-500">URL Gambar</label>
                                <input
                                    type="url"
                                    value={img.url || ''}
                                    onChange={(e) => handleUpdateImage(idx, { url: e.target.value })}
                                    placeholder="https://..."
                                    className="w-full px-2 py-1 text-xs rounded border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] text-slate-500">Caption / Deskripsi Singkat</label>
                                <input
                                    type="text"
                                    value={img.caption || ''}
                                    onChange={(e) => handleUpdateImage(idx, { caption: e.target.value })}
                                    className="w-full px-2 py-1 text-xs rounded border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
