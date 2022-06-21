<?php

use Illuminate\Support\Facades\Route;

// this, is, fucking, disgusting
use App\Http\Controllers\Manage\DashboardController;
use App\Http\Controllers\Manage\General\{BanController,
    ChangelogController,
    ChangelogLabelController,
    SettingsController,
    UserController,
    RoleController,
    ImportController};
use App\Http\Controllers\Manage\Index\{
    ThemeController, FeatureController, ServerController, NavLinkController,
    FooterLinkController
};
use App\Http\Controllers\Manage\Forums\{
  CategoryController, BoardController, PollController
};
use App\Http\Controllers\Manage\Store\{
    PackageController, CouponController, SaleController, OrderController
};

/*
|--------------------------------------------------------------------------
| Manage Routes
|--------------------------------------------------------------------------
*/

Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
Route::post('/cache', [DashboardController::class, 'clearCache'])->name('dashboard.cache');
Route::post('/reinstall', [DashboardController::class, 'reinstall'])->name('dashboard.reinstall');
Route::post('/maintenance', [DashboardController::class, 'maintenance'])->name('dashboard.maintenance');
Route::get('/latest-version', [DashboardController::class, 'latestVersion'])->name('dashboard.latest-version');

/*
 * General Routes
 */
Route::group(['prefix' => 'general', 'as' => 'general.'], function() {
    Route::get('/settings/{category}', [SettingsController::class, 'index'])->name('settings');
    Route::patch('/settings/{category}', [SettingsController::class, 'save'])->name('settings.save');

    Route::get('/users', [UserController::class, 'index'])->name('users');
    Route::post('/users/search', [UserController::class, 'search'])->name('users.search');
    Route::patch('/users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::post('/users/{user}/assign', [UserController::class, 'assign'])->name('users.assign');

    Route::get('/bans', [BanController::class, 'index'])->name('bans');
    Route::post('/bans/{user}', [BanController::class, 'store'])->name('bans.store');
    Route::patch('/bans/{ban}', [BanController::class, 'update'])->name('bans.update');
    Route::delete('/bans/{ban}', [BanController::class, 'destroy'])->name('bans.destroy');

    Route::get('/roles', [RoleController::class, 'index'])->name('roles');
    Route::post('/roles', [RoleController::class, 'store'])->name('roles.store');
    Route::patch('/roles/{role}', [RoleController::class, 'update'])->name('roles.update');
    Route::delete('/roles/{role}', [RoleController::class, 'destroy'])->name('roles.destroy');

    Route::get('/import', [ImportController::class, 'index'])->name('import');
    Route::post('/import', [ImportController::class, 'import'])->name('import.start');

    // Changelogs, grouped because the amount of routes is more than normal
    Route::group(['prefix' => 'changelogs', 'as' => 'changelogs'], function() {
        Route::post('/toggle', [ChangelogController::class, 'toggle'])->name('.toggle');

        Route::get('/', [ChangelogController::class, 'index'])->name('');
        Route::get('/create', [ChangelogController::class, 'create'])->name('.create');
        Route::post('/', [ChangelogController::class, 'store'])->name('.store');

        Route::post('/labels', [ChangelogLabelController::class, 'store'])->name('.labels.store');
        Route::patch('/labels/{label}', [ChangelogLabelController::class, 'update'])->name('.labels.update');
        Route::delete('/labels/{label}', [ChangelogLabelController::class, 'destroy'])
            ->name('.labels.destroy');


        Route::get('/{changelog}', [ChangelogController::class, 'edit'])->name('.edit');
        Route::patch('/{changelog}', [ChangelogController::class, 'update'])->name('.update');
        Route::delete('/{changelog}', [ChangelogController::class, 'destroy'])->name('.destroy');
    });
});

/*
 * Index Routes
 */
Route::group(['prefix' => 'index', 'as' => 'index.'], function() {
    Route::get('/theme', [ThemeController::class, 'index'])->name('theme');
    Route::patch('/theme/{theme}', [ThemeController::class, 'update'])->name('theme.update');

    /* Components */
    Route::get('/features', [FeatureController::class, 'index'])->name('features');
    Route::post('/features', [FeatureController::class, 'store'])->name('features.store');
    Route::patch('/features/{feature}', [FeatureController::class, 'update'])->name('features.update');
    Route::delete('/features/{feature}', [FeatureController::class, 'destroy'])->name('features.destroy');

    Route::get('/servers', [ServerController::class, 'index'])->name('servers');
    Route::post('/servers', [ServerController::class, 'store'])->name('servers.store');
    Route::patch('/servers/{server}', [ServerController::class, 'update'])->name('servers.update');
    Route::put('/servers/{server}/regenerate-token', [ServerController::class, 'regenerateToken'])->name('servers.regenerate-token');
    Route::delete('/servers/{server}', [ServerController::class, 'destroy'])->name('servers.destroy');

    Route::get('/navlinks', [NavLinkController::class, 'index'])->name('navlinks');
    Route::post('/navlinks', [NavLinkController::class, 'store'])->name('navlinks.store');
    Route::patch('/navlinks/{link}', [NavLinkController::class, 'update'])->name('navlinks.update');
    Route::delete('/navlinks/{link}', [NavLinkController::class, 'destroy'])->name('navlinks.destroy');

    Route::get('/footerlinks', [FooterLinkController::class, 'index'])->name('footerlinks');
    Route::post('/footerlinks', [FooterLinkController::class, 'store'])->name('footerlinks.store');
    Route::patch('/footerlinks/{link}', [FooterLinkController::class, 'update'])->name('footerlinks.update');
    Route::delete('/footerlinks/{link}', [FooterLinkController::class, 'destroy'])->name('footerlinks.destroy');
});

/**
 * Forum Routes
 */
Route::group(['prefix' => 'forums', 'as' => 'forums.'], function() {
    Route::get('/categories', [CategoryController::class, 'index'])->name('categories');
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::patch('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');

    Route::get('/boards', [BoardController::class, 'index'])->name('boards');
    Route::post('/boards', [BoardController::class, 'store'])->name('boards.store');
    Route::patch('/boards/{board}', [BoardController::class, 'update'])->name('boards.update');
    Route::delete('/boards/{board}', [BoardController::class, 'destroy'])->name('boards.destroy');

    Route::patch('/boards', [BoardController::class, 'sort'])->name('boards.sort');

    Route::get('/polls', [PollController::class, 'index'])->name('polls');
    Route::post('/polls', [PollController::class, 'store'])->name('polls.store');
    Route::patch('/polls/{poll}', [PollController::class, 'update'])->name('polls.update');
    Route::patch('/polls/{poll}/close', [PollController::class, 'close'])->name('polls.close');
    Route::delete('/polls/{poll}', [PollController::class, 'destroy'])->name('polls.destroy');
});

/**
 * Store Routes
 */
Route::group(['prefix' => 'store', 'as' => 'store.'], function() {
    // Create
    Route::get('/packages/create', [PackageController::class, 'create'])->name('packages.create');
    Route::post('/packages/clone/{package}', [PackageController::class, 'clone'])->name('packages.clone');
    Route::post('/packages', [PackageController::class, 'store'])->name('packages.store');

    // List
    Route::get('/packages', [PackageController::class, 'index'])->name('packages');
    Route::get('/packages/filter', [PackageController::class, 'filter'])->name('packages.filter');

    // Manage
    Route::get('/packages/{package}', [PackageController::class, 'edit'])->name('packages.edit');
    Route::patch('/packages/{package}', [PackageController::class, 'update'])->name('packages.update');
    Route::delete('/packages/{package}', [PackageController::class, 'destroy'])->name('packages.destroy');
    Route::post('/packages/{package}/enable', [PackageController::class, 'enable'])->name('packages.enable');

    Route::get('/coupons', [CouponController::class, 'index'])->name('coupons');
    Route::post('/coupons', [CouponController::class, 'store'])->name('coupons.store');
    Route::patch('/coupons/{coupon}', [CouponController::class, 'update'])->name('coupons.update');
    Route::delete('/coupons/{coupon}', [CouponController::class, 'destroy'])->name('coupons.destroy');

    Route::get('/sales', [SaleController::class, 'index'])->name('sales');
    Route::post('/sales', [SaleController::class, 'store'])->name('sales.store');
    Route::patch('/sales/{sale}', [SaleController::class, 'update'])->name('sales.update');
    Route::delete('/sales/{sale}', [SaleController::class, 'destroy'])->name('sales.destroy');

    Route::get('/transactions', [OrderController::class, 'index'])->name('transactions');
    Route::post('/transactions/prune-pending', [OrderController::class, 'prunePending'])
        ->name('transactions.prune-pending');
});