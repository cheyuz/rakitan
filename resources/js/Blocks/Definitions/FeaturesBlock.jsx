import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Plus, Trash2, Layers, Sparkles } from 'lucide-react';

// Icon dynamic helper
const DynamicIcon = ({ name, className = 'w-6 h-6' }) => {
    const IconComponent = LucideIcons[name] || LucideIcons.Sparkles;
    return <IconComponent className={className} />;
};

export const FeaturesComponent = ({ props = {} }) => {
    const {
        badge = 'FITUR UNGGULAN',
        title = 'Solusi Lengkap untuk Website Modern',
        subtitle = 'Dirancang untuk memberikan fleksibilitas tanpa batas dengan performa yang tak tertandingi.',
        columns = 3,
        items = [
            {
                icon: 'Layers',
                title: 'Arsitektur Puzzle Modular',
                description: 'Setiap komponen terisolasi mandiri, memudahkan penataan dan perawatan tata letak.',
                badge: 'Inti',
            },
            {
                icon: 'Zap',
                title: 'Performa Super Cepat',
                description: 'Kombinasi Laravel 11 dan Inertia.js React tanpa overhead frontend yang berat.',
                badge: 'Kilat',
            },
            {
                icon: 'ShieldCheck',
                title: 'Keamanan Tingkat Tinggi',
                description: 'Sistem otentikasi andal dan sanitasi input menyeluruh di setiap lapisan aplikasi.',
                badge: 'Aman',
            },
        ],
    } = props;

    const colClasses = {
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    }[columns] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    {badge && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 mb-4">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{badge}</span>
                        </div>
                    )}
                    {title && (
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                            {title}
                        </h2>
                    )}
                    {subtitle && (
                        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Grid of Items */}
                <div className={`grid gap-8 ${colClasses}`}>
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="group relative flex flex-col p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-500/30 transition-all duration-300"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                    <DynamicIcon name={item.icon} className="w-6 h-6" />
                                </div>
                                {item.badge && (
                                    <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                        {item.badge}
                                    </span>
                                )}
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {item.title}
                            </h3>

                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-grow">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export const FeaturesSettings = ({ props, updateProps }) => {
    const items = props.items || [];

    const handleUpdateItem = (index, updatedField) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], ...updatedField };
        updateProps({ items: newItems });
    };

    const handleAddItem = () => {
        const newItems = [
            ...items,
            {
                icon: 'Sparkles',
                title: 'Fitur Baru',
                description: 'Deskripsi singkat mengenai manfaat fitur ini bagi pengguna.',
                badge: 'Baru',
            },
        ];
        updateProps({ items: newItems });
    };

    const handleRemoveItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        updateProps({ items: newItems });
    };

    return (
        <div className="space-y-4 text-xs">
            <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Badge Atas</label>
                <input
                    type="text"
                    value={props.badge || ''}
                    onChange={(e) => updateProps({ badge: e.target.value })}
                    placeholder="Contoh: KEUNGGULAN"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
            </div>

            <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Judul Bagian</label>
                <input
                    type="text"
                    value={props.title || ''}
                    onChange={(e) => updateProps({ title: e.target.value })}
                    placeholder="Judul seksi fitur..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
            </div>

            <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Subjudul / Deskripsi</label>
                <textarea
                    rows={2}
                    value={props.subtitle || ''}
                    onChange={(e) => updateProps({ subtitle: e.target.value })}
                    placeholder="Deskripsi singkat..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
            </div>

            <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Jumlah Kolom Grid</label>
                <div className="grid grid-cols-3 gap-2">
                    {[2, 3, 4].map((col) => (
                        <button
                            key={col}
                            type="button"
                            onClick={() => updateProps({ columns: col })}
                            className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                (props.columns || 3) === col
                                    ? 'bg-indigo-600 text-white shadow-sm'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                            }`}
                        >
                            {col} Kolom
                        </button>
                    ))}
                </div>
            </div>

            {/* Item Editor List */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Daftar Item Fitur ({items.length})</span>
                    <button
                        type="button"
                        onClick={handleAddItem}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-medium hover:bg-indigo-100 transition-colors"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tambah</span>
                    </button>
                </div>

                <div className="space-y-3">
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 relative space-y-2"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-[11px] text-slate-500">Item #{idx + 1}</span>
                                {items.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveItem(idx)}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                        title="Hapus Item"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-[11px] text-slate-500">Nama Icon (Lucide)</label>
                                    <input
                                        type="text"
                                        value={item.icon || 'Sparkles'}
                                        onChange={(e) => handleUpdateItem(idx, { icon: e.target.value })}
                                        placeholder="Layers, Zap, ShieldCheck..."
                                        className="w-full px-2 py-1 text-xs rounded border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] text-slate-500">Badge Label</label>
                                    <input
                                        type="text"
                                        value={item.badge || ''}
                                        onChange={(e) => handleUpdateItem(idx, { badge: e.target.value })}
                                        placeholder="Modular"
                                        className="w-full px-2 py-1 text-xs rounded border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] text-slate-500">Judul Item</label>
                                <input
                                    type="text"
                                    value={item.title || ''}
                                    onChange={(e) => handleUpdateItem(idx, { title: e.target.value })}
                                    className="w-full px-2 py-1 text-xs rounded border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white font-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] text-slate-500">Deskripsi</label>
                                <textarea
                                    rows={2}
                                    value={item.description || ''}
                                    onChange={(e) => handleUpdateItem(idx, { description: e.target.value })}
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
