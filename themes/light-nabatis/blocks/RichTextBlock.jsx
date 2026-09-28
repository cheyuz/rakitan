import React from 'react';
import DOMPurify from 'dompurify';
import InlineText from '@/Blocks/Components/InlineText';
import SubComponentSlot from '@/Blocks/SubComponents/SubComponentSlot';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

export default function RichTextBlock({ props = {}, blockId }) {
    const {
        content = '<p>Tuliskan narasi dan konten artikel berkualitas Anda di sini dengan gaya tipografi Light Nabatis yang menenangkan mata dan nyaman dibaca.</p>',
        padding = 'md',
        subComponents = [],
        isCustom = false,
    } = props;

    const { onUpdateBlockProp, isEditing } = useCanvasEdit();

    const handlePropChange = (key, val) => {
        if (onUpdateBlockProp && blockId) {
            onUpdateBlockProp(blockId, key, val);
        }
    };

    const sanitizedHtml = DOMPurify.sanitize(content || '', {
        USE_PROFILES: { html: true },
    });

    const paddingClasses = {
        sm: 'py-8 md:py-12',
        md: 'py-12 md:py-16',
        lg: 'py-16 md:py-24',
    }[padding] || 'py-12 md:py-16';

    return (
        <section className={`relative overflow-hidden bg-[#ffffff] text-[#182a1d] ${paddingClasses}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {isCustom ? (
                    <SubComponentSlot
                        blockId={blockId}
                        subComponents={subComponents}
                        emptyPlaceholder="+ Tambahkan Sub-Komponen ke Blok Rich Text Nabatis"
                    />
                ) : (
                    <div className="relative p-6 sm:p-10 rounded-3xl bg-[#f7faf7] border border-[#dce8dd] shadow-xs border-l-4 border-l-[#2d6a4f]">
                        <div
                            className="prose prose-emerald max-w-none text-sm sm:text-base leading-relaxed text-[#243d2c]"
                            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
