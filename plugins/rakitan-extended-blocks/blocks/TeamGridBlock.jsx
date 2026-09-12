import React from 'react';
import { Plus, Trash2, Users } from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

const TwitterIcon = ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const LinkedinIcon = ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
);

const GithubIcon = ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
);

export const TeamGridComponent = ({ props = {}, blockId }) => {
    const {
        badge = 'OUR TEAM',
        title = 'Meet the Minds Powering Rakitan',
        subtitle = 'A passionate multidisciplinary collective of systems engineers, UI/UX designers, and open-source contributors.',
        columns = 3,
        bgStyle = 'glass',
        padding = 'lg',
        members = [
            {
                name: 'Alexander Wright',
                role: 'Chief Systems Architect',
                bio: '12+ years pioneering modular web engines, headless CMS architectures, and reactive rendering trees.',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
                twitter: 'https://twitter.com',
                linkedin: 'https://linkedin.com',
                github: 'https://github.com',
            },
            {
                name: 'Elena Rostova',
                role: 'Head of Product & UX',
                bio: 'Advocate of atomic UI design principles and accessible, distraction-free visual authoring experiences.',
                avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
                twitter: 'https://twitter.com',
                linkedin: 'https://linkedin.com',
                github: 'https://github.com',
            },
            {
                name: 'Marcus Vance',
                role: 'Core Performance Engineer',
                bio: 'Specialist in V8 optimization, edge-layer state caching, and lightning-fast client hydration pipelines.',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
                twitter: 'https://twitter.com',
                linkedin: 'https://linkedin.com',
                github: 'https://github.com',
            },
        ],
    } = props;

    const { onUpdateBlockProp, isEditing } = useCanvasEdit();

    const handlePropChange = (key, val) => {
        if (onUpdateBlockProp && blockId) {
            onUpdateBlockProp(blockId, key, val);
        }
    };

    const handleMemberChange = (idx, field, val) => {
        const newMembers = [...members];
        newMembers[idx] = { ...newMembers[idx], [field]: val };
        handlePropChange('members', newMembers);
    };

    const colClasses = {
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    };

    const padClasses = {
        sm: 'py-8 px-4',
        md: 'py-14 px-4 sm:px-6',
        lg: 'py-20 px-4 sm:px-6 lg:px-8',
    };

    const bgClasses = {
        none: 'bg-transparent',
        muted: 'bg-slate-50 dark:bg-slate-900/50',
        glass: 'bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-y border-slate-200/50 dark:border-slate-800/50',
        dark: 'bg-slate-950 text-white',
        gradient: 'bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-cyan-500/10 dark:from-indigo-950/40 dark:via-purple-950/20 dark:to-cyan-950/30',
    };

    return (
        <section className={`${bgClasses[bgStyle] || bgClasses.glass} ${padClasses[padding] || padClasses.lg} relative overflow-hidden`}>
            <div className="max-w-7xl mx-auto">
                {(badge || title || subtitle) && (
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        {badge && (
                            <div className="inline-block mb-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50">
                                    <Users className="w-3.5 h-3.5" />
                                    <InlineText
                                        value={badge}
                                        onChange={(val) => handlePropChange('badge', val)}
                                        isEditable={isEditing}
                                    />
                                </span>
                            </div>
                        )}
                        {title && (
                            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
                                <InlineText
                                    value={title}
                                    onChange={(val) => handlePropChange('title', val)}
                                    isEditable={isEditing}
                                />
                            </h2>
                        )}
                        {subtitle && (
                            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                <InlineText
                                    value={subtitle}
                                    onChange={(val) => handlePropChange('subtitle', val)}
                                    isEditable={isEditing}
                                />
                            </p>
                        )}
                    </div>
                )}

                <div className={`grid ${colClasses[columns] || colClasses[3]} gap-8`}>
                    {members.map((member, idx) => (
                        <div
                            key={idx}
                            className="bg-white dark:bg-slate-800/80 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center"
                        >
                            <div className="relative mb-5">
                                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 ring-indigo-50 dark:ring-indigo-950 shadow-md group-hover:scale-105 transition-transform duration-300">
                                    {member.avatar ? (
                                        <img
                                            src={member.avatar}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-2xl">
                                            {member.name ? member.name.charAt(0) : 'U'}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                                <InlineText
                                    value={member.name}
                                    onChange={(val) => handleMemberChange(idx, 'name', val)}
                                    isEditable={isEditing}
                                />
                            </h3>

                            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3">
                                <InlineText
                                    value={member.role}
                                    onChange={(val) => handleMemberChange(idx, 'role', val)}
                                    isEditable={isEditing}
                                />
                            </div>

                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-1">
                                <InlineText
                                    value={member.bio}
                                    onChange={(val) => handleMemberChange(idx, 'bio', val)}
                                    isEditable={isEditing}
                                />
                            </p>

                            <div className="flex items-center gap-3 text-slate-400">
                                {member.twitter && (
                                    <a
                                        href={member.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                        onClick={(e) => isEditing && e.preventDefault()}
                                    >
                                        <TwitterIcon className="w-4 h-4" />
                                    </a>
                                )}
                                {member.linkedin && (
                                    <a
                                        href={member.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                        onClick={(e) => isEditing && e.preventDefault()}
                                    >
                                        <LinkedinIcon className="w-4 h-4" />
                                    </a>
                                )}
                                {member.github && (
                                    <a
                                        href={member.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                        onClick={(e) => isEditing && e.preventDefault()}
                                    >
                                        <GithubIcon className="w-4 h-4" />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export const TeamGridSettings = ({ props = {}, onChange }) => {
    const {
        badge = '',
        title = '',
        subtitle = '',
        columns = 3,
        bgStyle = 'glass',
        padding = 'lg',
        members = [],
    } = props;

    const handleMemberChange = (idx, field, val) => {
        const newMembers = [...members];
        newMembers[idx] = { ...newMembers[idx], [field]: val };
        onChange('members', newMembers);
    };

    const handleAddMember = () => {
        const newMembers = [
            ...members,
            {
                name: 'Jane Doe',
                role: 'Senior Product Specialist',
                bio: 'Passionate about delightful customer journeys and seamless digital tools.',
                avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
                twitter: '#',
                linkedin: '#',
                github: '#',
            },
        ];
        onChange('members', newMembers);
    };

    const handleRemoveMember = (idx) => {
        onChange('members', members.filter((_, i) => i !== idx));
    };

    return (
        <div className="space-y-5 text-sm">
            <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Section Header
                </label>
                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="Badge text"
                        value={badge}
                        onChange={(e) => onChange('badge', e.target.value)}
                        className="w-full text-xs rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    />
                    <input
                        type="text"
                        placeholder="Main title"
                        value={title}
                        onChange={(e) => onChange('title', e.target.value)}
                        className="w-full text-xs rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-medium"
                    />
                    <textarea
                        placeholder="Subtitle description"
                        value={subtitle}
                        onChange={(e) => onChange('subtitle', e.target.value)}
                        rows={2}
                        className="w-full text-xs rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Columns</label>
                    <select
                        value={columns}
                        onChange={(e) => onChange('columns', Number(e.target.value))}
                        className="w-full text-xs rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    >
                        <option value="2">2 Columns</option>
                        <option value="3">3 Columns</option>
                        <option value="4">4 Columns</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Background</label>
                    <select
                        value={bgStyle}
                        onChange={(e) => onChange('bgStyle', e.target.value)}
                        className="w-full text-xs rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    >
                        <option value="none">None (Transparent)</option>
                        <option value="muted">Muted Slate</option>
                        <option value="glass">Modern Glass</option>
                        <option value="gradient">Gradient Glow</option>
                        <option value="dark">Deep Dark</option>
                    </select>
                </div>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Team Members ({members.length})
                    </label>
                    <button
                        type="button"
                        onClick={handleAddMember}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100"
                    >
                        <Plus className="w-3.5 h-3.5" /> Add Member
                    </button>
                </div>

                <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                    {members.map((item, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60 space-y-2">
                            <div className="flex items-center justify-between gap-2">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={item.name}
                                    onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                                    className="flex-1 text-xs font-bold rounded border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveMember(idx)}
                                    className="p-1 text-slate-400 hover:text-red-500 rounded"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <input
                                type="text"
                                placeholder="Role / Position"
                                value={item.role}
                                onChange={(e) => handleMemberChange(idx, 'role', e.target.value)}
                                className="w-full text-xs font-medium rounded border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                            />
                            <input
                                type="text"
                                placeholder="Avatar Image URL"
                                value={item.avatar}
                                onChange={(e) => handleMemberChange(idx, 'avatar', e.target.value)}
                                className="w-full text-xs rounded border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                            />
                            <textarea
                                placeholder="Short bio"
                                value={item.bio}
                                onChange={(e) => handleMemberChange(idx, 'bio', e.target.value)}
                                rows={2}
                                className="w-full text-xs rounded border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                            />
                            <div className="grid grid-cols-3 gap-2">
                                <input
                                    type="text"
                                    placeholder="Twitter URL"
                                    value={item.twitter || ''}
                                    onChange={(e) => handleMemberChange(idx, 'twitter', e.target.value)}
                                    className="text-xs rounded border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                                />
                                <input
                                    type="text"
                                    placeholder="LinkedIn URL"
                                    value={item.linkedin || ''}
                                    onChange={(e) => handleMemberChange(idx, 'linkedin', e.target.value)}
                                    className="text-xs rounded border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                                />
                                <input
                                    type="text"
                                    placeholder="GitHub URL"
                                    value={item.github || ''}
                                    onChange={(e) => handleMemberChange(idx, 'github', e.target.value)}
                                    className="text-xs rounded border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
