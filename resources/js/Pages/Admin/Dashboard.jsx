import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    FileText,
    CheckCircle2,
    Clock,
    Layers,
    ArrowRight,
    Edit3,
    ExternalLink,
    Sparkles,
    BookOpen,
    Tag,
    Plus,
} from 'lucide-react';

export default function Dashboard({ stats, recentPages = [], recentPosts = [] }) {
    const statCards = [
        {
            label: 'Total Pages',
            value: stats.totalPages,
            icon: FileText,
            color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
        },
        {
            label: 'Published Pages',
            value: stats.publishedPages,
            icon: CheckCircle2,
            color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        },
        {
            label: 'Blog Articles',
            value: stats.totalPosts ?? 0,
            icon: BookOpen,
            color: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
        },
        {
            label: 'Categories',
            value: stats.totalCategories ?? 0,
            icon: Tag,
            color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
        },
        {
            label: 'Draft Content',
            value: stats.draftPages,
            icon: Clock,
            color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
        },
        {
            label: 'Installed Blocks',
            value: stats.totalBlocks,
            icon: Layers,
            color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
        },
    ];

    return (
        <AdminLayout title="CMS Overview">
            <Head title="Admin Dashboard - Rakitan" />

            <div className="space-y-8 max-w-7xl mx-auto">
                {/* Welcome Banner */}
                <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-r from-indigo-950/70 via-slate-900 to-slate-900 border border-indigo-500/20 shadow-xl">
                    <div className="relative z-10 max-w-2xl">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-4">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Component-Driven Visual Builder</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                            Welcome to Rakitan CMS
                        </h2>
                        <p className="text-sm text-slate-300 leading-relaxed mb-6">
                            Construct dynamic pages, publish structured blog posts, and configure modern layouts with modular ease.
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                            <Link
                                href="/admin/pages"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/25 transition-all"
                            >
                                <span>Manage All Pages</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/admin/posts/create"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Write New Post</span>
                            </Link>
                            <Link
                                href="/"
                                target="_blank"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-all"
                            >
                                <span>View Public Site</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Metrics Stat Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {statCards.map((card, idx) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={idx}
                                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all shadow-lg shadow-slate-950/30"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                                        {card.label}
                                    </span>
                                    <div className={`p-2 rounded-xl border ${card.color}`}>
                                        <Icon className="w-4 h-4" />
                                    </div>
                                </div>
                                <div className="text-2xl font-black text-white tracking-tight">
                                    {card.value}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Recent Pages (7 cols) */}
                    <div className="lg:col-span-7 rounded-3xl bg-slate-900/60 border border-slate-800/80 p-6 shadow-xl space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-bold text-white tracking-tight">
                                    Recent Pages
                                </h3>
                                <p className="text-xs text-slate-400">
                                    Quick access to recent layout modifications.
                                </p>
                            </div>
                            <Link
                                href="/admin/pages"
                                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                            >
                                View All Pages →
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                    <tr className="border-b border-slate-800/80 bg-slate-950/40 text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                                        <th className="py-2.5 px-4">Title</th>
                                        <th className="py-2.5 px-4">Status</th>
                                        <th className="py-2.5 px-4">Blocks</th>
                                        <th className="py-2.5 px-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/60">
                                    {recentPages.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="py-6 text-center text-slate-500">
                                                No pages found.
                                            </td>
                                        </tr>
                                    ) : (
                                        recentPages.map((page) => (
                                            <tr key={page.id} className="hover:bg-slate-800/30 transition-colors">
                                                <td className="py-3 px-4 font-semibold text-white">
                                                    <div className="truncate max-w-xs">{page.title}</div>
                                                    <div className="text-[10px] text-slate-500 font-mono">/{page.slug}</div>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase ${
                                                        page.status === 'published'
                                                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                                    }`}>
                                                        {page.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-slate-300 text-[11px]">
                                                    {page.blocks_count} blocks
                                                </td>
                                                <td className="py-3 px-4 text-right">
                                                    <Link
                                                        href={`/admin/pages/${page.id}/builder`}
                                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white font-semibold text-[11px] transition-all"
                                                    >
                                                        <Edit3 className="w-3.5 h-3.5" />
                                                        <span>Build</span>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Recent Articles (5 cols) */}
                    <div className="lg:col-span-5 rounded-3xl bg-slate-900/60 border border-slate-800/80 p-6 shadow-xl space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-bold text-white tracking-tight">
                                    Recent Articles
                                </h3>
                                <p className="text-xs text-slate-400">
                                    Latest blog posts published.
                                </p>
                            </div>
                            <Link
                                href="/admin/posts"
                                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                            >
                                View All Posts →
                            </Link>
                        </div>

                        <div className="space-y-2.5">
                            {recentPosts.length === 0 ? (
                                <div className="py-8 text-center text-slate-500 text-xs">
                                    No articles published yet.
                                </div>
                            ) : (
                                recentPosts.map((post) => (
                                    <div
                                        key={post.id}
                                        className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-3 hover:border-slate-700 transition-all"
                                    >
                                        <div className="min-w-0">
                                            <h4 className="text-xs font-bold text-white truncate">
                                                {post.title}
                                            </h4>
                                            <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                                                <span className="text-purple-400 font-semibold">{post.category}</span>
                                                <span>•</span>
                                                <span>{post.updated_at}</span>
                                            </div>
                                        </div>

                                        <Link
                                            href={`/admin/posts/${post.id}/edit`}
                                            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-900 transition-colors flex-shrink-0"
                                            title="Edit Post"
                                        >
                                            <Edit3 className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
