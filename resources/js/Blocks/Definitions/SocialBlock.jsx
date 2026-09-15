import React from 'react';
import {
    Share2,
    Globe,
    Mail,
    Plus,
    Trash2,
    ExternalLink,
    AlignLeft,
    AlignCenter,
    AlignRight,
} from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import SubComponentSlot from '@/Blocks/SubComponents/SubComponentSlot';
import DefaultElementWrapper from '@/Blocks/Components/DefaultElementWrapper';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

// Simple and clean SVG icons for major social networks
export const SocialIcons = {
    x: ({ className = 'w-4 h-4' }) => (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    ),
    instagram: ({ className = 'w-4 h-4' }) => (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
    ),
    linkedin: ({ className = 'w-4 h-4' }) => (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
    ),
    github: ({ className = 'w-4 h-4' }) => (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
    ),
    youtube: ({ className = 'w-4 h-4' }) => (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
    ),
    discord: ({ className = 'w-4 h-4' }) => (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
    ),
    facebook: ({ className = 'w-4 h-4' }) => (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
    ),
    tiktok: ({ className = 'w-4 h-4' }) => (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
    ),
    telegram: ({ className = 'w-4 h-4' }) => (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.458c.538-.196 1.006.128.832.941z" />
        </svg>
    ),
    whatsapp: ({ className = 'w-4 h-4' }) => (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.275-.1-.476-.15-.677.15-.2.301-.777.979-.953 1.18-.175.2-.351.226-.652.075-.3-.151-1.267-.467-2.414-1.49-.893-.796-1.496-1.78-1.672-2.08-.175-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.151-.176.201-.301.301-.502.1-.2.05-.376-.025-.526-.075-.151-.677-1.632-.928-2.235-.245-.588-.495-.508-.677-.518l-.578-.01c-.2 0-.527.075-.803.376s-1.054 1.03-1.054 2.512c0 1.482 1.08 2.911 1.23 3.112.151.2 2.126 3.247 5.151 4.555.72.311 1.282.497 1.721.637.723.23 1.38.197 1.902.12.579-.086 1.78-.727 2.031-1.43.25-.703.25-1.305.175-1.43-.075-.125-.276-.201-.577-.351zM12.004 21.75c-1.748 0-3.41-.462-4.868-1.306l-.35-.208-3.619.949.966-3.527-.228-.363a9.718 9.718 0 0 1-1.49-5.295c0-5.385 4.383-9.768 9.771-9.768 2.608 0 5.06 1.017 6.904 2.861a9.71 9.71 0 0 1 2.863 6.905c-.001 5.386-4.384 9.77-9.773 9.77zm8.337-18.107A11.667 11.667 0 0 0 12.004.05C5.419.05.056 5.413.056 12c0 2.102.548 4.156 1.589 5.968L0 24l6.19-1.624a11.93 11.93 0 0 0 5.814 1.503h.005c6.584 0 11.947-5.363 11.947-11.95 0-3.193-1.243-6.196-3.501-8.455z" />
        </svg>
    ),
    globe: Globe,
    email: Mail,
};

export const renderSocialIcon = (platform, className = 'w-5 h-5') => {
    const key = (platform || '').toLowerCase();
    const IconComp = SocialIcons[key];
    if (IconComp) {
        return <IconComp className={className} />;
    }
    return <Globe className={className} />;
};

export const DEFAULT_SOCIAL_ITEMS = [
    { id: '1', platform: 'x', label: 'Twitter / X', url: 'https://x.com', username: '@rakitancms', followers: '12K Followers' },
    { id: '2', platform: 'github', label: 'GitHub', url: 'https://github.com', username: 'rakitan-cms', followers: '3.4K Stars' },
    { id: '3', platform: 'discord', label: 'Discord Community', url: 'https://discord.gg', username: 'Rakitan HQ', followers: '5K Members' },
    { id: '4', platform: 'youtube', label: 'YouTube Channel', url: 'https://youtube.com', username: '@rakitan-tv', followers: '25K Subscribers' },
    { id: '5', platform: 'linkedin', label: 'LinkedIn Page', url: 'https://linkedin.com', username: 'Rakitan Tech', followers: '8K Connections' },
];

