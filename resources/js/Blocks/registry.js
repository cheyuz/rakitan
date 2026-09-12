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
        description: 'Engaging opening banner with large headline, subtitle, dual action buttons, and customizable background.',
        defaultProps: {
            badgeText: '✨ Next-Gen Modular CMS',
            title: 'Craft Your Dream Website Like Building a Puzzle',
            subtitle: 'Rakitan CMS empowers developers and creators with independent modular blocks, lightning performance, and complete visual freedom.',
            primaryButtonText: 'Get Started Now',
            primaryButtonUrl: '#',
            secondaryButtonText: 'Explore Docs',
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
        label: 'Feature Grid',
        category: 'Content',
        icon: Grid3X3,
        description: 'Responsive multi-column showcase grid with dynamic Lucide icons, badges, and titles.',
        defaultProps: {
            badge: 'CORE CAPABILITIES',
            title: 'Everything You Need for Modern Web Experiences',
            subtitle: 'Built from the ground up for maximum flexibility, instant responsiveness, and zero plugin bloat.',
            columns: 3,
            items: [
                {
                    icon: 'Layers',
                    title: 'Puzzle-Driven Architecture',
                    description: 'Each block is an independent component with defined props, default state, and clean JSON payloads.',
                    badge: 'Core',
                },
                {
                    icon: 'Zap',
                    title: 'Blazing Fast Performance',
                    description: 'Powered by Laravel 11 and Inertia.js React for instantaneous client-side navigation without API overhead.',
                    badge: 'Fast',
                },
                {
                    icon: 'ShieldCheck',
                    title: 'Enterprise-Grade Security',
                    description: 'Built-in DOMPurify sanitization, automatic CSRF verification, and secure server-side session controls.',
                    badge: 'Secure',
                },
            ],
        },
        Component: FeaturesComponent,
        SettingsComponent: FeaturesSettings,
    },
    rich_text: {
        type: 'rich_text',
        label: 'Rich Text / Article',
        category: 'Content',
        icon: FileText,
        description: 'Clean typography for storytelling, long-form articles, and documentation with XSS sanitization.',
        defaultProps: {
            title: 'About Our Architecture',
            containerWidth: 'normal',
            alignment: 'left',
            dropCap: true,
            content: '<p>Rakitan was born from the vision to deliver a CMS that does not bloat servers with conflicting plugins, while still giving creators the freedom to assemble stunning web pages.</p>',
        },
        Component: RichTextComponent,
        SettingsComponent: RichTextSettings,
    },
    gallery: {
        type: 'gallery',
        label: 'Media Gallery',
        category: 'Media',
        icon: Image,
        description: 'Interactive visual grid with hover captions and smooth image scale transitions.',
        defaultProps: {
            title: 'Visual Showcase',
            subtitle: 'Explore our latest documentation and creative assets',
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
                    caption: 'Analytics Dashboard',
                    alt: 'Dashboard',
                },
                {
                    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
                    caption: 'Developer Experience',
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
        category: 'Conversion',
        icon: Megaphone,
        description: 'High-conversion closing banner with modern gradients and dual action triggers.',
        defaultProps: {
            title: 'Ready to Assemble the Next-Gen Web?',
            description: 'Join thousands of creators and build clean, lightning-fast pages with modular puzzle blocks.',
            primaryButtonText: 'Get Started Now',
            primaryButtonUrl: '#',
            secondaryButtonText: 'View Documentation',
            secondaryButtonUrl: '#',
            variant: 'gradient',
        },
        Component: CtaComponent,
        SettingsComponent: CtaSettings,
    },
    spacer: {
        type: 'spacer',
        label: 'Spacer & Divider',
        category: 'Layout',
        icon: SeparatorHorizontal,
        description: 'Vertical whitespace spacer and elegant customizable divider line.',
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
 * Get block definition by type identifier
 */
export function getBlockDefinition(type) {
    return BLOCK_REGISTRY[type] || null;
}

/**
 * Get all registered block definitions
 */
export function getAllBlocks() {
    return Object.values(BLOCK_REGISTRY);
}

/**
 * Create a new block instance with unique ID and default props
 */
export function createBlockInstance(type) {
    const def = getBlockDefinition(type);
    if (!def) {
        throw new Error(`Block type "${type}" is not registered in BLOCK_REGISTRY.`);
    }

    const uniqueId = `block-${type}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;

    return {
        id: uniqueId,
        type: def.type,
        props: JSON.parse(JSON.stringify(def.defaultProps)),
    };
}
