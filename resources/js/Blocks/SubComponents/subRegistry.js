import {
    MousePointerClick,
    Tag,
    Type,
    Image as ImageIcon,
    Smile,
    AlertCircle,
    Minus,
    Star,
    Layers,
    MoveVertical,
    Sparkles,
    ArrowRight,
    CheckCircle2,
    Zap,
    ShieldCheck,
    Heart,
    Flame,
    Download,
    Plus,
    ExternalLink,
    Columns3,
} from 'lucide-react';

export const SUB_COMPONENTS_REGISTRY = {
    sub_button: {
        type: 'sub_button',
        label: 'Tombol Kustom',
        icon: MousePointerClick,
        description: 'Tombol interaktif dengan varian gaya, link, dan ikon.',
        defaultProps: {
            text: 'Klik Di Sini',
            url: '#',
            variant: 'primary', // 'primary' | 'secondary' | 'gradient' | 'outline' | 'ghost'
            size: 'md', // 'sm' | 'md' | 'lg'
            icon: 'ArrowRight', // 'None' | 'ArrowRight' | 'Sparkles' | 'ExternalLink' | 'Download'
            targetBlank: false,
        },
    },
    sub_badge: {
        type: 'sub_badge',
        label: 'Badge / Pill Tag',
        icon: Tag,
        description: 'Label pill ringkas untuk highlight status, versi, atau penawaran.',
        defaultProps: {
            text: '✨ Fitur Unggulan',
            color: 'indigo', // 'indigo' | 'emerald' | 'amber' | 'rose' | 'purple' | 'blue' | 'slate'
            icon: 'Sparkles', // 'Sparkles' | 'Zap' | 'ShieldCheck' | 'Flame' | 'None'
            pill: true,
        },
    },
    sub_text: {
        type: 'sub_text',
        label: 'Teks / Tipografi',
        icon: Type,
        description: 'Blok teks fleksibel untuk subjudul, kutipan, atau paragraf penjelasan.',
        defaultProps: {
            text: 'Tambahkan paragraf penjelasan ringkas atau kutipan penting di sini.',
            variant: 'body', // 'h2' | 'h3' | 'h4' | 'lead' | 'body' | 'small'
            align: 'left', // 'left' | 'center' | 'right'
            color: 'default', // 'default' | 'muted' | 'gradient' | 'indigo'
        },
    },
    sub_image: {
        type: 'sub_image',
        label: 'Gambar / Logo',
        icon: ImageIcon,
        description: 'Gambar ilustrasi, logo mitra, atau avatar dengan opsi framing.',
        defaultProps: {
            imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
            alt: 'Gambar ilustrasi',
            width: 'md', // 'sm' | 'md' | 'lg' | 'full'
            rounded: 'xl', // 'none' | 'md' | 'xl' | 'full'
            shadow: true,
            caption: '',
        },
    },
    sub_icon: {
        type: 'sub_icon',
        label: 'Kotak Ikon & Poin',
        icon: Smile,
        description: 'Ikon visual dengan judul dan keterangan singkat.',
        defaultProps: {
            icon: 'Zap', // 'Zap' | 'Sparkles' | 'ShieldCheck' | 'Heart' | 'Flame'
            title: 'Kecepatan Maksimal',
            description: 'Dioptimalkan untuk performa tinggi tanpa lag.',
            style: 'soft', // 'soft' | 'solid' | 'outline'
        },
    },
    sub_alert: {
        type: 'sub_alert',
        label: 'Kotak Catatan / Alert',
        icon: AlertCircle,
        description: 'Kotak informasi penting, pengumuman, atau catatan tips.',
        defaultProps: {
            type: 'info', // 'info' | 'success' | 'warning' | 'tip'
            title: 'Pemberitahuan Penting',
            content: 'Gunakan fitur ini untuk menyampaikan informasi penting kepada pengunjung Anda.',
        },
    },
    sub_rating: {
        type: 'sub_rating',
        label: 'Rating & Ulasan',
        icon: Star,
        description: 'Widget skor bintang dan kepuasan pelanggan sosial proof.',
        defaultProps: {
            score: '4.9',
            stars: 5,
            count: '1,250+ Ulasan',
            label: 'Dipercaya oleh kreator',
        },
    },
    sub_divider: {
        type: 'sub_divider',
        label: 'Garis Pemisah',
        icon: Minus,
        description: 'Garis pembatas visual antar konten dengan varian gaya.',
        defaultProps: {
            style: 'solid', // 'solid' | 'dashed' | 'gradient' | 'text'
            text: '',
            spacing: 'md', // 'sm' | 'md' | 'lg'
        },
    },
    sub_card: {
        type: 'sub_card',
        label: 'Kartu Mikro',
        icon: Layers,
        description: 'Kontainer kartu kecil untuk menonjolkan satu informasi khusus.',
        defaultProps: {
            title: 'Kartu Sorotan',
            description: 'Berikan deskripsi detail di dalam kartu elegan berbingkai halus ini.',
            bgStyle: 'slate', // 'slate' | 'dark' | 'glass'
            border: true,
            padding: 'md',
        },
    },
    sub_spacer: {
        type: 'sub_spacer',
        label: 'Jarak / Spacer',
        icon: MoveVertical,
        description: 'Ruang kosong vertikal untuk mengatur pernapasan tata letak.',
        defaultProps: {
            size: 'md', // 'sm' | 'md' | 'lg' | 'xl'
        },
    },
    sub_row: {
        type: 'sub_row',
        label: 'Baris Kolom (Row)',
        icon: Columns3,
        description: 'Baris fleksibel 1-4 kolom yang dapat dimasukkan komponen mikro ke setiap kolomnya.',
        defaultProps: {
            columns: 2,
            gap: 'md',
            columnSlots: [
                { id: 'col-0', subComponents: [] },
                { id: 'col-1', subComponents: [] },
            ],
        },
    },
};

export const createSubComponentInstance = (type) => {
    const def = SUB_COMPONENTS_REGISTRY[type];
    if (!def) return null;

    return {
        id: `sub-${type}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
        type,
        props: JSON.parse(JSON.stringify(def.defaultProps)),
    };
};

export const getSubComponentDefinition = (type) => {
    return SUB_COMPONENTS_REGISTRY[type] || null;
};

export const getAllSubComponents = () => {
    return Object.values(SUB_COMPONENTS_REGISTRY);
};
