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
        label: 'Custom Button',
        icon: MousePointerClick,
        description: 'Interactive button with style variants, link destination, and icon.',
        defaultProps: {
            text: 'Click Here',
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
        description: 'Compact pill label to highlight status, version, or special offers.',
        defaultProps: {
            text: '✨ Featured',
            color: 'indigo', // 'indigo' | 'emerald' | 'amber' | 'rose' | 'purple' | 'blue' | 'slate'
            icon: 'Sparkles', // 'Sparkles' | 'Zap' | 'ShieldCheck' | 'Flame' | 'None'
            pill: true,
        },
    },
    sub_text: {
        type: 'sub_text',
        label: 'Text / Typography',
        icon: Type,
        description: 'Flexible text block for subtitles, quotes, or descriptive paragraphs.',
        defaultProps: {
            text: 'Add a concise explanatory paragraph or important quote here.',
            variant: 'body', // 'h2' | 'h3' | 'h4' | 'lead' | 'body' | 'small'
            align: 'left', // 'left' | 'center' | 'right'
            color: 'default', // 'default' | 'muted' | 'gradient' | 'indigo'
        },
    },
    sub_image: {
        type: 'sub_image',
        label: 'Image / Logo',
        icon: ImageIcon,
        description: 'Illustration image, partner logo, or avatar with framing options.',
        defaultProps: {
            imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
            alt: 'Illustration image',
            width: 'md', // 'sm' | 'md' | 'lg' | 'full'
            rounded: 'xl', // 'none' | 'md' | 'xl' | 'full'
            shadow: true,
            caption: '',
        },
    },
    sub_icon: {
        type: 'sub_icon',
        label: 'Icon & Feature Box',
        icon: Smile,
        description: 'Visual icon with title and short caption.',
        defaultProps: {
            icon: 'Zap', // 'Zap' | 'Sparkles' | 'ShieldCheck' | 'Heart' | 'Flame'
            title: 'Maximum Speed',
            description: 'Optimized for high performance without lag.',
            style: 'soft', // 'soft' | 'solid' | 'outline'
        },
    },
    sub_alert: {
        type: 'sub_alert',
        label: 'Callout / Alert Box',
        icon: AlertCircle,
        description: 'Highlighted info box, announcement, or tip callout.',
        defaultProps: {
            type: 'info', // 'info' | 'success' | 'warning' | 'tip'
            title: 'Important Notice',
            content: 'Use this feature to communicate important announcements to your visitors.',
        },
    },
    sub_rating: {
        type: 'sub_rating',
        label: 'Rating & Social Proof',
        icon: Star,
        description: 'Star rating score and customer satisfaction proof widget.',
        defaultProps: {
            score: '4.9',
            stars: 5,
            count: '1,250+ Reviews',
            label: 'Trusted by creators',
        },
    },
    sub_divider: {
        type: 'sub_divider',
        label: 'Divider Line',
        icon: Minus,
        description: 'Visual separation line between sections with style variants.',
        defaultProps: {
            style: 'solid', // 'solid' | 'dashed' | 'gradient' | 'text'
            text: '',
            spacing: 'md', // 'sm' | 'md' | 'lg'
        },
    },
    sub_card: {
        type: 'sub_card',
        label: 'Micro Card',
        icon: Layers,
        description: 'Card container to highlight specific information.',
        defaultProps: {
            title: 'Featured Card',
            description: 'Provide detailed information inside this sleek framed card container.',
            bgStyle: 'slate', // 'slate' | 'dark' | 'glass'
            border: true,
            padding: 'md',
        },
    },
    sub_spacer: {
        type: 'sub_spacer',
        label: 'Vertical Spacer',
        icon: MoveVertical,
        description: 'Vertical whitespace block to adjust layout breathing room.',
        defaultProps: {
            size: 'md', // 'sm' | 'md' | 'lg' | 'xl'
        },
    },
    sub_row: {
        type: 'sub_row',
        label: 'Columns Row',
        icon: Columns3,
        description: 'Flexible 1-4 column row container to nest micro-components inside each column.',
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
