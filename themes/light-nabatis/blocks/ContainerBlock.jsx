import React from 'react';
import SubComponentSlot from '@/Blocks/SubComponents/SubComponentSlot';

export default function ContainerBlock({ props = {}, blockId }) {
    const {
        subComponents = [],
        padding = 'md',
        background = 'default',
    } = props;

    const bgClasses = {
        default: 'bg-[#f4f7f4]',
        white: 'bg-[#ffffff]',
        tint: 'bg-[#edf7ef]',
    }[background] || 'bg-[#f4f7f4]';

    const paddingClasses = {
        sm: 'py-8 md:py-12',
        md: 'py-12 md:py-16',
        lg: 'py-16 md:py-24',
    }[padding] || 'py-12 md:py-16';

    return (
        <section className={`relative overflow-hidden ${bgClasses} ${paddingClasses} text-[#182a1d]`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#dce8dd] shadow-sm">
                    {/* Top Accent Strip */}
                    <div className="h-1.5 -mx-6 sm:-mx-10 -mt-6 sm:-mt-10 mb-8 bg-gradient-to-r from-[#2d6a4f] via-[#52b788] to-[#d4a373] rounded-t-3xl" />
                    <SubComponentSlot
                        blockId={blockId}
                        subComponents={subComponents}
                        emptyPlaceholder="+ Tambahkan Elemen / Sub-Komponen ke Container Nabatis Ini"
                    />
                </div>
            </div>
        </section>
    );
}
