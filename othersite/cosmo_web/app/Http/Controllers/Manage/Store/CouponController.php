<?php

namespace App\Http\Controllers\Manage\Store;

use App\Http\Controllers\Controller;
use App\Http\Requests\Manage\CouponForm;
use App\Models\Store\Coupon;
use App\Models\Store\Package;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

class CouponController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:manage-coupons');
    }

    public function index()
    {
        $coupons = Coupon::with('uses', 'packages')->get();
        $packages = Package::pluck('id', 'name');

        return view('manage.store.coupons', compact('coupons', 'packages'));
    }

    public function store(CouponForm $request)
    {
        $coupon = Coupon::create($request->validated());

        $packages = trim($request->post('packages'));
        $packages = (Str::length($packages) > 0) ? explode(",", $packages) : null;
        if ($packages) $coupon->packages()->attach($packages);

        toastr()->success('Successfully created new coupon code!');
        return redirect()->route('manage.store.coupons');
    }

    public function update(CouponForm $request, Coupon $coupon)
    {
        $coupon->update($request->validated());

        $packages = trim($request->post('packages'));
        $packages = (Str::length($packages) > 0) ? explode(",", $packages) : null;
        $coupon->packages()->sync($packages ?? []);

        toastr()->success('Successfully updated the coupon code!');
        return redirect()->route('manage.store.coupons');
    }

    /**
     * @param Coupon $coupon
     * @return RedirectResponse
     * @throws Exception
     */
    public function destroy(Coupon $coupon)
    {
        $coupon->delete();

        toastr()->success('Successfully deleted the coupon code!');
        return redirect()->route('manage.store.coupons');
    }
}
