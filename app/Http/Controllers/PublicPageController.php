<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicPageController extends Controller
{
    /**
     * Render dinamis halaman CMS berdasarkan slug.
     */
    public function show(Request $request, ?string $slug = null): Response
    {
        $targetSlug = $slug ? trim($slug, '/') : 'home';

        // Cari halaman berdasarkan slug
        $query = Page::where('slug', $targetSlug);

        // Jika pengunjung bukan admin login, hanya izinkan halaman berstatus published
        if (!$request->user()) {
            $query->where('status', 'published');
        }

        $page = $query->first();

        // Jika slug 'home' tidak ditemukan, coba ambil halaman published pertama
        if (!$page && $targetSlug === 'home') {
            $page = Page::where('status', 'published')->first();
        }

        if (!$page) {
            abort(404, "Halaman '{$targetSlug}' tidak ditemukan.");
        }

        // Ambil daftar menu navigasi publik (halaman published)
        $navPages = Page::where('status', 'published')
            ->select('id', 'title', 'slug')
            ->orderBy('id', 'asc')
            ->get()
            ->map(fn ($p) => [
                'title' => $p->title,
                'slug' => $p->slug === 'home' ? '/' : '/' . $p->slug,
            ]);

        return Inertia::render('Public/Show', [
            'page' => [
                'id' => $page->id,
                'title' => $page->title,
                'slug' => $page->slug,
                'meta_title' => $page->meta_title ?? $page->title,
                'meta_description' => $page->meta_description ?? '',
                'status' => $page->status,
                'blocks' => $page->blocks ?? [],
            ],
            'navigation' => $navPages,
            'isAdmin' => (bool) $request->user(),
        ]);
    }
}
