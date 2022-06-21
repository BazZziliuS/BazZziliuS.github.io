<?php

namespace App\Http\Controllers\Manage\Index;

use App\Http\Controllers\Controller;
use App\Http\Requests\Manage\NavLinkForm;
use App\Models\Index\NavLink;
use Exception;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\View\View;

/**
 * Class NavLinkController
 * @package App\Http\Controllers\Manage\Index
 */
class NavLinkController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:manage-navlinks');
    }

    /**
     * @return Application|Factory|View
     */
    public function index()
    {
        $links = NavLink::all();
        return view('manage.index.components.navlinks', compact('links'));
    }

    /**
     * @param NavLinkForm $request
     * @return RedirectResponse
     */
    public function store(NavLinkForm $request)
    {
        NavLink::create($request->validated());
        Cache::forget('navlinks');

        toastr()->success('Successfully created a navigation link!');
        return redirect()->route('manage.index.navlinks');
    }

    /**
     * @param NavLinkForm $request
     * @param NavLink $link
     * @return RedirectResponse
     */
    public function update(NavLinkForm $request, NavLink $link)
    {
        $link->update($request->validated());
        Cache::forget('navlinks');

        toastr()->success('Successfully updated navigation link!');
        return redirect()->route('manage.index.navlinks');
    }

    /**
     * @param NavLink $link
     * @return RedirectResponse
     * @throws Exception
     */
    public function destroy(NavLink $link)
    {
        $link->delete();
        Cache::forget('navlinks');

        toastr()->success('Successfully deleted navigation link!');
        return redirect()->route('manage.index.navlinks');
    }
}
