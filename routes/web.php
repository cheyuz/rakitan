<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DocumentationController;
use App\Http\Controllers\Admin\FormSubmissionController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\MenuController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\PluginController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\ThemeController;
use App\Http\Controllers\Admin\ToolsController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\InstallController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicBlogController;
use App\Http\Controllers\PublicFormController;
use App\Http\Controllers\PublicPageController;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Redirect /dashboard bawaan Breeze ke /admin/dashboard
Route::get('/dashboard', function () {
    return redirect()->route('admin.dashboard');
})->middleware(['auth'])->name('dashboard');

// Admin Management & Visual Builder Routes
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Posts Management (Admin, Editor, Author)
    Route::prefix('posts')->name('posts.')->group(function () {
        Route::get('/', [PostController::class, 'index'])->name('index');
        Route::get('/create', [PostController::class, 'create'])->name('create');
        Route::post('/', [PostController::class, 'store'])->name('store');
        Route::get('/{post}/edit', [PostController::class, 'edit'])->name('edit');
        Route::put('/{post}', [PostController::class, 'update'])->name('update');
        Route::post('/{post}/duplicate', [PostController::class, 'duplicate'])->name('duplicate');
        Route::delete('/{post}', [PostController::class, 'destroy'])->name('destroy');
    });

    // Media Library (Admin, Editor, Author)
    Route::prefix('media')->name('media.')->group(function () {
        Route::get('/', [MediaController::class, 'index'])->name('index');
        Route::post('/', [MediaController::class, 'store'])->name('store');
        Route::delete('/{media}', [MediaController::class, 'destroy'])->name('destroy');
        Route::post('/folders', [MediaController::class, 'storeFolder'])->name('folders.store');
        Route::delete('/folders/{folder}', [MediaController::class, 'destroyFolder'])->name('folders.destroy');
    });

    // Form Submissions Inbox (Admin, Editor)
    Route::prefix('submissions')->name('submissions.')->middleware(['role:admin,editor'])->group(function () {
        Route::get('/', [FormSubmissionController::class, 'index'])->name('index');
        Route::post('/{submission}/toggle-read', [FormSubmissionController::class, 'toggleRead'])->name('toggle-read');
        Route::delete('/{submission}', [FormSubmissionController::class, 'destroy'])->name('destroy');
    });

    // Content Management (Admin, Editor)
    Route::middleware(['role:admin,editor'])->group(function () {
        // Pages & Visual Builder
        Route::prefix('pages')->name('pages.')->group(function () {
            Route::get('/', [PageController::class, 'index'])->name('index');
            Route::post('/', [PageController::class, 'store'])->name('store');
            Route::get('/{page}/builder', [PageController::class, 'builder'])->name('builder');
            Route::put('/{page}', [PageController::class, 'update'])->name('update');
            Route::post('/{page}/duplicate', [PageController::class, 'duplicate'])->name('duplicate');
            Route::delete('/{page}', [PageController::class, 'destroy'])->name('destroy');
        });

        // Categories Management
        Route::prefix('categories')->name('categories.')->group(function () {
            Route::get('/', [CategoryController::class, 'index'])->name('index');
            Route::post('/', [CategoryController::class, 'store'])->name('store');
            Route::put('/{category}', [CategoryController::class, 'update'])->name('update');
            Route::delete('/{category}', [CategoryController::class, 'destroy'])->name('destroy');
        });

        // Menu Navigation Management
        Route::prefix('menus')->name('menus.')->group(function () {
            Route::get('/', [MenuController::class, 'index'])->name('index');
            Route::post('/', [MenuController::class, 'update'])->name('update');
        });
    });

    // System Administration (Super Admin Only)
    Route::middleware(['role:admin'])->group(function () {
        // Users & Role Management
        Route::prefix('users')->name('users.')->group(function () {
            Route::get('/', [UserController::class, 'index'])->name('index');
            Route::post('/', [UserController::class, 'store'])->name('store');
            Route::put('/{user}', [UserController::class, 'update'])->name('update');
            Route::delete('/{user}', [UserController::class, 'destroy'])->name('destroy');
        });

        // Plugins Management
        Route::prefix('plugins')->name('plugins.')->group(function () {
            Route::get('/', [PluginController::class, 'index'])->name('index');
            Route::post('/toggle', [PluginController::class, 'toggle'])->name('toggle');
            Route::post('/upload', [PluginController::class, 'upload'])->name('upload');
            Route::delete('/{plugin}', [PluginController::class, 'destroy'])->name('destroy');
        });

        // Themes Management
        Route::prefix('themes')->name('themes.')->group(function () {
            Route::get('/', [ThemeController::class, 'index'])->name('index');
            Route::post('/activate', [ThemeController::class, 'activate'])->name('activate');
            Route::post('/upload', [ThemeController::class, 'upload'])->name('upload');
            Route::delete('/{theme}', [ThemeController::class, 'destroy'])->name('destroy');
        });

        // Site Settings
        Route::get('/settings', [SettingsController::class, 'index'])->name('settings.index');
        Route::post('/settings', [SettingsController::class, 'update'])->name('settings.update');

        // Tools (XML Export / Import & Site Reset)
        Route::get('/tools', [ToolsController::class, 'index'])->name('tools.index');
        Route::get('/tools/export', [ToolsController::class, 'export'])->name('tools.export');
        Route::post('/tools/import', [ToolsController::class, 'import'])->name('tools.import');
        Route::post('/tools/reset', [ToolsController::class, 'reset'])->name('tools.reset');

        // In-CMS Developer Documentation
        Route::get('/documentation', [DocumentationController::class, 'index'])->name('documentation.index');
    });
});

