import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    ArrowLeft,
    Save,
    Image as ImageIcon,
    Layout,
    Eye,
    Tag,
    Clock,
    Globe,
    Sparkles,
    FolderPlus,
    X,
} from 'lucide-react';
import MediaPickerModal from '@/Components/MediaPickerModal';

export default function Editor({ post = null, categories = [] }) {
    const isEdit = Boolean(post?.id);

    const { data, setData, post: submitPost, put: updatePost, processing, errors } = useForm({
        title: post?.title || '',
        slug: post?.slug || '',
        category_id: post?.category_id || '',
        excerpt: post?.excerpt || '',
        content: post?.content || '',
        featured_image: post?.featured_image || '',
        layout: post?.layout || 'default',
        status: post?.status || 'draft',
    });

    const [previewContent, setPreviewContent] = useState(false);
    const [showMediaModal, setShowMediaModal] = useState(false);

    const handleTitleChange = (e) => {
        const val = e.target.value;
        setData('title', val);
        if (!isEdit && !data.slug) {
            setData('slug', val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
        }
    };

    const handleSubmit = (targetStatus) => {
        data.status = targetStatus;
        if (isEdit) {
            updatePost(`/admin/posts/${post.id}`);
        } else {
            submitPost('/admin/posts');
        }
    };

    return (
        <AdminLayout title={isEdit ? `Edit Post: ${post.title}` : 'Create New Article'}>
            <Head title={isEdit ? `Edit: ${post.title}` : 'New Post - Rakitan Admin'} />

            <div className="max-w-6xl mx-auto space-y-6">
                {/* Top Bar Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin/posts"
                            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                        <div>
                            <h2 className="text-xl font-black text-white tracking-tight">
                                {isEdit ? 'Edit Article' : 'Draft New Article'}
                            </h2>
                            <p className="text-xs text-slate-400">
                                Configure your content, layout, thumbnail, and publication status.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            disabled={processing}
                            onClick={() => handleSubmit('draft')}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-all disabled:opacity-50"
                        >
                            <Save className="w-3.5 h-3.5" />
                            <span>Save as Draft</span>
                        </button>

                        <button
                            type="button"
                            disabled={processing}
                            onClick={() => handleSubmit('published')}
                            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25 transition-all disabled:opacity-50"
                        >
                            <Globe className="w-3.5 h-3.5" />
                            <span>{isEdit && post.status === 'published' ? 'Update & Publish' : 'Publish Article'}</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Main Content Form (8 cols) */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Title & Slug */}
                        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                                    Article Title <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={handleTitleChange}
                                    placeholder="e.g., Unlocking Component-Driven Web Performance"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-base font-semibold placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                                />
                                {errors.title && <p className="text-xs text-red-400 mt-1">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1">
                                    Permanent URL Slug
                                </label>
                                <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2 text-xs text-slate-400">
                                    <span className="text-slate-600 mr-1 select-none">/blog/</span>
                                    <input
                                        type="text"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                        placeholder="unlocking-component-performance"
                                        className="w-full bg-transparent border-none p-0 text-white focus:outline-none text-xs"
                                    />
                                </div>
                                {errors.slug && <p className="text-xs text-red-400 mt-1">{errors.slug}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1">
                                    Excerpt (Brief Summary)
                                </label>
                                <textarea
                                    rows="2"
                                    value={data.excerpt}
                                    onChange={(e) => setData('excerpt', e.target.value)}
                                    placeholder="Short teaser displayed on archive lists and social cards..."
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        {/* Article Content / Markdown Editor */}
                        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Article Body (Markdown / HTML)
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setPreviewContent(!previewContent)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:text-white"
                                >
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>{previewContent ? 'Switch to Editor' : 'Live Preview'}</span>
                                </button>
                            </div>

                            {previewContent ? (
                                <div
                                    className="w-full min-h-[400px] p-6 rounded-xl bg-slate-950 border border-slate-800 prose prose-invert prose-indigo max-w-none text-xs sm:text-sm"
                                    dangerouslySetInnerHTML={{ __html: data.content || '<p class="text-slate-500 italic">No content yet.</p>' }}
                                />
                            ) : (
                                <textarea
                                    rows="16"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    placeholder="Write your article body in Markdown or HTML..."
                                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-mono placeholder-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed"
                                />
                            )}
                            {errors.content && <p className="text-xs text-red-400 mt-1">{errors.content}</p>}
                        </div>
                    </div>

                    {/* Sidebar Inspector (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Layout Selector */}
                        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                                <Layout className="w-4 h-4 text-indigo-400" />
                                <span>Page Layout Design</span>
                            </h3>
                            <p className="text-[11px] text-slate-500">
                                Select how the surrounding template structure is rendered.
                            </p>

                            <div className="space-y-2">
                                {[
                                    { id: 'default', name: 'Default (Full Header & Footer)', desc: 'Standard navbar and footer layout.' },
                                    { id: 'blank', name: 'Blank / Canvas', desc: 'No header or footer. Ideal for standalone landing pages.' },
                                    { id: 'boxed', name: 'Contained Box', desc: 'Centered floating card with sleek ambient borders.' },
                                    { id: 'sidebar', name: 'With Sidebar', desc: 'Includes dynamic widgets for search & recent posts.' },
                                ].map((layout) => (
                                    <label
                                        key={layout.id}
                                        className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                                            data.layout === layout.id
                                                ? 'bg-indigo-600/15 border-indigo-500/50 text-white'
                                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="layout"
                                            value={layout.id}
                                            checked={data.layout === layout.id}
                                            onChange={(e) => setData('layout', e.target.value)}
                                            className="mt-1 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <div>
                                            <p className="text-xs font-semibold">{layout.name}</p>
                                            <p className="text-[10px] text-slate-500 mt-0.5">{layout.desc}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Category Selector */}
                        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-purple-400" />
                                    <span>Category</span>
                                </h3>
                                <Link
                                    href="/admin/categories"
                                    className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300"
                                >
                                    + New Category
                                </Link>
                            </div>

                            <select
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                            >
                                <option value="">Select Category (Uncategorized)</option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                            {errors.category_id && <p className="text-xs text-red-400">{errors.category_id}</p>}
                        </div>

                        {/* Featured Image */}
                        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4 text-emerald-400" />
                                    <span>Featured Image</span>
                                </h3>

                                <button
                                    type="button"
                                    onClick={() => setShowMediaModal(true)}
                                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-1"
                                >
                                    <ImageIcon className="w-3.5 h-3.5" />
                                    <span>Browse Media</span>
                                </button>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={data.featured_image}
                                    onChange={(e) => setData('featured_image', e.target.value)}
                                    placeholder="Image URL or choose from library..."
                                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                                />
                                {data.featured_image && (
                                    <button
                                        type="button"
                                        onClick={() => setData('featured_image', '')}
                                        className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-red-400"
                                        title="Clear image"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>

                            {data.featured_image && (
                                <div className="mt-2 rounded-xl overflow-hidden border border-slate-800 aspect-[16/10] bg-slate-950 relative group">
                                    <img
                                        src={data.featured_image}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowMediaModal(true)}
                                        className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-semibold transition-opacity"
                                    >
                                        Change Image
                                    </button>
                                </div>
                            )}

                            {/* Media Picker Modal */}
                            <MediaPickerModal
                                isOpen={showMediaModal}
                                onClose={() => setShowMediaModal(false)}
                                onSelect={(media) => {
                                    setData('featured_image', media.url);
                                }}
                                title="Choose Featured Image"
                            />
                        </div>

                        {/* Status Preview Card */}
                        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2 text-xs">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-400">Current Status:</span>
                                <span className={`font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded-full ${
                                    data.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                                }`}>
                                    {data.status}
                                </span>
                            </div>
                            {post?.published_at && (
                                <div className="flex items-center justify-between text-slate-500 text-[11px] pt-2 border-t border-slate-800">
                                    <span>First Published:</span>
                                    <span>{post.published_at}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
