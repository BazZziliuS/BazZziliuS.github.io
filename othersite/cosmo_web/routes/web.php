<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    BansController,
    ChangelogController,
    InstallController,
    SetThemeController,
    IndexController,
    NotificationController,
    StaffController
};
use App\Http\Controllers\Auth\{
    LoginController,
    DiscordLoginController
};


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/**
 * Install Routes
 */
Route::get('/install', [InstallController::class, 'welcome'])->name('install.welcome')
    ->withoutMiddleware(\App\Http\Middleware\AuthenticateSession::class);

Route::post('/install', [InstallController::class, 'install'])->name('install.complete')
    ->withoutMiddleware(\App\Http\Middleware\AuthenticateSession::class);

/**
 * Authentication Routes
 */
Route::get('/login/steam', [LoginController::class, 'redirect'])->name('login.steam');
Route::get('/auth/steam', [LoginController::class, 'authenticated'])->name('auth.steam');

Route::get('/login/discord', [DiscordLoginController::class, 'redirect'])->name('login.discord');
Route::get('/auth/discord', [DiscordLoginController::class, 'authenticated'])->name('auth.discord');

Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

/**
 * Home Routes
 */
Route::get('/', [IndexController::class, 'index'])->name('home');
Route::get('/server/{server}', [IndexController::class, 'serverInfo'])->name('home.server.info');

/**
 * Notification Routes
 */
Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications');
Route::get('/notifications/{notification}', [NotificationController::class, 'show'])->name('notifications.show');
Route::post('/notifications/mark-read', [NotificationController::class, 'markAllRead'])->name('notifications.markRead');
Route::post('/notifications/delete-all', [NotificationController::class, 'deleteAll'])->name('notifications.deleteAll');

/**
 * Staff Route
 */
Route::get('/staff', StaffController::class)->name('staff');

Route::post('/set-theme', SetThemeController::class)->name('set-theme');

/**
 * Changelog
 */
Route::get('/changelogs', ChangelogController::class)->name('changelogs');