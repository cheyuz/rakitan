import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Tag,
    Plus,
    Edit3,
    Trash2,
    Check,
    X,
    Layers,
    BookOpen,
} from 'lucide-react';

export default function Index({ categories = [] }) {
    const [editingCategory, setEditingCategory] = useState(null);

    const createForm = useForm({
        name: '',
        slug: '',
        description: '',
    });

    const editForm = useForm({
        name: '',
        slug: '',
        description: '',
    });

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        createForm.post('/admin/categories', {
            onSuccess: () => createForm.reset(),
        });
    };

    const startEditing = (category) => {
        setEditingCategory(category);
        editForm.setData({
            name: category.name,
            slug: category.slug,
            description: category.description || '',
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (!editingCategory) return;
        editForm.put(`/admin/categories/${editingCategory.id}`, {
            onSuccess: () => setEditingCategory(null),
        });
    };

    const handleDelete = (category) => {
        if (confirm(`Delete category "${category.name}"? Articles in this category will become Uncategorized.`)) {
            router.delete(`/admin/categories/${category.id}`);
        }
    };

    return (
        <AdminLayout title="Blog Categories">
            <Head title="Manage Categories - Rakitan Admin" />

            <div className="space-y-6 max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2.5">
                            <Tag className="w-5 h-5 text-purple-400" />
                            <span>Categories</span>
                        </h2>
                        <p className="text-xs text-slate-400 mt-1">
                            Group your articles by topics to help readers discover related content.
                        </p>
                    </div>

                    <Link
                        href="/admin/posts"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-all"
                    >
                        <BookOpen className="w-4 h-4" />
                        <span>View All Posts</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Add Category Form (4 cols) */}
                    <div className="lg:col-span-4">
                        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 sticky top-24">
                            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                                <Plus className="w-4 h-4 text-indigo-400" />
                                <span>Add New Category</span>
                            </h3>
                            <p className="text-xs text-slate-400 mb-5">
                                Categories help organize your blog articles for navigation and SEO.
                            </p>

                            <form onSubmit={handleCreateSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                        Category Name <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={createForm.data.name}
                                        onChange={(e) => createForm.setData('name', e.target.value)}
                                        placeholder="e.g. Design Systems"
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                                    />
                                    {createForm.errors.name && (
                                        <p className="text-xs text-red-400 mt-1">{createForm.errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                        Slug (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={createForm.data.slug}
                                        onChange={(e) => createForm.setData('slug', e.target.value)}
                                        placeholder="design-systems"
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                                    />
                                    {createForm.errors.slug && (
                                        <p className="text-xs text-red-400 mt-1">{createForm.errors.slug}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                        Description
                                    </label>
                                    <textarea
                                        rows="3"
                                        value={createForm.data.description}
                                        onChange={(e) => createForm.setData('description', e.target.value)}
                                        placeholder="Brief description for category archive page..."
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={createForm.processing}
                                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/25 transition-all disabled:opacity-50"
                                >
                                    Create Category
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Categories Table (8 cols) */}
                    <div className="lg:col-span-8">
                        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-xl overflow-hidden shadow-xl">
                            <table className="w-full text-left text-xs text-slate-300">
                                <thead className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider text-[10px]">
                                    <tr>
                                        <th className="py-3.5 px-6">Category</th>
                                        <th className="py-3.5 px-6">Slug</th>
                                        <th className="py-3.5 px-6">Articles Count</th>
                                        <th className="py-3.5 px-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/60">
                                    {categories.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="py-12 text-center text-slate-500">
                                                No categories created yet. Use the form on the left to add one!
                                            </td>
                                        </tr>
                                    ) : (
                                        categories.map((cat) => (
                                            <React.Fragment key={cat.id}>
                                                <tr className="hover:bg-slate-800/40 transition-colors">
                                                    <td className="py-4 px-6">
                                                        <div className="font-bold text-white text-sm">{cat.name}</div>
                                                        {cat.description && (
                                                            <p className="text-slate-400 text-xs line-clamp-1 mt-0.5">
                                                                {cat.description}
                                                            </p>
                                                        )}
                                                    </td>
                                                    <td className="py-4 px-6 font-mono text-slate-400 text-[11px]">
                                                        {cat.slug}
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                                            {cat.posts_count} articles
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-6 text-right">
                                                        <div className="flex items-center justify-end gap-1.5">
                                                            <button
                                                                type="button"
                                                                onClick={() => startEditing(cat)}
                                                                className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"
                                                                title="Edit Category"
                                                            >
                                                                <Edit3 className="w-4 h-4" />
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() => handleDelete(cat)}
                                                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                                                title="Delete Category"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>

                                                {/* In-place Editing Row */}
                                                {editingCategory?.id === cat.id && (
                                                    <tr className="bg-slate-950/80 border-y-2 border-indigo-500/30">
                                                        <td colSpan="4" className="p-4">
                                                            <form onSubmit={handleEditSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                                <div>
                                                                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Name</label>
                                                                    <input
                                                                        type="text"
                                                                        value={editForm.data.name}
                                                                        onChange={(e) => editForm.setData('name', e.target.value)}
                                                                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Slug</label>
                                                                    <input
                                                                        type="text"
                                                                        value={editForm.data.slug}
                                                                        onChange={(e) => editForm.setData('slug', e.target.value)}
                                                                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
                                                                    />
                                                                </div>
                                                                <div className="flex items-end gap-2">
                                                                    <button
                                                                        type="submit"
                                                                        disabled={editForm.processing}
                                                                        className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500"
                                                                    >
                                                                        Save
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setEditingCategory(null)}
                                                                        className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 text-xs font-semibold hover:bg-slate-700"
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
