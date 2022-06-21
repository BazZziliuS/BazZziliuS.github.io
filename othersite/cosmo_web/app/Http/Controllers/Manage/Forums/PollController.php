<?php

namespace App\Http\Controllers\Manage\Forums;

use App\Http\Controllers\Controller;
use App\Http\Requests\Manage\PollForm;
use App\Models\Forums\Poll;
use Exception;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

/**
 * Class PollController
 * @package App\Http\Controllers\Manage\Forums
 */
class PollController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:manage-polls');
    }

    /**
     * @return Application|Factory|View
     */
    public function index()
    {
        $polls = Poll::with('userAnswers', 'userAnswers.user')->get();
        return view('manage.forums.polls', compact('polls'));
    }

    /**
     * @param PollForm $request
     * @return RedirectResponse
     */
    public function store(PollForm $request)
    {
        Poll::create($request->validated());

        toastr()->success('Successfully started a new poll!');
        return redirect()->route('manage.forums.polls');
    }

    /**
     * @param PollForm $request
     * @param Poll $poll
     * @return RedirectResponse
     */
    public function update(PollForm $request, Poll $poll)
    {
        $poll->update($request->validated());

        toastr()->success('Successfully updated the poll!');
        return redirect()->route('manage.forums.polls');
    }

    /**
     * @param Poll $poll
     * @return RedirectResponse
     */
    public function close(Poll $poll)
    {
        $poll->update([
            'closed' => !$poll->closed
        ]);

        toastr()->success('Successfully ' . ($poll->closed ? 'closed' : 'opened') . ' the poll!');
        return redirect()->route('manage.forums.polls');
    }

    /**
     * @param Poll $poll
     * @return RedirectResponse
     * @throws Exception
     */
    public function destroy(Poll $poll)
    {
        $poll->delete();

        toastr()->success('Successfully deleted the poll!');
        return redirect()->route('manage.forums.polls');
    }
}
