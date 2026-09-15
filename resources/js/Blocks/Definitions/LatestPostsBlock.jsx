import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, User, ArrowRight, Sparkles, LayoutGrid, List } from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import SubComponentSlot from '@/Blocks/SubComponents/SubComponentSlot';
import DefaultElementWrapper from '@/Blocks/Components/DefaultElementWrapper';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

export const LatestPostsComponent = ({ props = {}, blockId }) => {
    const {
        badge = 'LATEST JOURNAL',
        title = 'Fresh Articles & Updates',
        subtitle = 'Stay up-to-date with tutorials, architecture insights, and engineering updates from Rakitan CMS.',
        limit = 3,
        categoryId = 'all',
        layoutStyle = 'grid',
        showViewAll = true,
        viewAllText = 'View All Articles',
        viewAllUrl = '/blog',
        isCustom = false,
        subComponents = [],
    } = props;

    const { onUpdateBlockProp, isEditing } = useCanvasEdit();

    const handlePropChange = (key, val) => {
        if (onUpdateBlockProp && blockId) {
            onUpdateBlockProp(blockId, key, val);
        }
    };

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        const url = `/api/latest-posts?limit=${limit}${categoryId && categoryId !== 'all' ? `&category_id=${categoryId}` : ''}`;

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch');
                return res.json();
            })
            .then((data) => {
                if (isMounted) {
                    setPosts(Array.isArray(data) && data.length > 0 ? data : getFallbackPosts(limit));
                    setLoading(false);
                }
            })
            .catch(() => {
                if (isMounted) {
                    setPosts(getFallbackPosts(limit));
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [limit, categoryId]);

    function getFallbackPosts(count) {
        const samples = [
            {
                id: 'demo-1',
                title: 'Introducing Rakitan: A Puzzle-Like Modular Visual CMS',
                slug: 'introducing-rakitan-modular-cms',
                excerpt: 'Discover how Rakitan reimagines content management by treating every website element as an independent puzzle block.',
                category: 'Technology',
                author: 'Rakitan Team',
                published_at: 'Just now',
                featured_image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
            },
            {
                id: 'demo-2',
                title: 'Building Blazing Fast Frontends with Inertia and React 18',
                slug: 'building-blazing-fast-frontends-inertia-react',
                excerpt: 'Deep dive into single-page application speed without the overhead of client-side routing and state boilerplate.',
                category: 'Development',
                author: 'Alex Chen',
                published_at: 'Yesterday',
                featured_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
            },
            {
                id: 'demo-3',
                title: 'Mastering Custom Puzzle Blocks in Rakitan CMS',
                slug: 'mastering-custom-puzzle-blocks',
                excerpt: 'Learn how simple it is to build, style, and publish reusable blocks with live visual editing support.',
                category: 'Design Systems',
                author: 'Elena Rostova',
                published_at: '3 days ago',
                featured_image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
            },
            {
                id: 'demo-4',
                title: 'Zero Plugin Hell: The Rakitan Core Architecture',
                slug: 'zero-plugin-hell-rakitan-architecture',
                excerpt: 'Why traditional WordPress plugin bloat is a thing of the past with lightweight, modern PHP 8.2 and Laravel 11.',
                category: 'Engineering',
                author: 'David Wright',
                published_at: '1 week ago',
                featured_image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
            },
        ];
        return samples.slice(0, count);
    }

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 transition-colors duration-200">
            <div className="max-w-7xl mx-auto">
                {isCustom ? (
                    <div className="w-full">
                        <SubComponentSlot
                            blockId={blockId}
                            subComponents={subComponents}
                            emptyPlaceholder="+ Tambahkan Sub-Komponen ke Blok Artikel Ini"
                        />
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
                            <div className="max-w-2xl">
                                {(badge || isEditing) && (
                                    <DefaultElementWrapper
                                        blockId={blockId}
                                        elementKey="badge"
                                        label="Badge"
                                        isCustom={isCustom}
                                    >
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
                                            <BookOpen className="w-3.5 h-3.5" />
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
                                        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                                            <InlineText
                                                value={title}
                                                onChange={(val) => handlePropChange('title', val)}
                                                placeholder="Section Title"
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
                                        <p className="text-sm sm:text-base text-slate-400 mt-2 leading-relaxed">
                                            <InlineText
                                                value={subtitle}
                                                onChange={(val) => handlePropChange('subtitle', val)}
                                                placeholder="Supporting Subtitle"
                                            />
                                        </p>
                                    </DefaultElementWrapper>
                                )}
                            </div>

                            {showViewAll && (
                                <DefaultElementWrapper
                                    blockId={blockId}
                                    elementKey="button"
                                    label="View All Button"
                                    isCustom={isCustom}
                                >
                                    <a
                                        href={viewAllUrl}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition-all shadow-md group whitespace-nowrap self-start md:self-auto"
                                    >
                                        <span>
                                            <InlineText
                                                value={viewAllText}
                                                onChange={(val) => handlePropChange('viewAllText', val)}
                                                placeholder="Button Label"
                                            />
                                        </span>
                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </DefaultElementWrapper>
                            )}
                        </div>

                        {/* Posts Display */}
                        <DefaultElementWrapper
                            blockId={blockId}
                            elementKey="posts"
                            label="Articles Grid"
                            isCustom={isCustom}
                        >
                {layoutStyle === 'list' ? (
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <a
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="group flex flex-col sm:flex-row items-center gap-6 p-5 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 hover:bg-slate-900/90 transition-all shadow-lg"
                            >
                                {post.featured_image && (
                                    <div className="w-full sm:w-56 h-40 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-950">
                                        <img
                                            src={post.featured_image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                                        {post.category && (
                                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                                {post.category}
                                            </span>
                                        )}
                                        <span>{post.published_at}</span>
                                        <span>•</span>
                                        <span>{post.author}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors mb-2">
                                        {post.title}
                                    </h3>
                                    {post.excerpt && (
                                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                    )}
                                </div>
                                <div className="hidden sm:flex p-2 rounded-full bg-slate-800/80 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all mr-2">
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </a>
                        ))}
                    </div>
                ) : (
                    /* Grid Layout (Default) */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <article
                                key={post.id}
                                className="group flex flex-col rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 hover:bg-slate-900/90 transition-all overflow-hidden shadow-lg shadow-slate-950/40 hover:-translate-y-1 duration-300"
                            >
                                <a href={`/blog/${post.slug}`} className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                                    {post.featured_image ? (
                                        <img
                                            src={post.featured_image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-700">
                                            <BookOpen className="w-10 h-10" />
                                        </div>
                                    )}
                                    {post.category && (
                                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-950/80 backdrop-blur-md text-indigo-300 border border-indigo-500/20">
                                            {post.category}
                                        </span>
                                    )}
                                </a>

                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>{post.published_at}</span>
                                            </span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1">
                                                <User className="w-3.5 h-3.5" />
                                                <span>{post.author}</span>
                                            </span>
                                        </div>

                                        <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-2 mb-2 leading-snug">
                                            <a href={`/blog/${post.slug}`}>
                                                {post.title}
                                            </a>
                                        </h3>

                                        {post.excerpt && (
                                            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                                                {post.excerpt}
                                            </p>
                                        )}
                                    </div>

                                    <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
                                        <span>Read Article</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
                        </DefaultElementWrapper>
                    </>
                )}
            </div>
        </section>
    );
};

export const LatestPostsSettings = ({ props, updateProps }) => {
    return (
        <div className="space-y-4 text-xs">
            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Section Badge</label>
                <input
                    type="text"
                    value={props.badge || ''}
                    onChange={(e) => updateProps({ badge: e.target.value })}
                    placeholder="LATEST JOURNAL"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
            </div>

            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Section Title</label>
                <input
                    type="text"
                    value={props.title || ''}
                    onChange={(e) => updateProps({ title: e.target.value })}
                    placeholder="Fresh Articles & Updates"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
            </div>

            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Subtitle</label>
                <textarea
                    rows="2"
                    value={props.subtitle || ''}
                    onChange={(e) => updateProps({ subtitle: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
            </div>

            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Number of Posts</label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl">
                    {[3, 6, 9].map((cnt) => (
                        <button
                            key={cnt}
                            type="button"
                            onClick={() => updateProps({ limit: cnt })}
                            className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                (props.limit || 3) === cnt
                                    ? 'bg-indigo-600 text-white shadow-sm'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                            }`}
                        >
                            {cnt} Posts
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Layout Presentation</label>
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl">
                    <button
                        type="button"
                        onClick={() => updateProps({ layoutStyle: 'grid' })}
                        className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            (props.layoutStyle || 'grid') === 'grid'
                                ? 'bg-indigo-600 text-white shadow-sm'
                                : 'text-slate-400 hover:text-white hover:bg-slate-900'
                        }`}
                    >
                        <LayoutGrid className="w-3.5 h-3.5" />
                        <span>Grid</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => updateProps({ layoutStyle: 'list' })}
                        className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            props.layoutStyle === 'list'
                                ? 'bg-indigo-600 text-white shadow-sm'
                                : 'text-slate-400 hover:text-white hover:bg-slate-900'
                        }`}
                    >
                        <List className="w-3.5 h-3.5" />
                        <span>List</span>
                    </button>
                </div>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={props.showViewAll !== false}
                        onChange={(e) => updateProps({ showViewAll: e.target.checked })}
                        className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-900"
                    />
                    <span className="font-semibold text-slate-300">Show "View All" Link</span>
                </label>

                {props.showViewAll !== false && (
                    <div className="space-y-2 pl-5">
                        <input
                            type="text"
                            value={props.viewAllText || 'View All Articles'}
                            onChange={(e) => updateProps({ viewAllText: e.target.value })}
                            placeholder="Button Text"
                            className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
                        />
                        <input
                            type="text"
                            value={props.viewAllUrl || '/blog'}
                            onChange={(e) => updateProps({ viewAllUrl: e.target.value })}
                            placeholder="Destination URL (/blog)"
                            className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