// Profile Routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Autentikasi Laravel Breeze
require __DIR__.'/auth.php';

// Installer Routes (Setup Wizard)
Route::prefix('install')->name('install.')->group(function () {
    Route::get('/', [InstallController::class, 'index'])->name('index');
    Route::post('/database', [InstallController::class, 'setupDatabase'])->name('database');
    Route::post('/site', [InstallController::class, 'setupSite'])->name('site');
});

// Public Blog Routes
Route::prefix('blog')->name('blog.')->group(function () {
    Route::get('/', [PublicBlogController::class, 'index'])->name('index');
    Route::get('/category/{slug}', function (string $slug) {
        return redirect()->route('blog.index', ['category' => $slug]);
    })->name('category');
    Route::get('/{slug}', [PublicBlogController::class, 'show'])->name('show');
});

// API Endpoint for Dynamic Blocks (e.g. LatestPostsBlock)
Route::get('/api/latest-posts', function (Request $request) {
    $limit = min((int) $request->input('limit', 3), 12);
    $categoryId = $request->input('category_id');

    $query = Post::published()->with(['author:id,name', 'category:id,name,slug']);

    if ($categoryId && $categoryId !== 'all') {
        $query->where('category_id', $categoryId);
    }

    $posts = $query->latest('published_at')
        ->take($limit)
        ->get()
        ->map(fn ($p) => [
            'id' => $p->id,
            'title' => $p->title,
            'slug' => $p->slug,
            'excerpt' => $p->excerpt,
            'featured_image' => $p->featured_image,
            'category' => $p->category ? $p->category->name : null,
            'author' => $p->author?->name ?? 'Admin',
            'published_at' => $p->published_at ? $p->published_at->format('d M Y') : $p->created_at->format('d M Y'),
        ]);

    return response()->json($posts);
})->name('api.latest-posts');

// API Endpoint for Advanced Posts Block (with AJAX pagination, search, and category tabs)
Route::get('/api/posts/advanced', function (Request $request) {
    $limit = max(1, min((int) $request->input('limit', 6), 24));
    $categoryId = $request->input('category_id');
    $search = trim((string) $request->input('search', ''));

    $query = Post::published()->with(['author:id,name', 'category:id,name,slug']);

    if ($categoryId && $categoryId !== 'all') {
        $query->where('category_id', $categoryId);
    }

    if ($search !== '') {
        $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
              ->orWhere('excerpt', 'like', "%{$search}%")
              ->orWhere('content', 'like', "%{$search}%");
        });
    }

    $paginated = $query->latest('published_at')
        ->latest('created_at')
        ->paginate($limit);

    $categories = \App\Models\Category::select('id', 'name', 'slug')->get();

    return response()->json([
        'data' => collect($paginated->items())->map(fn ($p) => [
            'id' => $p->id,
            'title' => $p->title,
            'slug' => $p->slug,
            'excerpt' => $p->excerpt,
            'featured_image' => $p->featured_image,
            'category' => $p->category ? ['id' => $p->category->id, 'name' => $p->category->name, 'slug' => $p->category->slug] : null,
            'author' => $p->author?->name ?? 'Admin',
            'published_at' => $p->published_at ? $p->published_at->format('d M Y') : $p->created_at->format('d M Y'),
        ]),
        'current_page' => $paginated->currentPage(),
        'last_page' => $paginated->lastPage(),
        'total' => $paginated->total(),
        'per_page' => $paginated->perPage(),
        'categories' => $categories,
    ]);
})->name('api.posts.advanced');

// Public Form Submissions API
Route::post('/api/forms/submit', [PublicFormController::class, 'submit'])->name('api.forms.submit');

// Public Theme Assets (Stylesheet and Screenshot)
Route::get('/themes/{theme}/screenshot', [ThemeController::class, 'screenshot'])->name('themes.screenshot');
Route::get('/themes/{theme}/style.css', [ThemeController::class, 'style'])->name('themes.style');

// Dynamically Load All Active Plugins Routes
app(\App\Services\PluginManager::class)->loadPluginRoutes();

// Dynamic Catch-All Public Routing (Renders Rakitan blocks based on slug)
Route::get('/{slug?}', [PublicPageController::class, 'show'])
    ->where('slug', '^(?!admin|login|register|logout|profile|password|verify-email|install|blog|api|themes|plugins|sliders|sitemap\.xml|robots\.txt).*$')
    ->name('public.page');
