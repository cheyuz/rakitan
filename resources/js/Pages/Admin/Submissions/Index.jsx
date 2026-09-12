import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Inbox,
    Mail,
    MailOpen,
    Trash2,
    Search,
    CheckCircle2,
    Clock,
    X,
    ExternalLink,
    Send,
    User,
} from 'lucide-react';

export default function Index({ submissions, unreadCount = 0, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [selectedSubmission, setSelectedSubmission] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/submissions', { search, status: statusFilter }, { preserveState: true });
    };

    const handleStatusFilterChange = (status) => {
        setStatusFilter(status);
        router.get('/admin/submissions', { search, status }, { preserveState: true });
    };

    const handleToggleRead = (submission, e) => {
        if (e) e.stopPropagation();
        router.post(`/admin/submissions/${submission.id}/toggle-read`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                if (selectedSubmission && selectedSubmission.id === submission.id) {
                    setSelectedSubmission({ ...selectedSubmission, is_read: !selectedSubmission.is_read });
                }
            },
        });
    };

    const handleDelete = (submission, e) => {
        if (e) e.stopPropagation();
        if (confirm(`Delete message from "${submission.name}"?`)) {
            router.delete(`/admin/submissions/${submission.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    if (selectedSubmission && selectedSubmission.id === submission.id) {
                        setSelectedSubmission(null);
                    }
                },
            });
        }
    };

    const openDetail = (sub) => {
        setSelectedSubmission(sub);
        if (!sub.is_read) {
            router.post(`/admin/submissions/${sub.id}/toggle-read`, {}, { preserveScroll: true });
            sub.is_read = true;
        }
    };

    return (
        <AdminLayout title="Form Submissions Inbox">
            <Head title="Form Submissions Inbox - Rakitan CMS" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
                            <Inbox className="w-7 h-7 text-indigo-400" />
                            <span>Form Submissions & Inquiries</span>
                        </h1>
                        <p className="text-xs text-slate-400 mt-1">
                            Messages submitted through contact forms and lead capture blocks on your website.
                        </p>
                    </div>

                    {unreadCount > 0 && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                            <Mail className="w-4 h-4" />
                            <span>{unreadCount} unread message{unreadCount > 1 ? 's' : ''}</span>
                        </div>
                    )}
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                    <form onSubmit={handleSearch} className="relative flex-1 w-full">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search sender, email, subject, or message..."
                            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    </form>

                    <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
                        {[
                            { id: '', label: 'All Messages' },
                            { id: 'unread', label: 'Unread' },
                            { id: 'read', label: 'Read' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => handleStatusFilterChange(tab.id)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    statusFilter === tab.id
                                        ? 'bg-indigo-600 text-white shadow-sm'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Submissions List */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                    <div className="divide-y divide-slate-800/60">
                        {submissions.data.length === 0 ? (
                            <div className="py-16 text-center text-slate-500">
                                <Inbox className="w-12 h-12 mx-auto mb-3 text-slate-600" />
                                <p className="text-sm font-semibold text-white">No messages found</p>
                                <p className="text-xs text-slate-400 mt-1">
                                    Submissions from contact form blocks will automatically show up here.
                                </p>
                            </div>
                        ) : (
                            submissions.data.map((sub) => (
                                <div
                                    key={sub.id}
                                    onClick={() => openDetail(sub)}
                                    className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-colors ${
                                        !sub.is_read
                                            ? 'bg-indigo-950/20 hover:bg-indigo-950/30 font-semibold'
                                            : 'hover:bg-slate-800/30 text-slate-300'
                                    }`}
                                >
                                    <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                                        <button
                                            type="button"
                                            onClick={(e) => handleToggleRead(sub, e)}
                                            className={`p-2 rounded-xl transition-colors flex-shrink-0 ${
                                                !sub.is_read
                                                    ? 'text-amber-400 bg-amber-500/10 hover:bg-amber-500/20'
                                                    : 'text-slate-500 hover:text-slate-300'
                                            }`}
                                            title={sub.is_read ? 'Mark as unread' : 'Mark as read'}
                                        >
                                            {!sub.is_read ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                                        </button>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <span className={`text-xs ${!sub.is_read ? 'text-white font-bold' : 'text-slate-300'}`}>
                                                    {sub.name}
                                                </span>
                                                <span className="text-[11px] text-slate-400 font-mono">
                                                    &lt;{sub.email}&gt;
                                                </span>
                                            </div>
                                            <p className={`text-xs truncate ${!sub.is_read ? 'text-indigo-300' : 'text-slate-400'}`}>
                                                <span className="font-semibold text-slate-200">{sub.subject}:</span> {sub.message}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0 text-xs text-slate-400">
                                        <div className="flex items-center gap-1.5 text-[11px]">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>{new Date(sub.created_at).toLocaleString()}</span>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={(e) => handleDelete(sub, e)}
                                            className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                            title="Delete message"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    {submissions.links && submissions.links.length > 3 && (
                        <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                            <span>Showing {submissions.from || 0} to {submissions.to || 0} of {submissions.total}</span>
                            <div className="flex items-center gap-1">
                                {submissions.links.map((link, idx) => (
                                    <button
                                        key={idx}
                                        disabled={!link.url || link.active}
                                        onClick={() => router.get(link.url, {}, { preserveState: true })}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                            link.active
                                                ? 'bg-indigo-600 text-white font-bold'
                                                : link.url
                                                ? 'hover:bg-slate-800 text-slate-300'
                                                : 'text-slate-600 cursor-not-allowed'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Detail Modal */}
                {selectedSubmission && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
                        <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                                <div className="flex items-center gap-2 text-white font-bold text-base">
                                    <Mail className="w-5 h-5 text-indigo-400" />
                                    <span>Inquiry Details</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSelectedSubmission(null)}
                                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-3.5 text-xs text-slate-300">
                                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                                    <p className="text-white font-bold text-sm">{selectedSubmission.subject}</p>
                                    <p className="text-slate-400 flex items-center gap-2">
                                        <span>From: <strong className="text-slate-200">{selectedSubmission.name}</strong> ({selectedSubmission.email})</span>
                                    </p>
                                    <p className="text-[11px] text-slate-500">
                                        Received: {new Date(selectedSubmission.created_at).toLocaleString()}
                                    </p>
                                </div>

                                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 max-h-60 overflow-y-auto whitespace-pre-wrap leading-relaxed text-slate-200 text-xs">
                                    {selectedSubmission.message}
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                                <a
                                    href={`mailto:${selectedSubmission.email}?subject=Re: ${encodeURIComponent(selectedSubmission.subject || 'Website Inquiry')}`}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-600/25"
                                >
                                    <Send className="w-3.5 h-3.5" />
                                    <span>Reply via Email</span>
                                </a>

                                <button
                                    type="button"
                                    onClick={() => setSelectedSubmission(null)}
                                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
