import React from 'react';
import { Leaf, Sparkles, Sprout } from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';

export default function NabatisSubBadge({ props = {}, isEditing, handlePropChange }) {
    const {
        text = '🌿 Nabatis Organik',
        color = 'emerald',
        pill = true,
    } = props;

    return (
        <div className="inline-block">
            <div
                className={`inline-flex items-center gap-2 px-3.5 py-1 text-xs font-bold bg-[#edf7ef] text-[#2d6a4f] border border-[#b7e4c7] shadow-xs backdrop-blur-sm ${
                    pill ? 'rounded-full' : 'rounded-tl-lg rounded-br-lg rounded-tr-xs rounded-bl-xs'
                }`}
            >
                <Leaf className="w-3.5 h-3.5 text-[#52b788]" />
                <InlineText
                    value={text}
                    onChange={(val) => handlePropChange('text', val)}
                    placeholder="Badge Text"
                />
                <div className="flex items-center gap-0.5 pl-1 border-l border-[#c5d8c8]">
                    <div className="w-1 h-1 rounded-full bg-[#2d6a4f]" />
                    <div className="w-1 h-1 rounded-full bg-[#d4a373]" />
                </div>
            </div>
        </div>
    );
}
