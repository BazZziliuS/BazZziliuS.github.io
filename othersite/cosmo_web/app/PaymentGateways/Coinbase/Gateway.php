<?php

namespace App\PaymentGateways\Coinbase;

use App\Contracts\PaymentGateway;
use App\Models\Store\Order;
use App\Models\Store\Package;
use App\Models\Store\Transactions\CoinbaseTransaction;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Http;

class Gateway implements PaymentGateway
{
    /**
     * The gateway name shown in the UI
     *
     * @var string
     */
    public static string $name = 'Coinbase';

    /**
     * The icon representing the gateway, used for UI purposes
     *
     * @var string
     */
    public static string $icon = 'fab fa-bitcoin';

    public static function isEnabled(): bool
    {
        return (bool) config('cosmo.configs.coinbase_gateway_enabled', false);
    }

    public function createOrder(User $buyer, Package $package, float $price, string $receiver = null): RedirectResponse
    {
        // TODO: move paypal cancel route to seperate route and make generic cancel route for stripe & coinbase

        $response = Http::withHeaders([
            'X-CC-Version' => '2018-03-22',
            'X-CC-Api-Key' => config('cosmo.configs.coinbase_api_key')
        ])->acceptJson()->post('https://api.commerce.coinbase.com/charges', [
            'name' => $package->name,
            'description' => '',
            'local_price' => [
                'amount' => $price,
                'currency' => config('cosmo.configs.store_currency')
            ],
            'pricing_type' => 'fixed_price',
            'redirect_url' => route('store.checkout.success'),
            'cancel_url' => route('store.checkout.cancel')
        ]);

        if (!$data = $response->json('data')) {
            return redirect()->route('store.checkout.fail');
        }

        CoinbaseTransaction::create([
            'charge_id' => $data['id'],
            'charge_code' => $data['code']
        ])->order()->create([
            'price' => $price,
            'ip_address' => request()->ip(),
            'receiver' => $receiver,
            'package_id' => $package->id,
            'buyer_id' => $buyer->id,
            'status' => Order::STATUS_WAITING_FOR_PAYMENT,
        ]);

        return redirect()->to($data['hosted_url']);
    }
}