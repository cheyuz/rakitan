import React from 'react';
import { Star, MessageSquareQuote, Plus, Trash2 } from 'lucide-react';

export const TestimonialsComponent = ({ props = {} }) => {
    const {
        badge = 'TESTIMONIALS',
        title = 'Loved by Developers & Agencies Worldwide',
        subtitle = 'Here is what modern web engineers and content teams are saying about Rakitan.',
        columns = 3,
        items = [
            {
                quote: 'Rakitan gave our agency the visual speed of a page builder without any of the sluggish performance or plugin hell of WordPress. It is truly next-gen.',
                author: 'Sarah Jenkins',
                role: 'Head of Engineering at CloudCraft',
                avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
                rating: 5,
            },
            {
                quote: 'Building custom puzzle blocks is a breeze. It took us less than 20 minutes to ship a custom pricing calculator block for our client.',
                author: 'David Chen',
                role: 'Full-Stack Developer',
                avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
                rating: 5,
            },
            {
                quote: 'The modular theme system and media library feel so clean and intuitive. The UI design is stunning right out of the box.',
                author: 'Elena Rostova',
                role: 'UI/UX Lead at StudioPixel',
                avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                rating: 5,
            },
        ],
    } = props;

    const gridColsClass = {
        1: 'grid-cols-1 max-w-2xl mx-auto',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    }[columns] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 transition-colors duration-200">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                    {badge && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
                            <MessageSquareQuote className="w-3.5 h-3.5" />
                            <span>{badge}</span>
                        </div>
                    )}
                    <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-base text-slate-400">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Testimonial Cards */}
                <div className={`grid ${gridColsClass} gap-6 sm:gap-8`}>
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all hover:shadow-xl shadow-slate-950/40 group"
                        >
                            <div className="space-y-4">
                                {/* Stars */}
                                <div className="flex items-center gap-1 text-amber-400">
                                    {[...Array(5)].map((_, sIdx) => (
                                        <Star
                                            key={sIdx}
                                            className={`w-4 h-4 ${sIdx < (item.rating || 5) ? 'fill-amber-400' : 'text-slate-700'}`}
                                        />
                                    ))}
                                </div>

                                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                                    "{item.quote}"
                                </p>
                            </div>

                            <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-slate-800/80">
                                {item.avatarUrl ? (
                                    <img
                                        src={item.avatarUrl}
                                        alt={item.author}
                                        className="w-10 h-10 rounded-full object-cover border border-slate-700 flex-shrink-0"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center text-xs flex-shrink-0">
                                        {item.author?.charAt(0) || 'U'}
                                    </div>
                                )}
                                <div className="min-w-0">
                                    <h4 className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">
                                        {item.author}
                                    </h4>
                                    <p className="text-[11px] text-slate-400 truncate">
                                        {item.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export const TestimonialsSettings = ({ props = {}, onChange }) => {
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
            {
                quote: 'Great platform! Highly recommended.',
                author: 'Jane Doe',
                role: 'Founder at TechStartup',
                avatarUrl: '',
                rating: 5,
            },
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
                <label className="block text-slate-400 font-medium mb-1">Columns</label>
                <select
                    value={props.columns || 3}
                    onChange={(e) => updateProp('columns', parseInt(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                >
                    <option value={1}>1 Column</option>
                    <option value={2}>2 Columns</option>
                    <option value={3}>3 Columns</option>
                </select>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">Testimonials ({items.length})</span>
                    <button
                        type="button"
                        onClick={addItem}
                        className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Review</span>
                    </button>
                </div>

                {items.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                            <input
                                type="text"
                                value={item.author}
                                onChange={(e) => updateItem(idx, 'author', e.target.value)}
                                placeholder="Author Name..."
                                className="font-semibold bg-transparent text-white focus:outline-none border-b border-transparent focus:border-indigo-500 text-xs w-36"
                            />
                            <div className="flex items-center gap-2">
                                <select
                                    value={item.rating || 5}
                                    onChange={(e) => updateItem(idx, 'rating', parseInt(e.target.value))}
                                    className="bg-slate-900 border border-slate-800 rounded px-1 text-[11px] text-amber-400"
                                >
                                    <option value={5}>5 Stars</option>
                                    <option value={4}>4 Stars</option>
                                    <option value={3}>3 Stars</option>
                                </select>
                                <button
                                    type="button"
                                    onClick={() => removeItem(idx)}
                                    className="text-slate-500 hover:text-red-400 p-1"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>

                        <div>
                            <textarea
                                rows={2}
                                value={item.quote}
                                onChange={(e) => updateItem(idx, 'quote', e.target.value)}
                                placeholder="Quote..."
                                className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-[11px]"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <input
                                type="text"
                                value={item.role || ''}
                                onChange={(e) => updateItem(idx, 'role', e.target.value)}
                                placeholder="Role / Company"
                                className="w-full px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-white text-[11px]"
                            />
                            <input
                                type="text"
                                value={item.avatarUrl || ''}
                                onChange={(e) => updateItem(idx, 'avatarUrl', e.target.value)}
                                placeholder="Avatar Image URL"
                                className="w-full px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-white text-[11px]"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
