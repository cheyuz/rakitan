import React, { useState, useRef } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Image as ImageIcon,
    Folder,
    FolderPlus,
    UploadCloud,
    Trash2,
    Copy,
    ChevronRight,
    Search,
    ExternalLink,
    FileText,
    Check,
    Loader2,
} from 'lucide-react';

export default function Index({
    currentFolder = null,
    folders = [],
    media = [],
    breadcrumbs = [],
    filters = {},
}) {
    const [search, setSearch] = useState(filters.search || '');
    const [showNewFolder, setShowNewFolder] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [copiedId, setCopiedId] = useState(null);
    const [uploading, setUploading] = useState(false);

    const fileInputRef = useRef(null);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/media', {
            folder_id: currentFolder?.id || undefined,
            search: search || undefined,
        }, { preserveState: true });
    };

    const handleCreateFolder = (e) => {
        e.preventDefault();
        if (!newFolderName.trim()) return;

        router.post('/admin/media/folders', {
            name: newFolderName.trim(),
            parent_id: currentFolder?.id || null,
        }, {
            onSuccess: () => {
                setNewFolderName('');
                setShowNewFolder(false);
            },
        });
    };

    const handleDeleteFolder = (folder) => {
        if (confirm(`Are you sure you want to delete folder "${folder.name}" and all its contents?`)) {
            router.delete(`/admin/media/folders/${folder.id}`);
        }
    };

    const handleDeleteMedia = (item) => {
        if (confirm(`Delete file "${item.name}"?`)) {
            router.delete(`/admin/media/${item.id}`);
        }
    };

    const handleCopyUrl = (item) => {
        navigator.clipboard.writeText(window.location.origin + item.url);
        setCopiedId(item.id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleFilesUpload = (files) => {
        if (!files || files.length === 0) return;
        setUploading(true);

        const formData = new FormData();
        if (currentFolder?.id) {
            formData.append('folder_id', currentFolder.id);
        }
        for (let i = 0; i < files.length; i++) {
            formData.append('files[]', files[i]);
        }

        router.post('/admin/media', formData, {
            onFinish: () => {
                setUploading(false);
                setIsDragging(false);
            },
        });
    };

    return (
        <AdminLayout title="Media Library">
            <Head title="Media Library - Rakitan Admin" />

            <div
                className="space-y-6 max-w-7xl mx-auto relative"
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    if (e.dataTransfer.files) handleFilesUpload(e.dataTransfer.files);
                }}
            >
                {/* Drag Overlay */}
                {isDragging && (
                    <div className="fixed inset-0 z-50 bg-indigo-600/20 backdrop-blur-md border-4 border-dashed border-indigo-500 rounded-3xl flex flex-col items-center justify-center text-white pointer-events-none m-6">
                        <UploadCloud className="w-16 h-16 text-indigo-400 animate-bounce mb-3" />
                        <h3 className="text-2xl font-bold">Drop files here to upload</h3>
                        <p className="text-sm text-indigo-200 mt-1">
                            Files will be added to {currentFolder ? `folder "${currentFolder.name}"` : 'All Media'}
                        </p>
                    </div>
                )}

                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2.5">
                            <ImageIcon className="w-5 h-5 text-indigo-400" />
                            <span>Media Library</span>
                        </h2>
                        <p className="text-xs text-slate-400 mt-1">
                            Organize images and documents into folders with seamless drag & drop upload.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setShowNewFolder(!showNewFolder)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
                        >
                            <FolderPlus className="w-4 h-4 text-purple-400" />
                            <span>New Folder</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all disabled:opacity-50"
                        >
                            {uploading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <UploadCloud className="w-4 h-4" />
                            )}
                            <span>{uploading ? 'Uploading...' : 'Upload Files'}</span>
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="image/*,video/*,application/pdf"
                            onChange={(e) => handleFilesUpload(e.target.files)}
                            className="hidden"
                        />
                    </div>
                </div>

                {/* Subheader: Breadcrumbs & Search */}
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-1.5 overflow-x-auto text-xs text-slate-400 scrollbar-none">
                        {breadcrumbs.map((crumb, idx) => (
                            <React.Fragment key={crumb.id || 'root'}>
                                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />}
                                <Link
                                    href={crumb.id ? `/admin/media?folder_id=${crumb.id}` : '/admin/media'}
                                    className={`hover:text-white font-medium whitespace-nowrap transition-colors ${
                                        idx === breadcrumbs.length - 1 ? 'text-indigo-400 font-bold' : ''
                                    }`}
                                >
                                    {crumb.name}
                                </Link>
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Search */}
                    <form onSubmit={handleSearch} className="relative w-full sm:w-64">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search files..."
                            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                        <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                    </form>
                </div>

                {/* Inline New Folder Form */}
                {showNewFolder && (
                    <form onSubmit={handleCreateFolder} className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center gap-3">
                        <FolderPlus className="w-5 h-5 text-purple-400 flex-shrink-0" />
                        <input
                            type="text"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            placeholder="Folder Name (e.g. Banners, Authors, Products)..."
                            autoFocus
                            className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-purple-500"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold"
                        >
                            Create Folder
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowNewFolder(false)}
                            className="px-3 py-2 text-xs text-slate-400 hover:text-white"
                        >
                            Cancel
                        </button>
                    </form>
                )}

                {/* Folders Section */}
                {folders.length > 0 && (
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                            <Folder className="w-4 h-4 text-purple-400" />
                            <span>Folders ({folders.length})</span>
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            {folders.map((folder) => (
                                <div
                                    key={folder.id}
                                    className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/50 hover:bg-slate-900/90 flex flex-col justify-between group transition-all"
                                >
                                    <Link
                                        href={`/admin/media?folder_id=${folder.id}`}
                                        className="flex items-center gap-3 mb-2"
                                    >
                                        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-105 transition-transform">
                                            <Folder className="w-5 h-5 fill-purple-500/20" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-bold text-white truncate">{folder.name}</p>
                                            <p className="text-[10px] text-slate-500">{folder.media_count} files</p>
                                        </div>
                                    </Link>

                                    <div className="flex items-center justify-end border-t border-slate-800/60 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteFolder(folder)}
                                            className="p-1 rounded text-slate-500 hover:text-red-400 transition-colors"
                                            title="Delete folder"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Media Files Section */}
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-indigo-400" />
                        <span>Media Files ({media.length})</span>
                    </h3>

                    {media.length === 0 ? (
                        <div className="py-20 text-center rounded-3xl border-2 border-dashed border-slate-800 bg-slate-900/30">
                            <UploadCloud className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                            <h4 className="text-sm font-bold text-white mb-1">No files in this folder</h4>
                            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
                                Drag and drop images anywhere onto this page, or click the button below to upload.
                            </p>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                            >
                                Browse Files
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {media.map((item) => (
                                <div
                                    key={item.id}
                                    className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-square flex flex-col justify-end hover:border-slate-700 transition-all shadow-md"
                                >
                                    {item.is_image ? (
                                        <img
                                            src={item.url}
                                            alt={item.name}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-slate-500">
                                            <FileText className="w-12 h-12 mb-2 text-slate-600" />
                                            <span className="text-[10px] uppercase font-bold">{item.mime_type}</span>
                                        </div>
                                    )}

                                    {/* Action Hover Controls */}
                                    <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                        <button
                                            type="button"
                                            onClick={() => handleCopyUrl(item)}
                                            className="p-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md text-slate-300 hover:text-white"
                                            title="Copy URL"
                                        >
                                            {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                        </button>

                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="p-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md text-slate-300 hover:text-white"
                                            title="Open Original"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>

                                        <button
                                            type="button"
                                            onClick={() => handleDeleteMedia(item)}
                                            className="p-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md text-slate-300 hover:text-red-400"
                                            title="Delete file"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    {/* Info Overlay */}
                                    <div className="relative z-10 p-3 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent">
                                        <p className="text-xs font-semibold text-white truncate">{item.name}</p>
                                        <p className="text-[10px] text-slate-400">{item.formatted_size}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
