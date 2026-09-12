import React, { useState, useEffect, useRef } from 'react';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';
import { Edit2 } from 'lucide-react';

/**
 * InlineText - Komponen teks dengan live direct editing di visual preview.
 * Pada public page / preview mode, hanya merender tag HTML biasa tanpa overhead.
 * Pada builder canvas, teks dapat diklik dan diedit langsung di tempat secara real-time.
 */
export default function InlineText({
    value = '',
    onChange,
    as: Tag = 'span',
    className = '',
    placeholder = 'Ketik teks...',
    multiline = false,
}) {
    const { isEditing } = useCanvasEdit();
    const [isFocused, setIsFocused] = useState(false);
    const [localValue, setLocalValue] = useState(value || '');
    const inputRef = useRef(null);

    // Sinkronisasi jika nilai luar berubah (misal dari sidebar inspector)
    useEffect(() => {
        setLocalValue(value || '');
    }, [value]);

    // Auto focus saat mulai mengedit
    useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
            if (multiline) {
                // Auto resize textarea
                inputRef.current.style.height = 'auto';
                inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
            }
        }
    }, [isFocused, multiline]);

    // Jika di luar builder canvas (public page / view mode), render HTML biasa
    if (!isEditing || !onChange) {
        return <Tag className={className}>{value || placeholder}</Tag>;
    }

    const handleBlur = () => {
        setIsFocused(false);
        if (localValue !== value) {
            onChange(localValue);
        }
    };

    const handleChange = (e) => {
        const val = e.target.value;
        setLocalValue(val);
        if (multiline && inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
        onChange(val);
    };

    const handleKeyDown = (e) => {
        if (!multiline && e.key === 'Enter') {
            e.preventDefault();
            inputRef.current?.blur();
        } else if (e.key === 'Escape') {
            setLocalValue(value || '');
            setIsFocused(false);
        }
    };

    if (isFocused) {
        if (multiline) {
            return (
                <textarea
                    ref={inputRef}
                    value={localValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    onClick={(e) => e.stopPropagation()}
                    className={`${className} resize-none bg-indigo-950/40 outline-none ring-2 ring-indigo-500 rounded-lg p-1.5 transition-all overflow-hidden block w-full shadow-inner`}
                    placeholder={placeholder}
                    rows={1}
                />
            );
        }

        return (
            <input
                ref={inputRef}
                type="text"
                value={localValue}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                onClick={(e) => e.stopPropagation()}
                className={`${className} bg-indigo-950/40 outline-none ring-2 ring-indigo-500 rounded-lg px-2 py-0.5 transition-all w-full max-w-full inline-block shadow-inner`}
                placeholder={placeholder}
            />
        );
    }

    return (
        <Tag
            onClick={(e) => {
                e.stopPropagation();
                setIsFocused(true);
            }}
            className={`${className} group/inline relative cursor-pointer outline-dashed outline-1 outline-transparent hover:outline-indigo-400/80 hover:bg-indigo-500/10 rounded px-1 -mx-1 transition-all inline-block`}
            title="Klik untuk edit teks langsung di preview"
        >
            {value || <span className="opacity-50 italic">{placeholder}</span>}
            <span className="opacity-0 group-hover/inline:opacity-100 transition-opacity absolute -top-3 -right-2 bg-indigo-600 text-white rounded p-0.5 shadow pointer-events-none z-20">
                <Edit2 className="w-2.5 h-2.5" />
            </span>
        </Tag>
    );
}
