<?php

namespace Plugins\SliderBuilder;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class SliderBuilderController extends Controller
{
    /**
     * Initial default preset sliders for new installations.
     */
    public static function getDefaultSliders(): array
    {
        return [
            [
                'id' => 'hero-launchpad-showcase',
                'title' => 'Hero Launchpad Showcase',
                'slug' => 'hero-launchpad',
                'description' => 'Dynamic full-width banner showcasing cutting-edge platform capabilities with modern CTAs.',
                'template' => 'hero_banner', // 'hero_banner' | 'split_card' | 'testimonial' | 'minimal_fade'
                'settings' => [
                    'autoplay' => true,
                    'interval' => 5000,
                    'transition' => 'slide', // 'slide' | 'fade' | 'zoom'
                    'showArrows' => true,
                    'showDots' => true,
                    'height' => 'tall', // 'compact' | 'medium' | 'tall' | 'fullscreen'
                    'pauseOnHover' => true,
                ],
                'slides' => [
                    [
                        'id' => 'slide-1',
                        'badge' => 'MODULAR ARCHITECTURE',
                        'title' => 'Assemble Next-Gen Experiences Like Puzzle Blocks',
                        'subtitle' => 'Unleash limitless visual creativity with zero plugin bloat, ultra-clean code generation, and blazing-fast response times.',
                        'primaryButtonText' => 'Start Building Free',
                        'primaryButtonUrl' => '#',
                        'secondaryButtonText' => 'Explore Features',
                        'secondaryButtonUrl' => '#',
                        'imageUrl' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
                    ],
                    [
                        'id' => 'slide-2',
                        'badge' => 'SPEED & SCALE',
                        'title' => 'Sub-45ms Edge Latency with Instant Navigation',
                        'subtitle' => 'Powered by Laravel 11 and Inertia.js React with intelligent asset streaming and server-side state hydration.',
                        'primaryButtonText' => 'Check Benchmarks',
                        'primaryButtonUrl' => '#',
                        'secondaryButtonText' => 'Documentation',
                        'secondaryButtonUrl' => '#',
                        'imageUrl' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
                    ],
                    [
                        'id' => 'slide-3',
                        'badge' => 'ENTERPRISE RELIABILITY',
                        'title' => 'Battle-Tested Security and High Availability',
                        'subtitle' => 'Built-in DOMPurify XSS sanitization, zero unsafe eval, and strict role-based access controls for peace of mind.',
                        'primaryButtonText' => 'Security Whitepaper',
                        'primaryButtonUrl' => '#',
                        'secondaryButtonText' => 'Get in Touch',
                        'secondaryButtonUrl' => '#',
                        'imageUrl' => 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80',
                    ],
                ],
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'id' => 'client-reviews-carousel',
                'title' => 'Client Reviews & Social Proof',
                'slug' => 'client-reviews',
                'description' => 'Social proof slider highlighting genuine reviews, ratings, and customer endorsements.',
                'template' => 'testimonial',
                'settings' => [
                    'autoplay' => true,
                    'interval' => 6000,
                    'transition' => 'fade',
                    'showArrows' => true,
                    'showDots' => true,
                    'height' => 'medium',
                    'pauseOnHover' => true,
                ],
                'slides' => [
                    [
                        'id' => 'review-1',
                        'quote' => 'Rakitan transformed our web production cycle. We deliver bespoke client portals in half the time without touching clunky page builders.',
                        'author' => 'Elena Rostova',
                        'role' => 'Head of Product, Apex Digital Studio',
                        'rating' => 5,
                        'avatar' => 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
                    ],
                    [
                        'id' => 'review-2',
                        'quote' => 'The modular puzzle concept is a developer dream. Clean React components, absolute zero plugin dependencies clash, and lightning load speeds.',
                        'author' => 'Alex Rivera',
                        'role' => 'Principal Architect, CloudNexus',
                        'rating' => 5,
                        'avatar' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
                    ],
                    [
                        'id' => 'review-3',
                        'quote' => 'Our editorial and marketing teams operate 10x faster. The visual builder combined with preset sliders delivers remarkable conversion rates.',
                        'author' => 'Marcus Chen',
                        'role' => 'VP Growth, Horizon Scale',
                        'rating' => 5,
                        'avatar' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
                    ],
                ],
                'updated_at' => date('Y-m-d H:i:s'),
            ],
        ];
    }

