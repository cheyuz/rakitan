import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CtaComponent = ({ props = {} }) => {
    const {
        title = 'Siap Merakit Website Generasi Berikutnya?',
        description = 'Bergabunglah sekarang, kelola halaman Anda dengan efisiensi tak tertandingi menggunakan blok modular.',
        primaryButtonText = 'Mulai Sekarang',
        primaryButtonUrl = '#',
        secondaryButtonText = 'Dokumentasi',
        secondaryButtonUrl = '#',
        variant = 'gradient',
    } = props;

    if (variant === 'boxed') {
        return (
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 transition-colors duration-200">
                <div className="max-w-5xl mx-auto rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 shadow-xl relative overflow-hidden">
                    <div className="relative z-10 max-w-3xl text-center mx-auto">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                            {title}
                        </h2>
                        {description && (
                            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-8">
                                {description}
                            </p>
                        )}
                        <div className="flex flex-wrap justify-center items-center gap-4">
                            {primaryButtonText && (
                                <a
                                    href={primaryButtonUrl || '#'}
                                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/25 transition-all"
                                >
                                    <span>{primaryButtonText}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            )}
                            {secondaryButtonText && (
                                <a
                                    href={secondaryButtonUrl || '#'}
                                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                                >
                                    <span>{secondaryButtonText}</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (variant === 'minimal') {
        return (
            <section className="py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center transition-colors">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
                        {title}
                    </h2>
                    {description && (
                        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-8">
                            {description}
                        </p>
                    )}
                    <div className="flex flex-wrap justify-center items-center gap-4">
                        {primaryButtonText && (
                            <a
                                href={primaryButtonUrl || '#'}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-all"
                            >
                                <span>{primaryButtonText}</span>
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        )}
                        {secondaryButtonText && (
                            <a
                                href={secondaryButtonUrl || '#'}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white underline underline-offset-4"
                            >
                                <span>{secondaryButtonText}</span>
                            </a>
                        )}
                    </div>
                </div>
            </section>
        );
    }

    // Default: 'gradient'
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-indigo-950 pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 mb-6">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Langkah Selanjutnya</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                    {title}
                </h2>
                {description && (
                    <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                        {description}
                    </p>
                )}
                <div className="flex flex-wrap justify-center items-center gap-4">
                    {primaryButtonText && (
                        <a
                            href={primaryButtonUrl || '#'}
                            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm text-slate-950 bg-white hover:bg-slate-100 shadow-xl shadow-white/10 active:scale-95 transition-all"
                        >
                            <span>{primaryButtonText}</span>
                            <ArrowRight className="w-4 h-4 text-slate-950" />
                        </a>
                    )}
                    {secondaryButtonText && (
                        <a
                            href={secondaryButtonUrl || '#'}
                            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm border border-white/20 text-white hover:bg-white/10 active:scale-95 transition-all"
                        >
                            <span>{secondaryButtonText}</span>
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
};

export const CtaSettings = ({ props, updateProps }) => {
    return (
        <div className="space-y-4 text-xs">
            <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Judul Ajakan (Headline)</label>
                <textarea
                    rows={2}
                    value={props.title || ''}
                    onChange={(e) => updateProps({ title: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
            </div>

            <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Deskripsi Pendukung</label>
                <textarea
                    rows={3}
                    value={props.description || ''}
                    onChange={(e) => updateProps({ description: e.target.value })}
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
                        placeholder="Teks"
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none mb-1.5"
                    />
                    <input
                        type="text"
                        value={props.primaryButtonUrl || ''}
                        onChange={(e) => updateProps({ primaryButtonUrl: e.target.value })}
                        placeholder="URL"
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Tombol Sekunder</label>
                    <input
                        type="text"
                        value={props.secondaryButtonText || ''}
                        onChange={(e) => updateProps({ secondaryButtonText: e.target.value })}
                        placeholder="Teks"
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none mb-1.5"
                    />
                    <input
                        type="text"
                        value={props.secondaryButtonUrl || ''}
                        onChange={(e) => updateProps({ secondaryButtonUrl: e.target.value })}
                        placeholder="URL"
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>
            </div>

            <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Pilihan Varian Desain</label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    {[
                        { id: 'gradient', label: 'Gradient' },
                        { id: 'boxed', label: 'Boxed Card' },
                        { id: 'minimal', label: 'Minimalist' },
                    ].map((v) => (
                        <button
                            key={v.id}
                            type="button"
                            onClick={() => updateProps({ variant: v.id })}
                            className={`py-1.5 rounded text-xs font-semibold transition-all ${
                                (props.variant || 'gradient') === v.id
                                    ? 'bg-indigo-600 text-white shadow-sm'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                        >
                            {v.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
