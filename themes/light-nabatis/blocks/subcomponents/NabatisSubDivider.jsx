import React from 'react';

export default function NabatisSubDivider({ props = {} }) {
    return (
        <div className="w-full my-6 flex items-center justify-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#cce0d0]" />
            <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[#2d6a4f]" />
                <div className="w-4 h-1.5 rounded-full bg-[#52b788]" />
                <div className="w-2 h-2 rounded-full bg-[#d4a373]" />
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#cce0d0]" />
        </div>
    );
}
