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
} from 'lucide-react';

export default function Dashboard({ stats, recentPages = [] }) {
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
            label: 'Draft Pages',
            value: stats.draftPages,
            icon: Clock,
            color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
        },
        {
            label: 'Installed Puzzle Blocks',
            value: stats.totalBlocks,
            icon: Layers,
            color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
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
                            Construct and manage your website layouts with flexible, modular puzzle blocks designed for superior speed and visual elegance.
                        </p>
                        <div className="flex items-center gap-3">
                            <Link
                                href="/admin/pages"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/25 transition-all"
                            >
                                <span>Manage All Pages</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/"
                                target="_blank"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white border border-slate-700 bg-slate-800/40 hover:bg-slate-800 transition-all"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>Visit Public Site</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {statCards.map((card, idx) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={idx}
                                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm flex items-center justify-between shadow-sm hover:border-slate-700 transition-all"
                            >
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                                        {card.label}
                                    </p>
                                    <h3 className="text-3xl font-black text-white">
                                        {card.value}
                                    </h3>
                                </div>
                                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${card.color}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Recent Pages Table */}
                <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 overflow-hidden shadow-sm">
                    <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-bold text-white">Recently Updated Pages</h3>
                            <p className="text-xs text-slate-400">Latest content edits across your website</p>
                        </div>
                        <Link
                            href="/admin/pages"
                            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                            View All →
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800/80 bg-slate-950/40 text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                                    <th className="py-3 px-5">Page Title</th>
                                    <th className="py-3 px-5">Slug</th>
                                    <th className="py-3 px-5">Status</th>
                                    <th className="py-3 px-5">Blocks</th>
                                    <th className="py-3 px-5">Last Modified</th>
                                    <th className="py-3 px-5 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 text-xs">
                                {recentPages.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-8 text-center text-slate-500">
                                            No pages created yet.
                                        </td>
                                    </tr>
                                ) : (
                                    recentPages.map((page) => (
                                        <tr key={page.id} className="hover:bg-slate-800/30 transition-colors">
                                            <td className="py-3.5 px-5 font-semibold text-white">
                                                {page.title}
                                            </td>
                                            <td className="py-3.5 px-5 font-mono text-slate-400">
                                                /{page.slug === 'home' ? '' : page.slug}
                                            </td>
                                            <td className="py-3.5 px-5">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${
                                                    page.status === 'published'
                                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                                }`}>
                                                    {page.status === 'published' ? 'Published' : 'Draft'}
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-5 text-slate-300">
                                                <span className="inline-flex items-center gap-1 font-semibold">
                                                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                                                    {page.blocks_count} blocks
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-5 text-slate-400">
                                                {page.updated_at}
                                            </td>
                                            <td className="py-3.5 px-5 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/admin/pages/${page.id}/builder`}
                                                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white font-semibold text-[11px] transition-all"
                                                        title="Open Visual Builder"
                                                    >
                                                        <Edit3 className="w-3.5 h-3.5" />
                                                        <span>Build</span>
                                                    </Link>
                                                    <Link
                                                        href={page.slug === 'home' ? '/' : `/${page.slug}`}
                                                        target="_blank"
                                                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                                                        title="View Public Preview"
                                                    >
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
