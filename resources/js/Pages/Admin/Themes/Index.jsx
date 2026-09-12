import React, { useState, useRef } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Palette,
    Check,
    UploadCloud,
    Folder,
    Code2,
    Trash2,
    CheckCircle2,
    Sparkles,
    AlertCircle,
    X,
    FileArchive,
    Loader2,
    ChevronDown,
    ChevronUp,
    ExternalLink,
} from 'lucide-react';

export default function Index({
    themes = [],
    activeTheme = null,
    themesPath = '/var/www/rakitan/themes',
}) {
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showDevGuide, setShowDevGuide] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedZip, setSelectedZip] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        theme_zip: null,
    });

    const fileInputRef = useRef(null);

    const handleActivate = (themeId) => {
        router.post('/admin/themes/activate', {
            theme: themeId,
        });
    };

    const handleDelete = (theme) => {
        if (confirm(`Are you sure you want to delete theme "${theme.name}"? The theme folder will be removed.`)) {
            router.delete(`/admin/themes/${theme.id}`);
        }
    };

    const handleUploadSubmit = (e) => {
        e.preventDefault();
        if (!data.theme_zip) return;

        post('/admin/themes/upload', {
            onSuccess: () => {
                setShowUploadModal(false);
                reset();
                setSelectedZip(null);
            },
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedZip(file);
            setData('theme_zip', file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file && (file.name.endsWith('.zip') || file.type.includes('zip'))) {
            setSelectedZip(file);
            setData('theme_zip', file);
            setShowUploadModal(true);
        } else {
            alert('Please drop a valid .zip theme package.');
        }
    };

    return (
        <AdminLayout title="Theme Management">
            <Head title="Themes - Rakitan Admin" />

            <div
                className="space-y-8 max-w-7xl mx-auto"
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                onDrop={handleDrop}
            >
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2.5">
                            <Palette className="w-5 h-5 text-indigo-400" />
                            <span>Theme Management</span>
                        </h2>
                        <p className="text-xs text-slate-400 mt-1">
                            WordPress-style themes located in <code className="text-indigo-300 bg-slate-900 px-1.5 py-0.5 rounded font-mono text-[11px]">/themes/</code>. Upload ZIP packages or craft custom themes.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setShowDevGuide(!showDevGuide)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
                        >
                            <Code2 className="w-4 h-4 text-purple-400" />
                            <span>Developer Guide</span>
                            {showDevGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>

                        <button
                            type="button"
                            onClick={() => setShowUploadModal(true)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25 transition-all"
                        >
                            <UploadCloud className="w-4 h-4" />
                            <span>Upload Theme (.zip)</span>
                        </button>
                    </div>
                </div>

                {/* Developer Guide Collapsible */}
                {showDevGuide && (
                    <div className="p-6 rounded-3xl bg-slate-900/90 border border-purple-500/30 shadow-xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="flex items-center gap-2.5 text-purple-400 font-bold text-sm">
                            <Folder className="w-4 h-4" />
                            <span>How to Build Custom Rakitan Themes</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                            Creating a custom theme is as straightforward as creating a new folder in <code className="bg-slate-950 px-2 py-0.5 rounded text-indigo-300 font-mono">{themesPath}/[theme-slug]/</code> with a valid <code className="text-amber-300 font-mono">theme.json</code> and optional <code className="text-emerald-300 font-mono">style.css</code>:
                        </p>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                                    Folder Architecture
                                </h4>
                                <pre className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 leading-relaxed">
{`themes/
└── my-custom-theme/
    ├── theme.json         (Required manifest)
    ├── screenshot.png     (Theme preview image)
    └── style.css          (Custom CSS overrides)`}
                                </pre>
                            </div>

                            <div>
                                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                                    Example theme.json
                                </h4>
                                <pre className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 leading-relaxed overflow-x-auto">
{`{
  "id": "neon-cyberpunk",
  "name": "Neon Cyberpunk",
  "version": "1.0.0",
  "author": "Your Name",
  "description": "Futuristic neon dark theme",
  "settings": {
    "colorScheme": "dark",
    "primaryColor": "#06b6d4"
  }
}`}
                                </pre>
                            </div>
                        </div>
                    </div>
                )}

                {/* Theme Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {themes.map((theme) => {
                        const isActive = activeTheme?.id === theme.id;
                        const isLight = theme.settings?.colorScheme === 'light';

                        return (
                            <div
                                key={theme.id}
                                className={`rounded-3xl border flex flex-col justify-between overflow-hidden transition-all duration-300 shadow-xl ${
                                    isActive
                                        ? 'bg-slate-900/90 border-indigo-500 ring-2 ring-indigo-500/40 shadow-indigo-600/15'
                                        : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                                }`}
                            >
                                <div>
                                    {/* Screenshot Banner */}
                                    <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden border-b border-slate-800">
                                        {theme.screenshot_url ? (
                                            <img
                                                src={theme.screenshot_url}
                                                alt={theme.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-slate-600">
                                                <Palette className="w-12 h-12 mb-2" />
                                                <span className="text-xs font-mono">{theme.id}</span>
                                            </div>
                                        )}

                                        {/* Color Scheme Badge */}
                                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${
                                                isLight
                                                    ? 'bg-slate-100/90 text-slate-900 border-slate-300'
                                                    : 'bg-slate-950/85 text-indigo-300 border-indigo-500/30'
                                            }`}>
                                                {theme.settings?.colorScheme || 'theme'}
                                            </span>
                                            {theme.is_builtin && (
                                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/85 text-slate-400 border border-slate-800">
                                                    Built-in
                                                </span>
                                            )}
                                        </div>

                                        {/* Active Badge */}
                                        {isActive && (
                                            <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-slate-950 flex items-center gap-1 shadow-lg">
                                                <Check className="w-3.5 h-3.5" />
                                                <span>Active Theme</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Theme Info */}
                                    <div className="p-6 space-y-3">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <h3 className="text-base font-bold text-white leading-snug">
                                                    {theme.name}
                                                </h3>
                                                <p className="text-[11px] text-slate-400 mt-0.5">
                                                    Version {theme.version} • by {theme.author}
                                                </p>
                                            </div>

                                            {theme.settings?.primaryColor && (
                                                <div
                                                    className="w-5 h-5 rounded-full border border-slate-700 shadow-sm flex-shrink-0"
                                                    style={{ backgroundColor: theme.settings.primaryColor }}
                                                    title={`Primary Color: ${theme.settings.primaryColor}`}
                                                />
                                            )}
                                        </div>

                                        <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                                            {theme.description || 'No description provided for this theme.'}
                                        </p>

                                        <div className="pt-2 text-[11px] font-mono text-slate-500 truncate">
                                            📁 themes/{theme.id}
                                        </div>
                                    </div>
                                </div>

                                {/* Card Actions */}
                                <div className="p-6 pt-0 border-t border-slate-800/60 flex items-center justify-between gap-3 mt-4">
                                    {isActive ? (
                                        <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 py-2">
                                            <CheckCircle2 className="w-4 h-4" />
                                            <span>Currently Active on Site</span>
                                        </span>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => handleActivate(theme.id)}
                                            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/25 transition-all"
                                        >
                                            Activate Theme
                                        </button>
                                    )}

                                    {!theme.is_builtin && !isActive && (
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(theme)}
                                            className="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                            title="Delete custom theme"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Upload Theme Modal */}
                {showUploadModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
                        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                                <div className="flex items-center gap-2 text-white font-bold text-base">
                                    <FileArchive className="w-5 h-5 text-indigo-400" />
                                    <span>Upload Theme Archive</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => { setShowUploadModal(false); reset(); setSelectedZip(null); }}
                                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleUploadSubmit} className="space-y-4">
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl p-8 text-center cursor-pointer transition-colors bg-slate-950/60"
                                >
                                    <UploadCloud className="w-10 h-10 text-indigo-400 mx-auto mb-2" />
                                    <p className="text-xs font-semibold text-white">
                                        {selectedZip ? selectedZip.name : 'Click to select or drop .zip theme package'}
                                    </p>
                                    <p className="text-[11px] text-slate-400 mt-1">
                                        Must contain theme.json inside. Max 30MB.
                                    </p>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".zip,application/zip"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </div>

                                {errors.theme_zip && (
                                    <p className="text-xs text-red-400 flex items-center gap-1">
                                        <AlertCircle className="w-3.5 h-3.5" />
                                        <span>{errors.theme_zip}</span>
                                    </p>
                                )}

                                <div className="flex items-center justify-end gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => { setShowUploadModal(false); reset(); setSelectedZip(null); }}
                                        className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!data.theme_zip || processing}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/25 transition-all disabled:opacity-50"
                                    >
                                        {processing && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                                        <span>{processing ? 'Installing...' : 'Install Theme'}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
