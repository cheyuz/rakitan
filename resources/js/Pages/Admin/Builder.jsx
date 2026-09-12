import React, { useState } from 'react';
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
    getAllSubComponents,
    createSubComponentInstance,
} from '@/Blocks/registry';
import { convertBlockToCustom } from '@/Blocks/Helpers/blockConverter';
import { CanvasEditProvider, useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';
import {
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
    Puzzle,
    Wifi,
    Battery,
    ZoomIn,
    ZoomOut,
    Wand2,
    RotateCcw,
} from 'lucide-react';
import ApplicationLogo from '@/Components/ApplicationLogo';

/**
 * Sortable Canvas Item Wrapper
 */
function SortableCanvasBlock({
    block,
    index,
    isSelected,
    onSelect,
    onDuplicate,
    onDelete,
    onMoveUp,
    onMoveDown,
    onConvertToCustom,
    onResetToDefault,
    onAddSubComponent,
    onAddBlockAt,
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

    const { draggingPaletteItem, onEndDragPaletteItem } = useCanvasEdit();
    const [isDragOverBlock, setIsDragOverBlock] = useState(false);

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
                <Component props={block.props || {}} blockId={block.id} />
            </div>
        );
    }

    const isCustom = Boolean(block.props?.isCustom);

    const handleBlockNativeDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy';
    };

    const handleBlockNativeDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOverBlock(true);
    };

    const handleBlockNativeDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsDragOverBlock(false);
        }
    };

    const handleBlockNativeDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOverBlock(false);

        // 1. Cek jika yang di-drop adalah sub-komponen
        let subType = null;
        try {
            const rawSub = e.dataTransfer.getData('application/rakitan-subcomponent');
            if (rawSub) {
                subType = JSON.parse(rawSub).type;
            }
        } catch (err) {}

        if (!subType && draggingPaletteItem?.category === 'subcomponent') {
            subType = draggingPaletteItem.type;
        }

        if (subType) {
            if (!isCustom && onConvertToCustom) {
                onConvertToCustom(block.id);
            }
            if (onAddSubComponent) {
                onAddSubComponent(block.id, subType);
            }
            if (onEndDragPaletteItem) onEndDragPaletteItem();
            return;
        }

        // 2. Cek jika yang di-drop adalah blok
        let blockType = null;
        try {
            const rawBlock = e.dataTransfer.getData('application/rakitan-block');
            if (rawBlock) {
                blockType = JSON.parse(rawBlock).type;
            }
        } catch (err) {}

        if (!blockType && draggingPaletteItem?.category === 'block') {
            blockType = draggingPaletteItem.type;
        }

        if (blockType && onAddBlockAt) {
            onAddBlockAt(blockType, index + 1);
            if (onEndDragPaletteItem) onEndDragPaletteItem();
        }
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            onDragOver={handleBlockNativeDragOver}
            onDragEnter={handleBlockNativeDragEnter}
            onDragLeave={handleBlockNativeDragLeave}
            onDrop={handleBlockNativeDrop}
            onClick={(e) => {
                e.stopPropagation();
                onSelect(block.id);
            }}
            className={`group relative transition-all duration-200 ${
                isDragOverBlock
                    ? 'ring-4 ring-indigo-500 ring-offset-2 ring-offset-slate-950 shadow-2xl scale-[1.005]'
                    : isSelected
                    ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-950 shadow-2xl'
                    : 'hover:ring-1 hover:ring-indigo-500/50'
            }`}
        >
            {/* Overlay feedback saat ada komponen/blok di-drag ke atas blok ini */}
            {isDragOverBlock && (
                <div className="absolute inset-0 z-40 bg-indigo-950/75 border-2 border-dashed border-indigo-400 backdrop-blur-sm rounded-2xl flex items-center justify-center pointer-events-none animate-pulse">
                    <div className="px-5 py-3 rounded-2xl bg-slate-900 border border-indigo-500/60 shadow-2xl text-xs font-bold text-white flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" />
                        <span>
                            {draggingPaletteItem?.category === 'subcomponent'
                                ? `Release to insert ${draggingPaletteItem.label || 'micro-component'} into this block`
                                : `Release to add ${draggingPaletteItem?.label || ''} block below this block`}
                        </span>
                    </div>
                </div>
            )}
            {/* Top Action Toolbar */}
            <div
                className={`absolute top-2 left-4 right-4 z-30 flex items-center justify-between pointer-events-none transition-all duration-200 ${
                    isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}
            >
                {/* Block Identifier Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900/95 text-white border border-slate-700/80 shadow-xl backdrop-blur-md pointer-events-auto">
                    <Icon className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{def.label}</span>
                    {isCustom && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            <Wand2 className="w-2.5 h-2.5 text-purple-400" />
                            <span>Custom</span>
                        </span>
                    )}
                </div>

                {/* Floating Quick Action Buttons */}
                <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-900/95 border border-slate-700/80 shadow-xl backdrop-blur-md pointer-events-auto">
                    {/* Drag Handle */}
                    <button
                        type="button"
                        {...attributes}
                        {...listeners}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-grab active:cursor-grabbing transition-colors"
                        title="Drag to reorder"
                    >
                        <GripVertical className="w-4 h-4" />
                    </button>

                    {/* Mode Kustom / Reset Bawaan Action */}
                    {isCustom ? (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onResetToDefault) onResetToDefault(block.id);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                            title="Reset back to Default Template"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onConvertToCustom) onConvertToCustom(block.id);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-purple-400 hover:bg-slate-800 transition-colors"
                            title="Convert this block into Custom Mode (Full Editable)"
                        >
                            <Wand2 className="w-4 h-4" />
                        </button>
                    )}

                    {/* Move Up */}
                    <button
                        type="button"
                        disabled={isFirst}
                        onClick={(e) => {
                            e.stopPropagation();
                            onMoveUp(block.id);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                        title="Move Up"
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
                        title="Move Down"
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
                        title="Duplicate Block"
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
                        title="Delete Block"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Block Live Render Content */}
            <div className="w-full pointer-events-auto">
                <Component props={block.props || {}} blockId={block.id} />
            </div>
        </div>
    );
}

/**
 * Main Visual Page Builder
 */
export default function Builder({ page }) {
    // Page State
    const [title, setTitle] = useState(page.title || '');
    const [slug, setSlug] = useState(page.slug || '');
    const [status, setStatus] = useState(page.status || 'draft');
    const [metaTitle, setMetaTitle] = useState(page.meta_title || '');
    const [metaDescription, setMetaDescription] = useState(page.meta_description || '');
    const [layout, setLayout] = useState(page.layout || 'default');

    // Blocks & History State
    const [blocks, setBlocks] = useState(Array.isArray(page.blocks) ? page.blocks : []);
    const [history, setHistory] = useState([Array.isArray(page.blocks) ? page.blocks : []]);
    const [historyIndex, setHistoryIndex] = useState(0);

    // Builder UI State
    const [selectedBlockId, setSelectedBlockId] = useState(
        blocks.length > 0 ? blocks[0].id : null
    );
    const [activeTabLeft, setActiveTabLeft] = useState('palette'); // 'palette' | 'outline'
    const [activeTabRight, setActiveTabRight] = useState('block'); // 'block' | 'page'
    const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
    const [zoomScale, setZoomScale] = useState(1); // 1 | 0.85 | 0.75
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [paletteFilter, setPaletteFilter] = useState('All');
    const [paletteSearch, setPaletteSearch] = useState('');
    const [subSearch, setSubSearch] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [draggingPaletteItem, setDraggingPaletteItem] = useState(null);

    // Dnd-Kit Sensors
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

    const handleAddBlock = (type) => {
        const newBlock = createBlockInstance(type);
        const newBlocks = [...blocks, newBlock];
        updateBlocksWithHistory(newBlocks);
        setSelectedBlockId(newBlock.id);
        setActiveTabRight('block');
    };

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

    const handleMoveUp = (id) => {
        const index = blocks.findIndex((b) => b.id === id);
        if (index > 0) {
            const reordered = arrayMove(blocks, index, index - 1);
            updateBlocksWithHistory(reordered);
        }
    };

    const handleMoveDown = (id) => {
        const index = blocks.findIndex((b) => b.id === id);
        if (index < blocks.length - 1) {
            const reordered = arrayMove(blocks, index, index + 1);
            updateBlocksWithHistory(reordered);
        }
    };

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

    const handleDelete = (id) => {
        const newBlocks = blocks.filter((b) => b.id !== id);
        updateBlocksWithHistory(newBlocks);
        if (selectedBlockId === id) {
            setSelectedBlockId(newBlocks.length > 0 ? newBlocks[0].id : null);
        }
    };

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

    // Live update property spesifik dari visual canvas preview inline editing
    const handleLiveUpdateBlockProp = (blockId, propKey, propVal) => {
        const newBlocks = blocks.map((b) => {
            if (b.id === blockId) {
                return {
                    ...b,
                    props: {
                        ...b.props,
                        [propKey]: propVal,
                    },
                };
            }
            return b;
        });
        setBlocks(newBlocks);
    };

    // Helper untuk memanipulasi array sub-components (baik di root blok maupun di dalam nested kolom sub_row)
    const updateSubListWithSlotPath = (subs = [], slotPath, modifierFn) => {
        if (!slotPath) {
            return modifierFn(subs);
        }

        const { parentSubId, columnIndex } = slotPath;
        return subs.map((sub) => {
            if (sub.id === parentSubId) {
                const columnSlots = Array.isArray(sub.props?.columnSlots) ? [...sub.props.columnSlots] : [];
                const currentSlot = columnSlots[columnIndex] || { id: `col-${columnIndex}`, subComponents: [] };
                const currentSlotSubs = Array.isArray(currentSlot.subComponents) ? currentSlot.subComponents : [];

                const modifiedSlotSubs = modifierFn(currentSlotSubs);
                columnSlots[columnIndex] = {
                    ...currentSlot,
                    subComponents: modifiedSlotSubs,
                };

                return {
                    ...sub,
                    props: {
                        ...sub.props,
                        columnSlots,
                    },
                };
            }
            return sub;
        });
    };

    // Tambah Sub-Komponen ke dalam suatu block atau nested slotPath
    const handleAddSubComponent = (blockId, subType, slotPath = null) => {
        const targetId = blockId || selectedBlockId;
        if (!targetId) return;

        const newSub = createSubComponentInstance(subType);
        if (!newSub) return;

        const newBlocks = blocks.map((b) => {
            if (b.id === targetId) {
                const currentSubs = Array.isArray(b.props?.subComponents) ? b.props.subComponents : [];
                const updatedSubs = updateSubListWithSlotPath(currentSubs, slotPath, (list) => [...list, newSub]);
                return {
                    ...b,
                    props: {
                        ...b.props,
                        subComponents: updatedSubs,
                    },
                };
            }
            return b;
        });
        updateBlocksWithHistory(newBlocks);
        setSelectedBlockId(targetId);
    };

    // Reorder sub-komponen saat drag-and-drop selesai
    const handleReorderSubComponents = (blockId, reorderedSubs, slotPath = null) => {
        const newBlocks = blocks.map((b) => {
            if (b.id === blockId) {
                const currentSubs = Array.isArray(b.props?.subComponents) ? b.props.subComponents : [];
                const updatedSubs = updateSubListWithSlotPath(currentSubs, slotPath, () => reorderedSubs);
                return {
                    ...b,
                    props: {
                        ...b.props,
                        subComponents: updatedSubs,
                    },
                };
            }
            return b;
        });
        updateBlocksWithHistory(newBlocks);
    };

    // Update props suatu sub-komponen
    const handleUpdateSubComponent = (blockId, subId, updatedProps, slotPath = null) => {
        const newBlocks = blocks.map((b) => {
            if (b.id === blockId) {
                const currentSubs = Array.isArray(b.props?.subComponents) ? b.props.subComponents : [];
                const updatedSubs = updateSubListWithSlotPath(currentSubs, slotPath, (list) =>
                    list.map((s) => (s.id === subId ? { ...s, props: { ...s.props, ...updatedProps } } : s))
                );
                return {
                    ...b,
                    props: {
                        ...b.props,
                        subComponents: updatedSubs,
                    },
                };
            }
            return b;
        });
        setBlocks(newBlocks);
    };

    // Hapus sub-komponen
    const handleRemoveSubComponent = (blockId, subId, slotPath = null) => {
        const newBlocks = blocks.map((b) => {
            if (b.id === blockId) {
                const currentSubs = Array.isArray(b.props?.subComponents) ? b.props.subComponents : [];
                const updatedSubs = updateSubListWithSlotPath(currentSubs, slotPath, (list) =>
                    list.filter((s) => s.id !== subId)
                );
                return {
                    ...b,
                    props: {
                        ...b.props,
                        subComponents: updatedSubs,
                    },
                };
            }
            return b;
        });
        updateBlocksWithHistory(newBlocks);
    };

    // Geser posisi sub-komponen naik / turun
    const handleMoveSubComponent = (blockId, subId, direction, slotPath = null) => {
        const newBlocks = blocks.map((b) => {
            if (b.id === blockId) {
                const currentSubs = Array.isArray(b.props?.subComponents) ? b.props.subComponents : [];
                const updatedSubs = updateSubListWithSlotPath(currentSubs, slotPath, (list) => {
                    const idx = list.findIndex((s) => s.id === subId);
                    if (idx === -1) return list;

                    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
                    if (targetIdx < 0 || targetIdx >= list.length) return list;

                    const copy = [...list];
                    const [moved] = copy.splice(idx, 1);
                    copy.splice(targetIdx, 0, moved);
                    return copy;
                });

                return {
                    ...b,
                    props: {
                        ...b.props,
                        subComponents: updatedSubs,
                    },
                };
            }
            return b;
        });
        updateBlocksWithHistory(newBlocks);
    };

    // Duplikasi sub-komponen
    const handleDuplicateSubComponent = (blockId, subId, slotPath = null) => {
        const newBlocks = blocks.map((b) => {
            if (b.id === blockId) {
                const currentSubs = Array.isArray(b.props?.subComponents) ? b.props.subComponents : [];
                const updatedSubs = updateSubListWithSlotPath(currentSubs, slotPath, (list) => {
                    const idx = list.findIndex((s) => s.id === subId);
                    if (idx === -1) return list;

                    const original = list[idx];
                    const duplicate = {
                        ...original,
                        id: `sub-${original.type}-${Date.now().toString(36)}-copy`,
                        props: JSON.parse(JSON.stringify(original.props)),
                    };
                    const copy = [...list];
                    copy.splice(idx + 1, 0, duplicate);
                    return copy;
                });

                return {
                    ...b,
                    props: {
                        ...b.props,
                        subComponents: updatedSubs,
                    },
                };
            }
            return b;
        });
        updateBlocksWithHistory(newBlocks);
    };

    // Konversi blok ke mode kustom (dengan menghapus elemen bawaan tertentu jika dipilih)
    const handleConvertBlockToCustom = (blockId, deleteElementKey = null) => {
        const newBlocks = blocks.map((b) => {
            if (b.id === blockId) {
                return convertBlockToCustom(b, deleteElementKey);
            }
            return b;
        });
        updateBlocksWithHistory(newBlocks);
    };

    // Reset blok kustom kembali ke template default bawaan
    const handleResetBlockToDefault = (blockId) => {
        const newBlocks = blocks.map((b) => {
            if (b.id === blockId) {
                return {
                    ...b,
                    props: {
                        ...b.props,
                        isCustom: false,
                    },
                };
            }
            return b;
        });
        updateBlocksWithHistory(newBlocks);
    };

    // Sisipkan blok baru di posisi tertentu
    const handleAddBlockAt = (type, targetIndex = null) => {
        const newBlock = createBlockInstance(type);
        if (!newBlock) return;
        const copy = [...blocks];
        if (targetIndex !== null && targetIndex >= 0 && targetIndex <= copy.length) {
            copy.splice(targetIndex, 0, newBlock);
        } else {
            copy.push(newBlock);
        }
        updateBlocksWithHistory(copy);
        setSelectedBlockId(newBlock.id);
    };

    const handleSave = () => {
        setIsSaving(true);
        setSaveSuccess(false);

        router.put(
            `/admin/pages/${page.id}`,
            {
                title,
                slug,
                status,
                layout,
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

    const selectedBlock = blocks.find((b) => b.id === selectedBlockId);
    const selectedDef = selectedBlock ? getBlockDefinition(selectedBlock.type) : null;

    const allAvailableBlocks = getAllBlocks();
    const allSubComponents = getAllSubComponents();
    const categories = ['All', 'Header', 'Content', 'Media', 'Conversion', 'Layout'];
    const filteredPalette = allAvailableBlocks.filter((b) => {
        const matchCategory = paletteFilter === 'All' || b.category === paletteFilter;
        const matchSearch =
            b.label.toLowerCase().includes(paletteSearch.toLowerCase()) ||
            b.description.toLowerCase().includes(paletteSearch.toLowerCase());
        return matchCategory && matchSearch;
    });

    const deviceWidthClass = {
        desktop: 'w-full',
        tablet: 'max-w-[768px] mx-auto shadow-2xl rounded-2xl overflow-hidden border border-slate-800',
        mobile: 'max-w-[375px] mx-auto shadow-2xl rounded-3xl overflow-hidden border-2 border-slate-800',
    }[deviceMode] || 'w-full';

    const canvasEditContextValue = {
        isEditing: !isPreviewMode,
        selectedBlockId,
        onSelectBlock: setSelectedBlockId,
        onUpdateBlockProp: handleLiveUpdateBlockProp,
        onAddSubComponent: handleAddSubComponent,
        onUpdateSubComponent: handleUpdateSubComponent,
        onRemoveSubComponent: handleRemoveSubComponent,
        onMoveSubComponent: handleMoveSubComponent,
        onDuplicateSubComponent: handleDuplicateSubComponent,
        onReorderSubComponents: handleReorderSubComponents,
        onConvertBlockToCustom: handleConvertBlockToCustom,
        onResetBlockToDefault: handleResetBlockToDefault,
        draggingPaletteItem,
        onStartDragPaletteItem: (item) => setDraggingPaletteItem(item),
        onEndDragPaletteItem: () => setDraggingPaletteItem(null),
        onAddBlockAt: handleAddBlockAt,
    };

    const [isEmptyDragOver, setIsEmptyDragOver] = useState(false);

    const handleEmptyDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsEmptyDragOver(false);

        // Cek jika sub-komponen di-drop ke kanvas kosong
        let subType = null;
        try {
            const rawSub = e.dataTransfer.getData('application/rakitan-subcomponent');
            if (rawSub) subType = JSON.parse(rawSub).type;
        } catch (err) {}
        if (!subType && draggingPaletteItem?.category === 'subcomponent') {
            subType = draggingPaletteItem.type;
        }

        if (subType) {
            // Otomatis buat Container Block dan masukkan sub-komponen
            const containerBlock = createBlockInstance('container');
            const subInstance = createSubComponentInstance(subType);
            if (containerBlock && subInstance) {
                containerBlock.props = {
                    ...containerBlock.props,
                    subComponents: [subInstance],
                };
                updateBlocksWithHistory([containerBlock]);
                setSelectedBlockId(containerBlock.id);
            }
            setDraggingPaletteItem(null);
            return;
        }

        // Cek jika blok di-drop ke kanvas kosong
        let blockType = null;
        try {
            const rawBlock = e.dataTransfer.getData('application/rakitan-block');
            if (rawBlock) blockType = JSON.parse(rawBlock).type;
        } catch (err) {}
        if (!blockType && draggingPaletteItem?.category === 'block') {
            blockType = draggingPaletteItem.type;
        }

        if (blockType) {
            handleAddBlock(blockType);
            setDraggingPaletteItem(null);
        }
    };

    const renderCanvasBlocks = () => {
        return (
            <CanvasEditProvider value={canvasEditContextValue}>
                {blocks.length === 0 ? (
                    <div
                        onDragOver={(e) => {
                            e.preventDefault();
                            e.dataTransfer.dropEffect = 'copy';
                        }}
                        onDragEnter={() => setIsEmptyDragOver(true)}
                        onDragLeave={(e) => {
                            if (!e.currentTarget.contains(e.relatedTarget)) {
                                setIsEmptyDragOver(false);
                            }
                        }}
                        onDrop={handleEmptyDrop}
                        className={`flex-1 flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-3xl text-center my-auto min-h-[400px] transition-all ${
                            isEmptyDragOver
                                ? 'border-indigo-400 bg-indigo-500/15 ring-4 ring-indigo-500/20 scale-[1.01]'
                                : 'border-slate-800 bg-slate-900/30'
                        }`}
                    >
                        <ApplicationLogo className="w-16 h-16 rounded-2xl mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">
                            {isEmptyDragOver ? '📥 Drop Component Here' : 'Canvas is Empty'}
                        </h3>
                        <p className="text-xs text-slate-400 max-w-sm mb-6">
                            Drag components or puzzle pieces from the left panel and drop them in this area to get started.
                        </p>
                        <button
                            type="button"
                            onClick={() => handleAddBlock('hero')}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add Hero Section</span>
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
                                        index={idx}
                                        isSelected={block.id === selectedBlockId}
                                        onSelect={setSelectedBlockId}
                                        onDuplicate={handleDuplicate}
                                        onDelete={handleDelete}
                                        onMoveUp={handleMoveUp}
                                        onMoveDown={handleMoveDown}
                                        onConvertToCustom={handleConvertBlockToCustom}
                                        onResetToDefault={handleResetBlockToDefault}
                                        onAddSubComponent={handleAddSubComponent}
                                        onAddBlockAt={handleAddBlockAt}
                                        isFirst={idx === 0}
                                        isLast={idx === blocks.length - 1}
                                        isPreviewMode={isPreviewMode}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                )}
            </CanvasEditProvider>
        );
    };

    return (
        <div className="h-screen flex flex-col bg-slate-950 text-slate-100 font-sans antialiased overflow-hidden selection:bg-indigo-500 selection:text-white">
            <Head title={`Builder: ${title} - Rakitan Visual CMS`} />

            {/* Topbar Builder Navigation */}
            <header className="h-16 px-4 sm:px-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between z-40 flex-shrink-0">
                {/* Left: Back & Title Edit */}
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/pages"
                        className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        title="Back to Pages"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>

                    <div className="h-6 w-px bg-slate-800" />

                    <div className="flex items-center gap-2.5">
                        <ApplicationLogo className="w-8 h-8 rounded-xl shadow-md shadow-indigo-600/20" />
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
                                    {status === 'published' ? 'Published' : 'Draft'}
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
                            { id: 'desktop', icon: Monitor, label: 'Desktop (100%)' },
                            { id: 'tablet', icon: Tablet, label: 'Tablet (768px)' },
                            { id: 'mobile', icon: Smartphone, label: 'Mobile (375px)' },
                        ].map((dev) => {
                            const Icon = dev.icon;
                            return (
                                <button
                                    key={dev.id}
                                    type="button"
                                    onClick={() => {
                                        setDeviceMode(dev.id);
                                        if (dev.id === 'desktop') setZoomScale(1);
                                    }}
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

                    {/* Resolution & Zoom Controls */}
                    {deviceMode !== 'desktop' && (
                        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px]">
                            <span className="font-mono text-indigo-400 font-semibold">
                                {deviceMode === 'tablet' ? '768 × 1024' : '375 × 812'}
                            </span>
                            <div className="h-3 w-px bg-slate-800" />
                            <button
                                type="button"
                                onClick={() => setZoomScale(zoomScale === 1 ? 0.85 : zoomScale === 0.85 ? 0.75 : 1)}
                                className="text-slate-300 hover:text-white font-medium hover:bg-slate-800 px-1.5 py-0.5 rounded transition-colors"
                                title="Click to change scale"
                            >
                                {Math.round(zoomScale * 100)}%
                            </button>
                        </div>
                    )}

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
                        <span>{isPreviewMode ? 'Exit Preview' : 'Preview Mode'}</span>
                    </button>

                    {/* Undo / Redo */}
                    <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800">
                        <button
                            type="button"
                            disabled={historyIndex <= 0}
                            onClick={handleUndo}
                            className="p-2 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                            title="Undo"
                        >
                            <Undo2 className="w-4 h-4" />
                        </button>
                        <button
                            type="button"
                            disabled={historyIndex >= history.length - 1}
                            onClick={handleRedo}
                            className="p-2 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                            title="Redo"
                        >
                            <Redo2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Right: Public View & Save Button */}
                <div className="flex items-center gap-3">
                    <div className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Live Edit Active</span>
                    </div>

                    <Link
                        href={slug === 'home' ? '/' : `/${slug}`}
                        target="_blank"
                        className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800 transition-colors"
                    >
                        <ExternalLink className="w-4 h-4" />
                        <span>View Public</span>
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
                                <span>Saved!</span>
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                <span>{isSaving ? 'Saving...' : 'Save Page'}</span>
                            </>
                        )}
                    </button>
                </div>
            </header>

            {/* Main Builder Workspace */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left Panel: Block Palette & Outline Tree */}
                {!isPreviewMode && (
                    <aside className="w-80 border-r border-slate-800 bg-slate-900/80 backdrop-blur-md flex flex-col flex-shrink-0 z-30">
                        {/* Tab Switcher Left */}
                        <div className="flex border-b border-slate-800 p-2 gap-1 bg-slate-900">
                            <button
                                type="button"
                                onClick={() => setActiveTabLeft('palette')}
                                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                                    activeTabLeft === 'palette'
                                        ? 'bg-indigo-600 text-white shadow-sm'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                }`}
                                title="Full Block Catalog"
                            >
                                <Puzzle className="w-3.5 h-3.5" />
                                <span>Blocks</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTabLeft('subcomponents')}
                                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                                    activeTabLeft === 'subcomponents'
                                        ? 'bg-indigo-600 text-white shadow-sm'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                }`}
                                title="Dynamic Micro-Components"
                            >
                                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                                <span>Micro</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTabLeft('outline')}
                                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                                    activeTabLeft === 'outline'
                                        ? 'bg-indigo-600 text-white shadow-sm'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                }`}
                                title="Page Structure"
                            >
                                <Layers className="w-3.5 h-3.5" />
                                <span>Outline</span>
                            </button>
                        </div>

                        {/* Content Tab Left */}
                        {activeTabLeft === 'subcomponents' ? (
                            <div className="flex-1 flex flex-col overflow-hidden p-4">
                                <div className="mb-3 p-3 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 text-xs">
                                    <div className="text-[11px] text-indigo-300 font-bold mb-1 flex items-center gap-1.5">
                                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                                        <span>Drag & Drop Micro-Components</span>
                                    </div>
                                    <p className="text-[11px] text-slate-300 leading-relaxed">
                                        <strong>Drag</strong> components into slots, row columns, or canvas blocks, or <strong>click</strong> to insert directly.
                                    </p>
                                </div>

                                {/* Search Box */}
                                <div className="relative mb-3">
                                    <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        value={subSearch}
                                        onChange={(e) => setSubSearch(e.target.value)}
                                        placeholder="Search micro-components..."
                                        className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>

                                {/* List of Sub-Components */}
                                <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                                    {allSubComponents
                                        .filter(
                                            (s) =>
                                                s.label.toLowerCase().includes(subSearch.toLowerCase()) ||
                                                s.description.toLowerCase().includes(subSearch.toLowerCase())
                                        )
                                        .map((item) => {
                                            const Icon = item.icon;
                                            return (
                                                <div
                                                    key={item.type}
                                                    draggable={true}
                                                    onDragStart={(e) => {
                                                        e.dataTransfer.setData(
                                                            'application/rakitan-subcomponent',
                                                            JSON.stringify({ type: item.type })
                                                        );
                                                        e.dataTransfer.effectAllowed = 'copy';
                                                        setDraggingPaletteItem({
                                                            category: 'subcomponent',
                                                            type: item.type,
                                                            label: item.label,
                                                        });
                                                    }}
                                                    onDragEnd={() => {
                                                        setDraggingPaletteItem(null);
                                                    }}
                                                    onClick={() => {
                                                        if (blocks.length === 0) {
                                                            handleAddBlock('container');
                                                        } else {
                                                            handleAddSubComponent(selectedBlockId, item.type);
                                                        }
                                                    }}
                                                    className="group p-3 rounded-2xl bg-slate-950 border border-slate-800/90 hover:border-indigo-500 hover:bg-slate-900/90 cursor-grab active:cursor-grabbing transition-all duration-200 select-none"
                                                    title="Drag to center canvas or click to insert"
                                                >
                                                    <div className="flex items-start gap-2.5">
                                                        <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center flex-shrink-0 transition-all">
                                                            <Icon className="w-4 h-4" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center justify-between mb-0.5">
                                                                <h4 className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                                                                    <span>{item.label}</span>
                                                                </h4>
                                                                <div className="flex items-center gap-1">
                                                                    <span className="text-[10px] text-indigo-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                                                        Drag / + Insert
                                                                    </span>
                                                                    <GripVertical className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400" />
                                                                </div>
                                                            </div>
                                                            <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        ) : activeTabLeft === 'palette' ? (
                            <div className="flex-1 flex flex-col overflow-hidden p-4">
                                <div className="mb-3 p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs">
                                    <div className="text-[11px] text-indigo-300 font-bold mb-1 flex items-center gap-1.5">
                                        <Puzzle className="w-3.5 h-3.5 text-indigo-400" />
                                        <span>Drag & Drop Page Blocks</span>
                                    </div>
                                    <p className="text-[11px] text-slate-400 leading-relaxed">
                                        <strong>Drag</strong> blocks onto the center canvas to insert at your desired position.
                                    </p>
                                </div>

                                {/* Search Box */}
                                <div className="relative mb-3">
                                    <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        value={paletteSearch}
                                        onChange={(e) => setPaletteSearch(e.target.value)}
                                        placeholder="Search puzzle pieces..."
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
                                <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar">
                                    {filteredPalette.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <div
                                                key={item.type}
                                                draggable={true}
                                                onDragStart={(e) => {
                                                    e.dataTransfer.setData(
                                                        'application/rakitan-block',
                                                        JSON.stringify({ type: item.type })
                                                    );
                                                    e.dataTransfer.effectAllowed = 'copy';
                                                    setDraggingPaletteItem({
                                                        category: 'block',
                                                        type: item.type,
                                                        label: item.label,
                                                    });
                                                }}
                                                onDragEnd={() => {
                                                    setDraggingPaletteItem(null);
                                                }}
                                                onClick={() => handleAddBlock(item.type)}
                                                className="group p-3.5 rounded-2xl bg-slate-950 border border-slate-800/90 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 cursor-grab active:cursor-grabbing transition-all duration-200 select-none"
                                                title="Drag to center canvas or click to add"
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
                                                            <div className="flex items-center gap-1">
                                                                <span className="text-[10px] text-indigo-400/80 uppercase font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    Drag / + Add
                                                                </span>
                                                                <GripVertical className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400" />
                                                            </div>
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
                                    Current page structure. Click any item to configure its properties.
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
                                                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm'
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
                                                    title="Duplicate"
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
                                                    title="Delete"
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
                <main className="flex-1 overflow-y-auto bg-slate-950/60 p-4 sm:p-8 flex flex-col items-center">
                    <div
                        className="transition-all duration-300 w-full flex flex-col items-center"
                        style={{
                            transform: zoomScale !== 1 ? `scale(${zoomScale})` : undefined,
                            transformOrigin: 'top center',
                        }}
                    >
                        {deviceMode === 'mobile' ? (
                            <div className="w-[395px] rounded-[52px] border-[12px] border-slate-800 bg-slate-950 shadow-2xl shadow-slate-950/90 overflow-hidden relative flex flex-col my-4 ring-1 ring-slate-700/50">
                                {/* Mobile Top Notch & Status Bar */}
                                <div className="h-10 bg-slate-950 px-6 flex items-center justify-between text-[11px] font-semibold text-slate-400 select-none z-30 border-b border-slate-900 flex-shrink-0">
                                    <span>9:41</span>
                                    {/* Dynamic Island */}
                                    <div className="w-24 h-5 rounded-full bg-black border border-slate-800/80 flex items-center justify-end px-2 gap-1.5 shadow-inner">
                                        <div className="w-2 h-2 rounded-full bg-indigo-950 border border-indigo-500/40" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Wifi className="w-3.5 h-3.5" />
                                        <Battery className="w-3.5 h-3.5" />
                                    </div>
                                </div>

                                {/* Mobile Scrollable Viewport */}
                                <div className="w-full max-h-[720px] overflow-y-auto bg-slate-950 custom-scrollbar">
                                    {renderCanvasBlocks()}
                                </div>

                                {/* Mobile Bottom Home Bar */}
                                <div className="h-6 bg-slate-950 flex items-center justify-center border-t border-slate-900 flex-shrink-0">
                                    <div className="w-28 h-1 rounded-full bg-slate-600" />
                                </div>
                            </div>
                        ) : deviceMode === 'tablet' ? (
                            <div className="w-[790px] max-w-full rounded-[36px] border-[14px] border-slate-800 bg-slate-950 shadow-2xl shadow-slate-950/90 overflow-hidden relative flex flex-col my-4 ring-1 ring-slate-700/50">
                                {/* Tablet Top Camera Bezel */}
                                <div className="h-6 bg-slate-950 flex items-center justify-center border-b border-slate-900 flex-shrink-0">
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700 border border-slate-600/50" />
                                </div>

                                {/* Tablet Scrollable Viewport */}
                                <div className="w-full max-h-[820px] overflow-y-auto bg-slate-950 custom-scrollbar">
                                    {renderCanvasBlocks()}
                                </div>
                            </div>
                        ) : (
                            <div className="w-full min-h-[600px] flex flex-col">
                                {renderCanvasBlocks()}
                            </div>
                        )}
                    </div>
                </main>

                {/* Right Panel: Inspector & Settings */}
                {!isPreviewMode && (
                    <aside className="w-80 border-l border-slate-800 bg-slate-900/90 backdrop-blur-md flex flex-col flex-shrink-0 z-30">
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
                                <span>Block Settings</span>
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
                                <span>Page & SEO</span>
                            </button>
                        </div>

                        {/* Content Tab Right */}
                        <div className="flex-1 overflow-y-auto p-5 text-slate-100">
                            {activeTabRight === 'block' ? (
                                selectedBlock && selectedDef ? (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                                                    <selectedDef.icon className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xs font-bold text-white">
                                                        {selectedDef.label}
                                                    </h3>
                                                    <p className="text-[10px] font-mono text-slate-400">
                                                        ID: {selectedBlock.id.substring(0, 16)}...
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(selectedBlock.id)}
                                                className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                                                title="Delete This Block"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Status Mode Custom vs Default Template */}
                                        {selectedBlock.props?.isCustom ? (
                                            <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-xs flex flex-col gap-2">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-1.5 font-bold text-purple-300">
                                                        <Wand2 className="w-4 h-4 text-purple-400" />
                                                        <span>Custom Mode (Full Editable)</span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleResetBlockToDefault(selectedBlock.id)}
                                                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium bg-purple-900/50 hover:bg-purple-800/80 text-purple-200 transition-colors"
                                                        title="Revert back to default template format"
                                                    >
                                                        <RotateCcw className="w-3 h-3" />
                                                        <span>Reset Template</span>
                                                    </button>
                                                </div>
                                                <p className="text-[11px] text-slate-300 leading-relaxed">
                                                    This block is now in free custom mode. You can remove sub-components, add micro-components anywhere, and drag & drop element order.
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs flex flex-col gap-2">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-1.5 font-semibold text-slate-300">
                                                        <Sparkles className="w-4 h-4 text-indigo-400" />
                                                        <span>Default Template</span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleConvertBlockToCustom(selectedBlock.id)}
                                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-sm shadow-indigo-600/30"
                                                        title="Unlock full editing freedom by converting default elements into sub-components"
                                                    >
                                                        <Wand2 className="w-3 h-3" />
                                                        <span>Make Custom</span>
                                                    </button>
                                                </div>
                                                <p className="text-[11px] text-slate-400 leading-relaxed">
                                                    Hover over any element on the canvas (Badge, Title, Buttons) and click Remove to automatically switch to freely editable custom mode.
                                                </p>
                                            </div>
                                        )}

                                        {/* Render Block Inspector Form */}
                                        <selectedDef.SettingsComponent
                                            props={selectedBlock.props || {}}
                                            updateProps={handleUpdateBlockProps}
                                        />
                                    </div>
                                ) : (
                                    <div className="py-16 text-center text-slate-400">
                                        <Sliders className="w-8 h-8 mx-auto mb-2 opacity-50 text-slate-500" />
                                        <p className="text-xs font-semibold text-slate-300">Select a block on the canvas</p>
                                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                                            Click any block to adjust its text, layout, colors, and visual styling.
                                        </p>
                                    </div>
                                )
                            ) : (
                                /* Page & SEO Settings */
                                <div className="space-y-4 text-xs">
                                    <div>
                                        <label className="block font-semibold text-slate-300 mb-1.5">
                                            Page Title <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-semibold text-slate-300 mb-1.5">
                                            URL Slug
                                        </label>
                                        <input
                                            type="text"
                                            value={slug}
                                            onChange={(e) => setSlug(e.target.value)}
                                            className="w-full px-3 py-2 font-mono rounded-xl bg-slate-900 border border-slate-700/80 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                        />
                                        <p className="mt-1.5 text-[11px] text-slate-400">
                                            Public URL: /{slug === 'home' ? '' : slug}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block font-semibold text-slate-300 mb-1.5">
                                            Publication Status
                                        </label>
                                        <select
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                        >
                                            <option value="draft">Draft (Private to Admin)</option>
                                            <option value="published">Published (Publicly Accessible)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block font-semibold text-slate-300 mb-1.5">
                                            Page Layout Template
                                        </label>
                                        <select
                                            value={layout}
                                            onChange={(e) => setLayout(e.target.value)}
                                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                        >
                                            <option value="default">Default (Full Header & Footer)</option>
                                            <option value="blank">Blank / Canvas (No Header & Footer - LP)</option>
                                            <option value="boxed">Contained Box (Centered Elegant Card)</option>
                                            <option value="sidebar">With Dynamic Sidebar (Widgets)</option>
                                        </select>
                                        <p className="mt-1.5 text-[11px] text-slate-400">
                                            {layout === 'blank' && 'Renders only blocks with zero surrounding chrome. Perfect for standalone landing pages.'}
                                            {layout === 'default' && 'Standard full-width responsive layout with navigation header and footer.'}
                                            {layout === 'boxed' && 'Wraps puzzle blocks in an elevated container with subtle glow.'}
                                            {layout === 'sidebar' && 'Adds interactive Search, Categories, and Recent Posts widgets beside page content.'}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-slate-800">
                                        <h4 className="font-bold text-white mb-3">SEO & Metadata</h4>

                                        <div className="space-y-3">
                                            <div>
                                                <label className="block font-semibold text-slate-300 mb-1.5">
                                                    Meta Title
                                                </label>
                                                <input
                                                    type="text"
                                                    value={metaTitle}
                                                    onChange={(e) => setMetaTitle(e.target.value)}
                                                    placeholder="Search engine title tag..."
                                                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-semibold text-slate-300 mb-1.5">
                                                    Meta Description
                                                </label>
                                                <textarea
                                                    rows={4}
                                                    value={metaDescription}
                                                    onChange={(e) => setMetaDescription(e.target.value)}
                                                    placeholder="Search engine summary description..."
                                                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none leading-relaxed"
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
