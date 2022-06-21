<?php

namespace App\Http\Controllers\Forums;

use App\Http\Controllers\Controller;
use App\Models\Forums\Board;

class BoardController extends Controller
{
    public function __invoke(Board $board)
    {
        $board->load('subBoards');

        $threads = $board->threads()
            ->with('latestPost', 'latestPost.user')
            ->withCount('posts')
            ->orderBy('stickied', 'DESC')
            ->orderBy('updated_at', 'DESC')
            ->paginate(15);

        return view('forums.boards.show', compact('board', 'threads'));
    }
}
