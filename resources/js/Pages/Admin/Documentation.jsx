import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    BookMarked,
    Puzzle,
    Palette,
    Code2,
    Layers,
    FileCode,
    Check,
    Copy,
    ExternalLink,
    Sparkles,
    ShieldCheck,
    FolderTree,
    Terminal,
    Wand2,
    Sliders,
    Search,
} from 'lucide-react';

export default function Documentation({ system, installedPlugins, installedThemes, activeTheme }) {
    const [activeTab, setActiveTab] = useState('plugins'); // 'overview' | 'plugins' | 'themes' | 'blocks'
    const [copiedIndex, setCopiedIndex] = useState(null);

    const handleCopy = (code, id) => {
        navigator.clipboard.writeText(code);
        setCopiedIndex(id);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const navTabs = [
        { id: 'plugins', label: 'Plugin Development', icon: Puzzle, desc: 'Buat ekstensi, custom routes, dan blok baru' },
        { id: 'themes', label: 'Theme Development', icon: Palette, desc: 'Override komponen, style CSS, dan layout' },
        { id: 'blocks', label: 'Blocks & Micro-Components', icon: Layers, desc: 'Referensi API blok dan slot dinamis' },
        { id: 'overview', label: 'System & Architecture', icon: Code2, desc: 'Prinsip desain modular dan siklus data' },
    ];

    return (
        <AdminLayout title="Developer Documentation">
            <Head title="Developer Documentation - Rakitan CMS" />

            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header Banner */}
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-slate-900/90 to-purple-950/60 border border-indigo-500/20 shadow-2xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
                                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                                <span>Rakitan Developer Hub v{system.version}</span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                                Dokumentasi Pembuatan Plugin & Tema
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                                Panduan resmi arsitektur Rakitan CMS untuk developer: pelajari cara memperluas sistem dengan membuat plugin kustom, merancang tema visual, dan meng-override komponen bawaan.
                            </p>
                        </div>

                        <div className="flex flex-wrap sm:flex-col gap-2 text-xs text-slate-400 border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-6 flex-shrink-0">
                            <div><strong className="text-slate-200">PHP:</strong> {system.phpVersion}</div>
                            <div><strong className="text-slate-200">Laravel:</strong> {system.laravelVersion}</div>
                            <div><strong className="text-slate-200">Active Theme:</strong> <span className="text-indigo-400 font-mono">{activeTheme}</span></div>
                        </div>
                    </div>
                </div>

                {/* Main 2-Column Documentation Workspace */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                    {/* Sidebar Tabs */}
                    <div className="lg:col-span-1 space-y-2 sticky top-6">
                        {navTabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-start gap-3 select-none ${
                                        isActive
                                            ? 'bg-indigo-600/15 border-indigo-500/50 text-white shadow-lg shadow-indigo-500/10'
                                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                                    }`}
                                >
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                        isActive ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                                    }`}>
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                                            {tab.label}
                                        </div>
                                        <div className="text-[11px] text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                                            {tab.desc}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Content Section */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* TAB 1: PLUGIN DEVELOPMENT */}
                        {activeTab === 'plugins' && (
                            <div className="space-y-6">
                                <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                                            <Puzzle className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-black text-white">Panduan Pembuatan Plugin Rakitan</h2>
                                            <p className="text-xs text-slate-400">Arsitektur, struktur file, dan registrasi fitur baru</p>
                                        </div>
                                    </div>

                                    <p className="text-xs text-slate-300 leading-relaxed">
                                        Plugin di Rakitan CMS adalah paket mandiri yang berada di dalam folder <code className="px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono text-[11px]">plugins/&#123;plugin-id&#125;/</code>. Plugin dapat menambahkan backend routing, controller, custom page blocks, micro-components, dan menu khusus di admin.
                                    </p>

                                    <div className="space-y-3 pt-2">
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">1. Struktur Folder Plugin</h3>
                                        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 leading-relaxed">
                                            <div>plugins/</div>
                                            <div className="pl-4 text-purple-400">└── my-custom-plugin/</div>
                                            <div className="pl-8 text-emerald-400">├── plugin.json         <span className="text-slate-500"># Manifest metadata (wajib)</span></div>
                                            <div className="pl-8">├── routes.php          <span className="text-slate-500"># Custom Laravel web routes (opsional)</span></div>
                                            <div className="pl-8">├── Blocks/             <span className="text-slate-500"># Custom Puzzle Blocks React (opsional)</span></div>
                                            <div className="pl-12">└── MyCustomBlock.jsx</div>
                                            <div className="pl-8">└── Controllers/        <span className="text-slate-500"># PHP Controllers jika ada halaman admin</span></div>
                                        </div>
                                    </div>

                                    {/* plugin.json snippet */}
                                    <div className="space-y-2 pt-2">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                                2. File Manifest (plugin.json)
                                            </h3>
                                            <button
                                                type="button"
                                                onClick={() => handleCopy(snippetPluginJson, 'plugin-json')}
                                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                                            >
                                                {copiedIndex === 'plugin-json' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                                <span>{copiedIndex === 'plugin-json' ? 'Tersalin!' : 'Salin Kode'}</span>
                                            </button>
                                        </div>
                                        <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 overflow-x-auto text-[11px] text-indigo-300 font-mono leading-relaxed">
                                            {snippetPluginJson}
                                        </pre>
                                    </div>

                                    {/* routes.php snippet */}
                                    <div className="space-y-2 pt-2">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                                3. Routing Backend (routes.php)
                                            </h3>
                                            <button
                                                type="button"
                                                onClick={() => handleCopy(snippetPluginRoutes, 'plugin-routes')}
                                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                                            >
                                                {copiedIndex === 'plugin-routes' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                                <span>{copiedIndex === 'plugin-routes' ? 'Tersalin!' : 'Salin Kode'}</span>
                                            </button>
                                        </div>
                                        <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 overflow-x-auto text-[11px] text-amber-300 font-mono leading-relaxed">
                                            {snippetPluginRoutes}
                                        </pre>
                                    </div>

                                    {/* Custom Block Component */}
                                    <div className="space-y-2 pt-2">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                                4. Mendaftarkan Custom Block dalam Plugin
                                            </h3>
                                            <button
                                                type="button"
                                                onClick={() => handleCopy(snippetPluginBlock, 'plugin-block')}
                                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                                            >
                                                {copiedIndex === 'plugin-block' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                                <span>{copiedIndex === 'plugin-block' ? 'Tersalin!' : 'Salin Kode'}</span>
                                            </button>
                                        </div>
                                        <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 overflow-x-auto text-[11px] text-emerald-300 font-mono leading-relaxed">
                                            {snippetPluginBlock}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 2: THEME DEVELOPMENT */}
                        {activeTab === 'themes' && (
                            <div className="space-y-6">
                                <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                                            <Palette className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-black text-white">Panduan Pembuatan Tema Rakitan</h2>
                                            <p className="text-xs text-slate-400">Override blok bawaan, sub-komponen, CSS tema, dan tipografi</p>
                                        </div>
                                    </div>

                                    <p className="text-xs text-slate-300 leading-relaxed">
                                        Tema di Rakitan CMS memiliki kekuatan luar biasa seperti tema WordPress modern: sebuah tema tidak hanya mengganti warna CSS, namun dapat <strong>meng-override render komponen blok bawaan</strong> (Hero, Features, CTA, dll.) dan micro-components agar bentuk visual website berubah total sesuai estetika tema tersebut.
                                    </p>

                                    <div className="space-y-3 pt-2">
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">1. Struktur Direktori Tema</h3>
                                        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 leading-relaxed">
                                            <div>themes/</div>
                                            <div className="pl-4 text-indigo-400">└── my-clean-theme/</div>
                                            <div className="pl-8 text-emerald-400">├── theme.json          <span className="text-slate-500"># Manifest tema & metadata (wajib)</span></div>
                                            <div className="pl-8">├── style.css           <span className="text-slate-500"># CSS styling & Google Fonts import</span></div>
                                            <div className="pl-8">├── screenshot.png      <span className="text-slate-500"># Thumbnail preview (1200x800)</span></div>
                                            <div className="pl-8 text-amber-400">├── overrides/          <span className="text-slate-500"># Folder override komponen bawaan</span></div>
                                            <div className="pl-12">├── HeroBlock.jsx       <span className="text-slate-500"># Menimpa HeroBlock bawaan</span></div>
                                            <div className="pl-12">├── FeaturesBlock.jsx   <span className="text-slate-500"># Menimpa FeaturesBlock bawaan</span></div>
                                            <div className="pl-12">└── subcomponents/</div>
                                            <div className="pl-16">└── ButtonSub.jsx  <span className="text-slate-500"># Menimpa Sub-komponen Button</span></div>
                                        </div>
                                    </div>

                                    {/* theme.json snippet */}
                                    <div className="space-y-2 pt-2">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                                2. Manifest Tema (theme.json)
                                            </h3>
                                            <button
                                                type="button"
                                                onClick={() => handleCopy(snippetThemeJson, 'theme-json')}
                                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                                            >
                                                {copiedIndex === 'theme-json' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                                <span>{copiedIndex === 'theme-json' ? 'Tersalin!' : 'Salin Kode'}</span>
                                            </button>
                                        </div>
                                        <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 overflow-x-auto text-[11px] text-indigo-300 font-mono leading-relaxed">
                                            {snippetThemeJson}
                                        </pre>
                                    </div>

                                    {/* style.css snippet */}
                                    <div className="space-y-2 pt-2">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                                3. Styling Global & Fonts (style.css)
                                            </h3>
                                            <button
                                                type="button"
                                                onClick={() => handleCopy(snippetThemeCss, 'theme-css')}
                                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                                            >
                                                {copiedIndex === 'theme-css' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                                <span>{copiedIndex === 'theme-css' ? 'Tersalin!' : 'Salin Kode'}</span>
                                            </button>
                                        </div>
                                        <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 overflow-x-auto text-[11px] text-amber-300 font-mono leading-relaxed">
                                            {snippetThemeCss}
                                        </pre>
                                    </div>

                                    {/* Block Override Snippet */}
                                    <div className="space-y-2 pt-2">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                                4. Menimpa Blok Bawaan (overrides/HeroBlock.jsx)
                                            </h3>
                                            <button
                                                type="button"
                                                onClick={() => handleCopy(snippetThemeOverride, 'theme-override')}
                                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                                            >
                                                {copiedIndex === 'theme-override' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                                <span>{copiedIndex === 'theme-override' ? 'Tersalin!' : 'Salin Kode'}</span>
                                            </button>
                                        </div>
                                        <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 overflow-x-auto text-[11px] text-emerald-300 font-mono leading-relaxed">
                                            {snippetThemeOverride}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 3: BLOCKS & SUB-COMPONENTS API */}
                        {activeTab === 'blocks' && (
                            <div className="space-y-6">
                                <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                                            <Layers className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-black text-white">Referensi Block & Micro-Component API</h2>
                                            <p className="text-xs text-slate-400">Daftar blok bawaan, mikro komponen, dan struktur props JSON</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                                            <h4 className="text-xs font-bold text-indigo-400 flex items-center gap-2">
                                                <span>1. Blok Halaman Bawaan (Page Blocks)</span>
                                            </h4>
                                            <p className="text-xs text-slate-300">
                                                Tiap blok halaman di Rakitan memiliki tipe unik dan menyimpan props dalam format JSON di database:
                                            </p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-[11px]">
                                                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                                                    <strong className="text-white">hero:</strong> Hero banner dengan badge, title, subtitle, buttons, dan alignment.
                                                </div>
                                                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                                                    <strong className="text-white">features:</strong> Grid fitur 2/3/4 kolom dengan ikon Lucide dinamis.
                                                </div>
                                                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                                                    <strong className="text-white">rich_text:</strong> Artikel dengan sanitasi DOMPurify dan drop cap.
                                                </div>
                                                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                                                    <strong className="text-white">gallery:</strong> Galeri visual interaktif dengan modal perbesar.
                                                </div>
                                                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                                                    <strong className="text-white">cta:</strong> Banner ajakan aksi konversi tinggi dengan varian gradient/boxed.
                                                </div>
                                                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                                                    <strong className="text-white">latest_posts:</strong> Grid postingan blog otomatis dari database.
                                                </div>
                                                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                                                    <strong className="text-white">contact_form:</strong> Form pesan dinamis dengan penyimpanan ke inbox.
                                                </div>
                                                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                                                    <strong className="text-white">container:</strong> Blok kontainer bebas untuk menampung mikro komponen.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                                            <h4 className="text-xs font-bold text-purple-400 flex items-center gap-2">
                                                <span>2. Mikro Komponen (Sub-Components)</span>
                                            </h4>
                                            <p className="text-xs text-slate-300">
                                                Komponen berukuran atomik yang dapat disisipkan ke dalam <code className="text-indigo-300 font-mono text-[11px]">&lt;SubComponentSlot /&gt;</code> di dalam blok mana pun:
                                            </p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-[11px]">
                                                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                                                    <strong className="text-white">sub_heading:</strong> Judul dinamis (h1, h2, h3) dengan ukuran font dan warna.
                                                </div>
                                                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                                                    <strong className="text-white">sub_text:</strong> Paragraf teks deskripsi dengan alignment kustom.
                                                </div>
                                                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                                                    <strong className="text-white">sub_button:</strong> Tombol aksi dengan link internal/eksternal dan varian gaya.
                                                </div>
                                                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                                                    <strong className="text-white">sub_badge:</strong> Label penanda kecil dengan warna aksen.
                                                </div>
                                                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                                                    <strong className="text-white">sub_image:</strong> Gambar responsif dengan radius dan alt text.
                                                </div>
                                                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                                                    <strong className="text-white">sub_row:</strong> Kolom dinamis (2, 3, atau 4 kolom) yang memiliki nested slot!
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 4: ARCHITECTURE & SYSTEM */}
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                                            <Code2 className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-black text-white">Arsitektur & Prinsip Rakitan CMS</h2>
                                            <p className="text-xs text-slate-400">Pondasi teknis, siklus data, dan keamanan</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                                        <p>
                                            Rakitan CMS dibangun di atas filosofi <strong>Puzzle Component Architecture</strong>. Berbeda dari WordPress tradisional yang menyimpan HTML kotor penuh shortcode di database, Rakitan menyimpan data sebagai <strong>Normalized JSON Blocks Schema</strong> di kolom <code className="text-indigo-300 font-mono text-[11px]">blocks</code> pada tabel MySQL.
                                        </p>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                                            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                                                <div className="font-bold text-white flex items-center gap-2">
                                                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                                    <span>Keamanan Bawaan</span>
                                                </div>
                                                <p className="text-[11px] text-slate-400 leading-normal">
                                                    Sanitasi XSS via DOMPurify, validasi CSRF token di setiap request Inertia, dan pembatasan entitas eksternal pada import XML.
                                                </p>
                                            </div>

                                            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                                                <div className="font-bold text-white flex items-center gap-2">
                                                    <Sparkles className="w-4 h-4 text-indigo-400" />
                                                    <span>Inertia.js React SPA</span>
                                                </div>
                                                <p className="text-[11px] text-slate-400 leading-normal">
                                                    Navigasi instan tanpa refresh halaman penuh, dengan hydration ringan dan kinerja rendering kelas dunia.
                                                </p>
                                            </div>

                                            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                                                <div className="font-bold text-white flex items-center gap-2">
                                                    <Layers className="w-4 h-4 text-purple-400" />
                                                    <span>Bebas Ketergantungan</span>
                                                </div>
                                                <p className="text-[11px] text-slate-400 leading-normal">
                                                    Menghilangkan plugin bloat. Setiap blok adalah modul React mandiri yang memvalidasi props-nya sendiri.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

// Code Snippets for Copying
const snippetPluginJson = `{
  "id": "my-custom-plugin",
  "name": "My Custom Plugin",
  "version": "1.0.0",
  "author": "Your Name",
  "description": "Deskripsi fitur plugin Anda",
  "manage_url": "/admin/my-plugin",
  "is_builtin": false,
  "blocks": [
    {
      "type": "custom_banner",
      "label": "Custom Banner",
      "category": "Extended Suite",
      "icon": "Sparkles"
    }
  ]
}`;

const snippetPluginRoutes = `<?php

use Illuminate\\Support\\Facades\\Route;

// Rute ini otomatis dimuat oleh PluginManager saat plugin aktif
Route::middleware(['web', 'auth'])->prefix('admin')->group(function () {
    Route::get('/my-plugin', function () {
        return \\Inertia\\Inertia::render('Admin/MyPlugin/Index', [
            'title' => 'My Custom Plugin Page',
        ]);
    })->name('admin.my-plugin');
});
`;

const snippetPluginBlock = `import React from 'react';
import { Sparkles } from 'lucide-react';

export const CustomBannerComponent = ({ props = {} }) => {
    const { heading = 'Default Title', subtitle = 'Deskripsi banner' } = props;
    return (
        <section className="py-12 px-6 bg-slate-900 border border-slate-800 rounded-3xl text-center">
            <h2 className="text-2xl font-bold text-white mb-2">{heading}</h2>
            <p className="text-sm text-slate-400">{subtitle}</p>
        </section>
    );
};

export const CustomBannerSettings = ({ props, updateProps }) => {
    return (
        <div className="space-y-4 text-xs">
            <div>
                <label className="block font-semibold text-slate-300 mb-1">Heading</label>
                <input
                    type="text"
                    value={props.heading || ''}
                    onChange={(e) => updateProps({ heading: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
            </div>
        </div>
    );
};
`;

const snippetThemeJson = `{
  "id": "my-clean-theme",
  "name": "Rakitan Clean Aesthetic",
  "version": "1.0.0",
  "author": "Your Name",
  "description": "Tema terang bernuansa minimalis modern untuk korporat & startup",
  "is_builtin": false,
  "settings": {
    "accentColor": "#6366f1",
    "fontFamily": "Inter, sans-serif"
  }
}`;

const snippetThemeCss = `/* themes/my-clean-theme/style.css */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

body {
    font-family: 'Plus Jakarta Sans', sans-serif !important;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}
::-webkit-scrollbar-thumb {
    background: rgba(99, 102, 241, 0.4);
    border-radius: 9999px;
}
`;

const snippetThemeOverride = `// themes/my-clean-theme/overrides/HeroBlock.jsx
import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function ThemeHeroBlock({ props = {} }) {
    const { title = 'Modern Hero', subtitle = '', primaryButtonText = 'Mulai' } = props;

    return (
        <section className="py-24 px-6 bg-white text-slate-900 border-b border-slate-100">
            <div className="max-w-4xl mx-auto text-center space-y-6">
                <span className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold tracking-wide">
                    ✨ Clean Light Edition
                </span>
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
                    {title}
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    {subtitle}
                </p>
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-bold text-sm shadow-xl shadow-indigo-600/20">
                    <span>{primaryButtonText}</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </section>
    );
}
`;
