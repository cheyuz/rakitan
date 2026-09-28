import React from 'react';

export default function SpacerBlock({ props = {} }) {
    const {
        height = 'md',
        showDivider = true,
    } = props;

    const heightClasses = {
        sm: 'h-8 sm:h-10',
        md: 'h-14 sm:h-16',
        lg: 'h-20 sm:h-24',
        xl: 'h-28 sm:h-32',
    }[height] || 'h-14 sm:h-16';

    return (
        <div className={`w-full flex items-center justify-center ${heightClasses} px-6 bg-[#ffffff]`}>
            {showDivider ? (
                <div className="w-full max-w-4xl flex items-center justify-center gap-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#cce0d0]" />
                    <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
                        <div className="w-3 h-1 rounded-full bg-[#52b788]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#d4a373]" />
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#cce0d0]" />
                </div>
            ) : null}
        </div>
    );
}
