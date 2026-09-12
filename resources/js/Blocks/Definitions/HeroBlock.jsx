import React from 'react';
import { AlignLeft, AlignCenter, AlignRight, Sparkles, ArrowRight } from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import SubComponentSlot from '@/Blocks/SubComponents/SubComponentSlot';
import DefaultElementWrapper from '@/Blocks/Components/DefaultElementWrapper';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

export const HeroComponent = ({ props = {}, blockId }) => {
    const {
        badgeText = '✨ Next-Gen Modular CMS',
        title = 'Craft Your Dream Website Like Building a Puzzle',
        subtitle = 'Rakitan CMS empowers developers and creators with independent modular blocks, lightning performance, and complete visual freedom.',
        primaryButtonText = 'Get Started Now',
        primaryButtonUrl = '#',
        secondaryButtonText = 'Explore Docs',
        secondaryButtonUrl = '#',
        alignment = 'center',
        bgStyle = 'gradient',
        imageUrl = '',
        padding = 'lg',
        subComponents = [],
        isCustom = false,
    } = props;

    const { onUpdateBlockProp, isEditing } = useCanvasEdit();

    const handlePropChange = (key, val) => {
        if (onUpdateBlockProp && blockId) {
            onUpdateBlockProp(blockId, key, val);
        }
    };

    const alignClasses = {
        left: 'text-left items-start',
        center: 'text-center items-center mx-auto',
        right: 'text-right items-end ml-auto',
    }[alignment] || 'text-center items-center mx-auto';

    const paddingClasses = {
        sm: 'py-12 md:py-16',
        md: 'py-20 md:py-24',
        lg: 'py-24 md:py-32',
    }[padding] || 'py-24 md:py-32';

    const bgStyles = {
        gradient: 'bg-gradient-to-b from-indigo-950/40 via-slate-900 to-slate-950 text-white',
        dark: 'bg-slate-900 text-slate-100',
        light: 'bg-slate-100 text-slate-900',
        image: 'relative text-white bg-slate-950',
    }[bgStyle] || 'bg-gradient-to-b from-indigo-950/40 via-slate-900 to-slate-950 text-white';

    return (
        <section className={`relative overflow-hidden transition-colors duration-300 ${bgStyles} ${paddingClasses}`}>
            {bgStyle === 'image' && imageUrl && (
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                />
            )}

            {bgStyle === 'gradient' && (
                <>
                    <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
                    <div className="pointer-events-none absolute top-1/3 left-10 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl" />
                </>
            )}

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {isCustom ? (
                    <div className="w-full">
                        <SubComponentSlot
                            blockId={blockId}
                            subComponents={subComponents}
                            emptyPlaceholder="+ Tambahkan Sub-Komponen ke Blok Hero Kustom Ini"
                        />
                    </div>
                ) : (
                    <div className={`flex flex-col ${alignClasses} max-w-3xl`}>
                        {(badgeText || isEditing) && (
                            <DefaultElementWrapper
                                blockId={blockId}
                                elementKey="badgeText"
                                label="Badge"
                                isCustom={isCustom}
                            >
                                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6 backdrop-blur-sm shadow-sm">
                                    <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                                    <InlineText
                                        value={badgeText}
                                        onChange={(val) => handlePropChange('badgeText', val)}
                                        placeholder="Teks Badge Hero"
                                    />
                                </div>
                            </DefaultElementWrapper>
                        )}

                        <DefaultElementWrapper
                            blockId={blockId}
                            elementKey="title"
                            label="Headline"
                            isCustom={isCustom}
                        >
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6">
                                <InlineText
                                    value={title}
                                    onChange={(val) => handlePropChange('title', val)}
                                    placeholder="Judul Hero Section"
                                    as="span"
                                />
                            </h1>
                        </DefaultElementWrapper>

                        {(subtitle || isEditing) && (
                            <DefaultElementWrapper
                                blockId={blockId}
                                elementKey="subtitle"
                                label="Subjudul"
                                isCustom={isCustom}
                            >
                                <p className={`text-lg sm:text-xl font-normal leading-relaxed mb-10 ${bgStyle === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                                    <InlineText
                                        value={subtitle}
                                        onChange={(val) => handlePropChange('subtitle', val)}
                                        placeholder="Tuliskan subjudul pengantar..."
                                        multiline
                                        as="span"
                                    />
                                </p>
                            </DefaultElementWrapper>
                        )}

                        <DefaultElementWrapper
                            blockId={blockId}
                            elementKey="buttons"
                            label="Tombol Aksi"
                            isCustom={isCustom}
                        >
                            <div className="flex flex-wrap items-center gap-4">
                                {(primaryButtonText || isEditing) && (
                                    <a
                                        href={isEditing ? undefined : (primaryButtonUrl || '#')}
                                        onClick={(e) => {
                                            if (isEditing) e.preventDefault();
                                        }}
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 shadow-lg shadow-indigo-600/25 transition-all duration-200"
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
                                        className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 border active:scale-95 ${
                                            bgStyle === 'light'
                                                ? 'border-slate-300 text-slate-700 hover:bg-slate-200'
                                                : 'border-white/20 text-white hover:bg-white/10'
                                        }`}
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

                        {/* Dynamic Sub-Components Slot pada Hero Section */}
                        <div className="w-full mt-8">
                            <SubComponentSlot
                                blockId={blockId}
                                subComponents={subComponents}
                                emptyPlaceholder="+ Tambah Sub-Komponen ke Hero Section"
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export const HeroSettings = ({ props, updateProps }) => {
    return (
        <div className="space-y-4 text-xs">
            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Badge Text</label>
                <input
                    type="text"
                    value={props.badgeText || ''}
                    onChange={(e) => updateProps({ badgeText: e.target.value })}
                    placeholder="e.g. ✨ Version 1.0 Released"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
            </div>

            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Main Headline</label>
                <textarea
                    rows={2}
                    value={props.title || ''}
                    onChange={(e) => updateProps({ title: e.target.value })}
                    placeholder="Enter main headline..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all leading-relaxed"
                />
            </div>

            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Subtitle / Description</label>
                <textarea
                    rows={3}
                    value={props.subtitle || ''}
                    onChange={(e) => updateProps({ subtitle: e.target.value })}
                    placeholder="Enter supporting description..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all leading-relaxed"
                />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
                <div>
                    <label className="block font-semibold text-slate-300 mb-1.5">Primary Action</label>
                    <input
                        type="text"
                        value={props.primaryButtonText || ''}
                        onChange={(e) => updateProps({ primaryButtonText: e.target.value })}
                        placeholder="Button Label"
                        className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none mb-1.5"
                    />
                    <input
                        type="text"
                        value={props.primaryButtonUrl || ''}
                        onChange={(e) => updateProps({ primaryButtonUrl: e.target.value })}
                        placeholder="Target URL (e.g. /login)"
                        className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block font-semibold text-slate-300 mb-1.5">Secondary Action</label>
                    <input
                        type="text"
                        value={props.secondaryButtonText || ''}
                        onChange={(e) => updateProps({ secondaryButtonText: e.target.value })}
                        placeholder="Button Label"
                        className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none mb-1.5"
                    />
                    <input
                        type="text"
                        value={props.secondaryButtonUrl || ''}
                        onChange={(e) => updateProps({ secondaryButtonUrl: e.target.value })}
                        placeholder="Target URL (e.g. /about)"
                        className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
                <label className="block font-semibold text-slate-300 mb-1.5">Content Alignment</label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl">
                    {[
                        { id: 'left', label: 'Left', icon: AlignLeft },
                        { id: 'center', label: 'Center', icon: AlignCenter },
                        { id: 'right', label: 'Right', icon: AlignRight },
                    ].map((align) => {
                        const Icon = align.icon;
                        const isSelected = (props.alignment || 'center') === align.id;
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

            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Background Style</label>
                <select
                    value={props.bgStyle || 'gradient'}
                    onChange={(e) => updateProps({ bgStyle: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                >
                    <option value="gradient">Modern Dark Gradient</option>
                    <option value="dark">Solid Dark Slate</option>
                    <option value="light">Solid Light Background</option>
                    <option value="image">Custom Background Image</option>
                </select>
            </div>

            {props.bgStyle === 'image' && (
                <div>
                    <label className="block font-semibold text-slate-300 mb-1.5">Background Image URL</label>
                    <input
                        type="url"
                        value={props.imageUrl || ''}
                        onChange={(e) => updateProps({ imageUrl: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                </div>
            )}

            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Vertical Padding</label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl">
                    {['sm', 'md', 'lg'].map((pad) => (
                        <button
                            key={pad}
                            type="button"
                            onClick={() => updateProps({ padding: pad })}
                            className={`py-1.5 rounded-lg text-xs uppercase font-semibold transition-all ${
                                (props.padding || 'lg') === pad
                                    ? 'bg-indigo-600 text-white shadow-sm'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                            }`}
                        >
                            {pad}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
