import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
    getAllBlocks,
    getBlockDefinition,
    createBlockInstance,
} from '@/Blocks/registry';
import {
    Puzzle,
    ArrowLeft,
    Save,
    Eye,
    EyeOff,
    Monitor,
    Tablet,
    Smartphone,
    GripVertical,
    Trash2,
    Copy,
    ChevronUp,
    ChevronDown,
    Settings,
    Plus,
    Layers,
    Sliders,
    ExternalLink,
    CheckCircle2,
    Sparkles,
    Undo2,
    Redo2,
    Search,
} from 'lucide-react';

/**
 * Sortable Canvas Item Wrapper
 */
function SortableCanvasBlock({
    block,
    isSelected,
    onSelect,
    onDuplicate,
    onDelete,
    onMoveUp,
    onMoveDown,
    isFirst,
    isLast,
    isPreviewMode,
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: block.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 1,
        opacity: isDragging ? 0.6 : 1,
    };

    const def = getBlockDefinition(block.type);
    if (!def) return null;

    const Component = def.Component;
    const Icon = def.icon;

    if (isPreviewMode) {
        return (
            <div className="w-full">
                <Component props={block.props || {}} />
            </div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            onClick={(e) => {
                e.stopPropagation();
                onSelect(block.id);
            }}
            className={`group relative transition-all duration-200 ${
                isSelected
                    ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-950 shadow-2xl'
                    : 'hover:ring-1 hover:ring-indigo-500/50'
            }`}
        >
            {/* Top Action Toolbar */}
            <div
                className={`absolute top-2 left-4 right-4 z-30 flex items-center justify-between pointer-events-none transition-all duration-200 ${
                    isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}
            >
                {/* Block Identifier Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900/90 text-white border border-slate-700/80 shadow-lg backdrop-blur-md pointer-events-auto">
                    <Icon className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{def.label}</span>
                </div>

                {/* Floating Quick Action Buttons */}
                <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow-lg backdrop-blur-md pointer-events-auto">
                    {/* Drag Handle */}
                    <button
                        type="button"
                        {...attributes}
                        {...listeners}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-grab active:cursor-grabbing transition-colors"
                        title="Tahan & Tarik untuk Mengubah Posisi"
                    >
                        <GripVertical className="w-4 h-4" />
                    </button>

                    {/* Move Up */}
                    <button
                        type="button"
                        disabled={isFirst}
                        onClick={(e) => {
                            e.stopPropagation();
                            onMoveUp(block.id);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                        title="Pindah ke Atas"
                    >
                        <ChevronUp className="w-4 h-4" />
                    </button>

                    {/* Move Down */}
                    <button
                        type="button"
                        disabled={isLast}
                        onClick={(e) => {
                            e.stopPropagation();
                            onMoveDown(block.id);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                        title="Pindah ke Bawah"
                    >
                        <ChevronDown className="w-4 h-4" />
                    </button>

                    {/* Duplicate */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDuplicate(block.id);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors"
                        title="Gandakan Blok"
                    >
                        <Copy className="w-4 h-4" />
                    </button>

                    {/* Delete */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(block.id);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                        title="Hapus Blok"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Block Live Render Content */}
            <div className="w-full pointer-events-auto">
                <Component props={block.props || {}} />
            </div>
        </div>
    );
}

/**
 * Main Visual Page Builder
 */
export default function Builder({ page }) {
    // State Halaman
    const [title, setTitle] = useState(page.title || '');
    const [slug, setSlug] = useState(page.slug || '');
    const [status, setStatus] = useState(page.status || 'draft');
    const [metaTitle, setMetaTitle] = useState(page.meta_title || '');
    const [metaDescription, setMetaDescription] = useState(page.meta_description || '');

    // State Blok & Riwayat Undo/Redo
    const [blocks, setBlocks] = useState(Array.isArray(page.blocks) ? page.blocks : []);
    const [history, setHistory] = useState([Array.isArray(page.blocks) ? page.blocks : []]);
    const [historyIndex, setHistoryIndex] = useState(0);

    // State UI Builder
    const [selectedBlockId, setSelectedBlockId] = useState(
        blocks.length > 0 ? blocks[0].id : null
    );
    const [activeTabLeft, setActiveTabLeft] = useState('palette'); // 'palette' | 'outline'
    const [activeTabRight, setActiveTabRight] = useState('block'); // 'block' | 'page'
    const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [paletteFilter, setPaletteFilter] = useState('Semua');
    const [paletteSearch, setPaletteSearch] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Konfigurasi Dnd-Kit Sensor
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Update Blocks dengan Riwayat Undo/Redo
    const updateBlocksWithHistory = (newBlocks) => {
        setBlocks(newBlocks);
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(newBlocks);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    };

    const handleUndo = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            setBlocks(history[historyIndex - 1]);
        }
    };

    const handleRedo = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(historyIndex + 1);
            setBlocks(history[historyIndex + 1]);
        }
    };

    // Tambah Blok Baru dari Palet
    const handleAddBlock = (type) => {
        const newBlock = createBlockInstance(type);
        const newBlocks = [...blocks, newBlock];
        updateBlocksWithHistory(newBlocks);
        setSelectedBlockId(newBlock.id);
        setActiveTabRight('block');
    };

    // Drag and drop sorting selesai
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = blocks.findIndex((b) => b.id === active.id);
        const newIndex = blocks.findIndex((b) => b.id === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
            const reordered = arrayMove(blocks, oldIndex, newIndex);
            updateBlocksWithHistory(reordered);
        }
    };

    // Pindah ke atas
    const handleMoveUp = (id) => {
        const index = blocks.findIndex((b) => b.id === id);
        if (index > 0) {
            const reordered = arrayMove(blocks, index, index - 1);
            updateBlocksWithHistory(reordered);
        }
    };

    // Pindah ke bawah
    const handleMoveDown = (id) => {
        const index = blocks.findIndex((b) => b.id === id);
        if (index < blocks.length - 1) {
            const reordered = arrayMove(blocks, index, index + 1);
            updateBlocksWithHistory(reordered);
        }
    };

    // Gandakan blok
    const handleDuplicate = (id) => {
        const index = blocks.findIndex((b) => b.id === id);
        if (index !== -1) {
            const target = blocks[index];
            const duplicated = {
                ...target,
                id: `block-${target.type}-${Date.now().toString(36)}-copy`,
                props: JSON.parse(JSON.stringify(target.props)),
            };
            const newBlocks = [...blocks];
            newBlocks.splice(index + 1, 0, duplicated);
            updateBlocksWithHistory(newBlocks);
            setSelectedBlockId(duplicated.id);
        }
    };

    // Hapus blok
    const handleDelete = (id) => {
        const newBlocks = blocks.filter((b) => b.id !== id);
        updateBlocksWithHistory(newBlocks);
        if (selectedBlockId === id) {
            setSelectedBlockId(newBlocks.length > 0 ? newBlocks[0].id : null);
        }
    };

    // Update Properti Blok Aktif dari Inspector
    const handleUpdateBlockProps = (updatedProps) => {
        const newBlocks = blocks.map((b) => {
            if (b.id === selectedBlockId) {
                return {
                    ...b,
                    props: {
                        ...b.props,
                        ...updatedProps,
                    },
                };
            }
            return b;
        });
        setBlocks(newBlocks);
    };

    // Simpan Perubahan ke Database
    const handleSave = () => {
        setIsSaving(true);
        setSaveSuccess(false);

        router.put(
            `/admin/pages/${page.id}`,
            {
                title,
                slug,
                status,
                meta_title: metaTitle,
                meta_description: metaDescription,
                blocks,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsSaving(false);
                    setSaveSuccess(true);
                    setTimeout(() => setSaveSuccess(false), 3000);
                },
                onError: () => {
                    setIsSaving(false);
                },
            }
        );
    };

    // Selected block definition & component
    const selectedBlock = blocks.find((b) => b.id === selectedBlockId);
    const selectedDef = selectedBlock ? getBlockDefinition(selectedBlock.type) : null;

    // Filter palet
    const allAvailableBlocks = getAllBlocks();
    const categories = ['Semua', 'Header', 'Konten', 'Media', 'Konversi', 'Tata Letak'];
    const filteredPalette = allAvailableBlocks.filter((b) => {
        const matchCategory = paletteFilter === 'Semua' || b.category === paletteFilter;
        const matchSearch =
            b.label.toLowerCase().includes(paletteSearch.toLowerCase()) ||
            b.description.toLowerCase().includes(paletteSearch.toLowerCase());
        return matchCategory && matchSearch;
    });

    // Device preview width
    const deviceWidthClass = {
        desktop: 'w-full',
        tablet: 'max-w-[768px] mx-auto shadow-2xl rounded-2xl overflow-hidden border border-slate-800',
        mobile: 'max-w-[375px] mx-auto shadow-2xl rounded-3xl overflow-hidden border-2 border-slate-800',
    }[deviceMode] || 'w-full';

    return (
        <div className="h-screen flex flex-col bg-slate-950 text-slate-100 font-sans antialiased overflow-hidden selection:bg-indigo-500 selection:text-white">
            <Head title={`Rakit: ${title} - Rakitan Visual Builder`} />

            {/* Topbar Builder Navigation */}
            <header className="h-16 px-4 sm:px-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between z-40 flex-shrink-0">
                {/* Left: Back & Title Edit */}
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/pages"
                        className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        title="Kembali ke Daftar Halaman"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>

                    <div className="h-6 w-px bg-slate-800" />

                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
                            <Puzzle className="w-4 h-4" />
                        </div>
                        <div>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="bg-transparent text-sm font-bold text-white hover:bg-slate-800/60 focus:bg-slate-800 px-2 py-0.5 rounded-lg border border-transparent focus:border-slate-700 outline-none w-48 sm:w-64 transition-all truncate"
                            />
                            <div className="flex items-center gap-2 px-2 text-[10px] text-slate-400 font-mono">
                                <span>/{slug === 'home' ? '' : slug}</span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setStatus(status === 'published' ? 'draft' : 'published');
                                    }}
                                    className={`px-1.5 py-0.2 rounded uppercase font-semibold transition-colors ${
                                        status === 'published'
                                            ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                                            : 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'
                                    }`}
                                >
                                    {status === 'published' ? 'Terbit' : 'Draf'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center: Device Switcher & Preview Mode */}
                <div className="hidden md:flex items-center gap-2">
                    {/* Device Switcher */}
                    <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800">
                        {[
                            { id: 'desktop', icon: Monitor, label: 'Desktop' },
                            { id: 'tablet', icon: Tablet, label: 'Tablet (768px)' },
                            { id: 'mobile', icon: Smartphone, label: 'Ponsel (375px)' },
                        ].map((dev) => {
                            const Icon = dev.icon;
                            return (
                                <button
                                    key={dev.id}
                                    type="button"
                                    onClick={() => setDeviceMode(dev.id)}
                                    className={`p-2 rounded-lg text-xs font-medium transition-all ${
                                        deviceMode === dev.id
                                            ? 'bg-indigo-600 text-white shadow-sm'
                                            : 'text-slate-400 hover:text-white'
                                    }`}
                                    title={dev.label}
                                >
                                    <Icon className="w-4 h-4" />
                                </button>
                            );
                        })}
                    </div>

                    {/* Preview Toggle */}
                    <button
                        type="button"
                        onClick={() => setIsPreviewMode(!isPreviewMode)}
                        className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                            isPreviewMode
                                ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                                : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white hover:bg-slate-800'
                        }`}
                    >
                        {isPreviewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        <span>{isPreviewMode ? 'Keluar Preview' : 'Mode Preview'}</span>
                    </button>

                    {/* Undo / Redo */}
                    <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800">
                        <button
                            type="button"
                            disabled={historyIndex <= 0}
                            onClick={handleUndo}
                            className="p-2 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                            title="Undo (Kembalikan)"
                        >
                            <Undo2 className="w-4 h-4" />
                        </button>
                        <button
                            type="button"
                            disabled={historyIndex >= history.length - 1}
                            onClick={handleRedo}
                            className="p-2 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                            title="Redo (Ulangi)"
                        >
                            <Redo2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Right: Public View & Save Button */}
                <div className="flex items-center gap-3">
                    <Link
                        href={slug === 'home' ? '/' : `/${slug}`}
                        target="_blank"
                        className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800 transition-colors"
                    >
                        <ExternalLink className="w-4 h-4" />
                        <span>Lihat Publik</span>
                    </Link>

                    <button
                        type="button"
                        disabled={isSaving}
                        onClick={handleSave}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-lg active:scale-95 ${
                            saveSuccess
                                ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                        }`}
                    >
                        {saveSuccess ? (
                            <>
                                <CheckCircle2 className="w-4 h-4 text-white animate-bounce" />
                                <span>Tersimpan!</span>
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                <span>{isSaving ? 'Menyimpan...' : 'Simpan Halaman'}</span>
                            </>
                        )}
                    </button>
                </div>
            </header>

            {/* Main Builder Workspace */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left Panel: Block Palette & Outline Tree */}
                {!isPreviewMode && (
                    <aside className="w-80 border-r border-slate-800 bg-slate-900/70 backdrop-blur-md flex flex-col flex-shrink-0 z-30">
                        {/* Tab Switcher Left */}
                        <div className="flex border-b border-slate-800 p-2 gap-1 bg-slate-900">
                            <button
                                type="button"
                                onClick={() => setActiveTabLeft('palette')}
                                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                                    activeTabLeft === 'palette'
                                        ? 'bg-indigo-600 text-white shadow-sm'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                }`}
                            >
                                <Puzzle className="w-3.5 h-3.5" />
                                <span>Palet Puzzle</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTabLeft('outline')}
                                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                                    activeTabLeft === 'outline'
                                        ? 'bg-indigo-600 text-white shadow-sm'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                }`}
                            >
                                <Layers className="w-3.5 h-3.5" />
                                <span>Struktur ({blocks.length})</span>
                            </button>
                        </div>

                        {/* Content Tab Left */}
                        {activeTabLeft === 'palette' ? (
                            <div className="flex-1 flex flex-col overflow-hidden p-4">
                                {/* Search Box */}
                                <div className="relative mb-3">
                                    <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        value={paletteSearch}
                                        onChange={(e) => setPaletteSearch(e.target.value)}
                                        placeholder="Cari potongan blok..."
                                        className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>

                                {/* Category Filters */}
                                <div className="flex flex-wrap gap-1 mb-4 pb-2 border-b border-slate-800">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => setPaletteFilter(cat)}
                                            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                                                paletteFilter === cat
                                                    ? 'bg-indigo-600 text-white'
                                                    : 'bg-slate-800/80 text-slate-400 hover:text-white'
                                            }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>

                                {/* Available Blocks List */}
                                <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                                    {filteredPalette.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <div
                                                key={item.type}
                                                onClick={() => handleAddBlock(item.type)}
                                                className="group p-3.5 rounded-2xl bg-slate-950 border border-slate-800/90 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 cursor-pointer transition-all duration-200"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                                        <Icon className="w-4 h-4" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <h4 className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">
                                                                {item.label}
                                                            </h4>
                                                            <span className="text-[10px] text-indigo-400/80 uppercase font-semibold">
                                                                + Tambah
                                                            </span>
                                                        </div>
                                                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            /* Outline Tree View */
                            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                                <p className="text-[11px] text-slate-400 mb-3">
                                    Urutan blok pada halaman ini. Klik item untuk membuka pengaturannya.
                                </p>
                                {blocks.map((b, idx) => {
                                    const def = getBlockDefinition(b.type);
                                    const Icon = def?.icon || Sparkles;
                                    const isSelected = b.id === selectedBlockId;
                                    return (
                                        <div
                                            key={b.id}
                                            onClick={() => {
                                                setSelectedBlockId(b.id);
                                                setActiveTabRight('block');
                                            }}
                                            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                                                isSelected
                                                    ? 'bg-indigo-600/15 border-indigo-500 text-white'
                                                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                                            }`}
                                        >
                                            <div className="flex items-center gap-2.5 min-w-0">
                                                <span className="text-[10px] font-mono text-slate-500">
                                                    #{idx + 1}
                                                </span>
                                                <Icon className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                                                <span className="text-xs font-medium truncate">
                                                    {def?.label || b.type}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-1">
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDuplicate(b.id);
                                                    }}
                                                    className="p-1 rounded text-slate-400 hover:text-white"
                                                    title="Gandakan"
                                                >
                                                    <Copy className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(b.id);
                                                    }}
                                                    className="p-1 rounded text-slate-400 hover:text-red-400"
                                                    title="Hapus"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </aside>
                )}

                {/* Center Canvas */}
                <main
                    className="flex-1 overflow-y-auto bg-slate-950/60 p-4 sm:p-8 flex flex-col items-center"
                    onClick={() => {
                        // Deselect block when clicking background
                        // setSelectedBlockId(null);
                    }}
                >
                    <div className={`transition-all duration-300 ${deviceWidthClass} min-h-[600px] flex flex-col`}>
                        {blocks.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/30 text-center my-auto">
                                <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
                                    <Puzzle className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Canvas Masih Kosong</h3>
                                <p className="text-xs text-slate-400 max-w-sm mb-6">
                                    Mulai merakit website Anda dengan memilih blok puzzle dari panel sebelah kiri.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => handleAddBlock('hero')}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Tambahkan Hero Section Awal</span>
                                </button>
                            </div>
                        ) : (
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
                                <SortableContext
                                    items={blocks.map((b) => b.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <div className="w-full flex flex-col space-y-0.5">
                                        {blocks.map((block, idx) => (
                                            <SortableCanvasBlock
                                                key={block.id}
                                                block={block}
                                                isSelected={block.id === selectedBlockId}
                                                onSelect={setSelectedBlockId}
                                                onDuplicate={handleDuplicate}
                                                onDelete={handleDelete}
                                                onMoveUp={handleMoveUp}
                                                onMoveDown={handleMoveDown}
                                                isFirst={idx === 0}
                                                isLast={idx === blocks.length - 1}
                                                isPreviewMode={isPreviewMode}
                                            />
                                        ))}
                                    </div>
                                </SortableContext>
                            </DndContext>
                        )}
                    </div>
                </main>

                {/* Right Panel: Inspector & Settings */}
                {!isPreviewMode && (
                    <aside className="w-80 border-l border-slate-800 bg-slate-900/70 backdrop-blur-md flex flex-col flex-shrink-0 z-30">
                        {/* Tab Switcher Right */}
                        <div className="flex border-b border-slate-800 p-2 gap-1 bg-slate-900">
                            <button
                                type="button"
                                onClick={() => setActiveTabRight('block')}
                                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                                    activeTabRight === 'block'
                                        ? 'bg-indigo-600 text-white shadow-sm'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                }`}
                            >
                                <Sliders className="w-3.5 h-3.5" />
                                <span>Pengaturan Blok</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTabRight('page')}
                                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                                    activeTabRight === 'page'
                                        ? 'bg-indigo-600 text-white shadow-sm'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                }`}
                            >
                                <Settings className="w-3.5 h-3.5" />
                                <span>Halaman & SEO</span>
                            </button>
                        </div>

                        {/* Content Tab Right */}
                        <div className="flex-1 overflow-y-auto p-5">
                            {activeTabRight === 'block' ? (
                                selectedBlock && selectedDef ? (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                                                    <selectedDef.icon className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xs font-bold text-white">
                                                        {selectedDef.label}
                                                    </h3>
                                                    <p className="text-[10px] font-mono text-slate-500">
                                                        ID: {selectedBlock.id.substring(0, 16)}...
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(selectedBlock.id)}
                                                className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                                                title="Hapus Blok Ini"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Render Specific Block Settings Form */}
                                        <selectedDef.SettingsComponent
                                            props={selectedBlock.props || {}}
                                            updateProps={handleUpdateBlockProps}
                                        />
                                    </div>
                                ) : (
                                    <div className="py-16 text-center text-slate-500">
                                        <Sliders className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                        <p className="text-xs font-medium">Pilih blok pada canvas</p>
                                        <p className="text-[11px] text-slate-500 mt-1">
                                            Klik salah satu blok untuk mengedit teks, tata letak, dan gaya visualnya.
                                        </p>
                                    </div>
                                )
                            ) : (
                                /* Page & SEO Settings */
                                <div className="space-y-4 text-xs">
                                    <div>
                                        <label className="block font-medium text-slate-300 mb-1">
                                            Judul Halaman
                                        </label>
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-medium text-slate-300 mb-1">
                                            URL Slug
                                        </label>
                                        <input
                                            type="text"
                                            value={slug}
                                            onChange={(e) => setSlug(e.target.value)}
                                            className="w-full px-3 py-2 font-mono rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                        />
                                        <p className="mt-1 text-[11px] text-slate-500">
                                            URL publik: /{slug === 'home' ? '' : slug}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block font-medium text-slate-300 mb-1">
                                            Status Publikasi
                                        </label>
                                        <select
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                        >
                                            <option value="draft">Draf (Hanya Admin)</option>
                                            <option value="published">Terbit (Dapat Diakses Publik)</option>
                                        </select>
                                    </div>

                                    <div className="pt-4 border-t border-slate-800">
                                        <h4 className="font-bold text-white mb-3">Pengaturan SEO</h4>

                                        <div className="space-y-3">
                                            <div>
                                                <label className="block font-medium text-slate-300 mb-1">
                                                    Meta Title
                                                </label>
                                                <input
                                                    type="text"
                                                    value={metaTitle}
                                                    onChange={(e) => setMetaTitle(e.target.value)}
                                                    placeholder="Judul di hasil pencarian Google..."
                                                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-medium text-slate-300 mb-1">
                                                    Meta Description
                                                </label>
                                                <textarea
                                                    rows={4}
                                                    value={metaDescription}
                                                    onChange={(e) => setMetaDescription(e.target.value)}
                                                    placeholder="Ringkasan isi halaman untuk mesin pencari..."
                                                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </aside>
                )}
            </div>
        </div>
    );
}
