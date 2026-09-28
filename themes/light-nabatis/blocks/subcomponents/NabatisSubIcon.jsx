import React from 'react';
import { Leaf, Sprout, Sparkles, Droplets, SunMedium } from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';

export default function NabatisSubIcon({ props = {}, isEditing, handlePropChange }) {
    const {
        title = 'Kualitas Teruji',
        description = 'Standar ekstraksi higienis mutu tinggi.',
        icon = 'Leaf',
    } = props;

    const renderIcon = () => {
        const cls = 'w-6 h-6 text-[#2d6a4f]';
        if (icon === 'Sprout') return <Sprout className={cls} />;
        if (icon === 'Droplets') return <Droplets className={cls} />;
        if (icon === 'SunMedium') return <SunMedium className={cls} />;
        return <Leaf className={cls} />;
    };

    return (
        <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#edf7ef]/70 border border-[#dce8dd]">
            <div className="p-2.5 rounded-xl bg-white text-[#2d6a4f] shadow-xs border border-[#b7e4c7] flex-shrink-0">
                {renderIcon()}
            </div>
            <div>
                <h5 className="font-bold text-xs text-[#14281a] font-['Outfit',sans-serif]">
                    <InlineText
                        value={title}
                        onChange={(val) => handlePropChange('title', val)}
                        placeholder="Icon Title"
                    />
                </h5>
                <p className="text-[11px] text-[#4a6351] mt-0.5 leading-relaxed">
                    <InlineText
                        value={description}
                        onChange={(val) => handlePropChange('description', val)}
                        placeholder="Icon description..."
                    />
                </p>
            </div>
        </div>
    );
}
