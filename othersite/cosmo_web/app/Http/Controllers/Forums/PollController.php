<?php

namespace App\Http\Controllers\Forums;

use App\Http\Controllers\Controller;
use App\Models\Forums\Poll;

class PollController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function store(Poll $poll)
    {
        $data = request()->validate([
           'answer' => [
               'required',
               function($attr, $value, $fail) use ($poll) {
                    if (!isset($poll->answers[$value]))
                        $fail('Invalid answer.');
               }
           ]
        ]);

        $poll->userAnswers()->create([
            'user_id' => auth()->id(),
            'answer' => $data['answer']
        ]);

        toastr()->success('You have successfully replied to the poll!');
        return redirect()->back();
    }
}
