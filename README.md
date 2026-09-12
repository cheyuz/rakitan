# Rakitan CMS 🧩

> **Rakitan** adalah CMS modular open-source generasi masa depan yang dirancang sebagai alternatif kontemporer untuk WordPress dengan visual page builder interaktif berbasis potongan puzzle komponen independen.

---

## 🚀 Fitur Unggulan

- **Arsitektur Puzzle Core (Block Registry)**: Setiap blok konten adalah modul terisolasi dengan state awal bawaan, validasi properti, dan form inspector mandiri.
- **Visual Drag & Drop Builder**:
  - Ditenagai `@dnd-kit` untuk pengalaman pengurutan (reordering) yang presisi dan mulus.
  - 3 Panel Terintegrasi: **Palet Blok & Outline Halaman** (Kiri), **Live Canvas Responsif** (Tengah), dan **Inspector Properti & Pengaturan SEO** (Kanan).
  - Mode Pratinjau Responsif: Desktop (100%), Tablet (768px), dan Ponsel (375px).
  - Fitur Undo / Redo instan dan indikator status penyimpanan.
- **6 Blok Bawaan Awal**:
  1. 🌟 **Hero Section**: Headline besar, subjudul, tombol CTA primer & sekunder, pilihan background (gradient, dark, light, gambar), dan badge penanda.
  2. 📝 **Rich Text / Artikel**: Teks berformat kaya dan artikel dengan dukungan drop cap dan sanitasi XSS (`DOMPurify`).
  3. ⚡ **Grid Fitur**: Pilihan 2/3/4 kolom dengan ikon dinamis Lucide React, badge, dan deskripsi.
  4. 📢 **Call to Action (CTA)**: Banner konversi berdesain gradient, boxed card, atau minimalist.
  5. 🖼️ **Galeri Media**: Tampilan grid gambar adaptif dengan zoom hover effect dan takarir (caption).
  6. 📏 **Spacer & Divider**: Pengatur jarak vertikal adaptif dan pemisah garis estetis.
- **Dynamic Catch-All Public Renderer**: Rute fleksibel `/{slug?}` di Laravel 11 yang me-render tata letak halaman seketika dengan hidrasi Inertia.js React yang ringan dan cepat.
- **Admin Dashboard**:
  - Ringkasan statistik (Total Halaman, Terbit, Draf, Total Blok Terpasang).
  - Manajemen Halaman: Buat draf baru, duplikasi halaman beserta bloknya, filter status, dan pencarian cepat.
  - Autentikasi aman berbasis Laravel Breeze.

---

## 🛠️ Tech Stack

- **Backend**: Laravel 11.x, PHP 8.2+
- **Frontend**: Inertia.js, React 18/19, Tailwind CSS, Lucide React
- **Drag & Drop**: `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`
- **Database**: MySQL (kolom JSON untuk payload layout & konfigurasi blok)
- **Sanitasi**: DOMPurify

---

## ⚙️ Panduan Instalasi & Menjalankan Aplikasi

### 1. Prasyarat Sistem
- PHP >= 8.2 (dengan ekstensi `pdo_mysql`, `mbstring`, `openssl`, `tokenizer`, `xml`)
- Composer >= 2.0
- Node.js >= 18 & npm
- Server MySQL / MariaDB

### 2. Kloning & Pengaturan Lingkungan
```bash
# Masuk ke direktori proyek
cd /var/www/rakitan

# Salin file konfigurasi environment
cp .env.example .env

# Generate Application Key
php artisan key:generate
```

### 3. Konfigurasi Database
Sesuaikan berkas `.env` dengan kredensial database Anda:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=db_rakitan
DB_USERNAME=root
DB_PASSWORD=password
```

### 4. Migrasi & Pengisian Data Awal (Seeder)
```bash
# Jalankan migrasi database
php artisan migrate

# Isi data demo awal (halaman Home, About, dan akun Admin)
php artisan db:seed
```

> **Catatan Keamanan**: Proyek ini tidak memerlukan dan tidak memperbolehkan `migrate:fresh` atau `truncate` saat pengujian demi menjaga integritas data Anda.

### 5. Menjalankan Server Pengembangan

Jalankan server backend Laravel:
```bash
php artisan serve --port=8000
```

Buka terminal terpisah dan jalankan server Vite:
```bash
npm run dev
```

Kunjungi browser pada:
- **Halaman Publik**: `http://localhost:8000/`
- **Dashboard Admin**: `http://localhost:8000/admin/dashboard`
- **Login Admin**: `http://localhost:8000/login`

### 🔑 Kredensial Demo Admin
- **Email**: `admin@rakitan.test`
- **Password**: `password`

---

## 🧩 Panduan Kontribusi: Membuat Blok Kustom Baru

Menambahkan blok baru pada Rakitan sangat mudah. Cukup ikuti 3 langkah berikut:

### Langkah 1: Buat Komponen Blok Baru
Buat file baru di `resources/js/Blocks/Definitions/MyCustomBlock.jsx`:

```jsx
import React from 'react';

// 1. Komponen Render Visual (Ditampilkan di canvas & halaman publik)
export const MyCustomComponent = ({ props = {} }) => {
    const { title = 'Judul Kustom', description = 'Deskripsi blok kustom saya.' } = props;

    return (
        <div className="py-12 px-6 bg-slate-900 text-center text-white">
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-slate-400">{description}</p>
        </div>
    );
};

// 2. Komponen Inspector Settings (Ditampilkan di panel kanan builder)
export const MyCustomSettings = ({ props, updateProps }) => {
    return (
        <div className="space-y-3 text-xs">
            <div>
                <label className="block font-medium text-slate-300 mb-1">Judul</label>
                <input
                    type="text"
                    value={props.title || ''}
                    onChange={(e) => updateProps({ title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white"
                />
            </div>
            <div>
                <label className="block font-medium text-slate-300 mb-1">Deskripsi</label>
                <textarea
                    value={props.description || ''}
                    onChange={(e) => updateProps({ description: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white"
                />
            </div>
        </div>
    );
};
```

### Langkah 2: Daftarkan pada `registry.js`
Buka `resources/js/Blocks/registry.js` dan tambahkan entri blok Anda:

```javascript
import { Star } from 'lucide-react';
import { MyCustomComponent, MyCustomSettings } from './Definitions/MyCustomBlock';

export const BLOCK_REGISTRY = {
    // ... blok bawaan lainnya ...
    my_custom_block: {
        type: 'my_custom_block',
        label: 'Blok Kustom Saya',
        category: 'Konten',
        icon: Star,
        description: 'Blok contoh kustom dengan judul dan deskripsi.',
        defaultProps: {
            title: 'Judul Baru',
            description: 'Penjelasan awal untuk blok ini.',
        },
        Component: MyCustomComponent,
        SettingsComponent: MyCustomSettings,
    },
};
```

### Langkah 3: Selesai!
Buka kembali Visual Builder di `http://localhost:8000/admin/pages/{id}/builder`. Blok baru Anda akan langsung muncul di **Palet Puzzle** sebelah kiri dan dapat langsung di-drag ke canvas serta disesuaikan di inspector!

---

## 🧪 Menjalankan Pengujian Otomatis

Pengujian berjalan dengan aman tanpa menyentuh struktur tabel database:
```bash
./vendor/bin/phpunit tests/Feature/RakitanCmsTest.php
```

---

## 📄 Lisensi

Rakitan CMS dirilis di bawah lisensi open-source [MIT License](LICENSE).
