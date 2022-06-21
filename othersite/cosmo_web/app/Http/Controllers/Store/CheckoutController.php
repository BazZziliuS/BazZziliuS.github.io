<?php

namespace App\Http\Controllers\Store;

use App\Contracts\PaymentGateway;
use App\Http\Controllers\Controller;
use App\Http\Requests\CheckoutRequest;
use App\Models\Store\Package;
use App\Models\Store\Order;
use App\Models\Store\Transactions\PayPalTransaction;
use App\Models\User;
use Illuminate\Http\Request;
use InvalidArgumentException;
use SteamID;

class CheckoutController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function show(Package $package)
    {
        if ($package->custom_price && request()->input('custom-price', 0) <= 0) {
            toastr()->error('The custom price must be a valid price!');
            return redirect()->back();
        }

        $gateways = config('cosmo.payment_gateways');

        return view('store.checkout.show', [
            'package' => $package,
            'gateways' => $gateways,
            'gateway_urls' => collect($gateways)->mapWithKeys(function($item, $name) use ($package) {
                $route = route('store.checkout.purchase', ['package' => $package->id, 'gateway' => $name]);

                return [$name => $route];
            })
        ]);
    }

    public function purchase(CheckoutRequest $request, Package $package, string $gateway)
    {
        // Validate the gateway first, no need to do calculations first
        $gateway = config("cosmo.payment_gateways.$gateway");
        if (!$gateway || !class_exists($gateway)) abort(404);

        $gateway = new $gateway;
        if (!$gateway || !($gateway instanceof PaymentGateway)) abort(404);

        $buyer = auth()->user();
        $receiver = $buyer->steamid;

        if (!$package->rebuyable && $buyer->orders()->where('package_id', $package->id)->exists()) {
            toastr()->error('You can\'t buy this package more than once!');
            return redirect()->back();
        }

        if ($gift = $request->input('gift')) {
            $steamId = null;
            try {
                $steamId = new SteamID($gift);
            } catch (InvalidArgumentException $ex) {}

            if (!$steamId || !$steamId->IsValid() || $steamId->GetAccountType() !== SteamID::TypeIndividual) {
                toastr()->error('Invalid gift SteamID.');
                return redirect()->back();
            }

            $receiver = $steamId->ConvertToUInt64();
        }

        if (!$package->custom_price) {
            $percentage = 100;
            $curDate = now();

            if (!is_null($request->input('coupon'))) {
                $code = $package->coupons()
                    ->where('code', $request->input('coupon'))
                    ->where('starts_at', '<', $curDate)
                    ->where('expires_at', '>', $curDate)
                    ->first();

                if (is_null($code)) {
                    toastr()->error('Invalid coupon code.');
                    return redirect()->back();
                }

                if ($code->use_amount !== 0 && $code->uses()->count() >= $code->use_amount) {
                    toastr()->error('Coupon code has already been used.');
                    return redirect()->back();
                }

                $percentage -= (int) $code->percentage;
            }

            $price = $package->finalPrice * ($percentage / 100);

            if ($price <= 0) {
                return $this->giveFreePackage($package, $buyer, $receiver);
            }
        } else {
            if (!$request->has('custom_price')) {
                toastr()->error('You need to specify the amount you want to donate!');
                return redirect()->back();
            }

            $customPrice = (float) $request->input('custom_price');
            if ($customPrice <= 0) {
                toastr()->error('The custom price must be a valid price!');
                return redirect()->back();
            }

            $price = $customPrice;
        }

        return $gateway->createOrder($buyer, $package, $price, $receiver);
    }

    protected function giveFreePackage(Package $package, User $buyer, string $receiver)
    {
        $buyer->orders()->create([
            'receiver' => $receiver,
            'package_id' => $package->id,
            'status' => Order::STATUS_WAITING_FOR_PACKAGE,
            'ip_address' => request()->getClientIp(),
            'price' => 0
        ])->createActions();

        return redirect()->route('store.checkout.success');
    }

    public function cancel(Request $request)
    {
        if (!$request->has('token')) abort(404);

        $orderId = $request->get('token');

        /** @var PayPalTransaction $transaction */
        $transaction = PayPalTransaction::whereOrderId($orderId)->whereHas('order')->firstOrFail();
        if ($transaction->order->status !== Order::STATUS_WAITING_FOR_PAYMENT) abort(404);

        $transaction->order->delete();

        return view('store.checkout.cancel');
    }
}
