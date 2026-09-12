<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicPageController;
use Illuminate\Support\Facades\Route;

// Redirect /dashboard bawaan Breeze ke /admin/dashboard
Route::get('/dashboard', function () {
    return redirect()->route('admin.dashboard');
})->middleware(['auth'])->name('dashboard');

// Admin Management & Visual Builder Routes
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('pages')->name('pages.')->group(function () {
        Route::get('/', [PageController::class, 'index'])->name('index');
        Route::post('/', [PageController::class, 'store'])->name('store');
        Route::get('/{page}/builder', [PageController::class, 'builder'])->name('builder');
        Route::put('/{page}', [PageController::class, 'update'])->name('update');
        Route::post('/{page}/duplicate', [PageController::class, 'duplicate'])->name('duplicate');
        Route::delete('/{page}', [PageController::class, 'destroy'])->name('destroy');
    });

    // Site Settings
    Route::get('/settings', [\App\Http\Controllers\Admin\SettingsController::class, 'index'])->name('settings.index');
    Route::post('/settings', [\App\Http\Controllers\Admin\SettingsController::class, 'update'])->name('settings.update');

    // Tools (XML Export / Import)
    Route::get('/tools', [\App\Http\Controllers\Admin\ToolsController::class, 'index'])->name('tools.index');
    Route::get('/tools/export', [\App\Http\Controllers\Admin\ToolsController::class, 'export'])->name('tools.export');
    Route::post('/tools/import', [\App\Http\Controllers\Admin\ToolsController::class, 'import'])->name('tools.import');
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
    Route::get('/', [\App\Http\Controllers\InstallController::class, 'index'])->name('index');
    Route::post('/database', [\App\Http\Controllers\InstallController::class, 'setupDatabase'])->name('database');
    Route::post('/site', [\App\Http\Controllers\InstallController::class, 'setupSite'])->name('site');
});

// Dynamic Catch-All Public Routing (Renders Rakitan blocks based on slug)
Route::get('/{slug?}', [PublicPageController::class, 'show'])
    ->where('slug', '^(?!admin|login|register|logout|profile|password|verify-email|install).*$')
    ->name('public.page');
