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
        // Ensure admin user exists
        $admin = User::firstOrCreate(
            ['email' => 'admin@rakitan.test'],
            [
                'name' => 'Rakitan Administrator',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // Seed Homepage (Home)
        Page::updateOrCreate(
            ['slug' => 'home'],
            [
                'title' => 'Welcome to Rakitan CMS',
                'meta_title' => 'Rakitan CMS - The Next-Gen Modular Visual Builder',
                'meta_description' => 'A modern open-source CMS built with Laravel 11, Inertia.js React, Tailwind CSS, and a puzzle-like drag-and-drop block builder.',
                'status' => 'published',
                'user_id' => $admin->id,
                'blocks' => [
                    [
                        'id' => 'hero-intro',
                        'type' => 'hero',
                        'props' => [
                            'badgeText' => '✨ Next-Gen Modular CMS',
                            'title' => 'Craft Your Dream Website Like Building a Puzzle',
                            'subtitle' => 'Rakitan CMS empowers developers and creators with independent modular blocks, lightning performance, and complete visual freedom.',
                            'primaryButtonText' => 'Start Building Now',
                            'primaryButtonUrl' => '/login',
                            'secondaryButtonText' => 'About Rakitan',
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
                            'badge' => 'CORE CAPABILITIES',
                            'title' => 'Why Choose Rakitan CMS?',
                            'subtitle' => 'Every block is engineered for surgical precision, resulting in maximum page speed and an enjoyable publishing experience.',
                            'columns' => 3,
                            'items' => [
                                [
                                    'icon' => 'Layers',
                                    'title' => 'Puzzle Core Architecture',
                                    'description' => 'Each block is isolated with clean JSON schemas, making custom component extensions straightforward.',
                                    'badge' => 'Modular',
                                ],
                                [
                                    'icon' => 'Zap',
                                    'title' => 'Blazing Fast SPA',
                                    'description' => 'Powered by Laravel 11 and Inertia.js React for instant navigation without page reload delay.',
                                    'badge' => 'Fast',
                                ],
                                [
                                    'icon' => 'Sliders',
                                    'title' => 'Visual Drag & Drop',
                                    'description' => 'Arrange layouts, duplicate sections, and style properties interactively with live canvas preview.',
                                    'badge' => 'Intuitive',
                                ],
                                [
                                    'icon' => 'Palette',
                                    'title' => 'Class-Leading Design',
                                    'description' => 'Harmonious Tailwind color palettes, native dark mode support, and full responsiveness across devices.',
                                    'badge' => 'Aesthetic',
                                ],
                                [
                                    'icon' => 'ShieldCheck',
                                    'title' => 'Enterprise Security',
                                    'description' => 'Built-in DOMPurify sanitization, automatic CSRF verification, and strict session controls.',
                                    'badge' => 'Secure',
                                ],
                                [
                                    'icon' => 'Code2',
                                    'title' => 'Developer Friendly',
                                    'description' => 'Create custom blocks in minutes using standard React components and Tailwind CSS.',
                                    'badge' => 'Open Source',
                                ],
                            ],
                        ],
                    ],
                    [
                        'id' => 'rich-text-1',
                        'type' => 'rich_text',
                        'props' => [
                            'title' => 'Our Component-Driven Philosophy',
                            'containerWidth' => 'normal',
                            'alignment' => 'left',
                            'dropCap' => true,
                            'content' => 'Rakitan was born from the realization that modern website publishing shouldn\'t require dozens of heavy, vulnerable plugins that degrade server response times. With our puzzle-driven approach, each block is an independent microcosm: it manages its own default state, validates properties, and renders instantly across client and server.',
                        ],
                    ],
                    [
                        'id' => 'gallery-1',
                        'type' => 'gallery',
                        'props' => [
                            'title' => 'Explore Visual Showcases',
                            'subtitle' => 'Curated layouts and media components assembled to match your brand identity',
                            'columns' => 3,
                            'gap' => 'md',
                            'images' => [
                                [
                                    'url' => 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
                                    'caption' => 'Visual Page Builder',
                                    'alt' => 'Visual Editor',
                                ],
                                [
                                    'url' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
                                    'caption' => 'Comprehensive Analytics',
                                    'alt' => 'Analytics',
                                ],
                                [
                                    'url' => 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
                                    'caption' => 'Seamless Code Integration',
                                    'alt' => 'Code',
                                ],
                            ],
                        ],
                    ],
                    [
                        'id' => 'latest-blog-home',
                        'type' => 'latest_posts',
                        'props' => [
                            'badge' => 'FROM OUR JOURNAL',
                            'title' => 'Fresh Perspectives & Guides',
                            'subtitle' => 'Explore the newest engineering articles, UI tutorials, and architectural insights.',
                            'limit' => 3,
                            'categoryId' => 'all',
                            'layoutStyle' => 'grid',
                            'showViewAll' => true,
                            'viewAllText' => 'View All Articles',
                            'viewAllUrl' => '/blog',
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
                            'title' => 'Ready to Assemble Your Next Website?',
                            'description' => 'Explore the Rakitan visual builder today. Fully customizable, maintainable, and open source.',
                            'primaryButtonText' => 'Open Admin Dashboard',
                            'primaryButtonUrl' => '/admin/dashboard',
                            'secondaryButtonText' => 'View About Page',
                            'secondaryButtonUrl' => '/about',
                            'variant' => 'gradient',
                        ],
                    ],
                ],
            ]
        );

        // Seed About Page
        Page::updateOrCreate(
            ['slug' => 'about'],
            [
                'title' => 'About Rakitan CMS',
                'meta_title' => 'About Rakitan - Mission & Philosophy',
                'meta_description' => 'Learn more about the Rakitan CMS open-source ecosystem.',
                'status' => 'published',
                'user_id' => $admin->id,
                'blocks' => [
                    [
                        'id' => 'about-hero',
                        'type' => 'hero',
                        'props' => [
                            'badgeText' => 'ABOUT US',
                            'title' => 'Building a Clean, Flexible, and Fast Web',
                            'subtitle' => 'Rakitan is dedicated to developers and site owners who desire an elegant content management system without unnecessary technical weight.',
                            'primaryButtonText' => 'Back to Home',
                            'primaryButtonUrl' => '/',
                            'secondaryButtonText' => 'GitHub Repository',
                            'secondaryButtonUrl' => 'https://github.com',
                            'alignment' => 'center',
                            'bgStyle' => 'dark',
                            'imageUrl' => '',
                        ],
                    ],
                    [
                        'id' => 'about-text',
                        'type' => 'rich_text',
                        'props' => [
                            'title' => 'Our Core Mission',
                            'containerWidth' => 'narrow',
                            'alignment' => 'left',
                            'dropCap' => false,
                            'content' => 'At Rakitan, we believe building modern websites should be as intuitive as assembling puzzle pieces. Our modular paradigm separates pure content logic from base aesthetics, enabling global design updates without corrupting underlying data schemas.',
                        ],
                    ],
                    [
                        'id' => 'about-cta',
                        'type' => 'cta',
                        'props' => [
                            'title' => 'Want to Contribute to Rakitan?',
                            'description' => 'The codebase is completely open source and welcomes community participation across the globe.',
                            'primaryButtonText' => 'View on GitHub',
                            'primaryButtonUrl' => 'https://github.com',
                            'secondaryButtonText' => '',
                            'secondaryButtonUrl' => '',
                            'variant' => 'boxed',
                        ],
                    ],
                ],
            ]
        );

        // Seed Sample Draft Page
        Page::updateOrCreate(
            ['slug' => 'upcoming-features-draft'],
            [
                'title' => 'Upcoming Rakitan v2 Roadmap',
                'meta_title' => 'Upcoming Features Draft - Internal Only',
                'meta_description' => 'Internal release notes for new visual builder components.',
                'status' => 'draft',
                'user_id' => $admin->id,
                'blocks' => [
                    [
                        'id' => 'draft-hero',
                        'type' => 'hero',
                        'props' => [
                            'badgeText' => 'INTERNAL PREVIEW',
                            'title' => 'Innovations in Progress',
                            'subtitle' => 'This page is in draft state and is not visible to public visitors.',
                            'primaryButtonText' => 'Preview',
                            'primaryButtonUrl' => '#',
                            'secondaryButtonText' => '',
                            'secondaryButtonUrl' => '',
                            'alignment' => 'left',
                            'bgStyle' => 'dark',
                            'imageUrl' => '',
                        ],
                    ],
                ],
            ]
        );
        // Seed Initial Categories
        $catTech = \App\Models\Category::firstOrCreate(
            ['slug' => 'technology'],
            ['name' => 'Technology & Architecture', 'description' => 'Deep dives into modern web engineering and CMS performance.']
        );

        $catDesign = \App\Models\Category::firstOrCreate(
            ['slug' => 'design-ux'],
            ['name' => 'Design & UX', 'description' => 'Crafting delightful, puzzle-inspired interfaces and accessible design systems.']
        );

        $catTutorials = \App\Models\Category::firstOrCreate(
            ['slug' => 'tutorials'],
            ['name' => 'Tutorials & Guides', 'description' => 'Step-by-step walkthroughs to get the most out of Rakitan CMS.']
        );

        // Seed Initial Posts
        \App\Models\Post::updateOrCreate(
            ['slug' => 'introducing-rakitan-modular-cms'],
            [
                'title' => 'Introducing Rakitan: A Puzzle-Like Modular Visual CMS',
                'category_id' => $catTech->id,
                'user_id' => $admin->id,
                'excerpt' => 'Discover how Rakitan reimagines content management by treating every website element as an independent, extensible puzzle block.',
                'content' => "## The Evolution of Content Management\n\nFor decades, web publishing has been split between rigid template monoliths and complex headless architectures. Rakitan bridges this divide by introducing a modular, block-first philosophy built upon the speed of Laravel 11 and Inertia React.\n\n### Why Puzzle Blocks Matter\n\nTraditional page builders clutter output HTML with nested container divs and bulky shortcodes. In Rakitan, each block is a first-class citizen with typed props and lightweight JSON storage.\n\n- **Zero Overhead**: Pure reactive components powered by Tailwind CSS.\n- **Visual Autonomy**: Reorder, duplicate, and configure with visual drag-and-drop feedback.\n- **Full Portability**: Export and import your layouts with standard XML.\n\nExplore our open-source repository and join our growing community!",
                'featured_image' => 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
                'layout' => 'default',
                'status' => 'published',
                'published_at' => now()->subDays(2),
            ]
        );

        \App\Models\Post::updateOrCreate(
            ['slug' => 'designing-clean-uis-with-tailwind-css'],
            [
                'title' => 'Designing Ultra-Clean Dark Mode Interfaces with Tailwind CSS',
                'category_id' => $catDesign->id,
                'user_id' => $admin->id,
                'excerpt' => 'A guide to curating refined slate color palettes, subtle glowing borders, and frictionless user experiences.',
                'content' => "## The Anatomy of Modern Dark Mode\n\nDesigning dark interfaces isn't just about turning `#ffffff` into `#000000`. It requires conscious contrast hierarchies, soft ambient glows, and intentional typography.\n\n### Contrast Ratios and Slate Palettes\n\nWe favor `slate-950` as the foundational background with `slate-900` card surfaces and `slate-800` subtle border strokes. This prevents visual fatigue while giving cards a crisp, tangible depth.",
                'featured_image' => 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
                'layout' => 'default',
                'status' => 'published',
                'published_at' => now()->subDay(),
            ]
        );

        \App\Models\Post::updateOrCreate(
            ['slug' => 'mastering-rakitan-visual-page-builder'],
            [
                'title' => 'Mastering the Rakitan Visual Page Builder',
                'category_id' => $catTutorials->id,
                'user_id' => $admin->id,
                'excerpt' => 'Learn how to construct high-converting landing pages in minutes using our 3-panel visual workspace.',
                'content' => "## Getting Started with the Visual Canvas\n\nThe Rakitan builder presents three streamlined zones: the Left Component Palette, the Center Interactive Preview Canvas, and the Right Block Inspector.\n\n### Step 1: Drag or Click to Append Blocks\nSelect any block from the palette—Hero, Feature Grid, Call To Action, or Rich Text—and append it instantly to your document.\n\n### Step 2: Fine-tune in Real-Time\nClick on any block in the canvas or outline tree to open its customized inspector. Changes are reflected live on your canvas!",
                'featured_image' => 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
                'layout' => 'default',
                'status' => 'published',
                'published_at' => now(),
            ]
        );

        // Seed Menus
        \App\Models\Menu::updateOrCreate(
            ['location' => 'header'],
            [
                'name' => 'Main Navigation',
                'items' => [
                    ['id' => 'm1', 'label' => 'Home', 'url' => '/', 'target' => '_self'],
                    ['id' => 'm2', 'label' => 'Blog', 'url' => '/blog', 'target' => '_self'],
                    ['id' => 'm3', 'label' => 'About', 'url' => '/about', 'target' => '_self'],
                ],
            ]
        );

        \App\Models\Menu::updateOrCreate(
            ['location' => 'footer'],
            [
                'name' => 'Footer Navigation',
                'items' => [
                    ['id' => 'f1', 'label' => 'Home', 'url' => '/', 'target' => '_self'],
                    ['id' => 'f2', 'label' => 'All Blog Posts', 'url' => '/blog', 'target' => '_self'],
                    ['id' => 'f3', 'label' => 'About Rakitan', 'url' => '/about', 'target' => '_self'],
                ],
            ]
        );
    }
}
