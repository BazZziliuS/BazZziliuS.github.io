<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Models\Profile\Comment;
use App\Models\User;
use App\Notifications\ProfileComment;
use Mews\Purifier\Facades\Purifier;

class CommentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function store(User $user)
    {
        $data = request()->validate([
           'content' => 'required|max:2000'
        ]);

        $user->profile->comments()->create([
            'user_id' => auth()->id(),
            'content' => Purifier::clean($data['content'])
        ]);

        toastr()->success('Successfully posted comment!');
        return redirect()->back();
    }

    public function update(User $user, Comment $comment)
    {
        $this->authorize('update', $comment);

        $data = request()->validate([
            'content' => 'required|max:2000'
        ]);

        $comment->update([
            'content' => Purifier::clean($data['content'])
        ]);

        toastr()->success('Successfully updated your comment!');
        return redirect()->back();
    }

    public function destroy(User $user, Comment $comment)
    {
        $this->authorize('delete', $comment);

        $comment->delete();

        toastr()->success('Successfully deleted the comment!');
        return redirect()->back();
    }
}
