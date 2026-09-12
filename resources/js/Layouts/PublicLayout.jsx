import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { ArrowUpRight, LogIn, LayoutDashboard, Search, BookOpen, Tag, Calendar, Menu as MenuIcon, X } from 'lucide-react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function PublicLayout({
    children,
    navigation = [],
    footerNavigation = [],
    layout = 'default',
    recentPosts = [],
    categories = [],
    isAdmin = false,
}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // If blank layout (e.g. Sales Funnel / Landing Page Canvas)
    if (layout === 'blank') {
        return (
            <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white font-sans antialiased">
                {children}
            </div>
        );
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.get('/blog', { search: searchQuery.trim() });
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white font-sans antialiased">
            {/* Header Navigation */}
            <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80 transition-all">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    {/* Brand Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <ApplicationLogo className="w-9 h-9 rounded-xl shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-all" />
                        <span className="text-xl font-black tracking-tight text-white">
                            Rakitan<span className="text-indigo-400">.</span>
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navigation.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.url || item.slug || '/'}
                                target={item.target || '_self'}
                                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                            >
                                {item.label || item.title}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        {isAdmin ? (
                            <Link
                                href="/admin/dashboard"
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all"
                            >
                                <LayoutDashboard className="w-3.5 h-3.5" />
                                <span>Dashboard</span>
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white border border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-800 transition-all"
                            >
                                <LogIn className="w-3.5 h-3.5" />
                                <span>Log In</span>
                            </Link>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Drawer */}
                {mobileMenuOpen && (
                    <div className="md:hidden px-4 pt-2 pb-4 border-t border-slate-800/80 bg-slate-950 space-y-2">
                        {navigation.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.url || item.slug || '/'}
                                target={item.target || '_self'}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-900 hover:text-white"
                            >
                                {item.label || item.title}
                            </Link>
                        ))}
                    </div>
                )}
            </header>

            {/* Main Content Area based on chosen Layout */}
            <main className="flex-1 w-full">
                {layout === 'boxed' ? (
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 my-10 sm:my-14">
                        <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-12 shadow-2xl shadow-slate-950/60 backdrop-blur-xl">
                            {children}
                        </div>
                    </div>
                ) : layout === 'sidebar' ? (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* Main Content (8 cols) */}
                            <div className="lg:col-span-8 min-w-0">
                                {children}
                            </div>

                            {/* Sidebar Column (4 cols) */}
                            <aside className="lg:col-span-4 space-y-6">
                                {/* Search Widget */}
                                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                                        <Search className="w-4 h-4 text-indigo-400" />
                                        <span>Search Content</span>
                                    </h3>
                                    <form onSubmit={handleSearchSubmit} className="relative">
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search blog or articles..."
                                            className="w-full pl-3.5 pr-10 py-2 rounded-xl text-xs bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                                        />
                                        <button
                                            type="submit"
                                            className="absolute right-2 top-2 text-slate-400 hover:text-indigo-400 transition-colors"
                                        >
                                            <Search className="w-4 h-4" />
                                        </button>
                                    </form>
                                </div>

                                {/* Categories Widget */}
                                {categories && categories.length > 0 && (
                                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                                            <Tag className="w-4 h-4 text-purple-400" />
                                            <span>Categories</span>
                                        </h3>
                                        <div className="space-y-1.5">
                                            {categories.map((cat) => (
                                                <Link
                                                    key={cat.id}
                                                    href={`/blog?category=${cat.slug}`}
                                                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors group"
                                                >
                                                    <span className="group-hover:translate-x-0.5 transition-transform">
                                                        {cat.name}
                                                    </span>
                                                    {cat.posts_count !== undefined && (
                                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-400 group-hover:bg-indigo-600/30 group-hover:text-indigo-300 transition-colors">
                                                            {cat.posts_count}
                                                        </span>
                                                    )}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Recent Posts Widget */}
                                {recentPosts && recentPosts.length > 0 && (
                                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                                            <BookOpen className="w-4 h-4 text-emerald-400" />
                                            <span>Recent Articles</span>
                                        </h3>
                                        <div className="space-y-3.5">
                                            {recentPosts.map((post) => (
                                                <Link
                                                    key={post.id}
                                                    href={`/blog/${post.slug}`}
                                                    className="flex items-start gap-3 group"
                                                >
                                                    {post.featured_image && (
                                                        <img
                                                            src={post.featured_image}
                                                            alt={post.title}
                                                            className="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-slate-800 group-hover:opacity-90"
                                                        />
                                                    )}
                                                    <div className="min-w-0">
                                                        <h4 className="text-xs font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors line-clamp-2">
                                                            {post.title}
                                                        </h4>
                                                        <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-500">
                                                            <Calendar className="w-3 h-3" />
                                                            <span>{post.published_at}</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </aside>
                        </div>
                    </div>
                ) : (
                    /* Default full width layout */
                    children
                )}
            </main>

            {/* Footer Navigation */}
            <footer className="border-t border-slate-800/80 bg-slate-950/90 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2.5">
                        <ApplicationLogo className="w-7 h-7 rounded-lg" />
                        <span className="text-sm font-bold text-slate-200">
                            Rakitan Modular CMS
                        </span>
                        <span className="text-xs text-slate-500">
                            © {new Date().getFullYear()} Open-Source CMS.
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
                        {footerNavigation && footerNavigation.length > 0 ? (
                            footerNavigation.map((item, idx) => (
                                <Link
                                    key={idx}
                                    href={item.url || item.slug || '/'}
                                    target={item.target || '_self'}
                                    className="hover:text-white transition-colors"
                                >
                                    {item.label || item.title}
                                </Link>
                            ))
                        ) : (
                            <>
                                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                                <Link href="/about" className="hover:text-white transition-colors">About</Link>
                            </>
                        )}
                        <a
                            href="https://laravel.com"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 hover:text-white transition-colors"
                        >
                            <span>Powered by Laravel & Inertia</span>
                            <ArrowUpRight className="w-3 h-3" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
