<?php

namespace App\Http\Controllers\Manage\Index;

use App\Http\Controllers\Controller;
use App\Http\Requests\Manage\FooterLinkForm;
use App\Models\Index\FooterLink;
use Exception;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\View\View;

/**
 * Class FooterLinkController
 * @package App\Http\Controllers\Manage\Index
 */
class FooterLinkController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:manage-footerlinks');
    }

    /**
     * @return Application|Factory|View
     */
    public function index()
    {
        $links = FooterLink::all();
        return view('manage.index.components.footerlinks', compact('links'));
    }

    /**
     * @param FooterLinkForm $request
     * @return RedirectResponse
     */
    public function store(FooterLinkForm $request)
    {
        FooterLink::create($request->validated());
        Cache::forget('footerlinks');

        toastr()->success('Successfully created footer link!');
        return redirect()->route('manage.index.footerlinks');
    }

    /**
     * @param FooterLinkForm $request
     * @param FooterLink $link
     * @return RedirectResponse
     */
    public function update(FooterLinkForm $request, FooterLink $link)
    {
        $link->update($request->validated());
        Cache::forget('footerlinks');

        toastr()->success('Successfully updated footer link!');
        return redirect()->route('manage.index.footerlinks');
    }

    /**
     * @param FooterLink $link
     * @return RedirectResponse
     * @throws Exception
     */
    public function destroy(FooterLink $link)
    {
        $link->delete();
        Cache::forget('footerlinks');

        toastr()->success('Successfully deleted footer link!');
        return redirect()->route('manage.index.footerlinks');
    }
}
