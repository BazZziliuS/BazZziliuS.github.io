<?php

namespace App\Http\Controllers\Forums;

use App\Achievements\FirstThread;
use App\Events\ThreadActionExecuted;
use App\Http\Controllers\Controller;
use App\Http\Requests\ThreadForm;
use App\Models\Forums\Board;
use App\Models\Forums\Category;
use App\Models\Forums\Thread;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Mews\Purifier\Facades\Purifier;

class ThreadController extends Controller
{
    public function index()
    {
        $search = request('search');
        $query = Thread::with('user', 'posts');

        if ($search) {
            $query->where('title','LIKE','%'. $search .'%');
        }

        return view('forums.threads.index', [
            'threads' => $query->paginate(20)->appends('search', $search)
        ]);
    }

    public function search()
    {
        return redirect()->route('forums.threads', [
            'search' => request()->input('search')
        ]);
    }

    /**
     * @param Board $board
     * @return Application|Factory|View
     * @throws AuthorizationException
     */
    public function create(Board $board)
    {
        $this->authorize('create', [Thread::class, $board]);

        return view('forums.threads.create', compact('board'));
    }

    /**
     * @param ThreadForm $request
     * @param Board      $board
     * @return RedirectResponse
     * @throws AuthorizationException
     */
    public function store(ThreadForm $request, Board $board)
    {
        $this->authorize('create', [Thread::class, $board]);
        $content = Purifier::clean(request('content'));

        /** @var Thread $thread */
        $thread = $board->threads()->create([
            'title' => request('title'),
            'content' => $content,
            'user_id' => auth()->id()
        ]);

        if (!$request->user()->hasAchievement(FirstThread::class))
            $request->user()->achieve(FirstThread::class);

        toastr()->success('Successfully created new thread!');
        return redirect()->route('forums.threads.show', $thread->id);
    }

    public function show(Thread $thread)
    {
        $thread->load('reactions');

        $posts = $thread->posts()->with([
            'user', 'user.role', 'user.profile', 'reactions'
        ])->paginate(8);

        [$categories, $canManageThreads, $canMoveThreads] = [null, false, false];
        if (auth()->check()) {
            $canManageThreads = auth()->user()->can('manage-threads');

            if ($canManageThreads && $canMoveThreads = auth()->user()->can('move-threads')) {
                $categories = Category::with('boards')->get();
            }
        }

        return view('forums.threads.show', compact(
            'thread', 'posts', 'categories', 'canManageThreads', 'canMoveThreads'
        ));
    }


    public function edit(Thread $thread)
    {
        $this->authorize('update', $thread);

        return view('forums.threads.edit', compact('thread'));
    }

    /**
     * @param ThreadForm $request
     * @param Thread     $thread
     * @return RedirectResponse
     * @throws AuthorizationException
     */
    public function update(ThreadForm $request, Thread $thread)
    {
        $this->authorize('update', $thread);

        $thread->update($request->validated());

        toastr()->success('Successfully updated thread!');
        return redirect()->route('forums.threads.show', $thread->id);
    }

    /**
     * @param Thread $thread
     * @return RedirectResponse
     * @throws AuthorizationException
     * @throws Exception
     */
    public function destroy(Thread $thread)
    {
        $this->authorize('delete', $thread);

        $thread->delete();

        toastr()->success('Successfully deleted thread!');
        return redirect()->route('forums.boards.show', $thread->board_id);
    }

    /**
     * @param Thread $thread
     * @return RedirectResponse
     * @throws AuthorizationException
     */
    public function sticky(Thread $thread)
    {
        $this->authorize('sticky', $thread);

        $thread->update([
            'stickied' => !($thread->stickied)
        ]);

        ThreadActionExecuted::dispatch($thread, auth()->user(), 'stickied');

        toastr()->success('Successfully ' . ($thread->stickied ? '' : 'un') . 'pinned thread!');
        return redirect()->route('forums.threads.show', $thread->id);
    }

    /**
     * @param Thread $thread
     * @return RedirectResponse
     * @throws AuthorizationException
     */
    public function lock(Thread $thread)
    {
        $this->authorize('lock', $thread);

        $thread->update([
            'locked' => !($thread->locked)
        ]);

        ThreadActionExecuted::dispatch($thread, auth()->user(), 'locked');

        toastr()->success('Successfully ' . ($thread->locked ? '' : 'un') . 'locked thread!');
        return redirect()->route('forums.threads.show', $thread->id);
    }

    /**
     * @param Thread $thread
     * @return RedirectResponse
     * @throws AuthorizationException
     */
    public function move(Thread $thread)
    {
        $this->authorize('move', $thread);

        $boardId = request('board');
        if (is_null($boardId)) abort(404);

        $board = Board::findOrFail($boardId);

        $thread->update([
            'board_id' => $board->id
        ]);

        ThreadActionExecuted::dispatch($thread, auth()->user(), 'moved');

        toastr()->success('Successfully moved the thread!');
        return redirect()->route('forums.threads.show', $thread->id);
    }
}
