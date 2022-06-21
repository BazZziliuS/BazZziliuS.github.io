<?php

namespace App\PaymentGateways\Stripe;

use App\Contracts\PaymentGateway;
use App\Models\Store\Package;
use App\Models\Store\Transactions\StripeTransaction;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Stripe\StripeClient;

class Gateway implements PaymentGateway
{
    /**
     * The gateway name shown in the UI
     *
     * @var string
     */
    public static $name = 'Stripe';

    /**
     * The icon representing the gateway, used for UI purposes
     *
     * @var string
     */
    public static $icon = 'fab fa-stripe';

    public static function isEnabled(): bool
    {
        return config('cosmo.configs.stripe_gateway_enabled') ?? false;
    }

    protected $client;

    public function __construct()
    {
        $this->client = new StripeClient(
            config('cosmo.configs.stripe_secret_key')
        );
    }

    /**
     * @throws \Stripe\Exception\ApiErrorException
     */
    public function createOrder(User $buyer, Package $package, float $price, string $receiver = null): RedirectResponse
    {
        $paymentMethods = json_decode(config('cosmo.configs.stripe_payment_methods', []));
        if (empty($paymentMethods)) {
            toastr()->error('There are no payment methods set for Stripe checkout.');
            return redirect()->back();
        }

        $session = $this->client->checkout->sessions->create([
            'mode' => 'payment',
            'payment_method_types' => $paymentMethods,
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => config('cosmo.configs.store_currency', 'USD'),
                        'unit_amount_decimal' => $price * 100,
                        'product_data' => [
                            'name' => $package->name,
                        ]
                    ],
                    'quantity' => 1
                ]
            ],
            'submit_type' => 'pay',
            'cancel_url' => route('store.checkout.stripe.cancel'),
            'success_url' => route('store.checkout.success')
        ]);

        StripeTransaction::create([
            'session_id' => $session->id
        ])->order()->create([
            'price' => $price,
            'ip_address' => request()->ip(),
            'receiver' => $receiver,
            'package_id' => $package->id,
            'buyer_id' => $buyer->id,
            'status' => 'waiting_for_payment'
        ]);

        return redirect()->route('store.checkout.stripe.redirect', $session->id);
    }
}