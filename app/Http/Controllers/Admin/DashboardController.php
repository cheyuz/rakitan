<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Page;
use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Tampilkan halaman dashboard utama admin dengan ringkasan statistik.
     */
    public function index(): Response
    {
        $totalPages = Page::count();
        $publishedPages = Page::where('status', 'published')->count();
        $draftPages = Page::where('status', 'draft')->count();

        $totalPosts = Post::count();
        $publishedPosts = Post::where('status', 'published')->count();
        $totalCategories = Category::count();

        // Hitung total blok dari semua halaman
        $allPages = Page::select('blocks')->get();
        $totalBlocks = $allPages->sum(function ($page) {
            return is_array($page->blocks) ? count($page->blocks) : 0;
        });

        // 5 Halaman terbaru
        $recentPages = Page::with('author:id,name')
            ->orderBy('updated_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($page) {
                return [
                    'id' => $page->id,
                    'title' => $page->title,
                    'slug' => $page->slug,
                    'status' => $page->status,
                    'blocks_count' => is_array($page->blocks) ? count($page->blocks) : 0,
                    'updated_at' => $page->updated_at->diffForHumans(),
                    'author' => $page->author?->name ?? 'Admin',
                ];
            });

        // 5 Postingan terbaru
        $recentPosts = Post::with(['author:id,name', 'category:id,name'])
            ->orderBy('updated_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'category' => $post->category?->name ?? 'Uncategorized',
                    'status' => $post->status,
                    'updated_at' => $post->updated_at->diffForHumans(),
                    'author' => $post->author?->name ?? 'Admin',
                ];
            });

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalPages' => $totalPages,
                'publishedPages' => $publishedPages,
                'draftPages' => $draftPages,
                'totalPosts' => $totalPosts,
                'publishedPosts' => $publishedPosts,
                'totalCategories' => $totalCategories,
                'totalBlocks' => $totalBlocks,
            ],
            'recentPages' => $recentPages,
            'recentPosts' => $recentPosts,
        ]);
    }
}
