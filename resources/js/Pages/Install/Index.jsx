import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import {
    CheckCircle2,
    XCircle,
    Database,
    Globe,
    User,
    ArrowRight,
    Server,
    Sparkles,
    ShieldCheck,
    Check,
} from 'lucide-react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function InstallIndex({
    requirements,
    allRequirementsPassed,
    currentStep = 1,
    dbConfig = {},
}) {
    const { errors, flash } = usePage().props;
    const [step, setStep] = useState(currentStep);

    // Step 2: Database Form State
    const [dbForm, setDbForm] = useState({
        host: dbConfig.host || '127.0.0.1',
        port: dbConfig.port || '3306',
        database: dbConfig.database || 'db_rakitan',
        username: dbConfig.username || 'root',
        password: dbConfig.password || '',
        auto_create_db: true,
    });
    const [isConnectingDb, setIsConnectingDb] = useState(false);

    // Step 3: Site & Admin Form State
    const [siteForm, setSiteForm] = useState({
        site_title: 'My Rakitan Site',
        site_tagline: 'Next-Generation Modular Visual CMS',
        admin_name: 'Administrator',
        admin_email: 'admin@rakitan.test',
        admin_password: 'password',
        seed_demo_pages: true,
    });
    const [isInstalling, setIsInstalling] = useState(false);

    // Step 1 -> Step 2
    const handleProceedToDb = () => {
        setStep(2);
    };

    // Submit Database
    const handleDbSubmit = (e) => {
        e.preventDefault();
        setIsConnectingDb(true);

        router.post('/install/database', dbForm, {
            preserveScroll: true,
            onSuccess: () => {
                setIsConnectingDb(false);
                setStep(3);
            },
            onError: () => {
                setIsConnectingDb(false);
            },
        });
    };

    // Submit Site Setup
    const handleSiteSubmit = (e) => {
        e.preventDefault();
        setIsInstalling(true);

        router.post('/install/site', siteForm, {
            preserveScroll: true,
            onSuccess: () => {
                setIsInstalling(false);
                setStep(4);
            },
            onError: () => {
                setIsInstalling(false);
            },
        });
    };

    const stepsList = [
        { num: 1, label: 'Requirements' },
        { num: 2, label: 'Database' },
        { num: 3, label: 'Site Setup' },
        { num: 4, label: 'Complete' },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 selection:bg-indigo-500 selection:text-white antialiased">
            <Head title="Rakitan CMS Setup Wizard" />

            <div className="w-full max-w-2xl">
                {/* Header Logo */}
                <div className="text-center mb-8">
                    <ApplicationLogo className="w-16 h-16 rounded-2xl mx-auto shadow-2xl shadow-indigo-600/30 mb-3" />
                    <h1 className="text-2xl font-black tracking-tight text-white">
                        Rakitan<span className="text-indigo-400">.</span>
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">
                        WordPress-Style Quick Installation Wizard
                    </p>
                </div>

                {/* Stepper Progress Bar */}
                <div className="flex items-center justify-between mb-8 px-4">
                    {stepsList.map((s, idx) => (
                        <React.Fragment key={s.num}>
                            <div className="flex flex-col items-center">
                                <div
                                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all shadow-md ${
                                        step === s.num
                                            ? 'bg-indigo-600 text-white ring-4 ring-indigo-500/20 shadow-indigo-600/30'
                                            : step > s.num
                                            ? 'bg-emerald-600 text-white'
                                            : 'bg-slate-900 border border-slate-800 text-slate-500'
                                    }`}
                                >
                                    {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                                </div>
                                <span
                                    className={`text-[11px] font-semibold mt-1.5 ${
                                        step >= s.num ? 'text-slate-200' : 'text-slate-500'
                                    }`}
                                >
                                    {s.label}
                                </span>
                            </div>
                            {idx < stepsList.length - 1 && (
                                <div
                                    className={`flex-1 h-0.5 mx-3 mb-5 transition-colors ${
                                        step > s.num ? 'bg-emerald-600' : 'bg-slate-800'
                                    }`}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Card Container */}
                <div className="rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
                    {/* Flash & Error Notices */}
                    {errors.database && (
                        <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-3">
                            <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-bold">Database Error</p>
                                <p className="mt-0.5 leading-relaxed">{errors.database}</p>
                            </div>
                        </div>
                    )}
                    {flash?.success && (
                        <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-3">
                            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                            <span>{flash.success}</span>
                        </div>
                    )}

                    {/* STEP 1: WELCOME & REQUIREMENTS */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-lg font-bold text-white tracking-tight">
                                    Welcome to Rakitan CMS
                                </h2>
                                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                                    Before we get started, we need to verify that your server environment meets the basic requirements for running Rakitan CMS.
                                </p>
                            </div>

                            <div className="space-y-2.5">
                                {Object.entries(requirements).map(([key, item]) => (
                                    <div
                                        key={key}
                                        className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs"
                                    >
                                        <span className="font-semibold text-slate-200">
                                            {item.name}
                                            {item.current && (
                                                <span className="text-[10px] text-slate-400 font-mono ml-2">
                                                    (v{item.current})
                                                </span>
                                            )}
                                        </span>
                                        {item.passed ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px]">
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                                <span>Passed</span>
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold bg-red-500/10 text-red-400 border border-red-500/20 text-[11px]">
                                                <XCircle className="w-3.5 h-3.5" />
                                                <span>Missing</span>
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                                <span className="text-xs text-slate-400">
                                    {allRequirementsPassed
                                        ? 'Everything looks great! Ready to proceed.'
                                        : 'Please resolve missing requirements before proceeding.'}
                                </span>
                                <button
                                    type="button"
                                    disabled={!allRequirementsPassed}
                                    onClick={handleProceedToDb}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white shadow-lg shadow-indigo-600/25 transition-all"
                                >
                                    <span>Let's Go!</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: DATABASE CONFIGURATION */}
                    {step === 2 && (
                        <form onSubmit={handleDbSubmit} className="space-y-6">
                            <div>
                                <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
                                    <Database className="w-3.5 h-3.5" />
                                    <span>Step 2</span>
                                </div>
                                <h2 className="text-lg font-bold text-white tracking-tight">
                                    Database Connection (MySQL)
                                </h2>
                                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                                    Enter your database connection details below. Rakitan will test the connection, optionally create the database, and run initial schema migrations.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div className="sm:col-span-2">
                                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                            Database Host <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={dbForm.host}
                                            onChange={(e) => setDbForm({ ...dbForm, host: e.target.value })}
                                            placeholder="127.0.0.1 or localhost"
                                            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700/80 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                            Port <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={dbForm.port}
                                            onChange={(e) => setDbForm({ ...dbForm, port: e.target.value })}
                                            placeholder="3306"
                                            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700/80 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                        Database Name <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={dbForm.database}
                                        onChange={(e) => setDbForm({ ...dbForm, database: e.target.value })}
                                        placeholder="db_rakitan"
                                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700/80 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-mono"
                                    />
                                    <label className="flex items-center gap-2 mt-2 cursor-pointer text-xs text-slate-300">
                                        <input
                                            type="checkbox"
                                            checked={dbForm.auto_create_db}
                                            onChange={(e) => setDbForm({ ...dbForm, auto_create_db: e.target.checked })}
                                            className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-700 bg-slate-950"
                                        />
                                        <span>Automatically create database if it does not exist</span>
                                    </label>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                            Username <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={dbForm.username}
                                            onChange={(e) => setDbForm({ ...dbForm, username: e.target.value })}
                                            placeholder="root"
                                            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700/80 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            value={dbForm.password}
                                            onChange={(e) => setDbForm({ ...dbForm, password: e.target.value })}
                                            placeholder="••••••••"
                                            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700/80 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={isConnectingDb}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white shadow-lg shadow-indigo-600/25 transition-all"
                                >
                                    <span>{isConnectingDb ? 'Testing Connection & Migrating...' : 'Connect & Initialize'}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    )}

                    {/* STEP 3: SITE IDENTITY & ADMIN ACCOUNT */}
                    {step === 3 && (
                        <form onSubmit={handleSiteSubmit} className="space-y-6">
                            <div>
                                <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
                                    <Globe className="w-3.5 h-3.5" />
                                    <span>Step 3</span>
                                </div>
                                <h2 className="text-lg font-bold text-white tracking-tight">
                                    Site & Administrator Setup
                                </h2>
                                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                                    Configure your site title and create the initial super-admin account to manage Rakitan CMS.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                            Site Title <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={siteForm.site_title}
                                            onChange={(e) => setSiteForm({ ...siteForm, site_title: e.target.value })}
                                            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700/80 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                            Site Tagline
                                        </label>
                                        <input
                                            type="text"
                                            value={siteForm.site_tagline}
                                            onChange={(e) => setSiteForm({ ...siteForm, site_tagline: e.target.value })}
                                            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700/80 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-slate-800 space-y-3">
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                                        <User className="w-3.5 h-3.5 text-indigo-400" />
                                        <span>Administrator Account</span>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                            Admin Display Name <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={siteForm.admin_name}
                                            onChange={(e) => setSiteForm({ ...siteForm, admin_name: e.target.value })}
                                            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700/80 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                                Admin Email <span className="text-red-400">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={siteForm.admin_email}
                                                onChange={(e) => setSiteForm({ ...siteForm, admin_email: e.target.value })}
                                                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700/80 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                                Password (min 8 characters) <span className="text-red-400">*</span>
                                            </label>
                                            <input
                                                type="password"
                                                required
                                                minLength={8}
                                                value={siteForm.admin_password}
                                                onChange={(e) => setSiteForm({ ...siteForm, admin_password: e.target.value })}
                                                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700/80 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                            />
                                        </div>
                                    </div>

                                    <label className="flex items-center gap-2 pt-2 cursor-pointer text-xs text-slate-300">
                                        <input
                                            type="checkbox"
                                            checked={siteForm.seed_demo_pages}
                                            onChange={(e) => setSiteForm({ ...siteForm, seed_demo_pages: e.target.checked })}
                                            className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-700 bg-slate-950"
                                        />
                                        <span>Create default demo pages (Homepage & About page)</span>
                                    </label>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={isInstalling}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white shadow-lg shadow-indigo-600/25 transition-all"
                                >
                                    <span>{isInstalling ? 'Installing Rakitan...' : 'Install Rakitan CMS'}</span>
                                    <Sparkles className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    )}

                    {/* STEP 4: SUCCESS & READY TO LOGIN */}
                    {step === 4 && (
                        <div className="text-center space-y-6 py-4">
                            <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>

                            <div>
                                <h2 className="text-2xl font-black text-white tracking-tight">
                                    Success! Rakitan CMS has been installed.
                                </h2>
                                <p className="text-xs text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
                                    Thank you for choosing Rakitan CMS. Your database and administrator credentials are ready.
                                </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 max-w-sm mx-auto text-left text-xs space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Admin Email:</span>
                                    <span className="font-mono font-bold text-white">{siteForm.admin_email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Password:</span>
                                    <span className="text-slate-400">Your chosen password</span>
                                </div>
                            </div>

                            <div>
                                <a
                                    href="/login"
                                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-xs text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 transition-all active:scale-95"
                                >
                                    <span>Log In to Dashboard</span>
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
