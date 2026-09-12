import React from 'react';
import { AlignLeft, AlignCenter, AlignRight, Sparkles, ArrowRight } from 'lucide-react';

export const HeroComponent = ({ props = {} }) => {
    const {
        badgeText = 'CMS Visual Modular Masa Depan',
        title = 'Rancang Web Impian Seperti Menyusun Puzzle',
        subtitle = 'Rakitan CMS memberikan kebebasan berkarya tanpa batas dengan arsitektur blok modular independen.',
        primaryButtonText = 'Mulai Sekarang',
        primaryButtonUrl = '#',
        secondaryButtonText = 'Pelajari Selengkapnya',
        secondaryButtonUrl = '#',
        alignment = 'center',
        bgStyle = 'gradient',
        imageUrl = '',
        padding = 'lg',
    } = props;

    const alignClasses = {
        left: 'text-left items-start',
        center: 'text-center items-center mx-auto',
        right: 'text-right items-end ml-auto',
    }[alignment] || 'text-center items-center mx-auto';

    const paddingClasses = {
        sm: 'py-12 md:py-16',
        md: 'py-20 md:py-24',
        lg: 'py-24 md:py-32',
    }[padding] || 'py-24 md:py-32';

    const bgStyles = {
        gradient: 'bg-gradient-to-b from-indigo-950/40 via-slate-900 to-slate-950 text-white',
        dark: 'bg-slate-900 text-slate-100',
        light: 'bg-slate-50 text-slate-900',
        image: 'relative text-white bg-slate-950',
    }[bgStyle] || 'bg-gradient-to-b from-indigo-950/40 via-slate-900 to-slate-950 text-white';

    return (
        <section className={`relative overflow-hidden transition-colors duration-300 ${bgStyles} ${paddingClasses}`}>
            {bgStyle === 'image' && imageUrl && (
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                />
            )}

            {/* Ambient Lighting Orbs for modern aesthetics */}
            {bgStyle === 'gradient' && (
                <>
                    <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
                    <div className="pointer-events-none absolute top-1/3 left-10 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl" />
                </>
            )}

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex flex-col ${alignClasses} max-w-3xl`}>
                    {badgeText && (
                        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6 backdrop-blur-sm shadow-sm">
                            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                            <span>{badgeText}</span>
                        </div>
                    )}

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6">
                        {title}
                    </h1>

                    {subtitle && (
                        <p className={`text-lg sm:text-xl font-normal leading-relaxed mb-10 ${bgStyle === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                            {subtitle}
                        </p>
                    )}

                    <div className="flex flex-wrap items-center gap-4">
                        {primaryButtonText && (
                            <a
                                href={primaryButtonUrl || '#'}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 shadow-lg shadow-indigo-600/25 transition-all duration-200"
                            >
                                <span>{primaryButtonText}</span>
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        )}

                        {secondaryButtonText && (
                            <a
                                href={secondaryButtonUrl || '#'}
                                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 border active:scale-95 ${
                                    bgStyle === 'light'
                                        ? 'border-slate-300 text-slate-700 hover:bg-slate-100'
                                        : 'border-white/20 text-white hover:bg-white/10'
                                }`}
                            >
                                <span>{secondaryButtonText}</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export const HeroSettings = ({ props, updateProps }) => {
    return (
        <div className="space-y-4 text-xs">
            <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Badge Teks</label>
                <input
                    type="text"
                    value={props.badgeText || ''}
                    onChange={(e) => updateProps({ badgeText: e.target.value })}
                    placeholder="Contoh: ✨ Rilis Versi 1.0"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
            </div>

            <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Judul Utama (Headline)</label>
                <textarea
                    rows={2}
                    value={props.title || ''}
                    onChange={(e) => updateProps({ title: e.target.value })}
                    placeholder="Judul Hero Section..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
            </div>

            <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Subjudul (Deskripsi)</label>
                <textarea
                    rows={3}
                    value={props.subtitle || ''}
                    onChange={(e) => updateProps({ subtitle: e.target.value })}
                    placeholder="Deskripsi pendukung..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Tombol Utama</label>
                    <input
                        type="text"
                        value={props.primaryButtonText || ''}
                        onChange={(e) => updateProps({ primaryButtonText: e.target.value })}
                        placeholder="Teks Tombol"
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none mb-1.5"
                    />
                    <input
                        type="text"
                        value={props.primaryButtonUrl || ''}
                        onChange={(e) => updateProps({ primaryButtonUrl: e.target.value })}
                        placeholder="URL (mis: /login)"
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Tombol Sekunder</label>
                    <input
                        type="text"
                        value={props.secondaryButtonText || ''}
                        onChange={(e) => updateProps({ secondaryButtonText: e.target.value })}
                        placeholder="Teks Tombol"
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none mb-1.5"
                    />
                    <input
                        type="text"
                        value={props.secondaryButtonUrl || ''}
                        onChange={(e) => updateProps({ secondaryButtonUrl: e.target.value })}
                        placeholder="URL (mis: /about)"
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1.5">Perataan Konten</label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    {[
                        { id: 'left', label: 'Kiri', icon: AlignLeft },
                        { id: 'center', label: 'Tengah', icon: AlignCenter },
                        { id: 'right', label: 'Kanan', icon: AlignRight },
                    ].map((align) => {
                        const Icon = align.icon;
                        const isSelected = (props.alignment || 'center') === align.id;
                        return (
                            <button
                                key={align.id}
                                type="button"
                                onClick={() => updateProps({ alignment: align.id })}
                                className={`flex items-center justify-center gap-1 py-1.5 rounded text-xs font-medium transition-all ${
                                    isSelected
                                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                                }`}
                            >
                                <Icon className="w-3.5 h-3.5" />
                                <span>{align.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Gaya Latar Belakang</label>
                <select
                    value={props.bgStyle || 'gradient'}
                    onChange={(e) => updateProps({ bgStyle: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                    <option value="gradient">Gradient Modern (Gelap)</option>
                    <option value="dark">Solid Dark Slate</option>
                    <option value="light">Solid Light (Putih Bersih)</option>
                    <option value="image">Gambar Background</option>
                </select>
            </div>

            {props.bgStyle === 'image' && (
                <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">URL Gambar Background</label>
                    <input
                        type="url"
                        value={props.imageUrl || ''}
                        onChange={(e) => updateProps({ imageUrl: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>
            )}

            <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Jarak Padding</label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    {['sm', 'md', 'lg'].map((pad) => (
                        <button
                            key={pad}
                            type="button"
                            onClick={() => updateProps({ padding: pad })}
                            className={`py-1 rounded text-xs uppercase font-medium transition-all ${
                                (props.padding || 'lg') === pad
                                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                            }`}
                        >
                            {pad}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
