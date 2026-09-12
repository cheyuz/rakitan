import React, { useState, useRef } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Puzzle,
    UploadCloud,
    Power,
    Trash2,
    CheckCircle2,
    XCircle,
    FileArchive,
    X,
    AlertCircle,
    Loader2,
    Code2,
    Search,
    BookOpen,
} from 'lucide-react';

export default function Index({ plugins = [], pluginsPath = '' }) {
    const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'inactive'
    const [search, setSearch] = useState('');
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedZip, setSelectedZip] = useState(null);
    const fileInputRef = useRef(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        plugin_zip: null,
    });

    const filteredPlugins = plugins.filter((p) => {
        const matchesFilter =
            filter === 'all' ||
            (filter === 'active' && p.is_active) ||
            (filter === 'inactive' && !p.is_active);

        const matchesSearch =
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase()) ||
            p.author.toLowerCase().includes(search.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    const handleToggle = (pluginId) => {
        router.post('/admin/plugins/toggle', { plugin: pluginId });
    };

    const handleDelete = (plugin) => {
        if (confirm(`Are you sure you want to delete plugin "${plugin.name}"? This will delete its folder from plugins/.`)) {
            router.delete(`/admin/plugins/${plugin.id}`);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedZip(file);
            setData('plugin_zip', file);
        }
    };

    const handleUploadSubmit = (e) => {
        e.preventDefault();
        post('/admin/plugins/upload', {
            onSuccess: () => {
                setShowUploadModal(false);
                reset();
                setSelectedZip(null);
            },
        });
    };

    return (
        <AdminLayout title="Plugins & Addons">
            <Head title="Plugins Management - Rakitan CMS" />

            <div className="space-y-6">
                {/* Header Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
                            <Puzzle className="w-7 h-7 text-indigo-400" />
                            <span>Plugins & Modular Addons</span>
                        </h1>
                        <p className="text-xs text-slate-400 mt-1">
                            Extend Rakitan CMS with modular puzzle blocks, integrations, and tools.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowUploadModal(true)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/25 transition-all self-start sm:self-auto"
                    >
                        <UploadCloud className="w-4 h-4" />
                        <span>Upload Plugin (.zip)</span>
                    </button>
                </div>

                {/* Search & Tabs */}
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                    <div className="relative flex-1 w-full">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search plugins by name, description, author..."
                            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    </div>

                    <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
                        {[
                            { id: 'all', label: `All (${plugins.length})` },
                            { id: 'active', label: `Active (${plugins.filter((p) => p.is_active).length})` },
                            { id: 'inactive', label: `Inactive (${plugins.filter((p) => !p.is_active).length})` },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setFilter(tab.id)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    filter === tab.id
                                        ? 'bg-indigo-600 text-white shadow-sm'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Plugins Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPlugins.length === 0 ? (
                        <div className="col-span-full py-16 text-center border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/20">
                            <Puzzle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                            <h3 className="text-sm font-bold text-white">No plugins found</h3>
                            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                                No plugins matched your filter. You can upload a new ZIP plugin package above.
                            </p>
                        </div>
                    ) : (
                        filteredPlugins.map((plugin) => (
                            <div
                                key={plugin.id}
                                className={`flex flex-col justify-between rounded-3xl border transition-all duration-200 overflow-hidden ${
                                    plugin.is_active
                                        ? 'bg-slate-900/90 border-indigo-500/40 shadow-xl shadow-indigo-950/20'
                                        : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
                                }`}
                            >
                                <div className="p-6 space-y-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                                            <Puzzle className="w-6 h-6" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {plugin.is_active ? (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    <span>Active</span>
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-400 border border-slate-700">
                                                    <XCircle className="w-3 h-3" />
                                                    <span>Inactive</span>
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                                            <span>{plugin.name}</span>
                                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                                                v{plugin.version}
                                            </span>
                                        </h3>
                                        <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                                            {plugin.description || 'No description provided.'}
                                        </p>
                                    </div>

                                    {plugin.blocks && plugin.blocks.length > 0 && (
                                        <div className="pt-2">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block mb-1.5">
                                                Included Blocks ({plugin.blocks.length}):
                                            </span>
                                            <div className="flex flex-wrap gap-1">
                                                {plugin.blocks.map((b, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                                                    >
                                                        +{b}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="text-[11px] text-slate-500 space-y-1 pt-2 border-t border-slate-800/60 font-mono">
                                        <p>By: <span className="text-slate-300 font-sans">{plugin.author}</span></p>
                                        <p className="truncate text-slate-600">ID: {plugin.id}</p>
                                    </div>
                                </div>

                                <div className="px-6 py-4 bg-slate-950/50 border-t border-slate-800/80 flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={() => handleToggle(plugin.id)}
                                        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                                            plugin.is_active
                                                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                                                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25'
                                        }`}
                                    >
                                        <Power className="w-3.5 h-3.5" />
                                        <span>{plugin.is_active ? 'Deactivate' : 'Activate'}</span>
                                    </button>

                                    {!plugin.is_builtin && (
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(plugin)}
                                            className="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                            title="Delete plugin"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Developer Documentation Card */}
                <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 space-y-4">
                    <div className="flex items-center gap-2.5 text-indigo-400">
                        <Code2 className="w-5 h-5" />
                        <h2 className="text-sm font-bold text-white">How to Create a Rakitan Plugin</h2>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
                        Rakitan plugins are modular folders stored directly in <code className="text-indigo-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">/plugins/</code>.
                        Every plugin requires a <code className="text-indigo-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">plugin.json</code> manifest with unique <code className="text-indigo-300">id</code> and <code className="text-indigo-300">name</code> attributes.
                    </p>
                    <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto">
                        <pre>{`{
  "id": "my-custom-addon",
  "name": "My Custom Addon",
  "version": "1.0.0",
  "author": "Your Name",
  "description": "Registers custom puzzle blocks and hooks into Rakitan."
}`}</pre>
                    </div>
                </div>

                {/* Upload Modal */}
                {showUploadModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
                        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                                <div className="flex items-center gap-2 text-white font-bold text-base">
                                    <FileArchive className="w-5 h-5 text-indigo-400" />
                                    <span>Upload Plugin Archive</span>
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
                                        {selectedZip ? selectedZip.name : 'Click to select or drop .zip plugin package'}
                                    </p>
                                    <p className="text-[11px] text-slate-400 mt-1">
                                        Archive must contain plugin.json inside. Max 30MB.
                                    </p>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".zip,application/zip"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </div>

                                {errors.plugin_zip && (
                                    <p className="text-xs text-red-400 flex items-center gap-1">
                                        <AlertCircle className="w-3.5 h-3.5" />
                                        <span>{errors.plugin_zip}</span>
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
                                        disabled={!data.plugin_zip || processing}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/25 transition-all disabled:opacity-50"
                                    >
                                        {processing && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                                        <span>{processing ? 'Installing...' : 'Install Plugin'}</span>
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
