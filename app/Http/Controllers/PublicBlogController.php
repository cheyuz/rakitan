<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Menu;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicBlogController extends Controller
{
    /**
     * Display listing of published blog posts.
     */
    public function index(Request $request): Response
    {
        $query = Post::query()->with(['author:id,name', 'category:id,name,slug']);

        if (!$request->user()) {
            $query->published();
        }

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        $activeCategory = null;
        if ($categorySlug = $request->input('category')) {
            $activeCategory = Category::where('slug', $categorySlug)->first();
            if ($activeCategory) {
                $query->where('category_id', $activeCategory->id);
            }
        }

        $posts = $query->orderBy('published_at', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate(9)
            ->withQueryString()
            ->through(fn ($p) => [
                'id' => $p->id,
                'title' => $p->title,
                'slug' => $p->slug,
                'excerpt' => $p->excerpt,
                'featured_image' => $p->featured_image,
                'author' => $p->author?->name ?? 'Admin',
                'category' => $p->category ? [
                    'id' => $p->category->id,
                    'name' => $p->category->name,
                    'slug' => $p->category->slug,
                ] : null,
                'status' => $p->status,
                'published_at' => $p->published_at ? $p->published_at->format('d M Y') : $p->created_at->format('d M Y'),
            ]);

        $categories = Category::withCount(['posts' => fn ($q) => $q->published()])
            ->orderBy('name', 'asc')
            ->get(['id', 'name', 'slug', 'posts_count']);

        $recentPosts = Post::published()
            ->latest('published_at')
            ->take(5)
            ->get(['id', 'title', 'slug', 'featured_image', 'published_at', 'created_at'])
            ->map(fn ($p) => [
                'id' => $p->id,
                'title' => $p->title,
                'slug' => $p->slug,
                'featured_image' => $p->featured_image,
                'published_at' => $p->published_at ? $p->published_at->format('d M Y') : $p->created_at->format('d M Y'),
            ]);

        $headerMenu = Menu::getItems('header', [
            ['label' => 'Home', 'url' => '/'],
            ['label' => 'Blog', 'url' => '/blog'],
            ['label' => 'About', 'url' => '/about'],
        ]);

        $footerMenu = Menu::getItems('footer', [
            ['label' => 'Home', 'url' => '/'],
            ['label' => 'Blog', 'url' => '/blog'],
        ]);

        return Inertia::render('Public/Blog/Index', [
            'posts' => $posts,
            'categories' => $categories,
            'activeCategory' => $activeCategory,
            'recentPosts' => $recentPosts,
            'filters' => $request->only(['search', 'category']),
            'navigation' => $headerMenu,
            'footerNavigation' => $footerMenu,
            'isAdmin' => (bool) $request->user(),
        ]);
    }

    /**
     * Display a single blog post.
     */
    public function show(Request $request, string $slug): Response
    {
        $query = Post::where('slug', $slug)->with(['author:id,name', 'category:id,name,slug']);

        if (!$request->user()) {
            $query->published();
        }

        $post = $query->first();

        if (!$post) {
            abort(404, "Article '{$slug}' not found.");
        }

        // Increment views count safely
        $post->increment('views_count');

        // Related posts from same category
        $relatedPosts = [];
        if ($post->category_id) {
            $relatedPosts = Post::published()
                ->where('category_id', $post->category_id)
                ->where('id', '!=', $post->id)
                ->latest('published_at')
                ->take(3)
                ->get(['id', 'title', 'slug', 'featured_image', 'published_at', 'created_at'])
                ->map(fn ($p) => [
                    'id' => $p->id,
                    'title' => $p->title,
                    'slug' => $p->slug,
                    'featured_image' => $p->featured_image,
                    'published_at' => $p->published_at ? $p->published_at->format('d M Y') : $p->created_at->format('d M Y'),
                ]);
        }

        $categories = Category::withCount(['posts' => fn ($q) => $q->published()])
            ->orderBy('name', 'asc')
            ->get(['id', 'name', 'slug', 'posts_count']);

        $recentPosts = Post::published()
            ->latest('published_at')
            ->take(5)
            ->get(['id', 'title', 'slug', 'featured_image', 'published_at', 'created_at'])
            ->map(fn ($p) => [
                'id' => $p->id,
                'title' => $p->title,
                'slug' => $p->slug,
                'featured_image' => $p->featured_image,
                'published_at' => $p->published_at ? $p->published_at->format('d M Y') : $p->created_at->format('d M Y'),
            ]);

        $headerMenu = Menu::getItems('header', [
            ['label' => 'Home', 'url' => '/'],
            ['label' => 'Blog', 'url' => '/blog'],
            ['label' => 'About', 'url' => '/about'],
        ]);

        $footerMenu = Menu::getItems('footer', [
            ['label' => 'Home', 'url' => '/'],
            ['label' => 'Blog', 'url' => '/blog'],
        ]);

        return Inertia::render('Public/Blog/Show', [
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'excerpt' => $post->excerpt,
                'content' => $post->content,
                'blocks' => $post->blocks ?? [],
                'featured_image' => $post->featured_image,
                'layout' => $post->layout ?? 'default',
                'status' => $post->status,
                'views_count' => $post->views_count,
                'author' => $post->author?->name ?? 'Admin',
                'category' => $post->category ? [
                    'id' => $post->category->id,
                    'name' => $post->category->name,
                    'slug' => $post->category->slug,
                ] : null,
                'published_at' => $post->published_at ? $post->published_at->format('d M Y') : $post->created_at->format('d M Y'),
            ],
            'relatedPosts' => $relatedPosts,
            'categories' => $categories,
            'recentPosts' => $recentPosts,
            'navigation' => $headerMenu,
            'footerNavigation' => $footerMenu,
            'isAdmin' => (bool) $request->user(),
        ]);
    }
}
