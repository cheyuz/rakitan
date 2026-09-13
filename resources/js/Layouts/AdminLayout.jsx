import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    FileText,
    BookOpen,
    Tag,
    Menu as MenuIcon,
    Image as ImageIcon,
    Palette,
    Wrench,
    Settings,
    Globe,
    LogOut,
    Plus,
    User,
    CheckCircle2,
    AlertCircle,
    Puzzle,
    Users,
    Inbox,
    SlidersHorizontal,
} from 'lucide-react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function AdminLayout({ children, title = 'Rakitan Admin' }) {
    const { auth, flash } = usePage().props;
    const currentUrl = window.location.pathname;
    const userRole = auth?.user?.role || 'admin';
    const isAdmin = userRole === 'admin';
    const isEditor = userRole === 'editor';
    const canManageContent = isAdmin || isEditor;

    const navItems = [
        {
            label: 'Dashboard',
            href: '/admin/dashboard',
            icon: LayoutDashboard,
            active: currentUrl === '/admin/dashboard',
            show: true,
        },
        {
            label: 'Pages',
            href: '/admin/pages',
            icon: FileText,
            active: currentUrl.startsWith('/admin/pages') && !currentUrl.includes('/builder'),
            show: canManageContent,
        },
        {
            label: 'Posts',
            href: '/admin/posts',
            icon: BookOpen,
            active: currentUrl.startsWith('/admin/posts'),
            show: true,
        },
        {
            label: 'Categories',
            href: '/admin/categories',
            icon: Tag,
            active: currentUrl.startsWith('/admin/categories'),
            show: canManageContent,
        },
        {
            label: 'Media Library',
            href: '/admin/media',
            icon: ImageIcon,
            active: currentUrl.startsWith('/admin/media'),
            show: true,
        },
        {
            label: 'Menus',
            href: '/admin/menus',
            icon: MenuIcon,
            active: currentUrl.startsWith('/admin/menus'),
            show: canManageContent,
        },
        {
            label: 'Sliders',
            href: '/admin/sliders',
            icon: SlidersHorizontal,
            active: currentUrl.startsWith('/admin/sliders'),
            show: canManageContent,
        },
        {
            label: 'Inquiries / Inbox',
            href: '/admin/submissions',
            icon: Inbox,
            active: currentUrl.startsWith('/admin/submissions'),
            show: canManageContent,
        },
        {
            label: 'Plugins',
            href: '/admin/plugins',
            icon: Puzzle,
            active: currentUrl.startsWith('/admin/plugins'),
            show: isAdmin,
        },
        {
            label: 'Themes',
            href: '/admin/themes',
            icon: Palette,
            active: currentUrl.startsWith('/admin/themes'),
            show: isAdmin,
        },
        {
            label: 'Users & Roles',
            href: '/admin/users',
            icon: Users,
            active: currentUrl.startsWith('/admin/users'),
            show: isAdmin,
        },
        {
            label: 'Tools & Migration',
            href: '/admin/tools',
            icon: Wrench,
            active: currentUrl.startsWith('/admin/tools'),
            show: isAdmin,
        },
        {
            label: 'Settings',
            href: '/admin/settings',
            icon: Settings,
            active: currentUrl.startsWith('/admin/settings'),
            show: isAdmin,
        },
    ].filter((item) => item.show);

    return (
        <div className="min-h-screen flex bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-800/80 bg-slate-900/60 backdrop-blur-xl flex flex-col justify-between hidden md:flex">
                <div>
                    {/* Brand */}
                    <div className="h-16 px-6 flex items-center gap-3 border-b border-slate-800/60">
                        <ApplicationLogo className="w-9 h-9 rounded-xl shadow-lg shadow-indigo-600/20" />
                        <div>
                            <span className="text-lg font-black tracking-tight text-white">
                                Rakitan<span className="text-indigo-400">.</span>
                            </span>
                            <span className="block text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                                Open Source CMS
                            </span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="px-3 py-6 space-y-1">
                        <div className="px-3 pb-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                            Main Menu
                        </div>
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                                        item.active
                                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom User Area */}
                <div className="p-4 border-t border-slate-800/60 space-y-2">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
                    >
                        <Globe className="w-4 h-4 text-emerald-400" />
                        <span>Visit Public Site</span>
                    </Link>

                    <div className="pt-2 flex items-center justify-between px-2">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-300">
                                <User className="w-4 h-4" />
                            </div>
                            <div className="text-[11px] leading-tight truncate max-w-[120px]">
                                <div className="font-semibold text-white truncate flex items-center gap-1">
                                    <span className="truncate">{auth?.user?.name || 'Admin'}</span>
                                    <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-indigo-500/20 text-indigo-400 capitalize flex-shrink-0">
                                        {userRole}
                                    </span>
                                </div>
                                <p className="text-slate-400 truncate">{auth?.user?.email || 'admin@rakitan'}</p>
                            </div>
                        </div>

                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            title="Log Out"
                        >
                            <LogOut className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Topbar */}
                <header className="h-16 px-6 border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h1 className="text-base font-bold text-white">{title}</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin/pages"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            <span>New Page</span>
                        </Link>
                    </div>
                </header>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="mx-6 mt-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                        <span>{flash.success}</span>
                    </div>
                )}
                {flash?.error && (
                    <div className="mx-6 mt-4 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{flash.error}</span>
                    </div>
                )}

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
