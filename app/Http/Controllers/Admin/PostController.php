<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    /**
     * Display a listing of posts.
     */
    public function index(Request $request): Response
    {
        $query = Post::query()
            ->with(['author:id,name', 'category:id,name,slug']);

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('slug', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%");
            });
        }

        if ($status = $request->input('status')) {
            if (in_array($status, ['draft', 'published'])) {
                $query->where('status', $status);
            }
        }

        if ($categoryId = $request->input('category_id')) {
            $query->where('category_id', $categoryId);
        }

        $posts = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString()
            ->through(fn ($post) => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'excerpt' => $post->excerpt,
                'featured_image' => $post->featured_image,
                'layout' => $post->layout ?? 'default',
                'status' => $post->status,
                'category' => $post->category ? [
                    'id' => $post->category->id,
                    'name' => $post->category->name,
                    'slug' => $post->category->slug,
                ] : null,
                'author' => $post->author?->name ?? 'Admin',
                'published_at' => $post->published_at ? $post->published_at->format('d M Y, H:i') : null,
                'created_at' => $post->created_at->format('d M Y, H:i'),
                'updated_at' => $post->updated_at->diffForHumans(),
            ]);

        $categories = Category::orderBy('name', 'asc')->get(['id', 'name', 'slug']);

        return Inertia::render('Admin/Posts/Index', [
            'posts' => $posts,
            'categories' => $categories,
            'filters' => $request->only(['search', 'status', 'category_id']),
        ]);
    }

    /**
     * Show form for creating a new post.
     */
    public function create(): Response
    {
        $categories = Category::orderBy('name', 'asc')->get(['id', 'name', 'slug']);

        return Inertia::render('Admin/Posts/Editor', [
            'post' => null,
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created post in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:posts,slug'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'excerpt' => ['nullable', 'string', 'max:1000'],
            'content' => ['nullable', 'string'],
            'featured_image' => ['nullable', 'string', 'max:500'],
            'layout' => ['nullable', 'string', 'in:default,blank,boxed,sidebar'],
            'status' => ['required', 'in:draft,published'],
        ]);

        $slug = !empty($validated['slug'])
            ? Str::slug($validated['slug'])
            : Str::slug($validated['title']);

        $baseSlug = $slug;
        $counter = 1;
        while (Post::where('slug', $slug)->exists()) {
            $slug = "{$baseSlug}-{$counter}";
            $counter++;
        }

        $post = Post::create([
            'title' => $validated['title'],
            'slug' => $slug,
            'category_id' => $validated['category_id'] ?? null,
            'excerpt' => $validated['excerpt'] ?? null,
            'content' => $validated['content'] ?? null,
            'featured_image' => $validated['featured_image'] ?? null,
            'layout' => $validated['layout'] ?? 'default',
            'status' => $validated['status'],
            'published_at' => $validated['status'] === 'published' ? now() : null,
            'user_id' => $request->user()->id,
        ]);

        return redirect()->route('admin.posts.index')->with('success', 'Post published/saved successfully!');
    }

    /**
     * Show form for editing the specified post.
     */
    public function edit(Post $post): Response
    {
        $categories = Category::orderBy('name', 'asc')->get(['id', 'name', 'slug']);

        return Inertia::render('Admin/Posts/Editor', [
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'category_id' => $post->category_id,
                'excerpt' => $post->excerpt,
                'content' => $post->content,
                'featured_image' => $post->featured_image,
                'layout' => $post->layout ?? 'default',
                'status' => $post->status,
                'published_at' => $post->published_at ? $post->published_at->format('Y-m-d\TH:i') : null,
            ],
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified post in storage.
     */
    public function update(Request $request, Post $post): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:posts,slug,' . $post->id],
            'category_id' => ['nullable', 'exists:categories,id'],
            'excerpt' => ['nullable', 'string', 'max:1000'],
            'content' => ['nullable', 'string'],
            'featured_image' => ['nullable', 'string', 'max:500'],
            'layout' => ['nullable', 'string', 'in:default,blank,boxed,sidebar'],
            'status' => ['required', 'in:draft,published'],
        ]);

        $slug = !empty($validated['slug'])
            ? Str::slug($validated['slug'])
            : Str::slug($validated['title']);

        if ($slug !== $post->slug) {
            $baseSlug = $slug;
            $counter = 1;
            while (Post::where('slug', $slug)->where('id', '!=', $post->id)->exists()) {
                $slug = "{$baseSlug}-{$counter}";
                $counter++;
            }
        }

        $publishedAt = $post->published_at;
        if ($validated['status'] === 'published' && !$publishedAt) {
            $publishedAt = now();
        }

        $post->update([
            'title' => $validated['title'],
            'slug' => $slug,
            'category_id' => $validated['category_id'] ?? null,
            'excerpt' => $validated['excerpt'] ?? null,
            'content' => $validated['content'] ?? null,
            'featured_image' => $validated['featured_image'] ?? null,
            'layout' => $validated['layout'] ?? 'default',
            'status' => $validated['status'],
            'published_at' => $publishedAt,
        ]);

        return redirect()->route('admin.posts.index')->with('success', 'Post updated successfully!');
    }

    /**
     * Remove the specified post.
     */
    public function destroy(Post $post): RedirectResponse
    {
        $post->delete();

        return back()->with('success', 'Post deleted successfully!');
    }

    /**
     * Duplicate an existing post.
     */
    public function duplicate(Post $post): RedirectResponse
    {
        $newTitle = "{$post->title} (Copy)";
        $newSlug = Str::slug($newTitle);
        $baseSlug = $newSlug;
        $counter = 1;

        while (Post::where('slug', $newSlug)->exists()) {
            $newSlug = "{$baseSlug}-{$counter}";
            $counter++;
        }

        Post::create([
            'title' => $newTitle,
            'slug' => $newSlug,
            'category_id' => $post->category_id,
            'excerpt' => $post->excerpt,
            'content' => $post->content,
            'blocks' => $post->blocks,
            'featured_image' => $post->featured_image,
            'layout' => $post->layout ?? 'default',
            'status' => 'draft',
            'user_id' => auth()->id(),
        ]);

        return back()->with('success', 'Post duplicated as draft successfully!');
    }
}
