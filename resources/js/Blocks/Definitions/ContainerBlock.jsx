import React from 'react';
import { LayoutGrid, Sparkles } from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import SubComponentSlot from '@/Blocks/SubComponents/SubComponentSlot';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

export const ContainerComponent = ({ props = {}, blockId }) => {
    const {
        badgeText = '',
        title = '',
        subtitle = '',
        columns = 1,
        layoutType = 'stack', // 'stack' | 'grid' | 'row'
        alignment = 'center', // 'left' | 'center' | 'right'
        bgStyle = 'transparent', // 'transparent' | 'dark' | 'glass' | 'gradient' | 'card'
        padding = 'md', // 'none' | 'sm' | 'md' | 'lg'
        subComponents = [],
    } = props;

    const { onUpdateBlockProp } = useCanvasEdit();

    const handlePropUpdate = (key, val) => {
        if (onUpdateBlockProp && blockId) {
            onUpdateBlockProp(blockId, key, val);
        }
    };

    const bgStyles = {
        transparent: 'bg-transparent text-slate-100',
        dark: 'bg-slate-900/80 text-slate-100 border-y border-slate-800',
        glass: 'bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl text-slate-100 my-4 shadow-2xl',
        gradient: 'bg-gradient-to-b from-indigo-950/30 via-slate-950 to-slate-950 text-white',
        card: 'bg-slate-900 border border-slate-800 rounded-3xl p-8 text-slate-100 shadow-xl my-4',
    }[bgStyle] || 'bg-transparent text-slate-100';

    const paddingClasses = {
        none: 'py-0',
        sm: 'py-8 px-4 sm:px-6',
        md: 'py-16 px-4 sm:px-6 lg:px-8',
        lg: 'py-24 px-4 sm:px-6 lg:px-8',
    }[padding] || 'py-16 px-4 sm:px-6 lg:px-8';

    const alignClasses = {
        left: 'text-left items-start',
        center: 'text-center items-center mx-auto',
        right: 'text-right items-end ml-auto',
    }[alignment] || 'text-center items-center mx-auto';

    const layoutGridClass = {
        1: 'grid grid-cols-1 gap-6',
        2: 'grid grid-cols-1 md:grid-cols-2 gap-6',
        3: 'grid grid-cols-1 md:grid-cols-3 gap-6',
        4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6',
    }[columns] || 'grid grid-cols-1 gap-6';

    const layoutContainerClass =
        layoutType === 'grid'
            ? layoutGridClass
            : layoutType === 'row'
            ? 'flex flex-wrap items-center gap-4'
            : 'flex flex-col space-y-4';

    return (
        <section className={`relative overflow-hidden transition-all duration-200 ${bgStyles} ${paddingClasses}`}>
            <div className="max-w-6xl mx-auto w-full">
                {/* Header Kontainer (Opsional) */}
                {(badgeText || title || subtitle) && (
                    <div className={`flex flex-col ${alignClasses} max-w-2xl mb-10`}>
                        {badgeText && (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
                                <Sparkles className="w-3.5 h-3.5" />
                                <InlineText
                                    value={badgeText}
                                    onChange={(val) => handlePropUpdate('badgeText', val)}
                                    placeholder="Badge"
                                />
                            </div>
                        )}

                        {title && (
                            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
                                <InlineText
                                    value={title}
                                    onChange={(val) => handlePropUpdate('title', val)}
                                    as="span"
                                    placeholder="Judul Kontainer"
                                />
                            </h2>
                        )}

                        {subtitle && (
                            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                                <InlineText
                                    value={subtitle}
                                    onChange={(val) => handlePropUpdate('subtitle', val)}
                                    as="span"
                                    placeholder="Deskripsi singkat kontainer..."
                                    multiline
                                />
                            </p>
                        )}
                    </div>
                )}

                {/* Slot Dynamic Sub-Components */}
                <div className={`w-full ${layoutContainerClass}`}>
                    <SubComponentSlot
                        blockId={blockId}
                        subComponents={subComponents}
                        emptyPlaceholder="Klik di sini untuk menyisipkan sub-komponen dinamis..."
                    />
                </div>
            </div>
        </section>
    );
};

export const ContainerSettings = ({ props = {}, updateProps }) => {
    const {
        badgeText = '',
        title = '',
        subtitle = '',
        columns = 1,
        layoutType = 'stack',
        alignment = 'center',
        bgStyle = 'transparent',
        padding = 'md',
    } = props;

    return (
        <div className="space-y-4 text-xs">
            <div>
                <label className="block font-semibold text-slate-300 mb-1">Badge (Opsional)</label>
                <input
                    type="text"
                    value={badgeText}
                    onChange={(e) => updateProps({ badgeText: e.target.value })}
                    placeholder="Contoh: ✨ MODULAR CONTAINER"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white"
                />
            </div>

            <div>
                <label className="block font-semibold text-slate-300 mb-1">Judul Kontainer (Opsional)</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => updateProps({ title: e.target.value })}
                    placeholder="Judul bagian..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white"
                />
            </div>

            <div>
                <label className="block font-semibold text-slate-300 mb-1">Subjudul / Keterangan</label>
                <textarea
                    value={subtitle}
                    onChange={(e) => updateProps({ subtitle: e.target.value })}
                    rows={2}
                    placeholder="Keterangan tambahan..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white resize-none"
                />
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block font-semibold text-slate-300 mb-1">Tipe Layout</label>
                    <select
                        value={layoutType}
                        onChange={(e) => updateProps({ layoutType: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white"
                    >
                        <option value="stack">Tumpuk (Stack Vertikal)</option>
                        <option value="grid">Grid Kolom</option>
                        <option value="row">Baris (Flex Horizontal)</option>
                    </select>
                </div>

                <div>
                    <label className="block font-semibold text-slate-300 mb-1">Jumlah Kolom</label>
                    <select
                        value={columns}
                        onChange={(e) => updateProps({ columns: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white"
                    >
                        <option value={1}>1 Kolom</option>
                        <option value={2}>2 Kolom</option>
                        <option value={3}>3 Kolom</option>
                        <option value={4}>4 Kolom</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block font-semibold text-slate-300 mb-1">Perataan (Alignment)</label>
                    <select
                        value={alignment}
                        onChange={(e) => updateProps({ alignment: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white"
                    >
                        <option value="left">Rata Kiri</option>
                        <option value="center">Rata Tengah</option>
                        <option value="right">Rata Kanan</option>
                    </select>
                </div>

                <div>
                    <label className="block font-semibold text-slate-300 mb-1">Gaya Background</label>
                    <select
                        value={bgStyle}
                        onChange={(e) => updateProps({ bgStyle: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white"
                    >
                        <option value="transparent">Transparan</option>
                        <option value="dark">Gelap (Slate-900)</option>
                        <option value="glass">Efek Kaca (Glassmorphism)</option>
                        <option value="gradient">Gradien Modern</option>
                        <option value="card">Kotak Kartu</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block font-semibold text-slate-300 mb-1">Jarak Padding</label>
                <select
                    value={padding}
                    onChange={(e) => updateProps({ padding: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white"
                >
                    <option value="none">Tanpa Padding</option>
                    <option value="sm">Kecil</option>
                    <option value="md">Sedang (Standar)</option>
                    <option value="lg">Besar</option>
                </select>
            </div>
        </div>
    );
};
