<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Menu;
use App\Models\Page;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
{
    /**
     * Display the menu builder and manager.
     */
    public function index(Request $request): Response
    {
        $location = $request->input('location', 'header');
        if (!in_array($location, ['header', 'footer'])) {
            $location = 'header';
        }

        // Default initial items if no menu exists yet
        $defaultHeaderItems = [
            ['id' => '1', 'label' => 'Home', 'url' => '/', 'target' => '_self'],
            ['id' => '2', 'label' => 'Blog', 'url' => '/blog', 'target' => '_self'],
            ['id' => '3', 'label' => 'About', 'url' => '/about', 'target' => '_self'],
            ['id' => '4', 'label' => 'Features', 'url' => '/features', 'target' => '_self'],
        ];

        $defaultFooterItems = [
            ['id' => '1', 'label' => 'Home', 'url' => '/', 'target' => '_self'],
            ['id' => '2', 'label' => 'Blog Articles', 'url' => '/blog', 'target' => '_self'],
            ['id' => '3', 'label' => 'About Rakitan', 'url' => '/about', 'target' => '_self'],
        ];

        $headerMenu = Menu::firstOrCreate(
            ['location' => 'header'],
            ['name' => 'Main Navigation', 'items' => $defaultHeaderItems]
        );

        $footerMenu = Menu::firstOrCreate(
            ['location' => 'footer'],
            ['name' => 'Footer Navigation', 'items' => $defaultFooterItems]
        );

        $pages = Page::where('status', 'published')
            ->orderBy('title', 'asc')
            ->get(['id', 'title', 'slug']);

        $categories = Category::orderBy('name', 'asc')
            ->get(['id', 'name', 'slug']);

        return Inertia::render('Admin/Menus/Index', [
            'location' => $location,
            'headerMenu' => $headerMenu,
            'footerMenu' => $footerMenu,
            'pages' => $pages,
            'categories' => $categories,
        ]);
    }

    /**
     * Save the menu items for the given location.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'location' => ['required', 'string', 'in:header,footer'],
            'name' => ['required', 'string', 'max:255'],
            'items' => ['required', 'array'],
            'items.*.id' => ['required'],
            'items.*.label' => ['required', 'string', 'max:255'],
            'items.*.url' => ['required', 'string', 'max:500'],
            'items.*.target' => ['nullable', 'string', 'in:_self,_blank'],
        ]);

        Menu::updateOrCreate(
            ['location' => $validated['location']],
            [
                'name' => $validated['name'],
                'items' => $validated['items'],
            ]
        );

        return back()->with('success', 'Navigation menu updated successfully!');
    }
}
