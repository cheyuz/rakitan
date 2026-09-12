import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Settings as SettingsIcon, Save, Globe, Mail, Shield, CheckCircle2 } from 'lucide-react';

export default function Settings({ settings }) {
    const [form, setForm] = useState({
        site_title: settings.site_title || '',
        site_tagline: settings.site_tagline || '',
        admin_email: settings.admin_email || '',
        default_status: settings.default_status || 'draft',
        footer_text: settings.footer_text || '',
    });

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
                    <h2 className="text-xl font-black text-white tracking-tight">General Site Settings</h2>
                    <p className="text-xs text-slate-400">Configure global metadata, administrative contacts, and defaults for Rakitan CMS</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
                    {saved && (
                        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Settings saved successfully!</span>
                        </div>
                    )}

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

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                                Custom Footer Text
                            </label>
                            <input
                                type="text"
                                value={form.footer_text}
                                onChange={(e) => setForm({ ...form, footer_text: e.target.value })}
                                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
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
            </div>
        </AdminLayout>
    );
}
