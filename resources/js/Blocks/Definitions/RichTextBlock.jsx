import React, { useMemo } from 'react';
import DOMPurify from 'dompurify';
import { AlignLeft, AlignCenter, AlignJustify } from 'lucide-react';

export const RichTextComponent = ({ props = {} }) => {
    const {
        title = '',
        content = '<p>Rakitan lahir dari visi untuk menghadirkan CMS yang tidak membebani server dengan puluhan plugin yang rentan konflik...</p>',
        containerWidth = 'normal',
        alignment = 'left',
        dropCap = false,
    } = props;

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

    // Gunakan DOMPurify untuk mencegah risiko injeksi XSS pada konten HTML
    const sanitizedHtml = useMemo(() => {
        return DOMPurify.sanitize(content || '', {
            ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'hr', 'br', 'span'],
            ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
        });
    }, [content]);

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 transition-colors duration-200">
            <div className={`mx-auto ${widthClasses} ${alignClasses}`}>
                {title && (
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-8">
                        {title}
                    </h2>
                )}

                <div
                    className={`prose prose-slate dark:prose-invert max-w-none text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300 ${
                        dropCap ? 'first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-indigo-600 dark:first-letter:text-indigo-400' : ''
                    }`}
                    dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
                />
            </div>
        </section>
    );
};

export const RichTextSettings = ({ props, updateProps }) => {
    return (
        <div className="space-y-4 text-xs">
            <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Judul Seksi (Opsional)</label>
                <input
                    type="text"
                    value={props.title || ''}
                    onChange={(e) => updateProps({ title: e.target.value })}
                    placeholder="Judul tulisan..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
            </div>

            <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Isi Konten (Format HTML / Teks)</label>
                <textarea
                    rows={8}
                    value={props.content || ''}
                    onChange={(e) => updateProps({ content: e.target.value })}
                    placeholder="<p>Tuliskan paragraf atau format HTML Anda di sini...</p>"
                    className="w-full font-mono text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <p className="mt-1 text-[11px] text-slate-400">
                    Mendukung tag html standar seperti &lt;p&gt;, &lt;h3&gt;, &lt;b&gt;, &lt;ul&gt;, dll. (Dilindungi DOMPurify XSS filter)
                </p>
            </div>

            <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Lebar Kontainer</label>
                <select
                    value={props.containerWidth || 'normal'}
                    onChange={(e) => updateProps({ containerWidth: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                    <option value="narrow">Ramping (Artikel / Blog - max 2xl)</option>
                    <option value="normal">Normal (Standar - max 4xl)</option>
                    <option value="wide">Lebar (Penuh - max 6xl)</option>
                </select>
            </div>

            <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1.5">Perataan Paragraf</label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    {[
                        { id: 'left', label: 'Rata Kiri', icon: AlignLeft },
                        { id: 'center', label: 'Rata Tengah', icon: AlignCenter },
                        { id: 'justify', label: 'Rata Kanan Kiri', icon: AlignJustify },
                    ].map((align) => {
                        const Icon = align.icon;
                        const isSelected = (props.alignment || 'left') === align.id;
                        return (
                            <button
                                key={align.id}
                                type="button"
                                onClick={() => updateProps({ alignment: align.id })}
                                className={`flex items-center justify-center gap-1 py-1.5 rounded text-xs font-medium transition-all ${
                                    isSelected
                                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                                }`}
                            >
                                <Icon className="w-3.5 h-3.5" />
                                <span>{align.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                <span className="font-medium text-slate-700 dark:text-slate-300">Gaya Drop Cap (Huruf Awal Besar)</span>
                <input
                    type="checkbox"
                    checked={Boolean(props.dropCap)}
                    onChange={(e) => updateProps({ dropCap: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-700 dark:bg-slate-800"
                />
            </div>
        </div>
    );
};
