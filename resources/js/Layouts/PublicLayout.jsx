import React, { useState, useEffect } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import {
    ArrowUpRight,
    LogIn,
    LayoutDashboard,
    Search,
    BookOpen,
    Tag,
    Calendar,
    Menu as MenuIcon,
    X,
    Sun,
    Moon,
} from 'lucide-react';
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
    const { active_theme } = usePage().props;
    const [currentTheme, setCurrentTheme] = useState(active_theme || 'default_dark');
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (active_theme) {
            setCurrentTheme(active_theme);
        }
    }, [active_theme]);

    const isLight = currentTheme === 'default_light';

    const toggleTheme = () => {
        setCurrentTheme(isLight ? 'default_dark' : 'default_light');
    };

    // If blank layout (e.g. Sales Funnel / Landing Page Canvas)
    if (layout === 'blank') {
        return (
            <div className={`min-h-screen selection:bg-indigo-500 selection:text-white font-sans antialiased ${
                isLight ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'
            }`}>
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
        <div className={`min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white font-sans antialiased transition-colors duration-200 ${
            isLight ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'
        }`}>
            {/* Header Navigation */}
            <header className={`sticky top-0 z-50 w-full backdrop-blur-md transition-all ${
                isLight
                    ? 'bg-white/85 border-b border-slate-200/80 shadow-sm'
                    : 'bg-slate-950/85 border-b border-slate-800/80'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    {/* Brand Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <ApplicationLogo className="w-9 h-9 rounded-xl shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-all" />
                        <span className={`text-xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                            Rakitan<span className="text-indigo-500">.</span>
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navigation.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.url || item.slug || '/'}
                                target={item.target || '_self'}
                                className={`text-sm font-medium transition-colors ${
                                    isLight
                                        ? 'text-slate-600 hover:text-slate-900'
                                        : 'text-slate-300 hover:text-white'
                                }`}
                            >
                                {item.label || item.title}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions & Theme Toggle */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Theme Switcher Button */}
                        <button
                            type="button"
                            onClick={toggleTheme}
                            className={`p-2 rounded-xl border transition-all ${
                                isLight
                                    ? 'bg-slate-100 border-slate-200 text-amber-500 hover:bg-slate-200'
                                    : 'bg-slate-900 border-slate-800 text-indigo-400 hover:bg-slate-800'
                            }`}
                            title={`Switch to ${isLight ? 'Dark Theme' : 'Light Theme'}`}
                        >
                            {isLight ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>

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
                                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                                    isLight
                                        ? 'text-slate-700 hover:text-slate-900 border-slate-300 bg-white hover:bg-slate-100 shadow-sm'
                                        : 'text-slate-200 hover:text-white border-slate-800 bg-slate-900/60 hover:bg-slate-800'
                                }`}
                            >
                                <LogIn className="w-3.5 h-3.5" />
                                <span>Log In</span>
                            </Link>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className={`md:hidden p-2 rounded-xl border ${
                                isLight
                                    ? 'bg-slate-100 border-slate-200 text-slate-600'
                                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Drawer */}
                {mobileMenuOpen && (
                    <div className={`md:hidden px-4 pt-2 pb-4 border-t space-y-2 ${
                        isLight ? 'bg-white border-slate-200' : 'bg-slate-950 border-slate-800'
                    }`}>
                        {navigation.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.url || item.slug || '/'}
                                target={item.target || '_self'}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                                    isLight
                                        ? 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                                }`}
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
                        <div className={`rounded-3xl p-6 sm:p-12 shadow-2xl backdrop-blur-xl border ${
                            isLight
                                ? 'bg-white/90 border-slate-200 shadow-slate-200/50 text-slate-900'
                                : 'bg-slate-900/70 border-slate-800 shadow-slate-950/60 text-slate-100'
                        }`}>
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
                                <div className={`p-5 rounded-2xl border ${
                                    isLight
                                        ? 'bg-white border-slate-200 shadow-sm'
                                        : 'bg-slate-900/60 border-slate-800/80'
                                }`}>
                                    <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${
                                        isLight ? 'text-slate-500' : 'text-slate-400'
                                    }`}>
                                        <Search className="w-4 h-4 text-indigo-500" />
                                        <span>Search Content</span>
                                    </h3>
                                    <form onSubmit={handleSearchSubmit} className="relative">
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search blog or articles..."
                                            className={`w-full pl-3.5 pr-10 py-2 rounded-xl text-xs border focus:outline-none focus:border-indigo-500 ${
                                                isLight
                                                    ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                                                    : 'bg-slate-950 border-slate-800 text-white placeholder-slate-500'
                                            }`}
                                        />
                                        <button
                                            type="submit"
                                            className="absolute right-2 top-2 text-slate-400 hover:text-indigo-500 transition-colors"
                                        >
                                            <Search className="w-4 h-4" />
                                        </button>
                                    </form>
                                </div>

                                {/* Categories Widget */}
                                {categories && categories.length > 0 && (
                                    <div className={`p-5 rounded-2xl border ${
                                        isLight
                                            ? 'bg-white border-slate-200 shadow-sm'
                                            : 'bg-slate-900/60 border-slate-800/80'
                                    }`}>
                                        <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${
                                            isLight ? 'text-slate-500' : 'text-slate-400'
                                        }`}>
                                            <Tag className="w-4 h-4 text-purple-500" />
                                            <span>Categories</span>
                                        </h3>
                                        <div className="space-y-1.5">
                                            {categories.map((cat) => (
                                                <Link
                                                    key={cat.id}
                                                    href={`/blog?category=${cat.slug}`}
                                                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors group ${
                                                        isLight
                                                            ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                                            : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                                                    }`}
                                                >
                                                    <span className="group-hover:translate-x-0.5 transition-transform">
                                                        {cat.name}
                                                    </span>
                                                    {cat.posts_count !== undefined && (
                                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                                            isLight
                                                                ? 'bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                                                                : 'bg-slate-800 text-slate-400 group-hover:bg-indigo-600/30 group-hover:text-indigo-300'
                                                        }`}>
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
                                    <div className={`p-5 rounded-2xl border ${
                                        isLight
                                            ? 'bg-white border-slate-200 shadow-sm'
                                            : 'bg-slate-900/60 border-slate-800/80'
                                    }`}>
                                        <h3 className={`text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${
                                            isLight ? 'text-slate-500' : 'text-slate-400'
                                        }`}>
                                            <BookOpen className="w-4 h-4 text-emerald-500" />
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
                                                            className={`w-14 h-14 rounded-lg object-cover flex-shrink-0 border group-hover:opacity-90 ${
                                                                isLight ? 'border-slate-200' : 'border-slate-800'
                                                            }`}
                                                        />
                                                    )}
                                                    <div className="min-w-0">
                                                        <h4 className={`text-xs font-semibold group-hover:text-indigo-500 transition-colors line-clamp-2 ${
                                                            isLight ? 'text-slate-800' : 'text-slate-200'
                                                        }`}>
                                                            {post.title}
                                                        </h4>
                                                        <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-400">
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
            <footer className={`border-t py-12 px-4 sm:px-6 lg:px-8 transition-colors ${
                isLight
                    ? 'border-slate-200 bg-white text-slate-600'
                    : 'border-slate-800/80 bg-slate-950/90 text-slate-400'
            }`}>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2.5">
                        <ApplicationLogo className="w-7 h-7 rounded-lg" />
                        <span className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>
                            Rakitan Modular CMS
                        </span>
                        <span className="text-xs text-slate-400">
                            © {new Date().getFullYear()} Open-Source CMS.
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 text-xs">
                        {footerNavigation && footerNavigation.length > 0 ? (
                            footerNavigation.map((item, idx) => (
                                <Link
                                    key={idx}
                                    href={item.url || item.slug || '/'}
                                    target={item.target || '_self'}
                                    className={`transition-colors ${
                                        isLight ? 'hover:text-slate-900 text-slate-600' : 'hover:text-white text-slate-400'
                                    }`}
                                >
                                    {item.label || item.title}
                                </Link>
                            ))
                        ) : (
                            <>
                                <Link href="/" className="hover:text-indigo-500 transition-colors">Home</Link>
                                <Link href="/blog" className="hover:text-indigo-500 transition-colors">Blog</Link>
                                <Link href="/about" className="hover:text-indigo-500 transition-colors">About</Link>
                            </>
                        )}
                        <a
                            href="https://laravel.com"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 hover:text-indigo-500 transition-colors"
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
