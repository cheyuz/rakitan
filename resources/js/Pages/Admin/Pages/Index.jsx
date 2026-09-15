import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Plus,
    Search,
    Edit3,
    Copy,
    Trash2,
    ExternalLink,
    Layers,
    X,
} from 'lucide-react';

export default function Index({ pages, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newSlug, setNewSlug] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/pages', { search, status }, { preserveState: true, replace: true });
    };

    const handleStatusFilter = (newStatus) => {
        setStatus(newStatus);
        router.get('/admin/pages', { search, status: newStatus }, { preserveState: true, replace: true });
    };

    const handleCreatePage = (e) => {
        e.preventDefault();
        if (!newTitle.trim()) return;

        setIsSubmitting(true);
        router.post('/admin/pages', {
            title: newTitle,
            slug: newSlug,
        }, {
            onFinish: () => {
                setIsSubmitting(false);
                setIsCreateModalOpen(false);
                setNewTitle('');
                setNewSlug('');
            },
        });
    };

    const handleDuplicate = (pageId) => {
        if (confirm('Duplicate this page and its block layout?')) {
            router.post(`/admin/pages/${pageId}/duplicate`);
        }
    };

    const handleToggleStatus = (pageId) => {
        router.patch(`/admin/pages/${pageId}/toggle-status`, {}, {
            preserveScroll: true,
        });
    };

    const handleDelete = (pageId, title) => {
        if (confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
            router.delete(`/admin/pages/${pageId}`);
        }
    };

    return (
        <AdminLayout title="Pages Management">
            <Head title="Pages - Rakitan CMS" />

            <div className="space-y-6 max-w-7xl mx-auto">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-black text-white tracking-tight">All Pages</h2>
                        <p className="text-xs text-slate-400">Assemble and manage pages for your website</p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsCreateModalOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition-all active:scale-95"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Create New Page</span>
                    </button>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <div className="flex items-center gap-2">
                        {['', 'published', 'draft'].map((st) => (
                            <button
                                key={st}
                                type="button"
                                onClick={() => handleStatusFilter(st)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                                    status === st
                                        ? 'bg-indigo-600 text-white shadow-sm'
                                        : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
                                }`}
                            >
                                {st === '' ? 'All' : st === 'published' ? 'Published' : 'Drafts'}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSearch} className="flex items-center gap-2">
                        <div className="relative w-full md:w-72">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search title or slug..."
                                className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs bg-slate-950 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                        >
                            Search
                        </button>
                    </form>
                </div>

                {/* Pages Table */}
                <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800 bg-slate-950/40 text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                                    <th className="py-3.5 px-5">Title & Slug</th>
                                    <th className="py-3.5 px-5">Status</th>
                                    <th className="py-3.5 px-5">Content Blocks</th>
                                    <th className="py-3.5 px-5">Author</th>
                                    <th className="py-3.5 px-5">Updated</th>
                                    <th className="py-3.5 px-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 text-xs">
                                {pages.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-slate-500">
                                            No pages found matching your search criteria.
                                        </td>
                                    </tr>
                                ) : (
                                    pages.data.map((page) => (
                                        <tr key={page.id} className="hover:bg-slate-800/30 transition-colors">
                                            <td className="py-4 px-5">
                                                <div className="font-semibold text-white text-sm mb-0.5">
                                                    {page.title}
                                                </div>
                                                <div className="font-mono text-[11px] text-indigo-400 flex items-center gap-1">
                                                    <span>/{page.slug === 'home' ? '' : page.slug}</span>
                                                    {page.slug === 'home' && (
                                                        <span className="px-1.5 py-0.2 rounded text-[9px] font-sans font-bold bg-indigo-500/20 text-indigo-300">
                                                            Home
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-4 px-5">
                                                <button
                                                    type="button"
                                                    onClick={() => handleToggleStatus(page.id)}
                                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                                                        page.status === 'published'
                                                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                                                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20'
                                                    }`}
                                                    title="Klik untuk mengubah status (Draft / Published)"
                                                >
                                                    <span className={`w-1.5 h-1.5 rounded-full ${page.status === 'published' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                                                    <span>{page.status === 'published' ? 'Published' : 'Draft'}</span>
                                                </button>
                                            </td>
                                            <td className="py-4 px-5 text-slate-300">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-medium">
                                                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                                                    <span>{page.blocks_count} blocks</span>
                                                </span>
                                            </td>
                                            <td className="py-4 px-5 text-slate-300 font-medium">
                                                {page.author}
                                            </td>
                                            <td className="py-4 px-5 text-slate-400">
                                                {page.updated_at}
                                            </td>
                                            <td className="py-4 px-5 text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <Link
                                                        href={`/admin/pages/${page.id}/builder`}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all shadow-sm"
                                                        title="Open Drag & Drop Visual Builder"
                                                    >
                                                        <Edit3 className="w-3.5 h-3.5" />
                                                        <span>Build</span>
                                                    </Link>

                                                    <Link
                                                        href={page.slug === 'home' ? '/' : `/${page.slug}`}
                                                        target="_blank"
                                                        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                                                        title="View Public Page"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDuplicate(page.id)}
                                                        className="p-2 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"
                                                        title="Duplicate Page"
                                                    >
                                                        <Copy className="w-4 h-4" />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(page.id, page.title)}
                                                        className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                                        title="Delete Page"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {pages.links && pages.links.length > 3 && (
                        <div className="p-4 border-t border-slate-800 flex items-center justify-center gap-1">
                            {pages.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                                        link.active
                                            ? 'bg-indigo-600 text-white'
                                            : !link.url
                                            ? 'text-slate-600 cursor-not-allowed'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Create Page Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                            <h3 className="text-base font-bold text-white">Create New Page</h3>
                            <button
                                type="button"
                                onClick={() => setIsCreateModalOpen(false)}
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleCreatePage} className="mt-4 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                    Page Title <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    placeholder="e.g. Products & Services"
                                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                    URL Slug (Optional, auto-generated from title)
                                </label>
                                <input
                                    type="text"
                                    value={newSlug}
                                    onChange={(e) => setNewSlug(e.target.value)}
                                    placeholder="products-and-services"
                                    className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>

                            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !newTitle.trim()}
                                    className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white shadow-md shadow-indigo-600/25 transition-all"
                                >
                                    {isSubmitting ? 'Creating...' : 'Create & Start Building'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
