import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Search,
    Globe,
    FileText,
    Share2,
    CheckCircle2,
    ExternalLink,
    ShieldCheck,
    Save,
    Eye,
    Layers,
    Sliders,
    Sparkles,
    AlertCircle,
    Copy,
    Check,
} from 'lucide-react';

export default function Index({ settings, sitemapUrl, robotsUrl, stats }) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        site_name: settings.site_name || '',
        title_separator: settings.title_separator || '-',
        default_meta_description: settings.default_meta_description || '',
        og_default_image: settings.og_default_image || '/images/rakitan-logo.png',
        twitter_card: settings.twitter_card || 'summary_large_image',
        google_verification: settings.google_verification || '',
        robots_indexing: settings.robots_indexing || 'index, follow',
        auto_sitemap: settings.auto_sitemap ?? true,
    });

    const [copiedSitemap, setCopiedSitemap] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/seo');
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopiedSitemap(true);
        setTimeout(() => setCopiedSitemap(false), 2000);
    };

    const previewTitle = `Home Page ${data.title_separator} ${data.site_name || 'Rakitan CMS'}`;
    const previewDesc = data.default_meta_description || 'Rakitan CMS empowers creators with independent modular blocks, lightning performance, and complete visual freedom.';

    return (
        <AdminLayout title="SEO & Search Engine Optimization">
            <Head title="SEO Optimizer Settings - Rakitan CMS" />

            <div className="space-y-6 max-w-6xl">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
                            <Search className="w-7 h-7 text-indigo-400" />
                            <span>Rakitan SEO Optimizer</span>
                        </h1>
                        <p className="text-xs text-slate-400 mt-1">
                            Control indexing, OpenGraph social sharing previews, Google search SERP snippets, and automated XML sitemaps.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>SEO Plugin Active</span>
                        </span>
                    </div>
                </div>

                {/* Status & Quick Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                                <span>XML Sitemap</span>
                            </span>
                            <div className="text-sm font-bold text-white flex items-center gap-2">
                                <span>/sitemap.xml</span>
                                <a
                                    href={sitemapUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-slate-400 hover:text-indigo-400 transition-colors"
                                    title="Open Sitemap in new tab"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            </div>
                            <p className="text-[11px] text-emerald-400 font-medium">Valid & Auto-Updating</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => copyToClipboard(sitemapUrl)}
                            className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                            title="Copy Sitemap URL"
                        >
                            {copiedSitemap ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                                <FileText className="w-3.5 h-3.5 text-purple-400" />
                                <span>Robots.txt</span>
                            </span>
                            <div className="text-sm font-bold text-white flex items-center gap-2">
                                <span>/robots.txt</span>
                                <a
                                    href={robotsUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-slate-400 hover:text-indigo-400 transition-colors"
                                    title="Open Robots.txt in new tab"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            </div>
                            <p className="text-[11px] text-slate-400 font-mono">{data.robots_indexing}</p>
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                                <Layers className="w-3.5 h-3.5 text-amber-400" />
                                <span>Tracked URLs</span>
                            </span>
                            <div className="text-xl font-black text-white">
                                {stats?.totalUrls || 2} <span className="text-xs font-normal text-slate-400">entries</span>
                            </div>
                            <p className="text-[11px] text-slate-400">
                                {stats?.indexedPages || 0} pages, {stats?.indexedPosts || 0} articles
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Settings Form (7 cols) */}
                    <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-5">
                        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl space-y-4">
                            <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                                <Sliders className="w-4 h-4 text-indigo-400" />
                                <span>General Meta Information</span>
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                                        Website Brand Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.site_name}
                                        onChange={(e) => setData('site_name', e.target.value)}
                                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                                        placeholder="Rakitan CMS"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                                        Separator
                                    </label>
                                    <input
                                        type="text"
                                        value={data.title_separator}
                                        onChange={(e) => setData('title_separator', e.target.value)}
                                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 text-center font-mono"
                                        placeholder="-"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                    Default Meta Description
                                </label>
                                <textarea
                                    rows={3}
                                    value={data.default_meta_description}
                                    onChange={(e) => setData('default_meta_description', e.target.value)}
                                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
                                    placeholder="Enter compelling summary for search engine results..."
                                />
                                <span className="text-[10px] text-slate-500">
                                    Recommended length: 140 - 160 characters ({data.default_meta_description.length} chars)
                                </span>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                    Default Social Share Image (OpenGraph / Twitter)
                                </label>
                                <input
                                    type="text"
                                    value={data.og_default_image}
                                    onChange={(e) => setData('og_default_image', e.target.value)}
                                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                                    placeholder="/images/rakitan-logo.png"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                                        Twitter Card Display
                                    </label>
                                    <select
                                        value={data.twitter_card}
                                        onChange={(e) => setData('twitter_card', e.target.value)}
                                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                                    >
                                        <option value="summary_large_image">Large Image (Summary Large)</option>
                                        <option value="summary">Small Thumbnail (Standard Summary)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                                        Search Engine Indexing
                                    </label>
                                    <select
                                        value={data.robots_indexing}
                                        onChange={(e) => setData('robots_indexing', e.target.value)}
                                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                                    >
                                        <option value="index, follow">Index & Follow (Recommended)</option>
                                        <option value="noindex, nofollow">No Index & No Follow (Staging / Private)</option>
                                        <option value="noindex, follow">No Index, Follow Links</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                    Google Site Verification Token
                                </label>
                                <input
                                    type="text"
                                    value={data.google_verification}
                                    onChange={(e) => setData('google_verification', e.target.value)}
                                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                                    placeholder="e.g. 4vA9_8xZ2aK3..."
                                />
                                <span className="text-[10px] text-slate-500">
                                    Optional: Paste your verification code from Google Search Console.
                                </span>
                            </div>

                            <div className="pt-2">
                                <label className="flex items-center gap-2.5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.auto_sitemap}
                                        onChange={(e) => setData('auto_sitemap', e.target.checked)}
                                        className="rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span className="text-xs text-slate-300 font-medium">
                                        Enable automated dynamic XML sitemap generation at <code>/sitemap.xml</code>
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            {recentlySuccessful && (
                                <span className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span>Settings saved successfully!</span>
                                </span>
                            )}
                            <div className="ml-auto">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>{processing ? 'Saving...' : 'Save Changes'}</span>
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Previews Column (5 cols) */}
                    <div className="lg:col-span-5 space-y-5">
                        {/* Google SERP Snippet Preview */}
                        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl space-y-3">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                                <h3 className="text-xs font-bold text-white flex items-center gap-2">
                                    <Eye className="w-3.5 h-3.5 text-indigo-400" />
                                    <span>Google Search Snippet Preview</span>
                                </h3>
                                <span className="text-[10px] text-slate-500 font-mono">SERP Simulator</span>
                            </div>

                            {/* Realistic Google Search Card */}
                            <div className="p-4 rounded-2xl bg-white text-slate-900 font-sans shadow-sm space-y-1.5 border border-slate-200">
                                <div className="flex items-center gap-2 text-[11px] text-slate-600">
                                    <span className="font-semibold text-slate-900">{data.site_name || 'Rakitan'}</span>
                                    <span>›</span>
                                    <span className="truncate">https://yourdomain.com</span>
                                </div>
                                <h4 className="text-sm font-semibold text-[#1a0dab] hover:underline cursor-pointer truncate">
                                    {previewTitle}
                                </h4>
                                <p className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
                                    {previewDesc}
                                </p>
                            </div>
                        </div>

                        {/* Social Share Card Preview (Facebook / WhatsApp / Twitter) */}
                        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl space-y-3">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                                <h3 className="text-xs font-bold text-white flex items-center gap-2">
                                    <Share2 className="w-3.5 h-3.5 text-indigo-400" />
                                    <span>OpenGraph / Social Card Preview</span>
                                </h3>
                                <span className="text-[10px] text-slate-500 font-mono">Social Feed</span>
                            </div>

                            {/* Social Card */}
                            <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                                <div className="h-40 bg-slate-900 flex items-center justify-center overflow-hidden relative">
                                    {data.og_default_image ? (
                                        <img
                                            src={data.og_default_image}
                                            alt="Social share preview"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <Sparkles className="w-10 h-10 text-slate-700" />
                                    )}
                                </div>
                                <div className="p-3.5 space-y-1 bg-slate-900/80 border-t border-slate-800">
                                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                                        yourdomain.com
                                    </span>
                                    <h4 className="text-xs font-bold text-white line-clamp-1">
                                        {previewTitle}
                                    </h4>
                                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                                        {previewDesc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