export const SocialComponent = ({ props = {}, blockId }) => {
    const {
        badge = 'CONNECT & COLLABORATE',
        title = 'Join Our Thriving Community Across Networks',
        subtitle = 'Follow our latest development updates, live demos, and community discussions.',
        items = DEFAULT_SOCIAL_ITEMS,
        style = 'cards', // 'pills' | 'cards' | 'icons'
        alignment = 'center', // 'left' | 'center' | 'right'
        isCustom = false,
        subComponents = [],
    } = props;

    const { onUpdateBlockProp, isEditing } = useCanvasEdit();

    const handlePropChange = (key, val) => {
        if (onUpdateBlockProp && blockId) {
            onUpdateBlockProp(blockId, key, val);
        }
    };

    const alignClass = {
        left: 'text-left items-start',
        center: 'text-center items-center mx-auto',
        right: 'text-right items-end ml-auto',
    }[alignment] || 'text-center items-center mx-auto';

    const itemsJustify = {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
    }[alignment] || 'justify-center';

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white transition-colors duration-200">
            <div className="max-w-6xl mx-auto">
                {isCustom ? (
                    <div className="w-full">
                        <SubComponentSlot
                            blockId={blockId}
                            subComponents={subComponents}
                            emptyPlaceholder="+ Tambahkan Sub-Komponen ke Blok Social Ini"
                        />
                    </div>
                ) : (
                    <div className="space-y-12">
                        {/* Header Section */}
                        <div className={`flex flex-col ${alignClass} max-w-2xl`}>
                            {(badge || isEditing) && (
                                <DefaultElementWrapper
                                    blockId={blockId}
                                    elementKey="badge"
                                    label="Badge"
                                    isCustom={isCustom}
                                >
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4 backdrop-blur-sm">
                                        <Share2 className="w-3.5 h-3.5" />
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
                                            placeholder="Headline Title"
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
                                    <p className="text-base text-slate-400 leading-relaxed">
                                        <InlineText
                                            value={subtitle}
                                            onChange={(val) => handlePropChange('subtitle', val)}
                                            placeholder="Subtitle / Description"
                                        />
                                    </p>
                                </DefaultElementWrapper>
                            )}
                        </div>

                        {/* Social Networks Showcase */}
                        <DefaultElementWrapper
                            blockId={blockId}
                            elementKey="items"
                            label="Social Links"
                            isCustom={isCustom}
                        >
                            {style === 'cards' && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {items.map((item) => (
                                        <a
                                            key={item.id}
                                            href={isEditing ? undefined : (item.url || '#')}
                                            target="_blank"
                                            rel="noreferrer"
                                            onClick={(e) => {
                                                if (isEditing) e.preventDefault();
                                            }}
                                            className="group flex items-center gap-4 p-5 rounded-2xl bg-slate-900/60 hover:bg-slate-850 border border-slate-800 hover:border-indigo-500/40 shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-slate-800 text-indigo-400 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200">
                                                {renderSocialIcon(item.platform, 'w-6 h-6')}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors truncate">
                                                        {item.label}
                                                    </h3>
                                                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors flex-shrink-0" />
                                                </div>
                                                {item.username && (
                                                    <p className="text-xs text-slate-400 truncate mt-0.5">
                                                        {item.username}
                                                    </p>
                                                )}
                                                {item.followers && (
                                                    <p className="text-[11px] font-semibold text-indigo-400/90 mt-1">
                                                        {item.followers}
                                                    </p>
                                                )}
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            )}

                            {style === 'pills' && (
                                <div className={`flex flex-wrap items-center ${itemsJustify} gap-3`}>
                                    {items.map((item) => (
                                        <a
                                            key={item.id}
                                            href={isEditing ? undefined : (item.url || '#')}
                                            target="_blank"
                                            rel="noreferrer"
                                            onClick={(e) => {
                                                if (isEditing) e.preventDefault();
                                            }}
                                            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-indigo-600/10 text-slate-200 hover:text-white font-semibold text-xs transition-all transform hover:scale-105"
                                        >
                                            <span className="text-indigo-400">{renderSocialIcon(item.platform, 'w-4 h-4')}</span>
                                            <span>{item.label}</span>
                                            {item.followers && (
                                                <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-400">
                                                    {item.followers}
                                                </span>
                                            )}
                                        </a>
                                    ))}
                                </div>
                            )}

                            {style === 'icons' && (
                                <div className={`flex flex-wrap items-center ${itemsJustify} gap-4`}>
                                    {items.map((item) => (
                                        <a
                                            key={item.id}
                                            href={isEditing ? undefined : (item.url || '#')}
                                            target="_blank"
                                            rel="noreferrer"
                                            title={item.label}
                                            onClick={(e) => {
                                                if (isEditing) e.preventDefault();
                                            }}
                                            className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:bg-indigo-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-lg"
                                        >
                                            {renderSocialIcon(item.platform, 'w-5 h-5')}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </DefaultElementWrapper>
                    </div>
                )}
            </div>
        </section>
    );
};

export const SocialSettings = ({ props = {}, updateProps }) => {
    const items = Array.isArray(props.items) ? props.items : DEFAULT_SOCIAL_ITEMS;

    const handleUpdateItem = (index, key, val) => {
        const next = [...items];
        next[index] = { ...next[index], [key]: val };
        updateProps({ items: next });
    };

    const handleAddItem = () => {
        const newItem = {
            id: `soc-${Date.now()}`,
            platform: 'github',
            label: 'GitHub',
            url: 'https://github.com',
            username: '@user',
            followers: '',
        };
        updateProps({ items: [...items, newItem] });
    };

    const handleRemoveItem = (index) => {
        updateProps({ items: items.filter((_, idx) => idx !== index) });
    };

    return (
        <div className="space-y-4 text-xs">
            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Badge Text</label>
                <input
                    type="text"
                    value={props.badge || ''}
                    onChange={(e) => updateProps({ badge: e.target.value })}
                    placeholder="e.g. COMMUNITY"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
            </div>

            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Main Title</label>
                <input
                    type="text"
                    value={props.title || ''}
                    onChange={(e) => updateProps({ title: e.target.value })}
                    placeholder="Title headline..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
            </div>

            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Subtitle</label>
                <textarea
                    rows={2}
                    value={props.subtitle || ''}
                    onChange={(e) => updateProps({ subtitle: e.target.value })}
                    placeholder="Supporting subtitle..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                <div>
                    <label className="block font-semibold text-slate-300 mb-1.5">Display Style</label>
                    <select
                        value={props.style || 'cards'}
                        onChange={(e) => updateProps({ style: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                        <option value="cards">Feature Cards</option>
                        <option value="pills">Pill Badges</option>
                        <option value="icons">Minimal Icons</option>
                    </select>
                </div>

                <div>
                    <label className="block font-semibold text-slate-300 mb-1.5">Alignment</label>
                    <div className="grid grid-cols-3 gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl">
                        {[
                            { id: 'left', icon: AlignLeft },
                            { id: 'center', icon: AlignCenter },
                            { id: 'right', icon: AlignRight },
                        ].map((align) => {
                            const Icon = align.icon;
                            const isSelected = (props.alignment || 'center') === align.id;
                            return (
                                <button
                                    key={align.id}
                                    type="button"
                                    onClick={() => updateProps({ alignment: align.id })}
                                    className={`py-1.5 rounded-lg flex items-center justify-center transition-all ${
                                        isSelected ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                                    }`}
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                    <label className="font-semibold text-slate-300">Social Accounts ({items.length})</label>
                    <button
                        type="button"
                        onClick={handleAddItem}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all text-xs font-medium"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Account</span>
                    </button>
                </div>

                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {items.map((item, idx) => (
                        <div key={item.id || idx} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                            <div className="flex items-center justify-between gap-2">
                                <select
                                    value={item.platform || 'x'}
                                    onChange={(e) => handleUpdateItem(idx, 'platform', e.target.value)}
                                    className="px-2 py-1 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                                >
                                    <option value="x">Twitter / X</option>
                                    <option value="instagram">Instagram</option>
                                    <option value="github">GitHub</option>
                                    <option value="linkedin">LinkedIn</option>
                                    <option value="youtube">YouTube</option>
                                    <option value="discord">Discord</option>
                                    <option value="facebook">Facebook</option>
                                    <option value="tiktok">TikTok</option>
                                    <option value="telegram">Telegram</option>
                                    <option value="whatsapp">WhatsApp</option>
                                    <option value="globe">Website</option>
                                    <option value="email">Email</option>
                                </select>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveItem(idx)}
                                    className="p-1 rounded text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                                    title="Delete Item"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                            <input
                                type="text"
                                value={item.label || ''}
                                onChange={(e) => handleUpdateItem(idx, 'label', e.target.value)}
                                placeholder="Label (e.g. Follow on X)"
                                className="w-full px-2.5 py-1 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500"
                            />
                            <input
                                type="text"
                                value={item.url || ''}
                                onChange={(e) => handleUpdateItem(idx, 'url', e.target.value)}
                                placeholder="Target URL (https://...)"
                                className="w-full px-2.5 py-1 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500"
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="text"
                                    value={item.username || ''}
                                    onChange={(e) => handleUpdateItem(idx, 'username', e.target.value)}
                                    placeholder="Username / Handle"
                                    className="w-full px-2 py-1 text-[11px] rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500"
                                />
                                <input
                                    type="text"
                                    value={item.followers || ''}
                                    onChange={(e) => handleUpdateItem(idx, 'followers', e.target.value)}
                                    placeholder="Metrics (e.g. 10k)"
                                    className="w-full px-2 py-1 text-[11px] rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
