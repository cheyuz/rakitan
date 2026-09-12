import React, { useState } from 'react';
import { Plus, Sparkles, X, ChevronRight } from 'lucide-react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    arrayMove,
} from '@dnd-kit/sortable';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';
import { getAllSubComponents } from './subRegistry';
import SubComponentRenderer from './SubComponentRenderer';

/**
 * SubComponentSlot - Slot dinamis di dalam suatu Block atau Kolom Row untuk menampung mikro komponen.
 * Mendukung drag-and-drop sortable menggunakan @dnd-kit.
 */
export default function SubComponentSlot({
    blockId,
    subComponents = [],
    slotPath = null,
    className = '',
    emptyPlaceholder = 'Tambahkan komponen mikro dinamis ke blok ini...',
}) {
    const {
        isEditing,
        onAddSubComponent,
        onReorderSubComponents,
        draggingPaletteItem,
        onEndDragPaletteItem,
    } = useCanvasEdit();
    const [isOpenPicker, setIsOpenPicker] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);

    const allAvailableSubComponents = getAllSubComponents();

    const handleSelectSub = (type) => {
        if (onAddSubComponent) {
            onAddSubComponent(blockId, type, slotPath);
        }
        setIsOpenPicker(false);
    };

    // Native HTML5 Drag and Drop handlers to receive drop from left panel
    const handleNativeDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy';
        if (!isDragOver) setIsDragOver(true);
    };

    const handleNativeDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };

    const handleNativeDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Only turn off if cursor leaves the slot container entirely
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsDragOver(false);
        }
    };

    const handleNativeDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);

        let subType = null;
        try {
            const rawData = e.dataTransfer.getData('application/rakitan-subcomponent');
            if (rawData) {
                const parsed = JSON.parse(rawData);
                subType = parsed.type;
            }
        } catch (err) {}

        // Fallback to draggingPaletteItem in context
        if (!subType && draggingPaletteItem?.category === 'subcomponent') {
            subType = draggingPaletteItem.type;
        }

        if (subType && onAddSubComponent) {
            onAddSubComponent(blockId, subType, slotPath);
        }

        if (onEndDragPaletteItem) {
            onEndDragPaletteItem();
        }
    };

    // Dnd-Kit Sensors for drag & drop between existing sub-components
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

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = subComponents.findIndex((s) => s.id === active.id);
        const newIndex = subComponents.findIndex((s) => s.id === over.id);

        if (oldIndex !== -1 && newIndex !== -1 && onReorderSubComponents) {
            onReorderSubComponents(blockId, oldIndex, newIndex, slotPath);
        }
    };

    // Public / Non-Editing Mode
    if (!isEditing) {
        if (!subComponents || subComponents.length === 0) return null;

        return (
            <div className={`w-full flex flex-col space-y-3 ${className}`}>
                {subComponents.map((sub, idx) => (
                    <SubComponentRenderer
                        key={sub.id || idx}
                        subComponent={sub}
                        blockId={blockId}
                        slotPath={slotPath}
                        isFirst={idx === 0}
                        isLast={idx === subComponents.length - 1}
                    />
                ))}
            </div>
        );
    }

    const isDraggingSubcomponent = draggingPaletteItem?.category === 'subcomponent';

    // Canvas Builder Mode with Drag and Drop
    return (
        <div
            onDragOver={handleNativeDragOver}
            onDragEnter={handleNativeDragEnter}
            onDragLeave={handleNativeDragLeave}
            onDrop={handleNativeDrop}
            className={`w-full my-1.5 transition-all duration-200 relative rounded-2xl ${
                isDragOver
                    ? 'ring-2 ring-indigo-400 bg-indigo-500/15 p-2 shadow-2xl scale-[1.01]'
                    : isDraggingSubcomponent
                    ? 'ring-1 ring-dashed ring-indigo-500/40 bg-indigo-500/5 p-1'
                    : ''
            } ${className}`}
        >
            {/* Active Drop Zone Indicator during Drag Hover */}
            {isDragOver && (
                <div className="w-full my-2 py-4 px-4 rounded-xl border-2 border-dashed border-indigo-400 bg-indigo-500/25 shadow-inner flex items-center justify-center gap-2 text-indigo-200 font-bold text-xs animate-pulse pointer-events-none">
                    <Sparkles className="w-4 h-4 text-indigo-300 animate-spin" />
                    <span>📥 Drop here to insert {draggingPaletteItem?.label || 'micro-component'}!</span>
                </div>
            )}
            {/* Sub-Components List with DnD Sortable */}
            {subComponents && subComponents.length > 0 && (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={subComponents.map((s) => s.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="w-full flex flex-col space-y-2 mb-2">
                            {subComponents.map((sub, idx) => (
                                <SubComponentRenderer
                                    key={sub.id || idx}
                                    subComponent={sub}
                                    blockId={blockId}
                                    slotPath={slotPath}
                                    isFirst={idx === 0}
                                    isLast={idx === subComponents.length - 1}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            )}

            {/* Add Sub-Component Button */}
            <div className="relative flex items-center justify-center my-2">
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpenPicker(!isOpenPicker);
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-dashed transition-all duration-200 text-xs font-semibold ${
                        subComponents.length === 0
                            ? 'border-indigo-500/40 bg-indigo-500/5 hover:bg-indigo-500/10 text-indigo-300 w-full justify-center py-2.5'
                            : 'border-slate-700/80 bg-slate-900/60 hover:border-indigo-500/60 text-slate-400 hover:text-white'
                    }`}
                >
                    <Plus className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{subComponents.length === 0 ? emptyPlaceholder : 'Add Sub-Component'}</span>
                </button>

                {/* Popover Menu for Sub-Components Selection */}
                {isOpenPicker && (
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute bottom-full mb-2 z-50 w-72 sm:w-80 max-h-96 overflow-y-auto p-3 rounded-2xl bg-slate-900/95 border border-slate-700/90 shadow-2xl backdrop-blur-xl custom-scrollbar"
                    >
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                                <span>Select Micro-Component</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsOpenPicker(false)}
                                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        <div className="space-y-1.5">
                            {allAvailableSubComponents.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={item.type}
                                        type="button"
                                        onClick={() => handleSelectSub(item.type)}
                                        className="w-full text-left p-2 rounded-xl hover:bg-indigo-600/15 border border-transparent hover:border-indigo-500/30 flex items-center justify-between group transition-all"
                                    >
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors">
                                                <Icon className="w-3.5 h-3.5" />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                                                    {item.label}
                                                </div>
                                                <div className="text-[10px] text-slate-400 truncate">
                                                    {item.description}
                                                </div>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 flex-shrink-0 ml-2 transition-transform group-hover:translate-x-0.5" />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
