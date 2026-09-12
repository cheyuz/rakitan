import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Download, Upload, FileCode, CheckCircle2, AlertCircle, FileText } from 'lucide-react';

export default function Tools({ stats }) {
    const [exportStatus, setExportStatus] = useState('all');
    const [importFile, setImportFile] = useState(null);
    const [isImporting, setIsImporting] = useState(false);

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
            </div>
        </AdminLayout>
    );
}
