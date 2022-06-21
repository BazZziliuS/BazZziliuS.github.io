<?php

namespace App\Http\Controllers\Forums;

use App\Http\Controllers\Controller;
use App\Models\Forums\Category;
use App\Models\Forums\Poll;
use App\Models\Forums\Post;
use App\Models\Forums\Thread;

class ForumController extends Controller
{
    public function __invoke()
    {
        $categories = Category::with(['boards' => function($query) {
            $query->whereNull('parent_id');
        }, 'boards.latestThread', 'boards.latestThread.user'])->get();

        $recentThreads = Thread::with('user')
            ->withCount('posts')
            ->orderByDesc('created_at')->limit(5)
            ->get();

        $recentPosts = Post::with(['user', 'thread' => function($query) {
            $query->withCount('posts');
        }])->orderByDesc('created_at')->limit(5)->get();

        [$poll, $pollCount] = [null, null];
        if (auth()->check()) {
            $query = Poll::where('closed', false)
                ->whereDoesntHave('userAnswers', function($query) {
                    return $query->where('user_id', auth()->id());
                });

            if (($pollCount = $query->count()) > 0) {
                $poll = $query->first();
            }
        }

        return view('forums.index', compact(
            'categories', 'recentThreads', 'recentPosts', 'poll', 'pollCount'
        ));
    }
}
