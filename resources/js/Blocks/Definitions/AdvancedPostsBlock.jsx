import React, { useState, useEffect, useRef } from 'react';
import {
    Search,
    Calendar,
    User,
    ArrowRight,
    Tag,
    Layers,
    SlidersHorizontal,
    Loader2,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    BookOpen,
} from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import SubComponentSlot from '@/Blocks/SubComponents/SubComponentSlot';
import DefaultElementWrapper from '@/Blocks/Components/DefaultElementWrapper';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

export const AdvancedPostsComponent = ({ props = {}, blockId }) => {
    const {
        badge = 'EXPLORE KNOWLEDGE',
        title = 'Latest Insights & Articles',
        subtitle = 'Browse our curated publications, tutorials, and engineering updates.',
        limit = 6,
        columns = 3,
        categoryId = 'all',
        cardStyle = 'modern', // 'modern' | 'card' | 'minimal' | 'bordered'
        showSearch = true,
        showCategoryFilter = true,
        showExcerpt = true,
        showDate = true,
        showAuthor = true,
        showBadge = true,
        showPagination = true,
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
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(categoryId || 'all');
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [total, setTotal] = useState(0);

    const blockRef = useRef(null);
    const searchTimeout = useRef(null);

    // Fetch posts via AJAX
    const fetchPosts = async (targetPage = 1, cat = selectedCategory, search = searchQuery) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: String(targetPage),
                limit: String(limit || 6),
                category_id: cat || 'all',
            });
            if (search.trim()) {
                params.append('search', search.trim());
            }

            const res = await fetch(`/api/posts/advanced?${params.toString()}`);
            if (res.ok) {
                const data = await res.json();
                setPosts(data.data || []);
                setPage(data.current_page || 1);
                setLastPage(data.last_page || 1);
                setTotal(data.total || 0);
                if (data.categories) {
                    setCategories(data.categories);
                }
            }
        } catch (err) {
            console.error('Failed to load advanced posts:', err);
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch & refetch saat limit / default categoryId prop berubah
    useEffect(() => {
        setSelectedCategory(categoryId || 'all');
        fetchPosts(1, categoryId || 'all', searchQuery);
    }, [limit, categoryId]);

    // Handle search input with debounce
    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearchQuery(val);

        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        searchTimeout.current = setTimeout(() => {
            fetchPosts(1, selectedCategory, val);
        }, 350);
    };

    // Handle category tab change
    const handleCategoryClick = (catId) => {
        setSelectedCategory(catId);
        fetchPosts(1, catId, searchQuery);
    };

    // Handle page change
    const handlePageChange = (targetPage) => {
        if (targetPage < 1 || targetPage > lastPage || targetPage === page) return;
        fetchPosts(targetPage, selectedCategory, searchQuery);
        if (blockRef.current) {
            blockRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Layout grid styling
    const colClasses = {
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    }[columns] || 'grid-cols-1 md:grid-cols-3';

    // Card style presets
    const getCardWrapperClass = () => {
        switch (cardStyle) {
            case 'card':
                return 'bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl hover:border-slate-700 transition-all';
            case 'minimal':
                return 'bg-transparent border-b border-slate-800/80 pb-6 hover:border-indigo-500/50 transition-all';
            case 'bordered':
                return 'bg-slate-950 border border-slate-800 rounded-2xl p-5 hover:border-indigo-500/50 transition-all';
            case 'modern':
            default:
                return 'bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-3xl p-5 shadow-2xl hover:border-indigo-500/40 hover:-translate-y-1 transition-all group';
        }
    };

    return (
        <section ref={blockRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-100 transition-colors">
            <div className="max-w-7xl mx-auto space-y-10">
                {isCustom ? (
                    <div className="w-full">
                        <SubComponentSlot
                            blockId={blockId}
                            subComponents={subComponents}
                            emptyPlaceholder="+ Tambahkan Sub-Komponen ke Blok Artikel Lanjutan Ini"
                        />
                    </div>
                ) : (
                    <>
                        {/* Section Header */}
                        <div className="text-center max-w-3xl mx-auto space-y-3">
                            {(badge || isEditing) && (
                                <DefaultElementWrapper
                                    blockId={blockId}
                                    elementKey="badge"
                                    label="Badge"
                                    isCustom={isCustom}
                                >
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                        <Sparkles className="w-3.5 h-3.5" />
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
                                    <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                                        <InlineText
                                            value={subtitle}
                                            onChange={(val) => handlePropChange('subtitle', val)}
                                            placeholder="Supporting Subtitle"
                                        />
                                    </p>
                                </DefaultElementWrapper>
                            )}
                        </div>

                {/* Filter & Live Search Toolbar */}
                {(showSearch || showCategoryFilter) && (
                    <DefaultElementWrapper
                        blockId={blockId}
                        elementKey="toolbar"
                        label="Filter Toolbar"
                        isCustom={isCustom}
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/80">
                            {/* Category Filter Tabs */}
                            {showCategoryFilter && (
                                <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
                                    <button
                                        type="button"
                                        onClick={() => handleCategoryClick('all')}
                                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                                            selectedCategory === 'all'
                                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                                                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                                        }`}
                                    >
                                        All Articles
                                    </button>
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={() => handleCategoryClick(cat.id)}
                                            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                                                String(selectedCategory) === String(cat.id)
                                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                                                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                                            }`}
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Live Search Input */}
                            {showSearch && (
                                <div className="relative w-full md:w-72">
                                    <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        placeholder="Search published articles..."
                                        className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                                    />
                                    {searchQuery && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSearchQuery('');
                                                fetchPosts(1, selectedCategory, '');
                                            }}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-white"
                                        >
                                            Clear
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </DefaultElementWrapper>
                )}

                {/* Posts Content Area */}
                <DefaultElementWrapper
                    blockId={blockId}
                    elementKey="posts"
                    label="Articles Grid"
                    isCustom={isCustom}
                >
                    {loading ? (
                        <div className="py-24 text-center space-y-3">
                            <Loader2 className="w-8 h-8 mx-auto text-indigo-500 animate-spin" />
                            <p className="text-xs text-slate-400 font-medium">Fetching articles...</p>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="py-20 text-center rounded-3xl bg-slate-900/30 border border-slate-800/60 space-y-3">
                            <BookOpen className="w-10 h-10 mx-auto text-slate-600" />
                            <h3 className="text-base font-bold text-white">No Articles Found</h3>
                            <p className="text-xs text-slate-400 max-w-sm mx-auto">
                                {searchQuery
                                    ? `No results found matching "${searchQuery}". Try using different keywords.`
                                    : 'No publications available in this category yet.'}
                            </p>
                        </div>
                    ) : (
                    <div className={`grid ${colClasses} gap-6`}>
                        {posts.map((post) => (
                            <article key={post.id} className={getCardWrapperClass()}>
                                {/* Featured Image */}
                                {post.featured_image && (
                                    <a
                                        href={`/blog/${post.slug}`}
                                        className="block relative aspect-video rounded-2xl overflow-hidden mb-4 bg-slate-950 border border-slate-800"
                                    >
                                        <img
                                            src={post.featured_image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                        {showBadge && post.category && (
                                            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-indigo-300 border border-indigo-500/20">
                                                {post.category.name}
                                            </span>
                                        )}
                                    </a>
                                )}

                                <div className="space-y-3">
                                    {/* Meta info */}
                                    {(showDate || showAuthor) && (
                                        <div className="flex items-center gap-3 text-[11px] text-slate-400">
                                            {showDate && post.published_at && (
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                                                    <span>{post.published_at}</span>
                                                </span>
                                            )}
                                            {showAuthor && post.author && (
                                                <span className="flex items-center gap-1">
                                                    <User className="w-3.5 h-3.5 text-slate-500" />
                                                    <span>{post.author}</span>
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* Title */}
                                    <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
                                        <a href={`/blog/${post.slug}`}>{post.title}</a>
                                    </h3>

                                    {/* Excerpt */}
                                    {showExcerpt && post.excerpt && (
                                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                    )}

                                    {/* Read more link */}
                                    <div className="pt-1">
                                        <a
                                            href={`/blog/${post.slug}`}
                                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                                        >
                                            <span>Read Article</span>
                                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                {/* AJAX Pagination Controls */}
                {showPagination && lastPage > 1 && !loading && (
                    <div className="flex items-center justify-center gap-2 pt-6">
                        <button
                            type="button"
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page <= 1}
                            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-all"
                            title="Previous Page"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-1.5">
                            {Array.from({ length: lastPage }, (_, i) => i + 1).map((p) => (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => handlePageChange(p)}
                                    className={`w-8 h-8 rounded-xl text-xs font-semibold transition-all ${
                                        p === page
                                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                                            : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                                    }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page >= lastPage}
                            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-all"
                            title="Next Page"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
                    </DefaultElementWrapper>
                    </>
                )}
            </div>
        </section>
    );
};

export const AdvancedPostsSettings = ({ props = {}, updateProps, onChange }) => {
    const handleFieldChange = (key, val) => {
        if (typeof onChange === 'function') onChange(key, val);
        if (typeof updateProps === 'function') updateProps({ [key]: val });
    };

    const {
        badge = 'EXPLORE KNOWLEDGE',
        title = 'Latest Insights & Articles',
        subtitle = 'Browse our curated publications, tutorials, and engineering updates.',
        limit = 6,
        columns = 3,
        cardStyle = 'modern',
        showSearch = true,
        showCategoryFilter = true,
        showExcerpt = true,
        showDate = true,
        showAuthor = true,
        showBadge = true,
        showPagination = true,
    } = props;

    return (
        <div className="space-y-6 text-xs text-slate-300">
            {/* Header Content */}
            <div>
                <label className="block font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Section Header
                </label>
                <div className="space-y-2.5">
                    <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Badge</label>
                        <input
                            type="text"
                            value={badge}
                            onChange={(e) => handleFieldChange('badge', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => handleFieldChange('title', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-indigo-500 font-semibold"
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Subtitle</label>
                        <textarea
                            rows={2}
                            value={subtitle}
                            onChange={(e) => handleFieldChange('subtitle', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-indigo-500"
                        />
                    </div>
                </div>
            </div>

            {/* Layout & Query Config */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
                <label className="block font-bold text-slate-400 uppercase tracking-wider">
                    Query & Grid Layout
                </label>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Posts Per Page</label>
                        <select
                            value={limit}
                            onChange={(e) => handleFieldChange('limit', Number(e.target.value))}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                        >
                            <option value={3}>3 Posts</option>
                            <option value={6}>6 Posts</option>
                            <option value={9}>9 Posts</option>
                            <option value={12}>12 Posts</option>
                            <option value={18}>18 Posts</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Columns</label>
                        <select
                            value={columns}
                            onChange={(e) => handleFieldChange('columns', Number(e.target.value))}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                        >
                            <option value={2}>2 Columns</option>
                            <option value={3}>3 Columns</option>
                            <option value={4}>4 Columns</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Card Visual Style</label>
                    <select
                        value={cardStyle}
                        onChange={(e) => handleFieldChange('cardStyle', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                    >
                        <option value="modern">Modern Glassmorphism</option>
                        <option value="card">Solid Card Shadow</option>
                        <option value="bordered">Outlined Box</option>
                        <option value="minimal">Minimalist Separator</option>
                    </select>
                </div>
            </div>

            {/* Feature & Component Toggles */}
            <div className="pt-4 border-t border-slate-800 space-y-2.5">
                <label className="block font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Display Controls & AJAX
                </label>

                <label className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800/80 cursor-pointer">
                    <span className="text-slate-300">Live AJAX Search Bar</span>
                    <input
                        type="checkbox"
                        checked={!!showSearch}
                        onChange={(e) => handleFieldChange('showSearch', e.target.checked)}
                        className="rounded border-slate-700 bg-slate-900 text-indigo-600"
                    />
                </label>

                <label className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800/80 cursor-pointer">
                    <span className="text-slate-300">Category Filter Tabs</span>
                    <input
                        type="checkbox"
                        checked={!!showCategoryFilter}
                        onChange={(e) => handleFieldChange('showCategoryFilter', e.target.checked)}
                        className="rounded border-slate-700 bg-slate-900 text-indigo-600"
                    />
                </label>

                <label className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800/80 cursor-pointer">
                    <span className="text-slate-300">AJAX Pagination Controls</span>
                    <input
                        type="checkbox"
                        checked={!!showPagination}
                        onChange={(e) => handleFieldChange('showPagination', e.target.checked)}
                        className="rounded border-slate-700 bg-slate-900 text-indigo-600"
                    />
                </label>

                <label className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800/80 cursor-pointer">
                    <span className="text-slate-300">Show Excerpt / Summary</span>
                    <input
                        type="checkbox"
                        checked={!!showExcerpt}
                        onChange={(e) => handleFieldChange('showExcerpt', e.target.checked)}
                        className="rounded border-slate-700 bg-slate-900 text-indigo-600"
                    />
                </label>

                <label className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800/80 cursor-pointer">
                    <span className="text-slate-300">Show Published Date</span>
                    <input
                        type="checkbox"
                        checked={!!showDate}
                        onChange={(e) => handleFieldChange('showDate', e.target.checked)}
                        className="rounded border-slate-700 bg-slate-900 text-indigo-600"
                    />
                </label>

                <label className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800/80 cursor-pointer">
                    <span className="text-slate-300">Show Author Name</span>
                    <input
                        type="checkbox"
                        checked={!!showAuthor}
                        onChange={(e) => handleFieldChange('showAuthor', e.target.checked)}
                        className="rounded border-slate-700 bg-slate-900 text-indigo-600"
                    />
                </label>

                <label className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800/80 cursor-pointer">
                    <span className="text-slate-300">Show Category Badge Pill</span>
                    <input
                        type="checkbox"
                        checked={!!showBadge}
                        onChange={(e) => handleFieldChange('showBadge', e.target.checked)}
                        className="rounded border-slate-700 bg-slate-900 text-indigo-600"
                    />
                </label>
            </div>
        </div>
    );
};
