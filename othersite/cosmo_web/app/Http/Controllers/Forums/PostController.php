<?php

namespace App\Http\Controllers\Forums;

use App\Http\Controllers\Controller;
use App\Models\Forums\Post;
use App\Models\Forums\Thread;
use App\Notifications\ThreadReply;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;
use Illuminate\View\View;
use Mews\Purifier\Facades\Purifier;

/**
 * Class PostController
 * @package App\Http\Controllers\Forums
 */
class PostController extends Controller
{
    /**
     * @param Thread $thread
     * @return RedirectResponse
     */
    public function store(Thread $thread): RedirectResponse
    {
        if ($thread->locked) abort(403);

        $data = request()->validate([
            'content' => 'required|max:2000'
        ]);
        $content = Purifier::clean($data['content']);

        /** @var Post $post */
        $post = $thread->posts()->create([
            'user_id' => auth()->id(),
            'content' => $content
        ]);

        return redirect()->route('forums.posts.show', $post->id);
    }

    /**
     * @param Post $post
     * @return Application|RedirectResponse|Redirector
     */
    public function show(Post $post)
    {
        return redirect(route('forums.threads.show', $post->thread_id) . '#post-' . $post->id);
    }

    /**
     * @param Post $post
     * @return Application|Factory|View
     * @throws AuthorizationException
     */
    public function edit(Post $post)
    {
        $this->authorize('update', $post);

        return view('forums.posts.edit', compact('post'));
    }

    /**
     * @param Post $post
     * @return RedirectResponse
     * @throws AuthorizationException
     */
    public function update(Post $post)
    {
        $this->authorize('update', $post);

        $data = request()->validate([
            'content' => 'required|max:2000'
        ]);

        $content = Purifier::clean($data['content']);
        $post->update(['content' => $content]);

        toastr()->success('Successfully updated post!');
        return redirect()->route('forums.posts.show', $post->id);
    }

    /**
     * @param Post $post
     * @return RedirectResponse
     * @throws AuthorizationException
     * @throws Exception
     */
    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);
        $post->delete();

        toastr()->success('Successfully deleted post!');
        return redirect()->route('forums.threads.show', $post->thread_id);
    }
}
