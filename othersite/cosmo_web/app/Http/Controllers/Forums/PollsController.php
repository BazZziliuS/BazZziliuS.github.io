<?php

namespace App\Http\Controllers\Forums;

use App\Http\Controllers\Controller;
use App\Models\Forums\Poll;
use Illuminate\Http\Request;

class PollsController extends Controller
{
    public function index(Request $request)
    {
        $polls = Poll::query();
        $search = $request->get('search');

        if ($request->has('search')) {
            $polls->where('title', 'LIKE', '%' . $request->get('search') . '%');
        }

        return view('forums.polls.index', [
            'polls' => $polls
                ->paginate(20),
            'search' => $search
        ]);
    }

    public function show(Poll $poll)
    {
        return view('forums.polls.show', [
            'poll' => $poll,
            'hasAnswered' => auth()->check() && $poll->userHasAnswered(auth()->user())
        ]);
    }

    public function storeAnswer()
    {

    }
}