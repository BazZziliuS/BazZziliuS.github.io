<?php

namespace App\Http\Controllers\Manage\Store;

use App\Http\Controllers\Controller;
use App\Http\Requests\Manage\SaleForm;
use App\Models\Store\Package;
use App\Models\Store\Sale;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

class SaleController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:manage-sales');
    }

    public function index()
    {
        $sales = Sale::all();
        $packages = Package::pluck('name', 'id');

        return view('manage.store.sales', compact('sales', 'packages'));
    }

    public function store(SaleForm $request)
    {
        $sale = Sale::create($request->validated());

        $packages = trim($request->post('packages'));
        $packages = (Str::length($packages) > 0) ? explode(",", $packages) : null;
        if ($packages) $sale->packages()->attach($packages);

        toastr()->success("Successfully created new sale!");
        return redirect()->route('manage.store.sales');
    }

    public function update(SaleForm $request, Sale $sale)
    {
        $sale->update($request->validated());

        $packages = trim($request->post('packages'));
        $packages = (Str::length($packages) > 0) ? explode(",", $packages) : null;
        $sale->packages()->sync($packages ?? []);

        toastr()->success("Successfully updated sale!");
        return redirect()->route('manage.store.sales');
    }

    /**
     * @param Sale $sale
     * @return RedirectResponse
     * @throws Exception
     */
    public function destroy(Sale $sale)
    {
        $sale->delete();

        toastr()->success("Successfully deleted sale!");
        return redirect()->route('manage.store.sales');
    }
}
