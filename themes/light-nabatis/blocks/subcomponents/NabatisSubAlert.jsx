import React from 'react';
import { AlertCircle, CheckCircle2, Info, Sparkles, Leaf } from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';

export default function NabatisSubAlert({ props = {}, isEditing, handlePropChange }) {
    const {
        title = 'Informasi Khusus Nabatis',
        content = 'Seluruh produk diolah dalam fasilitas steril bebas kontaminasi hewani dan bahan kimia sintetis.',
        type = 'info',
    } = props;

    return (
        <div className="w-full my-2">
            <div className="relative overflow-hidden p-4 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-[#edf7ef] border-l-4 border-l-[#2d6a4f] border-t border-r border-b border-[#cce0d0] text-[#1e3b26] shadow-xs">
                {/* Mini Multi-Color Strip Top Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2d6a4f] via-[#52b788] to-[#d4a373] opacity-60" />

                <div className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-[#d8f3dc] text-[#2d6a4f] mt-0.5 flex-shrink-0">
                        <Leaf className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                        <h5 className="font-bold text-xs mb-1 text-[#14281a]">
                            <InlineText
                                value={title}
                                onChange={(val) => handlePropChange('title', val)}
                                placeholder="Alert Title"
                            />
                        </h5>
                        <p className="text-xs leading-relaxed text-[#3b5943]">
                            <InlineText
                                value={content}
                                onChange={(val) => handlePropChange('content', val)}
                                placeholder="Alert Content..."
                                as="span"
                            />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
