<?php

namespace App\Http\Controllers\Forums;

use App\Http\Controllers\Controller;
use App\Models\Forums\Post;
use App\Models\Forums\Thread;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

/**
 * Class ReactionController
 * @package App\Http\Controllers\Forums
 */
class ReactionController extends Controller
{
    /**
     * @param Request $request
     * @throws ValidationException
     */
    public function validateRequest(Request  $request): void
    {
        $reactions = Cache::remember('cosmo.reaction.keys', 1800, function() {
            return array_keys(config('cosmo.reactions'));
        });

        $this->validate($request, [
            'reaction' => ['required', Rule::in($reactions)]
        ]);
    }

    /**
     * @param Request $request
     * @param Post    $post
     * @return RedirectResponse
     * @throws ValidationException
     */
    public function post(Request $request, Post $post): RedirectResponse
    {
        $this->validateRequest($request);

        if (!$post->canReact(auth()->id())) {
            toastr()->error('You have already reacted to this post!');
            return redirect()->back();
        }

        $post->react(request('reaction'));
        return redirect()->route('forums.posts.show', $post->id);
    }

    /**
     * @param Request $request
     * @param Thread  $thread
     * @return RedirectResponse
     * @throws ValidationException
     */
    public function thread(Request $request, Thread $thread): RedirectResponse
    {
        $this->validateRequest($request);

        if (!$thread->canReact(auth()->id())) {
            toastr()->error('You have already reacted to this thread!');
            return redirect()->back();
        }

        $thread->react(request('reaction'));
        return redirect()->route('forums.threads.show', $thread->id);
    }
}
