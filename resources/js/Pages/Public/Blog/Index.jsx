import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Search, Calendar, User, ArrowRight, BookOpen, Sparkles, Filter } from 'lucide-react';

export default function Index({
    posts,
    categories = [],
    activeCategory = null,
    recentPosts = [],
    filters = {},
    navigation = [],
    footerNavigation = [],
    isAdmin = false,
}) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/blog', {
            search: search.trim() || undefined,
            category: activeCategory?.slug || undefined,
        }, { preserveState: true });
    };

    return (
        <PublicLayout
            navigation={navigation}
            footerNavigation={footerNavigation}
            layout="default"
            recentPosts={recentPosts}
            categories={categories}
            isAdmin={isAdmin}
        >
            <Head>
                <title>{activeCategory ? `${activeCategory.name} - Blog - Rakitan CMS` : 'The Rakitan Journal - Blog & Articles'}</title>
                <meta
                    name="description"
                    content="Stay up-to-date with tutorials, architecture insights, and engineering updates from Rakitan CMS."
                />
            </Head>

            {/* Hero Header */}
            <section className="relative overflow-hidden pt-16 pb-12 sm:pt-24 sm:pb-16 bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-950 border-b border-slate-800/80">
                <div className="absolute inset-0 -z-10 opacity-25">
                    <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Rakitan Knowledge Base</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
                        {activeCategory ? activeCategory.name : 'Latest Articles & Updates'}
                    </h1>

                    <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
                        {activeCategory?.description || 'Explore deep-dives, visual builder tutorials, and frontend architecture philosophies from the Rakitan community.'}
                    </p>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="max-w-lg mx-auto relative">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search articles, guides, topics..."
                            className="w-full pl-11 pr-28 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 shadow-xl"
                        />
                        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                        <button
                            type="submit"
                            className="absolute right-2 top-2 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </section>

            {/* Main Content & Articles Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Category Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-800/80 scrollbar-none">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-2">
                        <Filter className="w-3.5 h-3.5" />
                        <span>Filter:</span>
                    </span>

                    <Link
                        href="/blog"
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                            !activeCategory
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                    >
                        All Topics
                    </Link>

                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/blog?category=${cat.slug}`}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                                activeCategory?.slug === cat.slug
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                        >
                            <span>{cat.name}</span>
                            <span className="text-[10px] opacity-70">({cat.posts_count})</span>
                        </Link>
                    ))}
                </div>

                {/* Posts List or Empty State */}
                {posts.data.length === 0 ? (
                    <div className="py-24 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 flex items-center justify-center mx-auto mb-4">
                            <BookOpen className="w-7 h-7" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">No articles found</h3>
                        <p className="text-sm text-slate-400 max-w-sm mx-auto mb-6">
                            No published articles matched your search query or selected category.
                        </p>
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition-all"
                        >
                            <span>Clear Filter</span>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.data.map((post) => (
                            <article
                                key={post.id}
                                className="group flex flex-col rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 hover:bg-slate-900/90 transition-all overflow-hidden shadow-lg shadow-slate-950/40 hover:-translate-y-1 duration-300"
                            >
                                {/* Thumbnail Image */}
                                <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                                    {post.featured_image ? (
                                        <img
                                            src={post.featured_image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-indigo-950/40 to-slate-900 text-slate-600">
                                            <BookOpen className="w-10 h-10 opacity-40" />
                                        </div>
                                    )}

                                    {post.category && (
                                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-950/80 backdrop-blur-md text-indigo-300 border border-indigo-500/20">
                                            {post.category.name}
                                        </span>
                                    )}
                                </Link>

                                {/* Post Body */}
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-3 text-xs text-slate-500 mb-2.5">
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

                                        <h2 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-2 mb-2 leading-snug">
                                            <Link href={`/blog/${post.slug}`}>
                                                {post.title}
                                            </Link>
                                        </h2>

                                        {post.excerpt && (
                                            <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
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

                {/* Pagination */}
                {posts.links && posts.links.length > 3 && (
                    <div className="mt-12 flex justify-center gap-1.5">
                        {posts.links.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                                    link.active
                                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                                        : link.url
                                        ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                                        : 'opacity-40 cursor-not-allowed text-slate-600'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </section>
        </PublicLayout>
    );
}
