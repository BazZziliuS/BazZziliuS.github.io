<?php

namespace App\Http\Controllers\Manage\Index;

use App\Http\Controllers\Controller;
use App\Http\Requests\Manage\FeatureForm;
use App\Models\Index\Feature;
use Exception;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\View\View;

/**
 * Class FeatureController
 * @package App\Http\Controllers\Manage\Index
 */
class FeatureController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:manage-features');
    }

    /**
     * @return Application|Factory|View
     */
    public function index()
    {
        $features = Feature::all();
        return view('manage.index.components.features', compact('features'));
    }

    /**
     * @param FeatureForm $request
     * @return RedirectResponse
     */
    public function store(FeatureForm $request)
    {
        Feature::create($request->validated());
        Cache::forget('features');

        toastr()->success('Successfully created new feature!');
        return redirect()->route('manage.index.features');
    }

    /**
     * @param FeatureForm $request
     * @param Feature $feature
     * @return RedirectResponse
     */
    public function update(FeatureForm $request, Feature $feature)
    {
        $feature->update($request->validated());
        Cache::forget('features');

        toastr()->success('Successfully updated the feature!');
        return redirect()->route('manage.index.features');
    }

    /**
     * @param Feature $feature
     * @return RedirectResponse
     * @throws Exception
     */
    public function destroy(Feature $feature)
    {
        $feature->delete();
        Cache::forget('features');

        toastr()->success('Successfully deleted feature!');
        return redirect()->route('manage.index.features');
    }
}
