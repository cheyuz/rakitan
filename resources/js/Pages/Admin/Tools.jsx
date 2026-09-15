import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Download,
    Upload,
    FileCode,
    CheckCircle2,
    AlertCircle,
    FileText,
    RotateCcw,
    ShieldAlert,
    X,
    Lock,
} from 'lucide-react';

export default function Tools({ stats }) {
    const { errors } = usePage().props;
    const [exportStatus, setExportStatus] = useState('all');
    const [importFile, setImportFile] = useState(null);
    const [isImporting, setIsImporting] = useState(false);

    // Reset Modal States
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);
    const [adminPassword, setAdminPassword] = useState('');
    const [isResetting, setIsResetting] = useState(false);
    const [resetError, setResetError] = useState('');

    const handleExport = () => {
        window.location.href = `/admin/tools/export?status=${exportStatus}`;
    };

    const handleImportSubmit = (e) => {
        e.preventDefault();
        if (!importFile) return;

        setIsImporting(true);
        const formData = new FormData();
        formData.append('xml_file', importFile);

        router.post('/admin/tools/import', formData, {
            onFinish: () => {
                setIsImporting(false);
                setImportFile(null);
            },
        });
    };

    const handleResetSubmit = (e) => {
        e.preventDefault();
        if (!adminPassword) {
            setResetError('Silakan masukkan kata sandi administrator untuk konfirmasi.');
            return;
        }

        setIsResetting(true);
        setResetError('');

        router.post(
            '/admin/tools/reset',
            { password: adminPassword },
            {
                onSuccess: () => {
                    setIsResetting(false);
                    setIsResetModalOpen(false);
                    setAdminPassword('');
                },
                onError: (errs) => {
                    setIsResetting(false);
                    if (errs.password) {
                        setResetError(errs.password);
                    } else {
                        setResetError('Terjadi kesalahan saat memproses reset data.');
                    }
                },
            }
        );
    };

    return (
        <AdminLayout title="Tools & Migration">
            <Head title="Tools & XML Export/Import - Rakitan CMS" />

            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h2 className="text-xl font-black text-white tracking-tight">Tools & Data Migration</h2>
                    <p className="text-xs text-slate-400">
                        Export and import your modular content using WordPress-compatible WXR XML format
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Export Box */}
                    <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                                    <Download className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white">Export Content to XML</h3>
                                    <p className="text-xs text-slate-400">Generate a standard WXR XML file</p>
                                </div>
                            </div>

                            <p className="text-xs text-slate-300 leading-relaxed">
                                When you click the button below, Rakitan will create an XML file for you to save to your computer. This format contains all your pages, metadata, and JSON block schemas.
                            </p>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-2">
                                    Choose what to export:
                                </label>
                                <div className="space-y-2 text-xs text-slate-300">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="export_status"
                                            value="all"
                                            checked={exportStatus === 'all'}
                                            onChange={() => setExportStatus('all')}
                                            className="text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span>All Content ({stats.totalPages} pages)</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="export_status"
                                            value="published"
                                            checked={exportStatus === 'published'}
                                            onChange={() => setExportStatus('published')}
                                            className="text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span>Published Pages Only ({stats.publishedPages} pages)</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="export_status"
                                            value="draft"
                                            checked={exportStatus === 'draft'}
                                            onChange={() => setExportStatus('draft')}
                                            className="text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span>Draft Pages Only ({stats.draftPages} pages)</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleExport}
                            className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition-all"
                        >
                            <Download className="w-4 h-4" />
                            <span>Download Export File (.xml)</span>
                        </button>
                    </div>

                    {/* Import Box */}
                    <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-6">
                        <form onSubmit={handleImportSubmit} className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                                    <Upload className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white">Import from XML</h3>
                                    <p className="text-xs text-slate-400">WordPress or Rakitan XML file</p>
                                </div>
                            </div>

                            <p className="text-xs text-slate-300 leading-relaxed">
                                Upload a WordPress export file (.xml) or a Rakitan export. If the XML contains WordPress posts, Rakitan will automatically convert the text into modular Rich Text blocks.
                            </p>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-2">
                                    Select XML File:
                                </label>
                                <div className="border-2 border-dashed border-slate-800 rounded-xl p-4 text-center hover:border-slate-700 transition-colors">
                                    <input
                                        type="file"
                                        accept=".xml,text/xml"
                                        onChange={(e) => setImportFile(e.target.files[0] || null)}
                                        className="text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 cursor-pointer"
                                    />
                                    {importFile && (
                                        <p className="mt-2 text-[11px] text-emerald-400 font-medium">
                                            Selected: {importFile.name} ({(importFile.size / 1024).toFixed(1)} KB)
                                        </p>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={!importFile || isImporting}
                                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white shadow-lg shadow-purple-600/25 transition-all mt-4"
                            >
                                <Upload className="w-4 h-4" />
                                <span>{isImporting ? 'Importing Pages...' : 'Upload & Import File'}</span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Clean & Reset Section */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-950/30 via-slate-900/60 to-slate-900/60 border border-rose-500/20 shadow-xl space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <RotateCcw className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                    <span>Bersihkan & Reset Data Website</span>
                                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">
                                        Fresh Start
                                    </span>
                                </h3>
                                <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                                    Kembalikan website ke kondisi awal seperti baru selesai instalasi untuk mulai membangun web dari nol. Seluruh file plugin dan tema tetap aman tersimpan di server, namun seluruh plugin dinonaktifkan dan tema kembali ke tema default. Akun administrator Anda yang sedang aktif tidak akan terhapus.
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setResetError('');
                                setAdminPassword('');
                                setIsResetModalOpen(true);
                            }}
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20 transition-all flex-shrink-0"
                        >
                            <RotateCcw className="w-4 h-4" />
                            <span>Reset Website Data</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                            <span>File Plugin & Tema tetap utuh</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                            <span>Akun admin aktif dipertahankan</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                            <span>Halaman demo awal diinisialisasi</span>
                        </div>
                    </div>
                </div>

                {/* Modal Konfirmasi Reset */}
                {isResetModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl shadow-slate-950/80 space-y-6 relative">
                            {/* Modal Header */}
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
                                        <ShieldAlert className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-white">Konfirmasi Reset Website</h3>
                                        <p className="text-xs text-slate-400">Tindakan ini tidak dapat dibatalkan</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => !isResetting && setIsResetModalOpen(false)}
                                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Warning Box */}
                            <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30 text-xs text-rose-200 space-y-2">
                                <p className="font-semibold text-rose-300">Data berikut akan dibersihkan:</p>
                                <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-300">
                                    <li>Seluruh postingan blog, kategori, dan menu kustom</li>
                                    <li>Seluruh file media upload di storage dan database media</li>
                                    <li>Seluruh pesan inquiry formulir kontak</li>
                                    <li>Seluruh halaman kustom (halaman demo awal akan di-seed ulang)</li>
                                    <li>Seluruh plugin dinonaktifkan, tema kembali ke default</li>
                                </ul>
                            </div>

                            {/* Form Input Password */}
                            <form onSubmit={handleResetSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                        Masukkan Kata Sandi Administrator Anda:
                                    </label>
                                    <div className="relative">
                                        <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input
                                            type="password"
                                            value={adminPassword}
                                            onChange={(e) => setAdminPassword(e.target.value)}
                                            placeholder="Kata sandi akun Anda saat ini..."
                                            disabled={isResetting}
                                            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                                            autoFocus
                                        />
                                    </div>
                                    {resetError && (
                                        <p className="mt-1.5 text-xs text-rose-400 font-medium">
                                            {resetError}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-2">
                                    <button
                                        type="button"
                                        disabled={isResetting}
                                        onClick={() => setIsResetModalOpen(false)}
                                        className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isResetting || !adminPassword}
                                        className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white shadow-lg shadow-rose-600/25 transition-all"
                                    >
                                        <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} />
                                        <span>{isResetting ? 'Memproses Reset...' : 'Ya, Bersihkan & Reset Data'}</span>
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
