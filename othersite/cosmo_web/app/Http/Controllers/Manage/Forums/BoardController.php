<?php

namespace App\Http\Controllers\Manage\Forums;

use App\Http\Controllers\Controller;
use App\Http\Requests\Manage\BoardForm;
use App\Models\Forums\Board;
use App\Models\Forums\Category;
use App\Models\Role;
use Exception;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

/**
 * Class BoardController
 * @package App\Http\Controllers\Manage\Forums
 */
class BoardController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:manage-boards');
    }

    /**
     * @return Application|Factory|View
     */
    public function index()
    {
        $boards = Board::all()->groupBy('parent_id');
        $categories = Category::all();
        $roles = Role::all();

        return view('manage.forums.boards', compact('boards', 'categories', 'roles'));
    }

    /**
     * @param BoardForm $request
     * @return RedirectResponse
     */
    public function store(BoardForm $request)
    {
        /** @var Category $category */
        $category = Category::where('name', $request->post('category'))->firstOrFail();
        $category->boards()->create(array_merge($request->validated(), [
            'roles' => $request->roles ?? []
        ]));

        toastr()->success('Successfully created board!');
        return redirect()->route('manage.forums.boards');
    }

    /**
     * @param BoardForm $request
     * @param Board $board
     * @return RedirectResponse
     */
    public function update(BoardForm $request, Board $board)
    {
        $category = Category::where('name', $request->post('category'))->firstOrFail();

        $board->update(array_merge(
            $request->validated(),
            ['category_id' => $category->id, 'roles' => $request->roles ?? []]
        ));

        toastr()->success('Successfully updated board!');
        return redirect()->route('manage.forums.boards');
    }

    /**
     * @param Board $board
     * @return RedirectResponse
     * @throws Exception
     */
    public function destroy(Board $board)
    {
        $board->delete();

        toastr()->success('Successfully deleted board!');
        return redirect()->route('manage.forums.boards');
    }

    public function sort()
    {
        $board = Board::findOrFail(request('boardId'));
        $parent = Board::find(request('parentId'));

        if(!is_null($parent) && $board->category_id !== $parent->category_id) return;

        $board->update([
           'parent_id' => $parent ? request('parentId') : null
        ]);

        toastr()->success('Successfully sorted the boards!');
    }
}
