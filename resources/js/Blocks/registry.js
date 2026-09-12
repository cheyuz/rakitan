import {
    Sparkles,
    FileText,
    Grid3X3,
    Megaphone,
    Image,
    SeparatorHorizontal,
} from 'lucide-react';

import { HeroComponent, HeroSettings } from './Definitions/HeroBlock';
import { RichTextComponent, RichTextSettings } from './Definitions/RichTextBlock';
import { FeaturesComponent, FeaturesSettings } from './Definitions/FeaturesBlock';
import { CtaComponent, CtaSettings } from './Definitions/CtaBlock';
import { GalleryComponent, GallerySettings } from './Definitions/GalleryBlock';
import { SpacerComponent, SpacerSettings } from './Definitions/SpacerBlock';

export const BLOCK_REGISTRY = {
    hero: {
        type: 'hero',
        label: 'Hero Section',
        category: 'Header',
        icon: Sparkles,
        description: 'Seksi pembuka dengan judul besar, subjudul, tombol CTA, dan latar belakang estetis.',
        defaultProps: {
            badgeText: '✨ CMS Visual Modular',
            title: 'Judul Hero Baru yang Memukau',
            subtitle: 'Tambahkan penjelasan yang meyakinkan pengunjung mengenai penawaran atau konten Anda.',
            primaryButtonText: 'Mulai Sekarang',
            primaryButtonUrl: '#',
            secondaryButtonText: 'Pelajari Lebih Lanjut',
            secondaryButtonUrl: '#',
            alignment: 'center',
            bgStyle: 'gradient',
            imageUrl: '',
            padding: 'lg',
        },
        Component: HeroComponent,
        SettingsComponent: HeroSettings,
    },
    features: {
        type: 'features',
        label: 'Grid Fitur',
        category: 'Konten',
        icon: Grid3X3,
        description: 'Daftar keunggulan dalam format kolom grid responsif dengan ikon dan lencana.',
        defaultProps: {
            badge: 'KEUNGGULAN',
            title: 'Fitur Unggulan Kami',
            subtitle: 'Berbagai kemampuan canggih yang dirancang untuk mendukung produktivitas Anda.',
            columns: 3,
            items: [
                {
                    icon: 'Layers',
                    title: 'Modular & Fleksibel',
                    description: 'Setiap blok tersusun rapi dan dapat disesuaikan tanpa batas.',
                    badge: 'Komponen',
                },
                {
                    icon: 'Zap',
                    title: 'Performa Cepat',
                    description: 'Pemuatan instan berkat integrasi Laravel 11 dan Inertia React.',
                    badge: 'Kilat',
                },
                {
                    icon: 'ShieldCheck',
                    title: 'Aman & Terpercaya',
                    description: 'Perlindungan XSS otomatis dan pengelolaan data terstruktur.',
                    badge: 'Aman',
                },
            ],
        },
        Component: FeaturesComponent,
        SettingsComponent: FeaturesSettings,
    },
    rich_text: {
        type: 'rich_text',
        label: 'Teks Kaya / Artikel',
        category: 'Konten',
        icon: FileText,
        description: 'Area paragraf tulisan, artikel blog, dan kutipan dengan sanitasi konten aman.',
        defaultProps: {
            title: 'Tentang Gagasan Kami',
            containerWidth: 'normal',
            alignment: 'left',
            dropCap: true,
            content: '<p>Tuliskan cerita inspiratif atau informasi lengkap Anda di sini. Komponen ini mendukung tipografi modern dengan format HTML aman.</p>',
        },
        Component: RichTextComponent,
        SettingsComponent: RichTextSettings,
    },
    gallery: {
        type: 'gallery',
        label: 'Galeri Gambar',
        category: 'Media',
        icon: Image,
        description: 'Showcase visual dalam grid interaktif dengan efek perbesaran saat disentuh.',
        defaultProps: {
            title: 'Koleksi Visual',
            subtitle: 'Eksplorasi dokumentasi dan karya terbaik kami',
            columns: 3,
            gap: 'md',
            images: [
                {
                    url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
                    caption: 'Visual Editor',
                    alt: 'Visual Editor',
                },
                {
                    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
                    caption: 'Dashboard Metrik',
                    alt: 'Dashboard',
                },
                {
                    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
                    caption: 'Kustomisasi Komponen',
                    alt: 'Code',
                },
            ],
        },
        Component: GalleryComponent,
        SettingsComponent: GallerySettings,
    },
    cta: {
        type: 'cta',
        label: 'Call to Action (CTA)',
        category: 'Konversi',
        icon: Megaphone,
        description: 'Bagian penutup persuasif untuk mengonversi pengunjung menjadi pengguna atau pelanggan.',
        defaultProps: {
            title: 'Siap Mengambil Langkah Berikutnya?',
            description: 'Hubungi tim kami atau mulai gunakan platform hari ini secara gratis.',
            primaryButtonText: 'Hubungi Kami',
            primaryButtonUrl: '#',
            secondaryButtonText: 'Jadwalkan Demo',
            secondaryButtonUrl: '#',
            variant: 'gradient',
        },
        Component: CtaComponent,
        SettingsComponent: CtaSettings,
    },
    spacer: {
        type: 'spacer',
        label: 'Spacer & Divider',
        category: 'Tata Letak',
        icon: SeparatorHorizontal,
        description: 'Pemberi jarak vertikal antar-seksi atau garis batas pemisah dekoratif.',
        defaultProps: {
            height: 'md',
            showDivider: true,
            dividerStyle: 'solid',
            dividerColor: '#6366f1',
        },
        Component: SpacerComponent,
        SettingsComponent: SpacerSettings,
    },
};

/**
 * Ambil definisi blok berdasarkan type string
 */
export function getBlockDefinition(type) {
    return BLOCK_REGISTRY[type] || null;
}

/**
 * Ambil seluruh daftar blok yang terdaftar
 */
export function getAllBlocks() {
    return Object.values(BLOCK_REGISTRY);
}

/**
 * Buat instance blok baru dengan ID unik dan default props
 */
export function createBlockInstance(type) {
    const def = getBlockDefinition(type);
    if (!def) {
        throw new Error(`Block type "${type}" tidak terdaftar dalam BLOCK_REGISTRY.`);
    }

    const uniqueId = `block-${type}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;

    return {
        id: uniqueId,
        type: def.type,
        props: JSON.parse(JSON.stringify(def.defaultProps)),
    };
}
