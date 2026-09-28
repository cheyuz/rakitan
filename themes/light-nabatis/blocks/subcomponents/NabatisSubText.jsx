import React from 'react';
import InlineText from '@/Blocks/Components/InlineText';

export default function NabatisSubText({ props = {}, isEditing, handlePropChange }) {
    const {
        text = 'Tambahkan paragraf penjelasan atau kutipan inspiratif di sini.',
        variant = 'body',
        align = 'left',
    } = props;

    const alignClass = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    }[align] || 'text-left';

    const variantClass = {
        h2: 'text-2xl sm:text-3xl font-extrabold text-[#14281a] font-[\'Outfit\',sans-serif]',
        h3: 'text-xl sm:text-2xl font-bold text-[#14281a] font-[\'Outfit\',sans-serif]',
        h4: 'text-lg font-bold text-[#14281a] font-[\'Outfit\',sans-serif]',
        lead: 'text-base sm:text-lg text-[#2d6a4f] font-medium leading-relaxed',
        body: 'text-xs sm:text-sm text-[#3b5943] leading-relaxed',
        small: 'text-[11px] text-[#63806a] leading-relaxed',
    }[variant] || 'text-xs sm:text-sm text-[#3b5943]';

    return (
        <div className={`w-full my-1.5 ${alignClass}`}>
            <p className={variantClass}>
                <InlineText
                    value={text}
                    onChange={(val) => handlePropChange('text', val)}
                    placeholder="Teks Nabatis..."
                    multiline
                />
            </p>
        </div>
    );
}
