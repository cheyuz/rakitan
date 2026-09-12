import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import SubComponentSlot from '@/Blocks/SubComponents/SubComponentSlot';
import DefaultElementWrapper from '@/Blocks/Components/DefaultElementWrapper';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

export const CtaComponent = ({ props = {}, blockId }) => {
    const {
        title = 'Ready to Assemble the Next-Gen Web?',
        description = 'Join thousands of creators and build clean, lightning-fast pages with modular puzzle blocks.',
        primaryButtonText = 'Get Started Now',
        primaryButtonUrl = '#',
        secondaryButtonText = 'View Documentation',
        secondaryButtonUrl = '#',
        variant = 'gradient',
        subComponents = [],
        isCustom = false,
    } = props;

    const { onUpdateBlockProp, isEditing } = useCanvasEdit();

    const handlePropChange = (key, val) => {
        if (onUpdateBlockProp && blockId) {
            onUpdateBlockProp(blockId, key, val);
        }
    };

    if (variant === 'boxed') {
        return (
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-950 transition-colors duration-200">
                <div className="max-w-5xl mx-auto rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-800 bg-slate-900/70 shadow-2xl relative overflow-hidden">
                    <div className="relative z-10 max-w-3xl text-center mx-auto">
                        {isCustom ? (
                            <div className="w-full">
                                <SubComponentSlot
                                    blockId={blockId}
                                    subComponents={subComponents}
                                    emptyPlaceholder="+ Tambahkan Sub-Komponen ke Boxed CTA Kustom Ini"
                                />
                            </div>
                        ) : (
                            <>
                                <DefaultElementWrapper
                                    blockId={blockId}
                                    elementKey="title"
                                    label="CTA Title"
                                    isCustom={isCustom}
                                >
                                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                                        <InlineText
                                            value={title}
                                            onChange={(val) => handlePropChange('title', val)}
                                            placeholder="CTA Title"
                                            as="span"
                                        />
                                    </h2>
                                </DefaultElementWrapper>

                                {(description || isEditing) && (
                                    <DefaultElementWrapper
                                        blockId={blockId}
                                        elementKey="description"
                                        label="Description"
                                        isCustom={isCustom}
                                    >
                                        <p className="text-base sm:text-lg text-slate-300 mb-8">
                                            <InlineText
                                                value={description}
                                                onChange={(val) => handlePropChange('description', val)}
                                                placeholder="Call to action description..."
                                                multiline
                                                as="span"
                                            />
                                        </p>
                                    </DefaultElementWrapper>
                                )}

                                <DefaultElementWrapper
                                    blockId={blockId}
                                    elementKey="buttons"
                                    label="Action Buttons"
                                    isCustom={isCustom}
                                >
                                    <div className="flex flex-wrap justify-center items-center gap-4">
                                        {(primaryButtonText || isEditing) && (
                                            <a
                                                href={isEditing ? undefined : (primaryButtonUrl || '#')}
                                                onClick={(e) => {
                                                    if (isEditing) e.preventDefault();
                                                }}
                                                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/25 transition-all active:scale-95"
                                            >
                                                <InlineText
                                                    value={primaryButtonText}
                                                    onChange={(val) => handlePropChange('primaryButtonText', val)}
                                                    placeholder="Tombol Utama"
                                                />
                                                <ArrowRight className="w-4 h-4" />
                                            </a>
                                        )}
                                        {(secondaryButtonText || isEditing) && (
                                            <a
                                                href={isEditing ? undefined : (secondaryButtonUrl || '#')}
                                                onClick={(e) => {
                                                    if (isEditing) e.preventDefault();
                                                }}
                                                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm border border-slate-700 text-slate-200 hover:bg-slate-800 transition-all active:scale-95"
                                            >
                                                <InlineText
                                                    value={secondaryButtonText}
                                                    onChange={(val) => handlePropChange('secondaryButtonText', val)}
                                                    placeholder="Tombol Kedua"
                                                />
                                            </a>
                                        )}
                                    </div>
                                </DefaultElementWrapper>

                                {/* Dynamic Sub-Components Slot */}
                                <div className="w-full mt-6">
                                    <SubComponentSlot
                                        blockId={blockId}
                                        subComponents={subComponents}
                                        emptyPlaceholder="+ Tambah Sub-Komponen ke Boxed CTA"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>
        );
    }

    if (variant === 'minimal') {
        return (
            <section className="py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-800 bg-slate-950 text-center transition-colors">
                <div className="max-w-4xl mx-auto">
                    {isCustom ? (
                        <div className="w-full">
                            <SubComponentSlot
                                blockId={blockId}
                                subComponents={subComponents}
                                emptyPlaceholder="+ Tambahkan Sub-Komponen ke Minimal CTA Kustom Ini"
                            />
                        </div>
                    ) : (
                        <>
                            <DefaultElementWrapper
                                blockId={blockId}
                                elementKey="title"
                                label="CTA Title"
                                isCustom={isCustom}
                            >
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                                    <InlineText
                                        value={title}
                                        onChange={(val) => handlePropChange('title', val)}
                                        placeholder="CTA Title"
                                        as="span"
                                    />
                                </h2>
                            </DefaultElementWrapper>

                            {(description || isEditing) && (
                                <DefaultElementWrapper
                                    blockId={blockId}
                                    elementKey="description"
                                    label="Description"
                                    isCustom={isCustom}
                                >
                                    <p className="text-base sm:text-lg text-slate-400 mb-8">
                                        <InlineText
                                            value={description}
                                            onChange={(val) => handlePropChange('description', val)}
                                            placeholder="Call to action description..."
                                            multiline
                                            as="span"
                                        />
                                    </p>
                                </DefaultElementWrapper>
                            )}

                            <DefaultElementWrapper
                                blockId={blockId}
                                elementKey="buttons"
                                label="Action Buttons"
                                isCustom={isCustom}
                            >
                                <div className="flex flex-wrap justify-center items-center gap-4">
                                    {(primaryButtonText || isEditing) && (
                                        <a
                                            href={isEditing ? undefined : (primaryButtonUrl || '#')}
                                            onClick={(e) => {
                                                if (isEditing) e.preventDefault();
                                            }}
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-slate-950 bg-white hover:bg-slate-100 transition-all active:scale-95"
                                        >
                                            <InlineText
                                                value={primaryButtonText}
                                                onChange={(val) => handlePropChange('primaryButtonText', val)}
                                                placeholder="Primary Button"
                                            />
                                            <ArrowRight className="w-4 h-4" />
                                        </a>
                                    )}
                                    {(secondaryButtonText || isEditing) && (
                                        <a
                                            href={isEditing ? undefined : (secondaryButtonUrl || '#')}
                                            onClick={(e) => {
                                                if (isEditing) e.preventDefault();
                                            }}
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-slate-400 hover:text-white underline underline-offset-4"
                                        >
                                            <InlineText
                                                value={secondaryButtonText}
                                                onChange={(val) => handlePropChange('secondaryButtonText', val)}
                                                placeholder="Secondary Button"
                                            />
                                        </a>
                                    )}
                                </div>
                            </DefaultElementWrapper>

                            {/* Dynamic Sub-Components Slot */}
                            <div className="w-full mt-6">
                                <SubComponentSlot
                                    blockId={blockId}
                                    subComponents={subComponents}
                                    emptyPlaceholder="+ Add Sub-Component to Minimal CTA"
                                />
                            </div>
                        </>
                    )}
                </div>
            </section>
        );
    }

    // Default: 'gradient'
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-indigo-950 pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-4xl mx-auto text-center">
                {isCustom ? (
                    <div className="w-full">
                        <SubComponentSlot
                            blockId={blockId}
                            subComponents={subComponents}
                            emptyPlaceholder="+ Add Sub-Component to this Custom Gradient CTA"
                        />
                    </div>
                ) : (
                    <>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 mb-6">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Next Steps</span>
                        </div>
                        <DefaultElementWrapper
                            blockId={blockId}
                            elementKey="title"
                            label="CTA Title"
                            isCustom={isCustom}
                        >
                            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                                <InlineText
                                    value={title}
                                    onChange={(val) => handlePropChange('title', val)}
                                    placeholder="Call to Action Title"
                                    as="span"
                                />
                            </h2>
                        </DefaultElementWrapper>

                        {(description || isEditing) && (
                            <DefaultElementWrapper
                                blockId={blockId}
                                elementKey="description"
                                label="Description"
                                isCustom={isCustom}
                            >
                                <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                                    <InlineText
                                        value={description}
                                        onChange={(val) => handlePropChange('description', val)}
                                        placeholder="Call to action description..."
                                        multiline
                                        as="span"
                                    />
                                </p>
                            </DefaultElementWrapper>
                        )}

                        <DefaultElementWrapper
                            blockId={blockId}
                            elementKey="buttons"
                            label="Action Buttons"
                            isCustom={isCustom}
                        >
                            <div className="flex flex-wrap justify-center items-center gap-4">
                                {(primaryButtonText || isEditing) && (
                                    <a
                                        href={isEditing ? undefined : (primaryButtonUrl || '#')}
                                        onClick={(e) => {
                                            if (isEditing) e.preventDefault();
                                        }}
                                        className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm text-slate-950 bg-white hover:bg-slate-100 shadow-xl shadow-white/10 active:scale-95 transition-all"
                                    >
                                        <InlineText
                                            value={primaryButtonText}
                                            onChange={(val) => handlePropChange('primaryButtonText', val)}
                                            placeholder="Tombol Utama"
                                        />
                                        <ArrowRight className="w-4 h-4 text-slate-950" />
                                    </a>
                                )}
                                {(secondaryButtonText || isEditing) && (
                                    <a
                                        href={isEditing ? undefined : (secondaryButtonUrl || '#')}
                                        onClick={(e) => {
                                            if (isEditing) e.preventDefault();
                                        }}
                                        className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm border border-white/20 text-white hover:bg-white/10 active:scale-95 transition-all"
                                    >
                                        <InlineText
                                            value={secondaryButtonText}
                                            onChange={(val) => handlePropChange('secondaryButtonText', val)}
                                            placeholder="Tombol Kedua"
                                        />
                                    </a>
                                )}
                            </div>
                        </DefaultElementWrapper>

                        {/* Dynamic Sub-Components Slot */}
                        <div className="w-full mt-8 max-w-xl mx-auto">
                            <SubComponentSlot
                                blockId={blockId}
                                subComponents={subComponents}
                                emptyPlaceholder="+ Tambah Sub-Komponen ke Gradient CTA"
                            />
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export const CtaSettings = ({ props, updateProps }) => {
    return (
        <div className="space-y-4 text-xs">
            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Action Headline</label>
                <textarea
                    rows={2}
                    value={props.title || ''}
                    onChange={(e) => updateProps({ title: e.target.value })}
                    placeholder="Enter call to action headline..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none leading-relaxed"
                />
            </div>

            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Supporting Description</label>
                <textarea
                    rows={3}
                    value={props.description || ''}
                    onChange={(e) => updateProps({ description: e.target.value })}
                    placeholder="Explain why visitors should take this action..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none leading-relaxed"
                />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
                <div>
                    <label className="block font-semibold text-slate-300 mb-1.5">Primary Button</label>
                    <input
                        type="text"
                        value={props.primaryButtonText || ''}
                        onChange={(e) => updateProps({ primaryButtonText: e.target.value })}
                        placeholder="Button Text"
                        className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none mb-1.5"
                    />
                    <input
                        type="text"
                        value={props.primaryButtonUrl || ''}
                        onChange={(e) => updateProps({ primaryButtonUrl: e.target.value })}
                        placeholder="Target URL"
                        className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block font-semibold text-slate-300 mb-1.5">Secondary Button</label>
                    <input
                        type="text"
                        value={props.secondaryButtonText || ''}
                        onChange={(e) => updateProps({ secondaryButtonText: e.target.value })}
                        placeholder="Button Text"
                        className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none mb-1.5"
                    />
                    <input
                        type="text"
                        value={props.secondaryButtonUrl || ''}
                        onChange={(e) => updateProps({ secondaryButtonUrl: e.target.value })}
                        placeholder="Target URL"
                        className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                </div>
            </div>

            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Design Variant</label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl">
                    {[
                        { id: 'gradient', label: 'Gradient' },
                        { id: 'boxed', label: 'Boxed Card' },
                        { id: 'minimal', label: 'Minimalist' },
                    ].map((v) => (
                        <button
                            key={v.id}
                            type="button"
                            onClick={() => updateProps({ variant: v.id })}
                            className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                (props.variant || 'gradient') === v.id
                                    ? 'bg-indigo-600 text-white shadow-sm'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                            }`}
                        >
                            {v.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