    /**
     * Get all registered sliders.
     */
    protected function getSliders(): array
    {
        $sliders = Setting::get('rakitan_sliders', null);

        if (!is_array($sliders) || empty($sliders)) {
            $sliders = self::getDefaultSliders();
            Setting::set('rakitan_sliders', $sliders);
        }

        return $sliders;
    }

    /**
     * Display listing of all sliders in CMS Admin.
     */
    public function index(): Response
    {
        $sliders = $this->getSliders();

        return Inertia::render('SlidersManager', [
            'sliders' => $sliders,
        ]);
    }

    /**
     * Store a newly created slider.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:120'],
            'slug' => ['nullable', 'string', 'max:120'],
            'description' => ['nullable', 'string', 'max:255'],
            'template' => ['required', 'string', 'in:hero_banner,split_card,testimonial,minimal_fade'],
            'settings' => ['nullable', 'array'],
            'slides' => ['required', 'array', 'min:1'],
        ]);

        $sliders = $this->getSliders();

        $slug = !empty($validated['slug'])
            ? Str::slug($validated['slug'])
            : Str::slug($validated['title']);

        $id = 'slider-' . Str::random(8);

        $newSlider = [
            'id' => $id,
            'title' => $validated['title'],
            'slug' => $slug,
            'description' => $validated['description'] ?? '',
            'template' => $validated['template'],
            'settings' => array_merge([
                'autoplay' => true,
                'interval' => 5000,
                'transition' => 'slide',
                'showArrows' => true,
                'showDots' => true,
                'height' => 'tall',
                'pauseOnHover' => true,
            ], $validated['settings'] ?? []),
            'slides' => $validated['slides'],
            'updated_at' => date('Y-m-d H:i:s'),
        ];

        array_unshift($sliders, $newSlider);
        Setting::set('rakitan_sliders', $sliders);

        return back()->with('success', "Slider '{$validated['title']}' created successfully!");
    }

    /**
     * Update an existing slider.
     */
    public function update(Request $request, string $id): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:120'],
            'slug' => ['nullable', 'string', 'max:120'],
            'description' => ['nullable', 'string', 'max:255'],
            'template' => ['required', 'string', 'in:hero_banner,split_card,testimonial,minimal_fade'],
            'settings' => ['nullable', 'array'],
            'slides' => ['required', 'array', 'min:1'],
        ]);

        $sliders = $this->getSliders();
        $foundIndex = -1;

        foreach ($sliders as $idx => $s) {
            if ($s['id'] === $id || $s['slug'] === $id) {
                $foundIndex = $idx;
                break;
            }
        }

        if ($foundIndex === -1) {
            return back()->withErrors(['error' => "Slider not found with ID {$id}."]);
        }

        $slug = !empty($validated['slug'])
            ? Str::slug($validated['slug'])
            : Str::slug($validated['title']);

        $sliders[$foundIndex] = [
            'id' => $sliders[$foundIndex]['id'],
            'title' => $validated['title'],
            'slug' => $slug,
            'description' => $validated['description'] ?? '',
            'template' => $validated['template'],
            'settings' => array_merge([
                'autoplay' => true,
                'interval' => 5000,
                'transition' => 'slide',
                'showArrows' => true,
                'showDots' => true,
                'height' => 'tall',
                'pauseOnHover' => true,
            ], $validated['settings'] ?? []),
            'slides' => $validated['slides'],
            'updated_at' => date('Y-m-d H:i:s'),
        ];

        Setting::set('rakitan_sliders', $sliders);

        return back()->with('success', "Slider '{$validated['title']}' updated successfully!");
    }

    /**
     * Delete a slider.
     */
    public function destroy(string $id): RedirectResponse
    {
        $sliders = $this->getSliders();
        $filtered = array_values(array_filter($sliders, fn ($s) => $s['id'] !== $id && $s['slug'] !== $id));

        Setting::set('rakitan_sliders', $filtered);

        return back()->with('success', 'Slider deleted successfully.');
    }

    /**
     * API endpoint to retrieve all sliders for Visual Builder and public rendering.
     */
    public function apiList(): JsonResponse
    {
        $sliders = $this->getSliders();
        return response()->json($sliders);
    }
}
