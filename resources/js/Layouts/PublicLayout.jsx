import React from 'react';
import { Link } from '@inertiajs/react';
import { Puzzle, ArrowUpRight, LogIn, LayoutDashboard } from 'lucide-react';

export default function PublicLayout({ children, navigation = [], isAdmin = false }) {
    return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white font-sans antialiased">
            {/* Header Navigation */}
            <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-slate-950/80 border-b border-slate-800/70 transition-all">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    {/* Brand Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-all">
                            <Puzzle className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-black tracking-tight text-white">
                            Rakitan<span className="text-indigo-400">.</span>
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navigation.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.slug}
                                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        {isAdmin ? (
                            <Link
                                href="/admin/dashboard"
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all"
                            >
                                <LayoutDashboard className="w-3.5 h-3.5" />
                                <span>Dashboard Admin</span>
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white border border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-800 transition-all"
                            >
                                <LogIn className="w-3.5 h-3.5" />
                                <span>Masuk</span>
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-800/80 bg-slate-950/90 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                            <Puzzle className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold text-slate-200">
                            Rakitan Modular CMS
                        </span>
                        <span className="text-xs text-slate-500">
                            © {new Date().getFullYear()} Hak Cipta Dilindungi.
                        </span>
                    </div>

                    <div className="flex items-center gap-6 text-xs text-slate-400">
                        <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
                        <Link href="/about" className="hover:text-white transition-colors">Tentang</Link>
                        <a
                            href="https://laravel.com"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 hover:text-white transition-colors"
                        >
                            <span>Ditenagai Laravel 11 & Inertia</span>
                            <ArrowUpRight className="w-3 h-3" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
