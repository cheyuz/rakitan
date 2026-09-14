<?php

use Illuminate\Support\Facades\Route;

require_once __DIR__ . '/SeoController.php';

// Public XML Sitemap & Robots.txt
Route::get('/sitemap.xml', [\Plugins\SeoOptimizer\SeoController::class, 'sitemap'])->name('seo.sitemap');
Route::get('/robots.txt', [\Plugins\SeoOptimizer\SeoController::class, 'robots'])->name('seo.robots');

// Admin SEO Management
Route::middleware(['auth', 'role:admin'])->prefix('admin/seo')->name('admin.seo.')->group(function () {
    Route::get('/', [\Plugins\SeoOptimizer\SeoController::class, 'adminIndex'])->name('index');
    Route::post('/', [\Plugins\SeoOptimizer\SeoController::class, 'adminUpdate'])->name('update');
});
