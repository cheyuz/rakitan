import {
    Sparkles,
    FileText,
    Grid3X3,
    Megaphone,
    Image,
    SeparatorHorizontal,
    BookOpen,
    CreditCard,
    HelpCircle,
    MessageSquareQuote,
    Mail,
    LayoutGrid,
} from 'lucide-react';

import { HeroComponent, HeroSettings } from './Definitions/HeroBlock';
import { RichTextComponent, RichTextSettings } from './Definitions/RichTextBlock';
import { FeaturesComponent, FeaturesSettings } from './Definitions/FeaturesBlock';
import { CtaComponent, CtaSettings } from './Definitions/CtaBlock';
import { GalleryComponent, GallerySettings } from './Definitions/GalleryBlock';
import { SpacerComponent, SpacerSettings } from './Definitions/SpacerBlock';
import { LatestPostsComponent, LatestPostsSettings } from './Definitions/LatestPostsBlock';
import { PricingComponent, PricingSettings } from './Definitions/PricingBlock';
import { FaqComponent, FaqSettings } from './Definitions/FaqBlock';
import { TestimonialsComponent, TestimonialsSettings } from './Definitions/TestimonialsBlock';
import { ContactFormComponent, ContactFormSettings } from './Definitions/ContactFormBlock';
import { ContainerComponent, ContainerSettings } from './Definitions/ContainerBlock';

