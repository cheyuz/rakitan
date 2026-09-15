import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Settings as SettingsIcon,
    Save,
    Globe,
    Mail,
    Shield,
    CheckCircle2,
    Palette,
    Image as ImageIcon,
    Trash2,
    Sparkles,
    Layout,
    Compass,
    Sliders,
    Layers,
    Monitor,
    Square,
} from 'lucide-react';
import MediaPickerModal from '@/Components/MediaPickerModal';

export default function Settings({ settings }) {
    const [activeTab, setActiveTab] = useState('general'); // 'general' | 'layout'

    const [form, setForm] = useState({
        site_title: settings.site_title || '',
        site_tagline: settings.site_tagline || '',
        site_logo: settings.site_logo || '',
        site_favicon: settings.site_favicon || '',
        admin_email: settings.admin_email || '',
        default_status: settings.default_status || 'draft',
        footer_text: settings.footer_text || '',
        active_theme: settings.active_theme || 'default-dark',

        // Header Layout
        header_sticky: String(settings.header_sticky ?? '1'),
        header_style: settings.header_style || 'glass',
        header_width: settings.header_width || 'contained',
        header_show_cta: String(settings.header_show_cta ?? '0'),
        header_cta_text: settings.header_cta_text || 'Get Started',
        header_cta_url: settings.header_cta_url || '/contact',

        // Body Layout
        body_layout: settings.body_layout || 'default',
        body_max_width: settings.body_max_width || '7xl',

        // Footer Layout
        footer_enabled: String(settings.footer_enabled ?? '1'),
        footer_style: settings.footer_style || 'default',
        footer_show_branding: String(settings.footer_show_branding ?? '1'),
        footer_show_socials: String(settings.footer_show_socials ?? '1'),
    });

    const [pickerTarget, setPickerTarget] = useState(null); // 'logo' | 'favicon' | null

    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSaving(true);
        setSaved(false);

        router.post('/admin/settings', form, {
            onSuccess: () => {
                setIsSaving(false);
                setSaved(true);
                setTimeout(() => setSaved(false), 3000);
            },
            onError: () => {
                setIsSaving(false);
            },
        });
    };

    return (
        <AdminLayout title="Site Settings">
            <Head title="Site Settings - Rakitan CMS" />

            <div className="max-w-4xl mx-auto space-y-6">
                <div>
                    <h2 className="text-xl font-black text-white tracking-tight">CMS Site Settings</h2>
                    <p className="text-xs text-slate-400">Configure global metadata, layout appearance, and site behavior</p>
                </div>

                {/* Tabs Navigation */}
                <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <button
                        type="button"
                        onClick={() => setActiveTab('general')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                            activeTab === 'general'
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                        }`}
                    >
                        <Globe className="w-4 h-4" />
                        <span>General & Branding</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('layout')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                            activeTab === 'layout'
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                        }`}
                    >
                        <Layout className="w-4 h-4" />
                        <span>Layout Utama (Header, Body, Footer)</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
                    {saved && (
                        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Settings saved successfully!</span>
                        </div>
                    )}

                    {activeTab === 'general' && (
                        <>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-white font-bold text-sm">
                                    <Globe className="w-4 h-4 text-indigo-400" />
                                    <span>Identity & Branding</span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                                            Site Title <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={form.site_title}
                                            onChange={(e) => setForm({ ...form, site_title: e.target.value })}
                                            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                                            Site Tagline
                                        </label>
                                        <input
                                            type="text"
                                            value={form.site_tagline}
                                            onChange={(e) => setForm({ ...form, site_tagline: e.target.value })}
                                            placeholder="In a few words, explain what this site is about."
                                            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Logo & Favicon Pickers */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                    {/* Site Logo */}
                                    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2.5">
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs font-semibold text-slate-300">
                                                Site Logo (Header & Branding)
                                            </label>
                                            {form.site_logo && (
                                                <button
                                                    type="button"
                                                    onClick={() => setForm({ ...form, site_logo: '' })}
                                                    className="text-[11px] text-red-400 hover:text-red-300 flex items-center gap-1"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                    <span>Remove</span>
                                                </button>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden flex-shrink-0">
                                                {form.site_logo ? (
                                                    <img src={form.site_logo} alt="Site Logo" className="max-w-full max-h-full object-contain p-1" />
                                                ) : (
                                                    <ImageIcon className="w-6 h-6 text-slate-600" />
                                                )}
                                            </div>
                                            <div className="flex-1 space-y-1.5">
                                                <input
                                                    type="text"
                                                    value={form.site_logo}
                                                    onChange={(e) => setForm({ ...form, site_logo: e.target.value })}
                                                    placeholder="/images/rakitan-logo.png atau URL"
                                                    className="w-full px-2.5 py-1.5 text-[11px] rounded-lg bg-slate-900 border border-slate-800 text-white outline-none focus:border-indigo-500"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setPickerTarget('logo')}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition-colors"
                                                >
                                                    <ImageIcon className="w-3.5 h-3.5" />
                                                    <span>Browse Media Library</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Site Favicon */}
                                    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2.5">
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs font-semibold text-slate-300">
                                                Site Favicon (Browser Tab Icon)
                                            </label>
                                            {form.site_favicon && (
                                                <button
                                                    type="button"
                                                    onClick={() => setForm({ ...form, site_favicon: '' })}
                                                    className="text-[11px] text-red-400 hover:text-red-300 flex items-center gap-1"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                    <span>Remove</span>
                                                </button>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden flex-shrink-0">
                                                {form.site_favicon ? (
                                                    <img src={form.site_favicon} alt="Favicon" className="w-8 h-8 object-contain" />
                                                ) : (
                                                    <img src="/images/rakitan-logo.png" alt="Default Favicon" className="w-8 h-8 object-contain opacity-50" title="Default Rakitan Logo" />
                                                )}
                                            </div>
                                            <div className="flex-1 space-y-1.5">
                                                <input
                                                    type="text"
                                                    value={form.site_favicon}
                                                    onChange={(e) => setForm({ ...form, site_favicon: e.target.value })}
                                                    placeholder="Kosongkan untuk pakai default Rakitan"
                                                    className="w-full px-2.5 py-1.5 text-[11px] rounded-lg bg-slate-900 border border-slate-800 text-white outline-none focus:border-indigo-500"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setPickerTarget('favicon')}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition-colors"
                                                >
                                                    <ImageIcon className="w-3.5 h-3.5" />
                                                    <span>Browse Media Library</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-slate-800">
                                <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-white font-bold text-sm">
                                    <Mail className="w-4 h-4 text-indigo-400" />
                                    <span>Administration & Workflow</span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                                            Admin Contact Email <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={form.admin_email}
                                            onChange={(e) => setForm({ ...form, admin_email: e.target.value })}
                                            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                                            Default New Page Status
                                        </label>
                                        <select
                                            value={form.default_status}
                                            onChange={(e) => setForm({ ...form, default_status: e.target.value })}
                                            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                        >
                                            <option value="draft">Draft (Recommended)</option>
                                            <option value="published">Published</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-slate-800">
                                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                                        <Palette className="w-4 h-4 text-indigo-400" />
                                        <span>Website Theme Appearance</span>
                                    </div>
                                    <Link href="/admin/themes" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300">
                                        Open Theme Manager →
                                    </Link>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                                            Active Website Theme
                                        </label>
                                        <select
                                            value={form.active_theme}
                                            onChange={(e) => setForm({ ...form, active_theme: e.target.value })}
                                            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                        >
                                            <option value="default_dark">Rakitan Cyber Dark (Default)</option>
                                            <option value="default_light">Rakitan Clean Light (DefaultLight)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'layout' && (
                        <>
                            {/* 1. Header Layout Customizer */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-white font-bold text-sm">
                                    <Compass className="w-4 h-4 text-indigo-400" />
                                    <span>Header Navigation Layout</span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {/* Header Sticky */}
                                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                                        <label className="block text-xs font-semibold text-slate-300">
                                            Sticky Navigation
                                        </label>
                                        <select
                                            value={form.header_sticky}
                                            onChange={(e) => setForm({ ...form, header_sticky: e.target.value })}
                                            className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                        >
                                            <option value="1">Sticky Top (Floating on Scroll)</option>
                                            <option value="0">Normal Static (Scrolls with page)</option>
                                        </select>
                                        <p className="text-[10px] text-slate-500">Kunci header di posisi atas layar saat pengunjung scrolling.</p>
                                    </div>

                                    {/* Header Visual Style */}
                                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                                        <label className="block text-xs font-semibold text-slate-300">
                                            Header Style
                                        </label>
                                        <select
                                            value={form.header_style}
                                            onChange={(e) => setForm({ ...form, header_style: e.target.value })}
                                            className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                        >
                                            <option value="glass">Glassmorphism (Backdrop Blur)</option>
                                            <option value="solid">Solid Background (Clean)</option>
                                            <option value="transparent">Transparent (Overlay on Hero)</option>
                                        </select>
                                        <p className="text-[10px] text-slate-500">Efek transparansi dan latar belakang navbar.</p>
                                    </div>

                                    {/* Header Width */}
                                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                                        <label className="block text-xs font-semibold text-slate-300">
                                            Container Width
                                        </label>
                                        <select
                                            value={form.header_width}
                                            onChange={(e) => setForm({ ...form, header_width: e.target.value })}
                                            className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                        >
                                            <option value="contained">Contained (Centered 7xl)</option>
                                            <option value="full">Full Bleed Width</option>
                                        </select>
                                        <p className="text-[10px] text-slate-500">Lebar area konten navbar header.</p>
                                    </div>
                                </div>

                                {/* Custom Header CTA Button */}
                                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                            <span>Header Action CTA Button</span>
                                        </span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={form.header_show_cta === '1'}
                                                onChange={(e) => setForm({ ...form, header_show_cta: e.target.checked ? '1' : '0' })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-8 h-4 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-indigo-600"></div>
                                        </label>
                                    </div>

                                    {form.header_show_cta === '1' && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                            <div>
                                                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                                                    Button Label Text
                                                </label>
                                                <input
                                                    type="text"
                                                    value={form.header_cta_text}
                                                    onChange={(e) => setForm({ ...form, header_cta_text: e.target.value })}
                                                    placeholder="e.g. Contact Us / Get Started"
                                                    className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white focus:border-indigo-500 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                                                    Button Target URL
                                                </label>
                                                <input
                                                    type="text"
                                                    value={form.header_cta_url}
                                                    onChange={(e) => setForm({ ...form, header_cta_url: e.target.value })}
                                                    placeholder="e.g. /contact or https://..."
                                                    className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white focus:border-indigo-500 outline-none"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* 2. Body / Main Layout */}
                            <div className="space-y-4 pt-4 border-t border-slate-800">
                                <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-white font-bold text-sm">
                                    <Monitor className="w-4 h-4 text-indigo-400" />
                                    <span>Body & Page Canvas Layout</span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                                        <label className="block text-xs font-semibold text-slate-300">
                                            Default Page Layout Mode
                                        </label>
                                        <select
                                            value={form.body_layout}
                                            onChange={(e) => setForm({ ...form, body_layout: e.target.value })}
                                            className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                        >
                                            <option value="default">Full Canvas (Modern Section-by-Section)</option>
                                            <option value="boxed">Boxed Card Container (Centered Content Box)</option>
                                            <option value="sidebar">Right Sidebar (Search & Categories)</option>
                                        </select>
                                        <p className="text-[10px] text-slate-500">Dapat juga dioverride per-page di visual builder.</p>
                                    </div>

                                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                                        <label className="block text-xs font-semibold text-slate-300">
                                            Body Container Max-Width
                                        </label>
                                        <select
                                            value={form.body_max_width}
                                            onChange={(e) => setForm({ ...form, body_max_width: e.target.value })}
                                            className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                        >
                                            <option value="7xl">7xl (1280px - Default Standard)</option>
                                            <option value="6xl">6xl (1152px - Compact Centered)</option>
                                            <option value="5xl">5xl (1024px - Editorial Reading)</option>
                                            <option value="full">Full Bleed (100% Screen Width)</option>
                                        </select>
                                        <p className="text-[10px] text-slate-500">Membatasi lebar maksimal konten body di layar desktop besar.</p>
                                    </div>
                                </div>
                            </div>

                            {/* 3. Footer Layout Customizer */}
                            <div className="space-y-4 pt-4 border-t border-slate-800">
                                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                                        <Square className="w-4 h-4 text-indigo-400" />
                                        <span>Footer Customization</span>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={form.footer_enabled === '1'}
                                            onChange={(e) => setForm({ ...form, footer_enabled: e.target.checked ? '1' : '0' })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-8 h-4 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-indigo-600"></div>
                                        <span className="ml-2 text-xs font-semibold text-slate-300">
                                            {form.footer_enabled === '1' ? 'Footer Active' : 'Footer Disabled'}
                                        </span>
                                    </label>
                                </div>

                                {form.footer_enabled === '1' && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                                                <label className="block text-xs font-semibold text-slate-300">
                                                    Footer Visual Style
                                                </label>
                                                <select
                                                    value={form.footer_style}
                                                    onChange={(e) => setForm({ ...form, footer_style: e.target.value })}
                                                    className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                                >
                                                    <option value="default">Standard Complete (Logo, Links & Copyright)</option>
                                                    <option value="minimal">Minimal Single-Row (Compact & Clean)</option>
                                                    <option value="glass">Glassmorphic Blur (Modern Translucent)</option>
                                                </select>
                                            </div>

                                            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                                                <label className="block text-xs font-semibold text-slate-300">
                                                    Footer Badges & Extras
                                                </label>
                                                <div className="space-y-2 pt-1">
                                                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={form.footer_show_branding === '1'}
                                                            onChange={(e) => setForm({ ...form, footer_show_branding: e.target.checked ? '1' : '0' })}
                                                            className="rounded bg-slate-900 border-slate-800 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <span>Show "Powered by Laravel & Inertia" branding</span>
                                                    </label>
                                                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={form.footer_show_socials === '1'}
                                                            onChange={(e) => setForm({ ...form, footer_show_socials: e.target.checked ? '1' : '0' })}
                                                            className="rounded bg-slate-900 border-slate-800 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <span>Show Social Network Links in Footer</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                                                Custom Footer Notice / Copyright Text
                                            </label>
                                            <input
                                                type="text"
                                                value={form.footer_text}
                                                onChange={(e) => setForm({ ...form, footer_text: e.target.value })}
                                                placeholder="e.g. © 2026 Rakitan CMS. All rights reserved."
                                                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    <div className="pt-4 border-t border-slate-800 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition-all active:scale-95"
                        >
                            <Save className="w-4 h-4" />
                            <span>{isSaving ? 'Saving Changes...' : 'Save Settings'}</span>
                        </button>
                    </div>
                </form>

                {/* Media Picker Modal for Logo & Favicon */}
                <MediaPickerModal
                    isOpen={pickerTarget !== null}
                    onClose={() => setPickerTarget(null)}
                    onSelect={(media) => {
                        if (pickerTarget === 'logo') {
                            setForm({ ...form, site_logo: media.url });
                        } else if (pickerTarget === 'favicon') {
                            setForm({ ...form, site_favicon: media.url });
                        }
                        setPickerTarget(null);
                    }}
                    title={pickerTarget === 'logo' ? 'Select Site Logo' : 'Select Browser Favicon'}
                />
            </div>
        </AdminLayout>
    );
}
