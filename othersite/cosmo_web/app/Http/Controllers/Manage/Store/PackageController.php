<?php

namespace App\Http\Controllers\Manage\Store;

use App\Http\Controllers\Controller;
use App\Http\Requests\Manage\PackageForm;
use App\Models\Index\Server;
use App\Models\Store\Package;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class PackageController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:manage-packages');
    }

    public function index(Request $request)
    {
        $servers = Server::pluck('id', 'name');

        $searchFilter = $request->get('search');
        $serverFilter = explode(',', $request->get('servers', ''));
        $withDisabled = (bool) $request->get('withDisabled', false);

        $builder = Package::withoutGlobalScopes()->whereHas('servers', function($query) use ($serverFilter, $searchFilter) {
            if (!empty($serverFilter[0])) {
                $query->whereIn('id', $serverFilter);
            }
        });

        if (!is_null($searchFilter)) $builder->where('name', 'LIKE', "%$searchFilter%");
        if (!$withDisabled) $builder->whereNull('deleted_at');

        $packages = $builder->get();

        return view('manage.store.packages.manage', compact('packages', 'servers', 'serverFilter', 'searchFilter'));
    }

    public function filter(Request $request)
    {
        $servers = $request->get('servers');
        $search = $request->get('search');
        $withDisabled = $request->get('withDisabled', false);

        return redirect()->route('manage.store.packages', [
            'servers' => $servers, 'search' => $search, 'withDisabled' => $withDisabled
        ]);
    }

    public function create()
    {
        $servers = Server::pluck('id', 'name');
        $packages = Package::pluck('id', 'name');

        return view('manage.store.packages.create', compact('servers', 'packages'));
    }

    public function clone(Package $package)
    {
        return $package->toJson();
    }

    public function store(PackageForm $request)
    {
        $package = Package::create(array_merge(
            $request->validated(),
            [
                'permanent' => $request->get('permanent', false),
                'rebuyable' => $request->get('rebuyable', false),
                'custom_price' => $request->get('custom_price', false),
                'actions' => $request->get('actions'),
            ]
        ));

        $servers = explode(',', $request->post('servers'));
        if ($servers !== false) $package->servers()->attach($servers);

        toastr()->success('Successfully created a new package!');
        return redirect()->route('manage.store.packages');
    }

    public function edit(Package $package)
    {
        $servers = Server::pluck('id', 'name');
        $package->servers = $package->servers()->pluck('id');

        return view('manage.store.packages.edit', compact('package', 'servers'));
    }

    public function update(PackageForm $request, Package $package)
    {
        $package->update(array_merge(
            $request->validated(),
            [
                'permanent' => $request->get('permanent', false),
                'rebuyable' => $request->get('rebuyable', false),
                'custom_price' => $request->get('custom_price', false),
                'actions' => $request->get('actions'),
            ]
        ));

        $servers = explode(',', $request->post('servers'));
        if ($servers !== false) {
            $package->servers()->sync($servers);
        }

        toastr()->success('Successfully updated package!');
        return redirect()->route('manage.store.packages.edit', $package->id);
    }

    /**
     * @param Package $package
     * @return RedirectResponse
     * @throws Exception
     */
    public function destroy(Package $package)
    {
        $package->delete();

        toastr()->success('Successfully deleted the package!');
        return redirect()->route('manage.store.packages');
    }

    public function enable($package)
    {
        $package = Package::withTrashed()->findOrFail($package);

        if (!$package->deleted_at) {
            toastr()->error('This package is not disabled!');
        } else {
            $package->restore();
            toastr()->success('Package is now enabled!');
        }

        return redirect()->back();
    }
}
