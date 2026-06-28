<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\InventoryController as AdminInventoryController;
use App\Http\Controllers\Admin\NotificationsController as AdminNotificationsController;
use App\Http\Controllers\Admin\ProfileController as AdminProfileController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\Admin\RequestController;
use App\Http\Controllers\Admin\SystemController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Central\CatalogController;
use App\Http\Controllers\Central\DashboardController;
use App\Http\Controllers\Central\DeliveryController;
use App\Http\Controllers\Central\InventoryController;
use App\Http\Controllers\Central\NotificationsController;
use App\Http\Controllers\Central\PpmpController;
use App\Http\Controllers\Central\ProfileController;
use App\Http\Controllers\Central\RequestApprovalController;
use App\Http\Controllers\Provincial\CartController as ProvincialCartController;
use App\Http\Controllers\Provincial\CatalogController as ProvincialCatalogController;
use App\Http\Controllers\Provincial\DeliveryController as ProvincialDeliveryController;
use App\Http\Controllers\Provincial\HomeController as ProvincialHomeController;
use App\Http\Controllers\Provincial\PpmpController as ProvincialPpmpController;
use App\Http\Controllers\Provincial\ProfileController as ProvincialProfileController;
use App\Http\Controllers\Provincial\RequestController as ProvincialRequestController;
use App\Http\Controllers\Provincial\RequestSummaryController as ProvincialRequestSummaryController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

// Central user type — frontend-only screens. URL prefixed per user type (/central).
Route::prefix('central')->name('central.')->group(function () {
    // Read-only views.
    Route::get('/', DashboardController::class)->name('dashboard');
    Route::get('notifications', NotificationsController::class)->name('notifications');
    Route::get('profile', ProfileController::class)->name('profile');

    // CRUD-backed screens.
    Route::resource('inventory', InventoryController::class);
    Route::resource('catalog', CatalogController::class);
    Route::resource('requests', RequestApprovalController::class);
    Route::resource('delivery', DeliveryController::class);
    Route::resource('ppmp', PpmpController::class);
});

// Admin user type — frontend-only screens. URL prefixed per user type (/admin).
Route::prefix('admin')->name('admin.')->group(function () {
    // Read-only views.
    Route::get('/', AdminDashboardController::class)->name('dashboard');
    Route::get('notifications', AdminNotificationsController::class)->name('notifications');
    Route::get('profile', AdminProfileController::class)->name('profile');
    Route::get('reports', ReportController::class)->name('reports');
    Route::get('system', SystemController::class)->name('system');

    // CRUD-backed screens.
    Route::resource('users', UserController::class);
    Route::resource('inventory', AdminInventoryController::class);
    Route::resource('requests', RequestController::class);
});

// Provincial user type — frontend-only screens. URL prefixed per user type (/provincial).
Route::prefix('provincial')->name('provincial.')->group(function () {
    Route::get('/', ProvincialHomeController::class)->name('home');
    Route::get('catalog', ProvincialCatalogController::class)->name('catalog');
    Route::get('requests', ProvincialRequestController::class)->name('requests');
    Route::get('delivery', ProvincialDeliveryController::class)->name('delivery');
    Route::get('ppmp', ProvincialPpmpController::class)->name('ppmp');
    Route::get('cart', ProvincialCartController::class)->name('cart');
    Route::get('request-summary', ProvincialRequestSummaryController::class)->name('request-summary');
    Route::get('profile', ProvincialProfileController::class)->name('profile');
});

require __DIR__.'/settings.php';
