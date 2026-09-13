import { SlidersHorizontal } from 'lucide-react';
import {
    SliderBuilderComponent,
    SliderBuilderSettings,
} from './components/SliderBuilderBlock';

export const id = 'slider-builder';
export const name = 'Slider Builder Pro';

export const blocks = {
    slider_builder: {
        type: 'slider_builder',
        label: 'Slider & Carousel',
        category: 'Media',
        icon: SlidersHorizontal,
        description: 'Interactive responsive slider & carousel with multiple customizable templates, autoplay, transitions, and CMS integration.',
        pluginId: id,
        defaultProps: {
            source: 'saved',
            sliderId: 'hero-launchpad-showcase',
            template: 'hero_banner',
            bgStyle: 'none',
            padding: 'none',
            settings: {
                autoplay: true,
                interval: 5000,
                transition: 'slide',
                showArrows: true,
                showDots: true,
                height: 'tall',
                pauseOnHover: true,
            },
            slides: [
                {
                    id: 'slide-1',
                    badge: 'MODULAR ECOSYSTEM',
                    title: 'Assemble Next-Gen Experiences Like Puzzle Blocks',
                    subtitle: 'Unleash limitless visual creativity with zero plugin bloat, ultra-clean code generation, and blazing-fast response times.',
                    primaryButtonText: 'Start Building Free',
                    primaryButtonUrl: '#',
                    secondaryButtonText: 'Explore Features',
                    secondaryButtonUrl: '#',
                    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
                },
                {
                    id: 'slide-2',
                    badge: 'SPEED & SCALE',
                    title: 'Sub-45ms Edge Latency with Instant Navigation',
                    subtitle: 'Powered by Laravel 11 and Inertia.js React with intelligent asset streaming and server-side state hydration.',
                    primaryButtonText: 'Check Benchmarks',
                    primaryButtonUrl: '#',
                    secondaryButtonText: 'Documentation',
                    secondaryButtonUrl: '#',
                    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
                },
            ],
        },
        Component: SliderBuilderComponent,
        SettingsComponent: SliderBuilderSettings,
    },
};

export default {
    id,
    name,
    blocks,
};