export {
    SUB_COMPONENTS_REGISTRY,
    createSubComponentInstance,
    getSubComponentDefinition,
    getAllSubComponents,
} from './SubComponents/subRegistry';

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
    latest_posts: {
        type: 'latest_posts',
        label: 'Latest Blog Posts',
        category: 'Dynamic Content',
        icon: BookOpen,
        description: 'Dynamic showcase of latest published articles, featuring filterable category feeds, and grid or list styles.',
        defaultProps: {
            badge: 'LATEST JOURNAL',
            title: 'Fresh Articles & Updates',
            subtitle: 'Stay up-to-date with tutorials, architecture insights, and engineering updates from Rakitan CMS.',
            limit: 3,
            categoryId: 'all',
            layoutStyle: 'grid',
            showViewAll: true,
            viewAllText: 'View All Articles',
            viewAllUrl: '/blog',
        },
        Component: LatestPostsComponent,
        SettingsComponent: LatestPostsSettings,
    },
    pricing: {
        type: 'pricing',
        label: 'Pricing Table',
        category: 'Marketing',
        icon: CreditCard,
        description: 'Multi-tiered pricing table with monthly/annual billing toggle, highlighted popular tier, and feature checklist.',
        defaultProps: {
            badge: 'TRANSPARENT PRICING',
            title: 'Simple, Predictable Plans for Everyone',
            subtitle: 'Choose the tier that fits your stage. No hidden fees or surprise upgrades.',
            annualDiscountBadge: 'Save 20%',
            plans: [
                {
                    name: 'Starter',
                    priceMonthly: '$19',
                    priceAnnual: '$15',
                    period: '/month',
                    description: 'Perfect for indie hackers, bloggers, and personal projects.',
                    features: [
                        'Up to 5 Rakitan Websites',
                        'All Core Puzzle Blocks',
                        'Standard Community Support',
                        '10GB Media Storage',
                    ],
                    isPopular: false,
                    buttonText: 'Get Started',
                    buttonUrl: '#',
                },
                {
                    name: 'Professional',
                    priceMonthly: '$49',
                    priceAnnual: '$39',
                    period: '/month',
                    description: 'Ideal for growing businesses, digital creators, and teams.',
                    features: [
                        'Unlimited Websites',
                        'All Puzzle Blocks & Addons',
                        'Custom Themes & Plugins',
                        'Priority Support',
                        '100GB Fast Cloud Storage',
                    ],
                    isPopular: true,
                    buttonText: 'Start 14-Day Free Trial',
                    buttonUrl: '#',
                },
                {
                    name: 'Enterprise',
                    priceMonthly: '$129',
                    priceAnnual: '$99',
                    period: '/month',
                    description: 'For high-scale enterprises requiring custom SLAs and dedicated setups.',
                    features: [
                        'Dedicated Infrastructure',
                        'Custom Block & Plugin SLA',
                        '24/7 Dedicated Account Rep',
                        'Unlimited Media Storage',
                        'White-label Branding',
                    ],
                    isPopular: false,
                    buttonText: 'Contact Sales',
                    buttonUrl: '#',
                },
            ],
        },
        Component: PricingComponent,
        SettingsComponent: PricingSettings,
    },
    faq: {
        type: 'faq',
        label: 'FAQ / Accordion',
        category: 'Content',
        icon: HelpCircle,
        description: 'Collapsible accordion questions and answers for clean documentation and customer support.',
        defaultProps: {
            badge: 'FAQ',
            title: 'Frequently Asked Questions',
            subtitle: 'Everything you need to know about Rakitan modular architecture and workflow.',
            items: [
                {
                    question: 'What is Rakitan CMS and how does it compare to WordPress?',
                    answer: 'Rakitan CMS is a next-generation modular CMS built with Laravel 11 and Inertia.js React. Unlike WordPress which suffers from plugin bloat and heavy PHP template rendering, Rakitan uses a lightweight JSON puzzle block system, lightning-fast client transitions, and clean modular themes.',
                },
                {
                    question: 'Can developers build custom puzzle blocks?',
                    answer: 'Yes! Developers can create new blocks simply by defining a React component and an optional settings panel, and registering them via the Block Registry or third-party modular plugins in the /plugins/ directory.',
                },
                {
                    question: 'How do themes work in Rakitan?',
                    answer: 'Themes reside in the /themes/ directory with an intuitive theme.json manifest, screenshot, and style.css. Administrators can upload themes as .zip files, switch themes in 1-click, or customize stylesheets directly.',
                },
                {
                    question: 'Is Rakitan CMS completely open source?',
                    answer: 'Yes, Rakitan CMS is 100% open source under the MIT license. We welcome contributions, custom blocks, and community plugins from web developers worldwide.',
                },
            ],
        },
        Component: FaqComponent,
        SettingsComponent: FaqSettings,
    },
    testimonials: {
        type: 'testimonials',
        label: 'Testimonials',
        category: 'Marketing',
        icon: MessageSquareQuote,
        description: 'Customer reviews showcase with 5-star ratings, quotes, avatar images, and author credentials.',
        defaultProps: {
            badge: 'TESTIMONIALS',
            title: 'Loved by Developers & Agencies Worldwide',
            subtitle: 'Here is what modern web engineers and content teams are saying about Rakitan.',
            columns: 3,
            items: [
                {
                    quote: 'Rakitan gave our agency the visual speed of a page builder without any of the sluggish performance or plugin hell of WordPress. It is truly next-gen.',
                    author: 'Sarah Jenkins',
                    role: 'Head of Engineering at CloudCraft',
                    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
                    rating: 5,
                },
                {
                    quote: 'Building custom puzzle blocks is a breeze. It took us less than 20 minutes to ship a custom pricing calculator block for our client.',
                    author: 'David Chen',
                    role: 'Full-Stack Developer',
                    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
                    rating: 5,
                },
                {
                    quote: 'The modular theme system and media library feel so clean and intuitive. The UI design is stunning right out of the box.',
                    author: 'Elena Rostova',
                    role: 'UI/UX Lead at StudioPixel',
                    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                    rating: 5,
                },
            ],
        },
        Component: TestimonialsComponent,
        SettingsComponent: TestimonialsSettings,
    },
    contact_form: {
        type: 'contact_form',
        label: 'Contact Form',
        category: 'Forms',
        icon: Mail,
        description: 'Interactive contact form with live AJAX submission connected directly to the Admin Inbox.',
        defaultProps: {
            badge: 'GET IN TOUCH',
            title: 'Have a Project or Question? Let’s Talk.',
            subtitle: 'Send us a message and our team will get back to you within 24 hours.',
            formName: 'contact',
            buttonText: 'Send Message',
            successMessage: 'Thank you! Your message has been sent successfully. We will be in touch soon.',
        },
        Component: ContactFormComponent,
        SettingsComponent: ContactFormSettings,
    },
    container: {
        type: 'container',
        label: 'Section & Sub-Components',
        category: 'Layout',
        icon: LayoutGrid,
        description: 'Flexible multi-column section container to assemble dynamic micro-components freely.',
        defaultProps: {
            badgeText: '✨ DYNAMIC COMPONENTS',
            title: 'Assemble Sub-Components Freely',
            subtitle: 'Insert custom buttons, badges, ratings, callouts, and micro cards directly into this container.',
            columns: 2,
            layoutType: 'grid',
            alignment: 'center',
            bgStyle: 'glass',
            padding: 'md',
            subComponents: [
                {
                    id: 'sub-badge-demo',
                    type: 'sub_badge',
                    props: { text: '✨ Flexible Features', color: 'indigo', icon: 'Sparkles', pill: true },
                },
                {
                    id: 'sub-button-demo',
                    type: 'sub_button',
                    props: { text: 'Explore Sub-Components', url: '#', variant: 'primary', size: 'md', icon: 'ArrowRight' },
                },
                {
                    id: 'sub-rating-demo',
                    type: 'sub_rating',
                    props: { score: '4.9', stars: 5, count: '1,200+ reviews', label: 'Trusted by creators' },
                },
                {
                    id: 'sub-alert-demo',
                    type: 'sub_alert',
                    props: { type: 'tip', title: 'Layout Tip', content: 'You can live edit text directly in this preview or drag & drop to reorder sub-components.' },
                },
            ],
        },
        Component: ContainerComponent,
        SettingsComponent: ContainerSettings,
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
