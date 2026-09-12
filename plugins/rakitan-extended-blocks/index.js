import {
    BarChart3,
    Milestone,
    Users,
    Scale,
    Flame,
} from 'lucide-react';

import {
    StatsCounterComponent,
    StatsCounterSettings,
} from './blocks/StatsCounterBlock';

import {
    TimelineComponent,
    TimelineSettings,
} from './blocks/TimelineBlock';

import {
    TeamGridComponent,
    TeamGridSettings,
} from './blocks/TeamGridBlock';

import {
    ComparisonTableComponent,
    ComparisonTableSettings,
} from './blocks/ComparisonTableBlock';

import {
    CountdownBannerComponent,
    CountdownBannerSettings,
} from './blocks/CountdownBannerBlock';

export const id = 'rakitan-extended-blocks';
export const name = 'Rakitan Extended Blocks Pro';

export const blocks = {
    stats_counter: {
        type: 'stats_counter',
        label: 'Stats Counter Grid',
        category: 'Extended Suite',
        icon: BarChart3,
        description: 'Highlight real-time metrics, milestones, and achievements in customizable stat cards or minimal counters.',
        pluginId: id,
        defaultProps: {
            badge: 'PROVEN TRACK RECORD',
            title: 'Trusted by High-Performing Teams Globally',
            subtitle: 'Key benchmarks and metrics demonstrating our platform performance, scale, and customer satisfaction.',
            columns: 4,
            layoutStyle: 'card',
            bgStyle: 'glass',
            padding: 'lg',
            items: [
                {
                    value: '99.99%',
                    label: 'Uptime SLA Guarantee',
                    description: 'Enterprise reliability with distributed failover',
                    icon: 'ShieldCheck',
                },
                {
                    value: '250K+',
                    label: 'Active Web Builders',
                    description: 'Empowering creators and agencies across 120 countries',
                    icon: 'Users',
                },
                {
                    value: '< 45ms',
                    label: 'Ultra-Low TTFB',
                    description: 'Optimized server-side hydration & edge caching layer',
                    icon: 'Zap',
                },
                {
                    value: '4.95/5',
                    label: 'Client Satisfaction',
                    description: 'Verified reviews on Trustpilot and G2 Crowd',
                    icon: 'Award',
                },
            ],
        },
        Component: StatsCounterComponent,
        SettingsComponent: StatsCounterSettings,
    },
    timeline: {
        type: 'timeline',
        label: 'Roadmap & Timeline',
        category: 'Extended Suite',
        icon: Milestone,
        description: 'Showcase chronological milestones, product roadmaps, or structured step-by-step workflow guides.',
        pluginId: id,
        defaultProps: {
            badge: 'JOURNEY & WORKFLOW',
            title: 'How It Works: From Concept to Production',
            subtitle: 'Follow our structured 4-step workflow to assemble modern digital experiences with speed and confidence.',
            orientation: 'vertical',
            bgStyle: 'glass',
            padding: 'lg',
            steps: [
                {
                    step: '01',
                    title: 'Choose Architecture & Theme',
                    description: 'Select from pre-engineered starter palettes or start from a blank modular canvas tailored to your project requirements.',
                    tag: 'Step 1',
                    status: 'completed',
                },
                {
                    step: '02',
                    title: 'Assemble Puzzle Blocks',
                    description: 'Drag and drop independent blocks, customize spacing, tweak typography, and live-edit visual content directly on the canvas.',
                    tag: 'Step 2',
                    status: 'completed',
                },
                {
                    step: '03',
                    title: 'Integrate Dynamic Capabilities',
                    description: 'Plug in interactive lead capture forms, configure automated SEO metadata, and preview instantly on mobile and desktop.',
                    tag: 'Step 3',
                    status: 'in_progress',
                },
                {
                    step: '04',
                    title: '1-Click Zero-Downtime Launch',
                    description: 'Deploy lightning-fast production bundles with global edge caching, automated security headers, and instant asset optimization.',
                    tag: 'Step 4',
                    status: 'upcoming',
                },
            ],
        },
        Component: TimelineComponent,
        SettingsComponent: TimelineSettings,
    },
    team_grid: {
        type: 'team_grid',
        label: 'Team Members Grid',
        category: 'Extended Suite',
        icon: Users,
        description: 'Introduce your founders, core engineering leads, and multidisciplinary contributors with style.',
        pluginId: id,
        defaultProps: {
            badge: 'OUR TEAM',
            title: 'Meet the Minds Powering Rakitan',
            subtitle: 'A passionate multidisciplinary collective of systems engineers, UI/UX designers, and open-source contributors.',
            columns: 3,
            bgStyle: 'glass',
            padding: 'lg',
            members: [
                {
                    name: 'Alexander Wright',
                    role: 'Chief Systems Architect',
                    bio: '12+ years pioneering modular web engines, headless CMS architectures, and reactive rendering trees.',
                    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
                    twitter: 'https://twitter.com',
                    linkedin: 'https://linkedin.com',
                    github: 'https://github.com',
                },
                {
                    name: 'Elena Rostova',
                    role: 'Head of Product & UX',
                    bio: 'Advocate of atomic UI design principles and accessible, distraction-free visual authoring experiences.',
                    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
                    twitter: 'https://twitter.com',
                    linkedin: 'https://linkedin.com',
                    github: 'https://github.com',
                },
                {
                    name: 'Marcus Vance',
                    role: 'Core Performance Engineer',
                    bio: 'Specialist in V8 optimization, edge-layer state caching, and lightning-fast client hydration pipelines.',
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
                    twitter: 'https://twitter.com',
                    linkedin: 'https://linkedin.com',
                    github: 'https://github.com',
                },
            ],
        },
        Component: TeamGridComponent,
        SettingsComponent: TeamGridSettings,
    },
    comparison_table: {
        type: 'comparison_table',
        label: 'Comparison Matrix',
        category: 'Extended Suite',
        icon: Scale,
        description: 'Compare pricing tiers and plan capabilities side-by-side with clear checkmarks and recommended badges.',
        pluginId: id,
        defaultProps: {
            badge: 'FEATURE BREAKDOWN',
            title: 'Compare Plans & Capabilities',
            subtitle: 'Evaluate our modular plans side-by-side to choose the best foundation for your team.',
            plans: ['Starter', 'Professional', 'Enterprise'],
            highlightPlan: 'Professional',
            bgStyle: 'glass',
            padding: 'lg',
            features: [
                { name: 'Unlimited Modular Canvas Pages', starter: true, pro: true, enterprise: true },
                { name: 'Live Canvas Inline Editing', starter: true, pro: true, enterprise: true },
                { name: 'Dynamic Sub-Components Suite', starter: true, pro: true, enterprise: true },
                { name: 'Extended Block Suite Plugin', starter: false, pro: true, enterprise: true },
                { name: 'Custom Domain & Multi-Tenant', starter: false, pro: true, enterprise: true },
                { name: 'Role-Based Access Control (RBAC)', starter: false, pro: false, enterprise: true },
                { name: 'Dedicated 24/7 SLA & Custom Code Review', starter: false, pro: false, enterprise: true },
            ],
        },
        Component: ComparisonTableComponent,
        SettingsComponent: ComparisonTableSettings,
    },
    countdown_banner: {
        type: 'countdown_banner',
        label: 'Countdown Urgency Banner',
        category: 'Extended Suite',
        icon: Flame,
        description: 'Drive urgency with live real-time countdown clocks, one-click voucher copy, and prominent call to actions.',
        pluginId: id,
        defaultProps: {
            badge: '🔥 LIMITED TIME SPECIAL PROMO',
            title: 'Unlock 40% Off Pro Lifetime Access',
            subtitle: 'Supercharge your web engineering stack with full access to all extended block suites, starter kits, and priority updates. Offer expires when the timer hits zero!',
            targetDate: '2026-12-31T23:59:59',
            promoCode: 'RAKITAN40',
            discountTag: '40% OFF',
            buttonText: 'Claim Special Offer',
            buttonUrl: '#pricing',
            secondaryText: 'View Feature Breakdown',
            secondaryUrl: '#features',
            bgStyle: 'gradient',
            padding: 'lg',
        },
        Component: CountdownBannerComponent,
        SettingsComponent: CountdownBannerSettings,
    },
};

export default {
    id,
    name,
    blocks,
};
