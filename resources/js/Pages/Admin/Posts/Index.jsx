import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Plus,
    Search,
    Edit3,
    Trash2,
    Copy,
    ExternalLink,
    BookOpen,
    Filter,
    Calendar,
    Layout,
} from 'lucide-react';

export default function Index({ posts, categories = [], filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category_id || '');

    const handleFilter = (e) => {
        e.preventDefault();
        router.get('/admin/posts', {
            search: search || undefined,
            status: selectedStatus || undefined,
            category_id: selectedCategory || undefined,
        }, { preserveState: true });
    };

    const handleDelete = (postId, postTitle) => {
        if (confirm(`Are you sure you want to delete post "${postTitle}"?`)) {
            router.delete(`/admin/posts/${postId}`);
        }
    };

    const handleDuplicate = (postId) => {
        router.post(`/admin/posts/${postId}/duplicate`);
    };

    return (
        <AdminLayout title="Blog Posts & Articles">
            <Head title="Manage Posts - Rakitan Admin" />

            <div className="space-y-6 max-w-7xl mx-auto">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2.5">
                            <BookOpen className="w-5 h-5 text-indigo-400" />
                            <span>Blog Articles</span>
                        </h2>
                        <p className="text-xs text-slate-400 mt-1">
                            Publish and organize articles, guides, and dynamic updates with categories.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin/categories"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
                        >
                            <span>Manage Categories</span>
                        </Link>
                        <Link
                            href="/admin/posts/create"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Write New Post</span>
                        </Link>
                    </div>
                </div>

                {/* Filter and Search Bar */}
                <form onSubmit={handleFilter} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-wrap items-center gap-3">
                    <div className="relative flex-1 min-w-[200px]">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by title, excerpt, or slug..."
                            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    </div>

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="py-2 px-3 rounded-xl text-xs bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-indigo-500"
                    >
                        <option value="">All Categories</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>

                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="py-2 px-3 rounded-xl text-xs bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-indigo-500"
                    >
                        <option value="">All Statuses</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>

                    <button
                        type="submit"
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-sm"
                    >
                        Filter
                    </button>
                </form>

                {/* Posts Table */}
                <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-xl overflow-hidden shadow-xl">
                    <table className="w-full text-left text-xs text-slate-300">
                        <thead className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider text-[10px]">
                            <tr>
                                <th className="py-3.5 px-6">Post Details</th>
                                <th className="py-3.5 px-6">Category</th>
                                <th className="py-3.5 px-6">Layout</th>
                                <th className="py-3.5 px-6">Status</th>
                                <th className="py-3.5 px-6">Published / Updated</th>
                                <th className="py-3.5 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                            {posts.data.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="py-12 text-center text-slate-500">
                                        No articles found. Click "Write New Post" to publish your first post!
                                    </td>
                                </tr>
                            ) : (
                                posts.data.map((post) => (
                                    <tr key={post.id} className="hover:bg-slate-800/40 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                {post.featured_image ? (
                                                    <img
                                                        src={post.featured_image}
                                                        alt={post.title}
                                                        className="w-12 h-12 rounded-lg object-cover border border-slate-800 flex-shrink-0"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500 flex-shrink-0">
                                                        <BookOpen className="w-5 h-5" />
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <h3 className="font-bold text-white truncate max-w-sm">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-[11px] text-slate-500 truncate max-w-xs">
                                                        /blog/{post.slug}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            {post.category ? (
                                                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                                    {post.category.name}
                                                </span>
                                            ) : (
                                                <span className="text-slate-500 text-[11px]">Uncategorized</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 uppercase bg-slate-800/60 px-2 py-0.5 rounded">
                                                <Layout className="w-3 h-3 text-slate-500" />
                                                <span>{post.layout || 'default'}</span>
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                    post.status === 'published'
                                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                                }`}
                                            >
                                                {post.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-[11px] text-slate-400">
                                            <div>{post.published_at || 'Not published'}</div>
                                            <div className="text-slate-500">{post.updated_at}</div>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <a
                                                    href={`/blog/${post.slug}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                                                    title="View Public Post"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>

                                                <Link
                                                    href={`/admin/posts/${post.id}/edit`}
                                                    className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"
                                                    title="Edit Post"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </Link>

                                                <button
                                                    type="button"
                                                    onClick={() => handleDuplicate(post.id)}
                                                    className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
                                                    title="Duplicate as Draft"
                                                >
                                                    <Copy className="w-4 h-4" />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(post.id, post.title)}
                                                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                                    title="Delete Post"
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
                {posts.links && posts.links.length > 3 && (
                    <div className="flex justify-center gap-1.5 pt-4">
                        {posts.links.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                                    link.active
                                        ? 'bg-indigo-600 text-white shadow-md'
                                        : link.url
                                        ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                                        : 'opacity-40 cursor-not-allowed text-slate-600'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
