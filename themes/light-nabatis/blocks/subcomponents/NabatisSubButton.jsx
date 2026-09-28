import React from 'react';
import { ArrowRight, Sparkles, ExternalLink, Download, Sprout } from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';

export default function NabatisSubButton({ props = {}, isEditing, handlePropChange }) {
    const {
        text = 'Klik Di Sini',
        url = '#',
        variant = 'primary',
        size = 'md',
        icon = 'ArrowRight',
        targetBlank = false,
    } = props;

    const sizeClass = {
        sm: 'px-4 py-2 text-xs',
        md: 'px-6 py-3 text-sm',
        lg: 'px-8 py-3.5 text-base',
    }[size] || 'px-6 py-3 text-sm';

    const variantClass = {
        primary: 'btn-nabatis-primary shadow-md shadow-[#2d6a4f]/20',
        secondary: 'btn-nabatis-secondary shadow-xs',
        gradient: 'bg-gradient-to-r from-[#2d6a4f] via-[#52b788] to-[#d4a373] hover:opacity-95 text-white shadow-md shadow-[#2d6a4f]/20',
        outline: 'border-2 border-[#2d6a4f] text-[#2d6a4f] hover:bg-[#edf7ef]',
        ghost: 'text-[#2d6a4f] hover:bg-[#edf7ef]/70',
    }[variant] || 'btn-nabatis-primary';

    const renderIcon = () => {
        if (icon === 'Sparkles') return <Sparkles className="w-4 h-4 text-[#e9d8a6]" />;
        if (icon === 'ExternalLink') return <ExternalLink className="w-4 h-4" />;
        if (icon === 'Download') return <Download className="w-4 h-4" />;
        if (icon === 'ArrowRight') return <ArrowRight className="w-4 h-4 text-[#b7e4c7]" />;
        return <Sprout className="w-4 h-4 text-[#74c69d]" />;
    };

    const inlineBtnStyle = variant === 'secondary'
        ? { backgroundColor: '#ffffff', color: '#2d6a4f', borderColor: '#b7e4c7' }
        : { backgroundColor: '#2d6a4f', color: '#ffffff' };

    return (
        <div className="inline-flex items-center">
            <a
                href={isEditing ? undefined : (url || '#')}
                target={targetBlank ? '_blank' : undefined}
                rel={targetBlank ? 'noreferrer' : undefined}
                onClick={(e) => {
                    if (isEditing) e.preventDefault();
                }}
                style={inlineBtnStyle}
                className={`inline-flex items-center gap-2.5 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm font-bold transition-all duration-200 active:scale-95 ${sizeClass} ${variantClass}`}
            >
                <InlineText
                    value={text}
                    onChange={(val) => handlePropChange('text', val)}
                    placeholder="Tombol Nabatis"
                />
                {renderIcon()}
            </a>
        </div>
    );
}
