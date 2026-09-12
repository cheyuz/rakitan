<?php

namespace Database\Seeders;

use App\Models\Page;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pastikan akun admin tersedia
        $admin = User::firstOrCreate(
            ['email' => 'admin@rakitan.test'],
            [
                'name' => 'Rakitan Administrator',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // Seed Halaman Utama (Home)
        Page::updateOrCreate(
            ['slug' => 'home'],
            [
                'title' => 'Selamat Datang di Rakitan CMS',
                'meta_title' => 'Rakitan CMS - Visual Modular Page Builder Masa Depan',
                'meta_description' => 'CMS open-source modern dengan visual builder drag-and-drop berbasis puzzle komponen independen.',
                'status' => 'published',
                'user_id' => $admin->id,
                'blocks' => [
                    [
                        'id' => 'hero-intro',
                        'type' => 'hero',
                        'props' => [
                            'badgeText' => '✨ CMS Visual Modular Masa Depan',
                            'title' => 'Rancang Web Impian Seperti Menyusun Puzzle',
                            'subtitle' => 'Rakitan CMS memberikan kebebasan berkarya tanpa batas dengan arsitektur blok modular independen, performa kilat, dan fleksibilitas penuh bagi developer maupun kreator.',
                            'primaryButtonText' => 'Mulai Rakit Sekarang',
                            'primaryButtonUrl' => '/login',
                            'secondaryButtonText' => 'Tentang Rakitan',
                            'secondaryButtonUrl' => '/about',
                            'alignment' => 'center',
                            'bgStyle' => 'gradient',
                            'imageUrl' => '',
                        ],
                    ],
                    [
                        'id' => 'feat-grid-1',
                        'type' => 'features',
                        'props' => [
                            'badge' => 'KEUNGGULAN UTAMA',
                            'title' => 'Mengapa Memilih Rakitan?',
                            'subtitle' => 'Setiap blok dirancang secara presisi, menghasilkan kecepatan website maksimal dan pengelolaan konten yang menyenangkan.',
                            'columns' => 3,
                            'items' => [
                                [
                                    'icon' => 'Layers',
                                    'title' => 'Arsitektur Puzzle Core',
                                    'description' => 'Setiap blok terisolasi rapi dengan skema data JSON fleksibel, memudahkan ekstensi komponen kustom.',
                                    'badge' => 'Modular',
                                ],
                                [
                                    'icon' => 'Zap',
                                    'title' => 'Performa Kilat SPA',
                                    'description' => 'Ditenagai oleh Laravel 11 dan Inertia.js React untuk navigasi instan tanpa delay reload halaman.',
                                    'badge' => 'Cepat',
                                ],
                                [
                                    'icon' => 'Sliders',
                                    'title' => 'Visual Drag & Drop',
                                    'description' => 'Atur tata letak, gandakan seksi, dan atur style secara interaktif dengan live canvas preview.',
                                    'badge' => 'Intuitif',
                                ],
                                [
                                    'icon' => 'Palette',
                                    'title' => 'Desain Berkelas Modern',
                                    'description' => 'Palet warna Tailwind yang harmonis, dukungan dark mode bawaan, dan responsif di ponsel hingga desktop.',
                                    'badge' => 'Aestetik',
                                ],
                                [
                                    'icon' => 'ShieldCheck',
                                    'title' => 'Keamanan Ketat',
                                    'description' => 'Sanitasi XSS pada rich text, proteksi CSRF otomatis, serta pengujian berkala tanpa risiko data.',
                                    'badge' => 'Aman',
                                ],
                                [
                                    'icon' => 'Code2',
                                    'title' => 'Ramah Pengembang',
                                    'description' => 'Buat blok kustom Anda sendiri dalam hitungan menit cukup dengan membuat komponen React baru.',
                                    'badge' => 'Open Source',
                                ],
                            ],
                        ],
                    ],
                    [
                        'id' => 'rich-text-1',
                        'type' => 'rich_text',
                        'props' => [
                            'title' => 'Filosofi Desain Komponen Rakitan',
                            'containerWidth' => 'normal',
                            'alignment' => 'left',
                            'dropCap' => true,
                            'content' => 'Rakitan lahir dari visi untuk menghadirkan CMS yang tidak membebani server dengan puluhan plugin yang rentan konflik, namun tetap memberikan keleluasaan bagi pengguna untuk menyusun halaman web yang memukau. Dengan pendekatan puzzle-driven, setiap blok adalah mikrokosmos mandiri: memiliki state bawaan, validasi properti, serta kemampuan render instan baik di sisi server maupun klien.',
                        ],
                    ],
                    [
                        'id' => 'gallery-1',
                        'type' => 'gallery',
                        'props' => [
                            'title' => 'Eksplorasi Kreasi Visual',
                            'subtitle' => 'Koleksi layout dan media yang dapat dirakit sesuai identitas brand Anda',
                            'columns' => 3,
                            'gap' => 'md',
                            'images' => [
                                [
                                    'url' => 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
                                    'caption' => 'Penyusunan Konten Visual',
                                    'alt' => 'Visual Editor',
                                ],
                                [
                                    'url' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
                                    'caption' => 'Dashboard Analitik Lengkap',
                                    'alt' => 'Analytics',
                                ],
                                [
                                    'url' => 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
                                    'caption' => 'Kemudahan Integrasi Kode',
                                    'alt' => 'Code',
                                ],
                            ],
                        ],
                    ],
                    [
                        'id' => 'spacer-1',
                        'type' => 'spacer',
                        'props' => [
                            'height' => 'md',
                            'showDivider' => true,
                            'dividerStyle' => 'solid',
                            'dividerColor' => '#6366f1',
                        ],
                    ],
                    [
                        'id' => 'cta-1',
                        'type' => 'cta',
                        'props' => [
                            'title' => 'Siap Merakit Website Generasi Baru Anda?',
                            'description' => 'Mulai eksplorasi visual builder Rakitan sekarang. Mudah dikustomisasi dan dirawat.',
                            'primaryButtonText' => 'Buka Dashboard Admin',
                            'primaryButtonUrl' => '/admin/dashboard',
                            'secondaryButtonText' => 'Lihat Halaman About',
                            'secondaryButtonUrl' => '/about',
                            'variant' => 'gradient',
                        ],
                    ],
                ],
            ]
        );

        // Seed Halaman About
        Page::updateOrCreate(
            ['slug' => 'about'],
            [
                'title' => 'Tentang Rakitan CMS',
                'meta_title' => 'Tentang Rakitan - Filosofi & Misi Open Source',
                'meta_description' => 'Mengenal lebih dekat ekosistem Rakitan CMS dan tim di baliknya.',
                'status' => 'published',
                'user_id' => $admin->id,
                'blocks' => [
                    [
                        'id' => 'about-hero',
                        'type' => 'hero',
                        'props' => [
                            'badgeText' => 'TENTANG KAMI',
                            'title' => 'Membangun Web yang Bersih, Fleksibel, dan Cepat',
                            'subtitle' => 'Rakitan didedikasikan untuk komunitas pengembang dan pemilik situs yang menginginkan sistem manajemen konten yang elegan tanpa beban teknis berlebih.',
                            'primaryButtonText' => 'Kembali ke Beranda',
                            'primaryButtonUrl' => '/',
                            'secondaryButtonText' => 'Hubungi Kami',
                            'secondaryButtonUrl' => '#',
                            'alignment' => 'center',
                            'bgStyle' => 'dark',
                            'imageUrl' => '',
                        ],
                    ],
                    [
                        'id' => 'about-text',
                        'type' => 'rich_text',
                        'props' => [
                            'title' => 'Misi Kami',
                            'containerWidth' => 'narrow',
                            'alignment' => 'left',
                            'dropCap' => false,
                            'content' => 'Di Rakitan, kami percaya bahwa pembuatan konten web modern seharusnya tidak rumit. Pendekatan modular memisahkan logika konten dari styling dasar, memungkinkan pembaruan desain secara global tanpa merusak struktur data.',
                        ],
                    ],
                    [
                        'id' => 'about-cta',
                        'type' => 'cta',
                        'props' => [
                            'title' => 'Tertarik Berkontribusi pada Ekosistem Rakitan?',
                            'description' => 'Kode sumber terbuka dan terbuka untuk partisipasi komunitas global.',
                            'primaryButtonText' => 'Buka GitHub',
                            'primaryButtonUrl' => 'https://github.com',
                            'secondaryButtonText' => '',
                            'secondaryButtonUrl' => '',
                            'variant' => 'boxed',
                        ],
                    ],
                ],
            ]
        );

        // Seed Halaman Draf Contoh
        Page::updateOrCreate(
            ['slug' => 'draf-fitur-baru'],
            [
                'title' => 'Draf Rilis Fitur Rakitan v2',
                'meta_title' => 'Draf Fitur Baru - Hanya Internal',
                'meta_description' => 'Catatan rilis internal fitur visual builder terbaru.',
                'status' => 'draft',
                'user_id' => $admin->id,
                'blocks' => [
                    [
                        'id' => 'draft-hero',
                        'type' => 'hero',
                        'props' => [
                            'badgeText' => 'INTERNAL PREVIEW',
                            'title' => 'Inovasi Builder v2 yang Sedang Disiapkan',
                            'subtitle' => 'Halaman ini masih dalam tahap draf dan tidak ditampilkan kepada publik.',
                            'primaryButtonText' => 'Pratinjau',
                            'primaryButtonUrl' => '#',
                            'secondaryButtonText' => '',
                            'secondaryButtonUrl' => '',
                            'alignment' => 'left',
                            'bgStyle' => 'light',
                            'imageUrl' => '',
                        ],
                    ],
                ],
            ]
        );
    }
}
