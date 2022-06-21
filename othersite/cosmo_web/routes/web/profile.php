<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Profile\ProfileController;
use App\Http\Controllers\Profile\LikeController;
use App\Http\Controllers\Profile\CommentController;

Route::get('/', [ProfileController::class, 'index'])->name('index');
Route::post('/search', [ProfileController::class, 'search'])->name('search');

Route::get('/{user}', [ProfileController::class, 'show'])->name('show');
Route::get('/{user}/comments', [ProfileController::class, 'comments'])->name('show.comments');
Route::get('/{user}/threads', [ProfileController::class, 'threads'])->name('show.threads');
Route::get('/{user}/achievements', [ProfileController::class, 'achievements'])
    ->name('show.achievements');

Route::middleware('banned:forums')->group (function() {
    Route::get('/{user}/edit', [ProfileController::class, 'edit'])->name('edit');
    Route::patch('/{user}/edit', [ProfileController::class, 'update'])
        ->name('update');
});

Route::post('/{user}/like', [LikeController::class, 'like'])->name('like');

Route::post('/{user}/comments', [CommentController::class, 'store'])
    ->middleware('throttle:5,1')
    ->name('comments.store');

Route::patch('/{user}/comments/{comment}', [CommentController::class, 'update'])->name('comments.update');
Route::delete('/{user}/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');
