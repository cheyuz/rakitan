import React from 'react';
import { Trash2 } from 'lucide-react';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

/**
 * DefaultElementWrapper
 * Membungkus elemen bawaan blok template (Headline, Subtitle, Badge, Buttons, dll.)
 * Memberikan hover outline dan tombol mini Hapus (🗑️) saat di canvas editor.
 * Ketika diklik Hapus, blok otomatis dikonversi ke mode Custom (Full Editable)
 * dan elemen yang bersangkutan langsung dieliminasi.
 */
export default function DefaultElementWrapper({
    blockId,
    elementKey,
    label = 'Default Element',
    isCustom = false,
    className = '',
    children,
}) {
    const { isEditing, onConvertBlockToCustom } = useCanvasEdit();

    // If not in editing mode or block is already custom, render children directly
    if (!isEditing || isCustom) {
        return children;
    }

    const handleDelete = (e) => {
        e.stopPropagation();
        if (onConvertBlockToCustom && blockId) {
            onConvertBlockToCustom(blockId, elementKey);
        }
    };

    return (
        <div className={`relative group/elem transition-all duration-200 hover:outline-dashed hover:outline-1 hover:outline-indigo-400/60 rounded-lg p-0.5 -m-0.5 ${className}`}>
            {children}

            {/* Floating Mini Delete Button on Hover */}
            <button
                type="button"
                onClick={handleDelete}
                title={`Remove default ${label} & switch to custom mode`}
                className="opacity-0 group-hover/elem:opacity-100 pointer-events-auto absolute -top-3 right-0 z-30 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-600/90 hover:bg-red-500 text-white text-[10px] font-medium shadow-md shadow-red-950/40 backdrop-blur-sm transition-all duration-150 transform hover:scale-105 active:scale-95"
            >
                <Trash2 className="w-2.5 h-2.5 text-red-100" />
                <span>Remove {label}</span>
            </button>
        </div>
    );
}
