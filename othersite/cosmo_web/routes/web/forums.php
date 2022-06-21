<?php

use App\Http\Controllers\Forums\{ForumController,
    BoardController,
    PollsController,
    ThreadController,
    PollController,
    ReactionController,
    PostController
};
use App\Http\Controllers\Forums\Polls\{
    ListController, ResultController
};
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Forum Routes
|--------------------------------------------------------------------------
*/

/* Index */
Route::get('/', ForumController::class)->name('index');

/* Polls */
Route::get('/polls', [PollsController::class, 'index'])->name('polls.index');
Route::get('/polls/{poll}', [PollsController::class, 'show'])->name('polls.show');
Route::post('/polls/{poll}', [PollsController::class, 'storeAnswer'])->name('polls.vote');

/* Boards */
Route::get('/boards/{board}', BoardController::class)->name('boards.show');

/* Threads */
Route::get('/boards/{board}/create', [ThreadController::class, 'create'])->name('threads.create');
Route::post('/boards/{board}', [ThreadController::class, 'store'])
    ->middleware('throttle:5,1')
    ->name('threads.store');

Route::get('/threads', [ThreadController::class, 'index'])->name('threads');
Route::post('/threads/search', [ThreadController::class, 'search'])->name('threads.search');

Route::get('/threads/{thread}', [ThreadController::class, 'show'])->name('threads.show');
Route::get('/threads/{thread}/edit', [ThreadController::class, 'edit'])->name('threads.edit');
Route::patch('/threads/{thread}', [ThreadController::class, 'update'])->name('threads.update');
Route::delete('/threads/{thread}', [ThreadController::class, 'destroy'])->name('threads.destroy');

/* Thread Actions */
Route::post('/threads/{thread}/sticky', [ThreadController::class, 'sticky'])->name('threads.sticky');
Route::post('/threads/{thread}/lock', [ThreadController::class, 'lock'])->name('threads.lock');
Route::post('/threads/{thread}/move', [ThreadController::class, 'move'])->name('threads.move');

/* Posts */
Route::post('/threads/{thread}', [PostController::class, 'store'])
    ->middleware('throttle:5,1')
    ->name('posts.store');

Route::get('/posts/{post}', [PostController::class, 'show'])->name('posts.show');
Route::get('/posts/{post}/edit', [PostController::class, 'edit'])->name('posts.edit');
Route::patch('/posts/{post}', [PostController::class, 'update'])->name('posts.update');
Route::delete('/posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');

/* Reactions */
Route::post('/threads/{thread}/react', [ReactionController::class, 'thread'])->name('threads.react');
Route::post('/posts/{post}/react', [ReactionController::class, 'post'])->name('posts.react');

Route::post('/polls/{poll}', [PollController::class, 'store'])->name('polls.store');
