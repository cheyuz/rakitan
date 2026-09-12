import React from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Palette, Check, Sparkles, Sun, Moon, Eye, ShieldCheck } from 'lucide-react';

export default function Index({ themes = [], activeTheme = 'default_dark' }) {
    const handleActivate = (themeId) => {
        router.post('/admin/themes/activate', {
            theme: themeId,
        });
    };

    return (
        <AdminLayout title="Theme Management">
            <Head title="Themes - Rakitan Admin" />

            <div className="space-y-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2.5">
                            <Palette className="w-5 h-5 text-indigo-400" />
                            <span>Theme Management</span>
                        </h2>
                        <p className="text-xs text-slate-400 mt-1">
                            Choose between dark cyber aesthetics and clean light presentation for your public website.
                        </p>
                    </div>

                    <a
                        href="/"
                        target="_blank"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
                    >
                        <Eye className="w-4 h-4 text-emerald-400" />
                        <span>Preview Live Website</span>
                    </a>
                </div>

                {/* Theme Comparison Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {themes.map((theme) => {
                        const isActive = activeTheme === theme.id;
                        const isLight = theme.id === 'default_light';

                        return (
                            <div
                                key={theme.id}
                                className={`rounded-3xl border p-6 flex flex-col justify-between transition-all duration-300 shadow-xl ${
                                    isActive
                                        ? 'bg-slate-900/90 border-indigo-500/80 ring-2 ring-indigo-500/30 shadow-indigo-600/10'
                                        : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
                                }`}
                            >
                                <div>
                                    {/* Mock Preview Canvas Window */}
                                    <div className={`aspect-[16/10] rounded-2xl p-4 mb-6 border overflow-hidden transition-all flex flex-col justify-between shadow-inner ${
                                        isLight
                                            ? 'bg-slate-100 border-slate-300 text-slate-900'
                                            : 'bg-slate-950 border-slate-800 text-white'
                                    }`}>
                                        {/* Browser Topbar Mock */}
                                        <div className="flex items-center justify-between pb-3 border-b border-inherit opacity-60">
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                                            </div>
                                            <div className="px-3 py-0.5 rounded-md bg-black/10 dark:bg-white/10 text-[9px] font-mono">
                                                rakitan.test
                                            </div>
                                            <div className="w-6" />
                                        </div>

                                        {/* Mock Content */}
                                        <div className="my-auto py-2 space-y-3">
                                            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-600/10 text-indigo-600 dark:text-indigo-400">
                                                <Sparkles className="w-3 h-3" />
                                                <span>{isLight ? 'Clean Light Edition' : 'Dark Mode Edition'}</span>
                                            </div>

                                            <h3 className="text-base sm:text-lg font-black tracking-tight leading-snug">
                                                {isLight
                                                    ? 'Ultra-Clean, High-Readability UI'
                                                    : 'Cyber Midnight Aesthetic'}
                                            </h3>

                                            <p className="text-[11px] opacity-70 line-clamp-2">
                                                {isLight
                                                    ? 'Light slate surfaces with soft ambient shadows and crisp readable typography.'
                                                    : 'Deep slate-950 backgrounds with vibrant glowing indigo accents.'}
                                            </p>

                                            <div className="flex items-center gap-2 pt-1">
                                                <div className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-[10px] font-semibold">
                                                    Action Button
                                                </div>
                                                <div className="px-3 py-1 rounded-lg border border-inherit text-[10px] font-semibold opacity-70">
                                                    Learn More
                                                </div>
                                            </div>
                                        </div>

                                        {/* Mock Footer */}
                                        <div className="pt-2 border-t border-inherit text-[9px] opacity-50 flex items-center justify-between">
                                            <span>Rakitan Modular CMS</span>
                                            <span>© 2026</span>
                                        </div>
                                    </div>

                                    {/* Info & Meta */}
                                    <div className="space-y-2 mb-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                {isLight ? (
                                                    <Sun className="w-4 h-4 text-amber-400" />
                                                ) : (
                                                    <Moon className="w-4 h-4 text-indigo-400" />
                                                )}
                                                <h3 className="text-base font-bold text-white">{theme.name}</h3>
                                            </div>

                                            {isActive ? (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                                    <Check className="w-3.5 h-3.5" />
                                                    <span>Active</span>
                                                </span>
                                            ) : (
                                                <span className="text-[11px] font-semibold text-slate-500 bg-slate-800/60 px-2.5 py-0.5 rounded-full">
                                                    {theme.badge}
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-xs text-slate-400 leading-relaxed">
                                            {theme.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Activate Button */}
                                <div>
                                    {isActive ? (
                                        <div className="w-full py-2.5 rounded-xl bg-slate-800/80 text-emerald-400 text-xs font-semibold text-center flex items-center justify-center gap-2 border border-slate-700/60">
                                            <ShieldCheck className="w-4 h-4" />
                                            <span>Currently Active as Default Theme</span>
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => handleActivate(theme.id)}
                                            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/25 transition-all"
                                        >
                                            Activate {theme.name}
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AdminLayout>
    );
}
