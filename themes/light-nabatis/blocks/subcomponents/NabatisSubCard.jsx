import React from 'react';
import InlineText from '@/Blocks/Components/InlineText';
import { Leaf } from 'lucide-react';

export default function NabatisSubCard({ props = {}, isEditing, handlePropChange }) {
    const {
        title = 'Sorotan Nabatis',
        description = 'Keterangan detail manfaat alami dan kemurnian formulasi nabati.',
        padding = 'md',
    } = props;

    const padClass = {
        sm: 'p-4',
        md: 'p-6 sm:p-7',
        lg: 'p-8',
    }[padding] || 'p-6 sm:p-7';

    return (
        <div className={`relative overflow-hidden rounded-tl-3xl rounded-br-3xl rounded-tr-md rounded-bl-md bg-white border border-[#dce8dd] shadow-sm hover:shadow-md transition-all duration-200 ${padClass}`}>
            {/* Top Multi-Color Strip */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2d6a4f] via-[#52b788] via-[#b7e4c7] to-[#d4a373]" />

            <div className="flex items-center justify-between gap-2 mb-2.5">
                <h4 className="text-base font-bold text-[#14281a] font-['Outfit',sans-serif]">
                    <InlineText
                        value={title}
                        onChange={(val) => handlePropChange('title', val)}
                        placeholder="Card Title"
                    />
                </h4>
                <Leaf className="w-4 h-4 text-[#74c69d]" />
            </div>

            <p className="text-xs sm:text-sm text-[#4a6351] leading-relaxed">
                <InlineText
                    value={description}
                    onChange={(val) => handlePropChange('description', val)}
                    placeholder="Deskripsi kartu..."
                    multiline
                />
            </p>
        </div>
    );
}
