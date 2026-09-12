import React, { useState, useEffect, useRef } from 'react';
import {
    X,
    UploadCloud,
    Folder,
    FolderPlus,
    ChevronRight,
    Search,
    Check,
    Image as ImageIcon,
    FileText,
    Trash2,
    Loader2,
} from 'lucide-react';

export default function MediaPickerModal({
    isOpen,
    onClose,
    onSelect,
    title = 'Select Media',
}) {
    if (!isOpen) return null;

    const [currentFolderId, setCurrentFolderId] = useState(null);
    const [breadcrumbs, setBreadcrumbs] = useState([{ id: null, name: 'All Media' }]);
    const [folders, setFolders] = useState([]);
    const [mediaList, setMediaList] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [search, setSearch] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [showNewFolder, setShowNewFolder] = useState(false);

    const fileInputRef = useRef(null);

    const loadMedia = async (folderId = currentFolderId) => {
        setLoading(true);
        try {
            const url = `/admin/media?ajax=1${folderId ? `&folder_id=${folderId}` : ''}${search ? `&search=${encodeURIComponent(search)}` : ''}`;
            const res = await fetch(url, { credentials: 'same-origin' });
            if (!res.ok) throw new Error('Failed to load media');
            const data = await res.json();
            setFolders(data.folders || []);
            setMediaList(data.media || []);
            setBreadcrumbs(data.breadcrumbs || [{ id: null, name: 'All Media' }]);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMedia(currentFolderId);
    }, [currentFolderId]);

    const handleSearch = (e) => {
        e.preventDefault();
        loadMedia(currentFolderId);
    };

    // Upload files handler
    const uploadFiles = async (files) => {
        if (!files || files.length === 0) return;
        setUploading(true);

        const formData = new FormData();
        if (currentFolderId) {
            formData.append('folder_id', currentFolderId);
        }
        for (let i = 0; i < files.length; i++) {
            formData.append('files[]', files[i]);
        }

        // Get CSRF Token from cookie
        const xsrfToken = document.cookie
            .split('; ')
            .find((row) => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];

        try {
            const res = await fetch('/admin/media', {
                method: 'POST',
                headers: {
                    'X-XSRF-TOKEN': decodeURIComponent(xsrfToken || ''),
                    'Accept': 'application/json',
                },
                body: formData,
                credentials: 'same-origin',
            });

            if (res.ok) {
                const data = await res.json();
                if (data.uploaded && data.uploaded.length > 0) {
                    setSelectedItem(data.uploaded[0]);
                }
                loadMedia(currentFolderId);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setUploading(false);
            setIsDragging(false);
        }
    };

    // Create new folder
    const createFolder = async (e) => {
        e.preventDefault();
        if (!newFolderName.trim()) return;

        const xsrfToken = document.cookie
            .split('; ')
            .find((row) => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];

        try {
            const res = await fetch('/admin/media/folders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': decodeURIComponent(xsrfToken || ''),
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    name: newFolderName.trim(),
                    parent_id: currentFolderId,
                }),
                credentials: 'same-origin',
            });

            if (res.ok) {
                setNewFolderName('');
                setShowNewFolder(false);
                loadMedia(currentFolderId);
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Drag and drop listeners
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files) {
            uploadFiles(e.dataTransfer.files);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200">
            <div
                className="w-full max-w-5xl h-[85vh] bg-slate-900 border border-slate-800 rounded-3xl flex flex-col shadow-2xl overflow-hidden relative"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {/* Drag Overlay */}
                {isDragging && (
                    <div className="absolute inset-0 z-50 bg-indigo-600/20 backdrop-blur-sm border-2 border-dashed border-indigo-500 rounded-3xl flex flex-col items-center justify-center text-white pointer-events-none">
                        <UploadCloud className="w-16 h-16 text-indigo-400 animate-bounce mb-3" />
                        <h3 className="text-xl font-bold">Drop files here to upload</h3>
                        <p className="text-sm text-indigo-200">Files will be saved in current folder</p>
                    </div>
                )}

                {/* Modal Header */}
                <div className="h-16 px-6 border-b border-slate-800/80 flex items-center justify-between flex-shrink-0 bg-slate-900/80">
                    <div className="flex items-center gap-2.5">
                        <ImageIcon className="w-5 h-5 text-indigo-400" />
                        <h2 className="text-base font-bold text-white">{title}</h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setShowNewFolder(!showNewFolder)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
                        >
                            <FolderPlus className="w-4 h-4 text-purple-400" />
                            <span>New Folder</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all disabled:opacity-50"
                        >
                            {uploading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <UploadCloud className="w-4 h-4" />
                            )}
                            <span>{uploading ? 'Uploading...' : 'Upload Media'}</span>
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="image/*,video/*,application/pdf"
                            onChange={(e) => uploadFiles(e.target.files)}
                            className="hidden"
                        />

                        <button
                            type="button"
                            onClick={onClose}
                            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Subheader Toolbar: Breadcrumbs & Search */}
                <div className="px-6 py-3 border-b border-slate-800/60 bg-slate-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-shrink-0">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-1.5 overflow-x-auto text-xs text-slate-400 scrollbar-none">
                        {breadcrumbs.map((crumb, idx) => (
                            <React.Fragment key={crumb.id || 'root'}>
                                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />}
                                <button
                                    type="button"
                                    onClick={() => setCurrentFolderId(crumb.id)}
                                    className={`hover:text-white font-medium whitespace-nowrap transition-colors ${
                                        idx === breadcrumbs.length - 1 ? 'text-indigo-400 font-bold' : ''
                                    }`}
                                >
                                    {crumb.name}
                                </button>
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Search */}
                    <form onSubmit={handleSearch} className="relative w-full sm:w-64">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search in folder..."
                            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                        <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                    </form>
                </div>

                {/* Inline New Folder Form */}
                {showNewFolder && (
                    <form onSubmit={createFolder} className="px-6 py-3 bg-purple-500/10 border-b border-purple-500/20 flex items-center gap-3">
                        <FolderPlus className="w-4 h-4 text-purple-400 flex-shrink-0" />
                        <input
                            type="text"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            placeholder="Folder Name..."
                            autoFocus
                            className="flex-1 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-purple-500"
                        />
                        <button
                            type="submit"
                            className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold"
                        >
                            Create
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowNewFolder(false)}
                            className="text-xs text-slate-400 hover:text-white"
                        >
                            Cancel
                        </button>
                    </form>
                )}

                {/* Main Content Area */}
                <div className="flex-1 flex min-h-0 overflow-hidden">
                    {/* Items Grid */}
                    <div className="flex-1 p-6 overflow-y-auto">
                        {loading ? (
                            <div className="h-full flex items-center justify-center">
                                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                            </div>
                        ) : folders.length === 0 && mediaList.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-800/80 rounded-2xl">
                                <UploadCloud className="w-12 h-12 text-slate-600 mb-3" />
                                <h3 className="text-sm font-bold text-white mb-1">This folder is empty</h3>
                                <p className="text-xs text-slate-400 max-w-sm mb-4">
                                    Drag and drop images here, or click the upload button above.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                                >
                                    Browse Files
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Folders */}
                                {folders.length > 0 && (
                                    <div>
                                        <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">
                                            Folders ({folders.length})
                                        </h3>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                            {folders.map((folder) => (
                                                <button
                                                    key={folder.id}
                                                    type="button"
                                                    onClick={() => setCurrentFolderId(folder.id)}
                                                    className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-purple-500/50 hover:bg-slate-950 flex items-center gap-3 text-left group transition-all"
                                                >
                                                    <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                                                        <Folder className="w-5 h-5 fill-purple-500/20" />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-xs font-bold text-white truncate">{folder.name}</p>
                                                        <p className="text-[10px] text-slate-500">{folder.media_count} files</p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Media Files */}
                                {mediaList.length > 0 && (
                                    <div>
                                        <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">
                                            Files ({mediaList.length})
                                        </h3>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                            {mediaList.map((media) => {
                                                const isSelected = selectedItem?.id === media.id;
                                                return (
                                                    <div
                                                        key={media.id}
                                                        onClick={() => setSelectedItem(media)}
                                                        className={`group relative rounded-2xl overflow-hidden border cursor-pointer transition-all aspect-square bg-slate-950 flex flex-col justify-end ${
                                                            isSelected
                                                                ? 'border-indigo-500 ring-2 ring-indigo-500 shadow-lg shadow-indigo-600/20'
                                                                : 'border-slate-800 hover:border-slate-700'
                                                        }`}
                                                    >
                                                        {media.is_image ? (
                                                            <img
                                                                src={media.url}
                                                                alt={media.name}
                                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                            />
                                                        ) : (
                                                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-slate-500">
                                                                <FileText className="w-10 h-10 mb-1 text-slate-600" />
                                                                <span className="text-[10px] uppercase font-bold">{media.mime_type}</span>
                                                            </div>
                                                        )}

                                                        {/* Selected Badge */}
                                                        {isSelected && (
                                                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md">
                                                                <Check className="w-3.5 h-3.5" />
                                                            </div>
                                                        )}

                                                        {/* Bottom Info Overlay */}
                                                        <div className="relative z-10 p-2 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent">
                                                            <p className="text-[11px] font-semibold text-white truncate">{media.name}</p>
                                                            <p className="text-[10px] text-slate-400">{media.formatted_size}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Panel: Selected Item Details & Confirm Button */}
                    {selectedItem && (
                        <div className="w-72 border-l border-slate-800/80 bg-slate-950/50 p-5 flex flex-col justify-between flex-shrink-0">
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                    File Details
                                </h4>

                                <div className="aspect-[16/10] rounded-xl overflow-hidden border border-slate-800 bg-slate-950 relative">
                                    {selectedItem.is_image ? (
                                        <img
                                            src={selectedItem.url}
                                            alt={selectedItem.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-600">
                                            <FileText className="w-10 h-10" />
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2 text-xs">
                                    <div>
                                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Name</span>
                                        <span className="text-white font-medium break-all">{selectedItem.name}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Size</span>
                                        <span className="text-slate-300">{selectedItem.formatted_size}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Type</span>
                                        <span className="text-slate-300 font-mono text-[11px]">{selectedItem.mime_type}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-500 block text-[10px] uppercase font-bold">URL</span>
                                        <input
                                            type="text"
                                            readOnly
                                            value={selectedItem.url}
                                            className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400 select-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-800 space-y-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        onSelect(selectedItem);
                                        onClose();
                                    }}
                                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-1.5"
                                >
                                    <Check className="w-4 h-4" />
                                    <span>Select This File</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
