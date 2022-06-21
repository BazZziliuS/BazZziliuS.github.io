<?php

namespace App\Http\Controllers\Manage\Forums;

use App\Http\Controllers\Controller;
use App\Http\Requests\Manage\CategoryForm;
use App\Models\Forums\Category;
use Exception;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

/**
 * Class CategoryController
 * @package App\Http\Controllers\Manage\Forums
 */
class CategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:manage-categories');
    }

    /**
     * @return Application|Factory|View
     */
    public function index()
    {
        $categories = Category::all();
        return view('manage.forums.categories', compact('categories'));
    }

    /**
     * @param CategoryForm $request
     * @return RedirectResponse
     */
    public function store(CategoryForm $request)
    {
        Category::create($request->validated());

        toastr()->success('Successfully created new category!');
        return redirect()->route('manage.forums.categories');
    }

    /**
     * @param CategoryForm $request
     * @param Category $category
     * @return RedirectResponse
     */
    public function update(CategoryForm $request, Category $category)
    {
        $category->update($request->validated());

        toastr()->success('Successfully updated category!');
        return redirect()->route('manage.forums.categories');
    }

    /**
     * @param Category $category
     * @return RedirectResponse
     * @throws Exception
     */
    public function destroy(Category $category)
    {
        $category->delete();

        toastr()->success('Successfully deleted category!');
        return redirect()->route('manage.forums.categories');
    }
}
