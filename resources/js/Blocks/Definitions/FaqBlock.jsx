import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Plus, Trash2 } from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import SubComponentSlot from '@/Blocks/SubComponents/SubComponentSlot';
import DefaultElementWrapper from '@/Blocks/Components/DefaultElementWrapper';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

export const FaqComponent = ({ props = {}, blockId }) => {
    const {
        badge = 'FAQ',
        title = 'Frequently Asked Questions',
        subtitle = 'Everything you need to know about Rakitan modular architecture and workflow.',
        items = [
            {
                question: 'What is Rakitan CMS and how does it compare to WordPress?',
                answer: 'Rakitan CMS is a next-generation modular CMS built with Laravel 11 and Inertia.js React. Unlike WordPress which suffers from plugin bloat and heavy PHP template rendering, Rakitan uses a lightweight JSON puzzle block system, lightning-fast client transitions, and clean modular themes.',
            },
            {
                question: 'Can developers build custom puzzle blocks?',
                answer: 'Yes! Developers can create new blocks simply by defining a React component and an optional settings panel, and registering them via the Block Registry or third-party modular plugins in the /plugins/ directory.',
            },
            {
                question: 'How do themes work in Rakitan?',
                answer: 'Themes reside in the /themes/ directory with an intuitive theme.json manifest, screenshot, and style.css. Administrators can upload themes as .zip files, switch themes in 1-click, or customize stylesheets directly.',
            },
            {
                question: 'Is Rakitan CMS completely open source?',
                answer: 'Yes, Rakitan CMS is 100% open source under the MIT license. We welcome contributions, custom blocks, and community plugins from web developers worldwide.',
            },
        ],
        isCustom = false,
        subComponents = [],
    } = props;

    const { onUpdateBlockProp, isEditing } = useCanvasEdit();

    const handlePropChange = (key, val) => {
        if (onUpdateBlockProp && blockId) {
            onUpdateBlockProp(blockId, key, val);
        }
    };

    const [openIndex, setOpenIndex] = useState(0);

    const toggleItem = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 transition-colors duration-200">
            <div className="max-w-4xl mx-auto">
                {isCustom ? (
                    <div className="w-full">
                        <SubComponentSlot
                            blockId={blockId}
                            subComponents={subComponents}
                            emptyPlaceholder="+ Tambahkan Sub-Komponen ke Blok FAQ Ini"
                        />
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="text-center mb-12 sm:mb-16">
                            {(badge || isEditing) && (
                                <DefaultElementWrapper
                                    blockId={blockId}
                                    elementKey="badge"
                                    label="Badge"
                                    isCustom={isCustom}
                                >
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
                                        <HelpCircle className="w-3.5 h-3.5" />
                                        <InlineText
                                            value={badge}
                                            onChange={(val) => handlePropChange('badge', val)}
                                            placeholder="Badge Text"
                                        />
                                    </div>
                                </DefaultElementWrapper>
                            )}
                            {(title || isEditing) && (
                                <DefaultElementWrapper
                                    blockId={blockId}
                                    elementKey="title"
                                    label="Headline"
                                    isCustom={isCustom}
                                >
                                    <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
                                        <InlineText
                                            value={title}
                                            onChange={(val) => handlePropChange('title', val)}
                                            placeholder="FAQ Title"
                                        />
                                    </h2>
                                </DefaultElementWrapper>
                            )}
                            {(subtitle || isEditing) && (
                                <DefaultElementWrapper
                                    blockId={blockId}
                                    elementKey="subtitle"
                                    label="Subtitle"
                                    isCustom={isCustom}
                                >
                                    <p className="text-base text-slate-400 max-w-2xl mx-auto">
                                        <InlineText
                                            value={subtitle}
                                            onChange={(val) => handlePropChange('subtitle', val)}
                                            placeholder="FAQ Subtitle"
                                        />
                                    </p>
                                </DefaultElementWrapper>
                            )}
                        </div>

                        {/* FAQ Accordion List */}
                        <DefaultElementWrapper
                            blockId={blockId}
                            elementKey="items"
                            label="FAQ Accordion"
                            isCustom={isCustom}
                        >
                            <div className="space-y-4">
                                {items.map((item, idx) => {
                                    const isOpen = openIndex === idx;

                                    return (
                                        <div
                                            key={idx}
                                            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                                                isOpen
                                                    ? 'bg-slate-900/80 border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                                                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                                            }`}
                                        >
                                            <button
                                                type="button"
                                                onClick={() => toggleItem(idx)}
                                                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left transition-colors"
                                            >
                                                <span className="font-bold text-white text-base sm:text-lg tracking-tight">
                                                    {item.question}
                                                </span>
                                                <div
                                                    className={`p-1.5 rounded-full border transition-transform duration-200 flex-shrink-0 ${
                                                        isOpen
                                                            ? 'bg-indigo-600 text-white border-indigo-500 rotate-180'
                                                            : 'bg-slate-800 text-slate-400 border-slate-700'
                                                    }`}
                                                >
                                                    <ChevronDown className="w-4 h-4" />
                                                </div>
                                            </button>

                                            {isOpen && (
                                                <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/50 animate-in fade-in duration-150">
                                                    {item.answer}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </DefaultElementWrapper>
                    </>
                )}
            </div>
        </section>
    );
};

export const FaqSettings = ({ props = {}, onChange }) => {
    const items = props.items || [];

    const updateProp = (key, val) => {
        onChange({ ...props, [key]: val });
    };

    const updateItem = (index, field, value) => {
        const updated = [...items];
        updated[index] = { ...updated[index], [field]: value };
        updateProp('items', updated);
    };

    const addItem = () => {
        updateProp('items', [
            ...items,
            { question: 'New Question?', answer: 'Answer to this question.' },
        ]);
    };

    const removeItem = (index) => {
        updateProp('items', items.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-5 text-xs text-slate-300">
            <div>
                <label className="block text-slate-400 font-medium mb-1">Badge</label>
                <input
                    type="text"
                    value={props.badge || ''}
                    onChange={(e) => updateProp('badge', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
            </div>

            <div>
                <label className="block text-slate-400 font-medium mb-1">Title</label>
                <input
                    type="text"
                    value={props.title || ''}
                    onChange={(e) => updateProp('title', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
            </div>

            <div>
                <label className="block text-slate-400 font-medium mb-1">Subtitle</label>
                <textarea
                    rows={2}
                    value={props.subtitle || ''}
                    onChange={(e) => updateProp('subtitle', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">Questions & Answers ({items.length})</span>
                    <button
                        type="button"
                        onClick={addItem}
                        className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add FAQ</span>
                    </button>
                </div>

                {items.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                            <input
                                type="text"
                                value={item.question}
                                onChange={(e) => updateItem(idx, 'question', e.target.value)}
                                placeholder="Question..."
                                className="w-full font-semibold bg-transparent text-white focus:outline-none border-b border-transparent focus:border-indigo-500 text-xs"
                            />
                            <button
                                type="button"
                                onClick={() => removeItem(idx)}
                                className="text-slate-500 hover:text-red-400 p-1"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        <div>
                            <textarea
                                rows={3}
                                value={item.answer}
                                onChange={(e) => updateItem(idx, 'answer', e.target.value)}
                                placeholder="Answer..."
                                className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-[11px]"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
