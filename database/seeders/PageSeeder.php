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
    }
}
