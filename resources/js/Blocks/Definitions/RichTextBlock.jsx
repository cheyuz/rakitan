import React, { useMemo } from 'react';
import DOMPurify from 'dompurify';
import { AlignLeft, AlignCenter, AlignJustify } from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import SubComponentSlot from '@/Blocks/SubComponents/SubComponentSlot';
import DefaultElementWrapper from '@/Blocks/Components/DefaultElementWrapper';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

export const RichTextComponent = ({ props = {}, blockId }) => {
    const {
        title = '',
        content = '<p>Rakitan was born from the vision to deliver a CMS that does not bloat servers with conflicting plugins, while still giving creators the freedom to assemble stunning web pages.</p>',
        containerWidth = 'normal',
        alignment = 'left',
        dropCap = false,
        subComponents = [],
        isCustom = false,
    } = props;

    const { onUpdateBlockProp, isEditing } = useCanvasEdit();

    const handlePropChange = (key, val) => {
        if (onUpdateBlockProp && blockId) {
            onUpdateBlockProp(blockId, key, val);
        }
    };

    const widthClasses = {
        narrow: 'max-w-2xl',
        normal: 'max-w-4xl',
        wide: 'max-w-6xl',
    }[containerWidth] || 'max-w-4xl';

    const alignClasses = {
        left: 'text-left',
        center: 'text-center',
        justify: 'text-justify',
    }[alignment] || 'text-left';

    // DOMPurify sanitization to prevent XSS injection
    const sanitizedHtml = useMemo(() => {
        return DOMPurify.sanitize(content || '', {
            ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'hr', 'br', 'span'],
            ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
        });
    }, [content]);

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-100 transition-colors duration-200">
            <div className={`mx-auto ${widthClasses} ${alignClasses}`}>
                {isCustom ? (
                    <div className="w-full">
                        <SubComponentSlot
                            blockId={blockId}
                            subComponents={subComponents}
                            emptyPlaceholder="+ Tambahkan Sub-Komponen ke Blok Rich Text Kustom Ini"
                        />
                    </div>
                ) : (
                    <>
                        {(title || isEditing) && (
                            <DefaultElementWrapper
                                blockId={blockId}
                                elementKey="title"
                                label="Judul Artikel"
                                isCustom={isCustom}
                            >
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-8">
                                    <InlineText
                                        value={title}
                                        onChange={(val) => handlePropChange('title', val)}
                                        placeholder="Judul Artikel / Rich Text"
                                        as="span"
                                    />
                                </h2>
                            </DefaultElementWrapper>
                        )}

                        <DefaultElementWrapper
                            blockId={blockId}
                            elementKey="content"
                            label="Konten HTML"
                            isCustom={isCustom}
                        >
                            <div
                                className={`prose prose-invert max-w-none text-base sm:text-lg leading-relaxed text-slate-300 ${
                                    dropCap ? 'first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-indigo-400' : ''
                                }`}
                                dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
                            />
                        </DefaultElementWrapper>

                        {/* Dynamic Sub-Components Slot */}
                        <div className="w-full mt-10">
                            <SubComponentSlot
                                blockId={blockId}
                                subComponents={subComponents}
                                emptyPlaceholder="+ Tambah Sub-Komponen ke Rich Text"
                            />
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export const RichTextSettings = ({ props, updateProps }) => {
    return (
        <div className="space-y-4 text-xs">
            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Section Title (Optional)</label>
                <input
                    type="text"
                    value={props.title || ''}
                    onChange={(e) => updateProps({ title: e.target.value })}
                    placeholder="Article or section heading..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
            </div>

            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">HTML / Article Content</label>
                <textarea
                    rows={8}
                    value={props.content || ''}
                    onChange={(e) => updateProps({ content: e.target.value })}
                    placeholder="<p>Write your article paragraphs or HTML content here...</p>"
                    className="w-full font-mono text-xs px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all leading-relaxed"
                />
                <p className="mt-1.5 text-[11px] text-slate-400">
                    Supports standard HTML tags (&lt;p&gt;, &lt;h3&gt;, &lt;strong&gt;, &lt;ul&gt;). Protected by DOMPurify XSS filter.
                </p>
            </div>

            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Container Width</label>
                <select
                    value={props.containerWidth || 'normal'}
                    onChange={(e) => updateProps({ containerWidth: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                >
                    <option value="narrow">Narrow (Blog / Article - max-w-2xl)</option>
                    <option value="normal">Normal (Standard - max-w-4xl)</option>
                    <option value="wide">Wide (Full Width - max-w-6xl)</option>
                </select>
            </div>

            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Text Alignment</label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl">
                    {[
                        { id: 'left', label: 'Left', icon: AlignLeft },
                        { id: 'center', label: 'Center', icon: AlignCenter },
                        { id: 'justify', label: 'Justify', icon: AlignJustify },
                    ].map((align) => {
                        const Icon = align.icon;
                        const isSelected = (props.alignment || 'left') === align.id;
                        return (
                            <button
                                key={align.id}
                                type="button"
                                onClick={() => updateProps({ alignment: align.id })}
                                className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                    isSelected
                                        ? 'bg-indigo-600 text-white shadow-sm'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                                }`}
                            >
                                <Icon className="w-3.5 h-3.5" />
                                <span>{align.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <span className="font-semibold text-slate-300">Drop Cap (Enlarge First Letter)</span>
                <input
                    type="checkbox"
                    checked={Boolean(props.dropCap)}
                    onChange={(e) => updateProps({ dropCap: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-700 bg-slate-900 cursor-pointer"
                />
            </div>
        </div>
    );
};
