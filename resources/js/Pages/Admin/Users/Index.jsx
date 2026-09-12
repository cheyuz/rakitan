import React, { useState } from 'react';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Users,
    UserPlus,
    Shield,
    Edit,
    Trash2,
    Search,
    ShieldAlert,
    ShieldCheck,
    PenTool,
    X,
    CheckCircle2,
    AlertCircle,
    Key,
    Mail,
    User as UserIcon,
} from 'lucide-react';

export default function Index({ users, filters = {}, availableRoles = [] }) {
    const { auth } = usePage().props;
    const currentUserId = auth?.user?.id;

    const [search, setSearch] = useState(filters.search || '');
    const [roleFilter, setRoleFilter] = useState(filters.role || '');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    // Create user form
    const createForm = useForm({
        name: '',
        email: '',
        password: '',
        role: 'editor',
    });

    // Edit user form
    const editForm = useForm({
        name: '',
        email: '',
        password: '',
        role: 'editor',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/users', { search, role: roleFilter }, { preserveState: true });
    };

    const handleFilterRoleChange = (newRole) => {
        setRoleFilter(newRole);
        router.get('/admin/users', { search, role: newRole }, { preserveState: true });
    };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        createForm.post('/admin/users', {
            onSuccess: () => {
                setShowCreateModal(false);
                createForm.reset();
            },
        });
    };

    const startEdit = (user) => {
        setEditingUser(user);
        editForm.setData({
            name: user.name,
            email: user.email,
            password: '',
            role: user.role || 'author',
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (!editingUser) return;
        editForm.put(`/admin/users/${editingUser.id}`, {
            onSuccess: () => {
                setEditingUser(null);
                editForm.reset();
            },
        });
    };

    const handleDelete = (user) => {
        if (confirm(`Are you sure you want to delete user "${user.name}"? This action cannot be undone.`)) {
            router.delete(`/admin/users/${user.id}`);
        }
    };

    const getRoleBadge = (role) => {
        switch (role) {
            case 'admin':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                        <ShieldAlert className="w-3 h-3" />
                        <span>Administrator</span>
                    </span>
                );
            case 'editor':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Editor</span>
                    </span>
                );
            case 'author':
            default:
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-500/15 text-purple-400 border border-purple-500/30">
                        <PenTool className="w-3 h-3" />
                        <span>Author</span>
                    </span>
                );
        }
    };

    return (
        <AdminLayout title="Users & Roles">
            <Head title="Users & Role Management - Rakitan CMS" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
                            <Users className="w-7 h-7 text-indigo-400" />
                            <span>Users & Roles</span>
                        </h1>
                        <p className="text-xs text-slate-400 mt-1">
                            Manage team members and grant granular access across Administrator, Editor, and Author privileges.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowCreateModal(true)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/25 transition-all self-start sm:self-auto"
                    >
                        <UserPlus className="w-4 h-4" />
                        <span>Add New User</span>
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                    <form onSubmit={handleSearch} className="flex-1 w-full relative">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name or email address..."
                            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    </form>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Filter Role:</span>
                        <select
                            value={roleFilter}
                            onChange={(e) => handleFilterRoleChange(e.target.value)}
                            className="w-full sm:w-auto px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                        >
                            <option value="">All Roles</option>
                            <option value="admin">Administrator</option>
                            <option value="editor">Editor</option>
                            <option value="author">Author</option>
                        </select>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-slate-300">
                            <thead className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                <tr>
                                    <th className="px-6 py-3.5">User</th>
                                    <th className="px-6 py-3.5">Email</th>
                                    <th className="px-6 py-3.5">Assigned Role</th>
                                    <th className="px-6 py-3.5">Registered</th>
                                    <th className="px-6 py-3.5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60">
                                {users.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                            No users matched your search criteria.
                                        </td>
                                    </tr>
                                ) : (
                                    users.data.map((user) => {
                                        const isSelf = user.id === currentUserId;
                                        return (
                                            <tr key={user.id} className="hover:bg-slate-800/40 transition-colors">
                                                <td className="px-6 py-4 font-semibold text-white flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <span>{user.name}</span>
                                                        {isSelf && (
                                                            <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-400">
                                                                You
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-slate-400 font-mono text-[11px]">
                                                    {user.email}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {getRoleBadge(user.role || 'author')}
                                                </td>
                                                <td className="px-6 py-4 text-slate-400">
                                                    {new Date(user.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 text-right space-x-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => startEdit(user)}
                                                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors"
                                                        title="Edit User"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    {!isSelf && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete(user)}
                                                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                                            title="Delete User"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {users.links && users.links.length > 3 && (
                        <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                            <span>Showing {users.from || 0} to {users.to || 0} of {users.total} users</span>
                            <div className="flex items-center gap-1">
                                {users.links.map((link, idx) => (
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

                {/* Create Modal */}
                {showCreateModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
                        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                                <div className="flex items-center gap-2 text-white font-bold text-base">
                                    <UserPlus className="w-5 h-5 text-indigo-400" />
                                    <span>Create New User</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleCreateSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            required
                                            value={createForm.data.name}
                                            onChange={(e) => createForm.setData('name', e.target.value)}
                                            placeholder="John Doe"
                                            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                                        />
                                        <UserIcon className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                                    </div>
                                    {createForm.errors.name && <p className="text-[11px] text-red-400 mt-1">{createForm.errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            required
                                            value={createForm.data.email}
                                            onChange={(e) => createForm.setData('email', e.target.value)}
                                            placeholder="john@example.com"
                                            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                                        />
                                        <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                                    </div>
                                    {createForm.errors.email && <p className="text-[11px] text-red-400 mt-1">{createForm.errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Initial Password</label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            required
                                            value={createForm.data.password}
                                            onChange={(e) => createForm.setData('password', e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                                        />
                                        <Key className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                                    </div>
                                    {createForm.errors.password && <p className="text-[11px] text-red-400 mt-1">{createForm.errors.password}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Role Privileges</label>
                                    <select
                                        value={createForm.data.role}
                                        onChange={(e) => createForm.setData('role', e.target.value)}
                                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                                    >
                                        <option value="admin">Administrator (Full Control)</option>
                                        <option value="editor">Editor (Pages, Posts, Categories, Menus)</option>
                                        <option value="author">Author (Only Their Own Posts)</option>
                                    </select>
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowCreateModal(false)}
                                        className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={createForm.processing}
                                        className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/25 transition-all disabled:opacity-50"
                                    >
                                        {createForm.processing ? 'Creating...' : 'Create User'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Edit Modal */}
                {editingUser && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
                        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                                <div className="flex items-center gap-2 text-white font-bold text-base">
                                    <Edit className="w-5 h-5 text-indigo-400" />
                                    <span>Edit User: {editingUser.name}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setEditingUser(null)}
                                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleEditSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={editForm.data.name}
                                        onChange={(e) => editForm.setData('name', e.target.value)}
                                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                                    />
                                    {editForm.errors.name && <p className="text-[11px] text-red-400 mt-1">{editForm.errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={editForm.data.email}
                                        onChange={(e) => editForm.setData('email', e.target.value)}
                                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                                    />
                                    {editForm.errors.email && <p className="text-[11px] text-red-400 mt-1">{editForm.errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Role</label>
                                    <select
                                        value={editForm.data.role}
                                        onChange={(e) => editForm.setData('role', e.target.value)}
                                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                                    >
                                        <option value="admin">Administrator (Full Control)</option>
                                        <option value="editor">Editor (Pages, Posts, Categories, Menus)</option>
                                        <option value="author">Author (Only Their Own Posts)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                                        New Password <span className="text-slate-500 font-normal">(leave blank to keep unchanged)</span>
                                    </label>
                                    <input
                                        type="password"
                                        value={editForm.data.password}
                                        onChange={(e) => editForm.setData('password', e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                                    />
                                    {editForm.errors.password && <p className="text-[11px] text-red-400 mt-1">{editForm.errors.password}</p>}
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setEditingUser(null)}
                                        className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={editForm.processing}
                                        className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/25 transition-all disabled:opacity-50"
                                    >
                                        {editForm.processing ? 'Saving...' : 'Save Changes'}
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
