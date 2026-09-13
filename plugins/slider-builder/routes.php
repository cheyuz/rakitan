<?php

use Illuminate\Support\Facades\Route;

require_once __DIR__ . '/SliderBuilderController.php';

// Slider Builder Admin CMS Routes
Route::middleware(['auth', 'role:admin,editor'])->prefix('admin/sliders')->name('admin.sliders.')->group(function () {
    Route::get('/', [\Plugins\SliderBuilder\SliderBuilderController::class, 'index'])->name('index');
    Route::post('/', [\Plugins\SliderBuilder\SliderBuilderController::class, 'store'])->name('store');
    Route::put('/{slider}', [\Plugins\SliderBuilder\SliderBuilderController::class, 'update'])->name('update');
    Route::delete('/{slider}', [\Plugins\SliderBuilder\SliderBuilderController::class, 'destroy'])->name('destroy');
});

// Slider Builder Public & Builder API
Route::get('/api/sliders', [\Plugins\SliderBuilder\SliderBuilderController::class, 'apiList'])->name('api.sliders');
