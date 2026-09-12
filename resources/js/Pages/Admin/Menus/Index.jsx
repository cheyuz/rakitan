import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Menu as MenuIcon,
    Plus,
    ArrowUp,
    ArrowDown,
    Trash2,
    Save,
    ExternalLink,
    FileText,
    Tag,
    Link as LinkIcon,
    Sparkles,
} from 'lucide-react';

export default function Index({
    location = 'header',
    headerMenu,
    footerMenu,
    pages = [],
    categories = [],
}) {
    const activeMenu = location === 'footer' ? footerMenu : headerMenu;

    const [items, setItems] = useState(
        Array.isArray(activeMenu?.items) ? activeMenu.items : []
    );

    const [selectedPages, setSelectedPages] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [customLink, setCustomLink] = useState({ label: '', url: 'https://' });

    const { post, processing } = useForm({});

    const handleSaveMenu = () => {
        post('/admin/menus', {
            data: {
                location,
                name: activeMenu?.name || (location === 'header' ? 'Main Navigation' : 'Footer Navigation'),
                items,
            },
        });
    };

    // Add selected pages to menu
    const addPagesToMenu = () => {
        const newItems = pages
            .filter((p) => selectedPages.includes(p.id))
            .map((p) => ({
                id: `page-${p.id}-${Date.now()}`,
                label: p.title,
                url: p.slug === 'home' ? '/' : `/${p.slug}`,
                target: '_self',
            }));

        setItems([...items, ...newItems]);
        setSelectedPages([]);
    };

    // Add selected categories to menu
    const addCategoriesToMenu = () => {
        const newItems = categories
            .filter((c) => selectedCategories.includes(c.id))
            .map((c) => ({
                id: `cat-${c.id}-${Date.now()}`,
                label: c.name,
                url: `/blog?category=${c.slug}`,
                target: '_self',
            }));

        setItems([...items, ...newItems]);
        setSelectedCategories([]);
    };

    // Add custom link
    const addCustomLinkToMenu = (e) => {
        e.preventDefault();
        if (!customLink.label || !customLink.url) return;

        setItems([
            ...items,
            {
                id: `custom-${Date.now()}`,
                label: customLink.label,
                url: customLink.url,
                target: '_self',
            },
        ]);
        setCustomLink({ label: '', url: 'https://' });
    };

    // Move item up
    const moveItemUp = (idx) => {
        if (idx === 0) return;
        const copy = [...items];
        const temp = copy[idx - 1];
        copy[idx - 1] = copy[idx];
        copy[idx] = temp;
        setItems(copy);
    };

    // Move item down
    const moveItemDown = (idx) => {
        if (idx === items.length - 1) return;
        const copy = [...items];
        const temp = copy[idx + 1];
        copy[idx + 1] = copy[idx];
        copy[idx] = temp;
        setItems(copy);
    };

    // Remove item
    const removeItem = (idx) => {
        setItems(items.filter((_, i) => i !== idx));
    };

    // Update item field
    const updateItemField = (idx, field, value) => {
        const copy = [...items];
        copy[idx] = { ...copy[idx], [field]: value };
        setItems(copy);
    };

    return (
        <AdminLayout title="Navigation Menus">
            <Head title="Navigation Menus - Rakitan Admin" />

            <div className="space-y-6 max-w-7xl mx-auto">
                {/* Header & Tabs */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2.5">
                            <MenuIcon className="w-5 h-5 text-indigo-400" />
                            <span>Navigation Menus</span>
                        </h2>
                        <p className="text-xs text-slate-400 mt-1">
                            Customize public header navbar and footer links like WordPress.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-900 border border-slate-800">
                        <Link
                            href="/admin/menus?location=header"
                            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                                location === 'header'
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Header Navigation
                        </Link>
                        <Link
                            href="/admin/menus?location=footer"
                            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                                location === 'footer'
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Footer Navigation
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Panel: Add Items (5 cols) */}
                    <div className="lg:col-span-5 space-y-5">
                        {/* Pages Source */}
                        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-indigo-400" />
                                <span>Published Pages</span>
                            </h3>

                            <div className="max-h-48 overflow-y-auto space-y-1.5 pr-2 mb-4 scrollbar-thin">
                                {pages.map((p) => (
                                    <label
                                        key={p.id}
                                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800/60 hover:border-slate-700 cursor-pointer text-xs text-slate-300"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedPages.includes(p.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedPages([...selectedPages, p.id]);
                                                } else {
                                                    setSelectedPages(selectedPages.filter((id) => id !== p.id));
                                                }
                                            }}
                                            className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-900"
                                        />
                                        <span className="truncate flex-1">{p.title}</span>
                                        <span className="text-[10px] text-slate-500 font-mono">/{p.slug}</span>
                                    </label>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={addPagesToMenu}
                                disabled={selectedPages.length === 0}
                                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all disabled:opacity-40"
                            >
                                Add Selected Pages to Menu
                            </button>
                        </div>

                        {/* Categories Source */}
                        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                                <Tag className="w-4 h-4 text-purple-400" />
                                <span>Blog Categories</span>
                            </h3>

                            <div className="max-h-48 overflow-y-auto space-y-1.5 pr-2 mb-4 scrollbar-thin">
                                {categories.map((c) => (
                                    <label
                                        key={c.id}
                                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800/60 hover:border-slate-700 cursor-pointer text-xs text-slate-300"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(c.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedCategories([...selectedCategories, c.id]);
                                                } else {
                                                    setSelectedCategories(selectedCategories.filter((id) => id !== c.id));
                                                }
                                            }}
                                            className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-900"
                                        />
                                        <span className="truncate flex-1">{c.name}</span>
                                        <span className="text-[10px] text-slate-500 font-mono">/blog?category={c.slug}</span>
                                    </label>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={addCategoriesToMenu}
                                disabled={selectedCategories.length === 0}
                                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all disabled:opacity-40"
                            >
                                Add Selected Categories to Menu
                            </button>
                        </div>

                        {/* Custom Link */}
                        <form onSubmit={addCustomLinkToMenu} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                                <LinkIcon className="w-4 h-4 text-emerald-400" />
                                <span>Custom Link</span>
                            </h3>

                            <div>
                                <label className="block text-[11px] text-slate-400 mb-1">Navigation Label</label>
                                <input
                                    type="text"
                                    value={customLink.label}
                                    onChange={(e) => setCustomLink({ ...customLink, label: e.target.value })}
                                    placeholder="e.g. GitHub Repository"
                                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] text-slate-400 mb-1">URL Address</label>
                                <input
                                    type="text"
                                    value={customLink.url}
                                    onChange={(e) => setCustomLink({ ...customLink, url: e.target.value })}
                                    placeholder="https://example.com"
                                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={!customLink.label || !customLink.url}
                                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all disabled:opacity-40"
                            >
                                Add Custom Link
                            </button>
                        </form>
                    </div>

                    {/* Right Panel: Menu Structure & Ordering (7 cols) */}
                    <div className="lg:col-span-7">
                        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-5">
                            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                                <div>
                                    <h3 className="text-sm font-bold text-white">
                                        {location === 'header' ? 'Main Header Menu Structure' : 'Footer Navigation Structure'}
                                    </h3>
                                    <p className="text-xs text-slate-400">
                                        Reorder and configure navigation items.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    disabled={processing}
                                    onClick={handleSaveMenu}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25 transition-all disabled:opacity-50"
                                >
                                    <Save className="w-3.5 h-3.5" />
                                    <span>Save Menu</span>
                                </button>
                            </div>

                            {items.length === 0 ? (
                                <div className="py-16 text-center text-slate-500">
                                    No items in this menu. Add pages, categories, or custom links from the left panel.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {items.map((item, idx) => (
                                        <div
                                            key={item.id || idx}
                                            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-all"
                                        >
                                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                                                        Navigation Label
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={item.label}
                                                        onChange={(e) => updateItemField(idx, 'label', e.target.value)}
                                                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                                                        Target URL
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={item.url}
                                                        onChange={(e) => updateItemField(idx, 'url', e.target.value)}
                                                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                                                    />
                                                </div>
                                            </div>

                                            {/* Order and Action Controls */}
                                            <div className="flex items-center justify-end gap-1.5 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-850">
                                                <button
                                                    type="button"
                                                    disabled={idx === 0}
                                                    onClick={() => moveItemUp(idx)}
                                                    className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white disabled:opacity-30"
                                                    title="Move Up"
                                                >
                                                    <ArrowUp className="w-4 h-4" />
                                                </button>

                                                <button
                                                    type="button"
                                                    disabled={idx === items.length - 1}
                                                    onClick={() => moveItemDown(idx)}
                                                    className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white disabled:opacity-30"
                                                    title="Move Down"
                                                >
                                                    <ArrowDown className="w-4 h-4" />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(idx)}
                                                    className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                                                    title="Remove item"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
