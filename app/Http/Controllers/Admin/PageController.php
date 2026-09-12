<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    /**
     * Tampilkan daftar seluruh halaman CMS.
     */
    public function index(Request $request): Response
    {
        $query = Page::query()->with('author:id,name');

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('slug', 'like', "%{$search}%");
            });
        }

        if ($status = $request->input('status')) {
            if (in_array($status, ['draft', 'published'])) {
                $query->where('status', $status);
            }
        }

        $pages = $query->orderBy('updated_at', 'desc')
            ->paginate(10)
            ->withQueryString()
            ->through(fn ($page) => [
                'id' => $page->id,
                'title' => $page->title,
                'slug' => $page->slug,
                'meta_title' => $page->meta_title,
                'meta_description' => $page->meta_description,
                'status' => $page->status,
                'blocks_count' => is_array($page->blocks) ? count($page->blocks) : 0,
                'author' => $page->author?->name ?? 'Admin',
                'created_at' => $page->created_at->format('d M Y, H:i'),
                'updated_at' => $page->updated_at->diffForHumans(),
            ]);

        return Inertia::render('Admin/Pages/Index', [
            'pages' => $pages,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Simpan halaman baru dan langsung arahkan ke Visual Builder.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:pages,slug'],
        ]);

        $slug = !empty($validated['slug'])
            ? Str::slug($validated['slug'])
            : Str::slug($validated['title']);

        // Pastikan slug unik jika dibuat otomatis dari title
        $originalSlug = $slug;
        $counter = 1;
        while (Page::where('slug', $slug)->exists()) {
            $slug = "{$originalSlug}-{$counter}";
            $counter++;
        }

        $page = Page::create([
            'title' => $validated['title'],
            'slug' => $slug,
            'meta_title' => $validated['title'],
            'meta_description' => null,
            'status' => 'draft',
            'user_id' => $request->user()?->id,
            'blocks' => [
                [
                    'id' => 'hero-' . Str::random(8),
                    'type' => 'hero',
                    'props' => [
                        'badgeText' => 'Blok Baru',
                        'title' => $validated['title'],
                        'subtitle' => 'Mulai rakit halaman spektakuler Anda dengan menambahkan komponen dari panel samping.',
                        'primaryButtonText' => 'Pelajari Lebih Lanjut',
                        'primaryButtonUrl' => '#',
                        'secondaryButtonText' => '',
                        'secondaryButtonUrl' => '',
                        'alignment' => 'center',
                        'bgStyle' => 'gradient',
                        'imageUrl' => '',
                    ],
                ]
            ],
        ]);

        return redirect()->route('admin.pages.builder', $page->id)
            ->with('success', 'Halaman berhasil dibuat. Selamat datang di Visual Builder!');
    }

    /**
     * Tampilkan Visual Drag-and-Drop Page Builder.
     */
    public function builder(Page $page): Response
    {
        return Inertia::render('Admin/Builder', [
            'page' => [
                'id' => $page->id,
                'title' => $page->title,
                'slug' => $page->slug,
                'meta_title' => $page->meta_title ?? '',
                'meta_description' => $page->meta_description ?? '',
                'layout' => $page->layout ?? 'default',
                'status' => $page->status,
                'blocks' => $page->blocks ?? [],
                'updated_at' => $page->updated_at->diffForHumans(),
            ],
        ]);
    }

    /**
     * Perbarui konfigurasi halaman & payload JSON blocks dari Builder.
     */
    public function update(Request $request, Page $page): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:pages,slug,' . $page->id],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:1000'],
            'layout' => ['nullable', 'string', 'in:default,blank,boxed,sidebar'],
            'status' => ['required', 'in:draft,published'],
            'blocks' => ['nullable', 'array'],
        ]);

        $validated['slug'] = Str::slug($validated['slug']);

        $page->update($validated);

        return back()->with('success', 'Perubahan halaman berhasil disimpan!');
    }

    /**
     * Duplikasi halaman beserta seluruh blok layoutnya.
     */
    public function duplicate(Page $page): RedirectResponse
    {
        $baseSlug = $page->slug . '-salinan';
        $slug = $baseSlug;
        $counter = 1;
        while (Page::where('slug', $slug)->exists()) {
            $slug = "{$baseSlug}-{$counter}";
            $counter++;
        }

        $newPage = $page->replicate();
        $newPage->title = 'Salinan dari ' . $page->title;
        $newPage->slug = $slug;
        $newPage->status = 'draft';
        $newPage->save();

        return redirect()->route('admin.pages.index')
            ->with('success', "Halaman '{$page->title}' berhasil diduplikasi sebagai draf!");
    }

    /**
     * Hapus halaman CMS.
     */
    public function destroy(Page $page): RedirectResponse
    {
        $title = $page->title;
        $page->delete();

        return redirect()->route('admin.pages.index')
            ->with('success', "Halaman '{$title}' berhasil dihapus.");
    }
}
