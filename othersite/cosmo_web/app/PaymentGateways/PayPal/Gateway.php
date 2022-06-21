<?php

namespace App\PaymentGateways\PayPal;

use App\Contracts\PaymentGateway;
use App\Models\Store\Package;
use App\Models\User;
use App\PaymentGateways\PayPal\Order\CreateOrder;
use Illuminate\Http\RedirectResponse;

class Gateway implements PaymentGateway
{
    /**
     * The gateway name shown in the UI
     *
     * @var string
     */
    public static $name = 'PayPal';

    /**
     * The icon representing the gateway, used for UI purposes
     *
     * @var string
     */
    public static $icon = 'fab fa-paypal';

    public static function isEnabled(): bool
    {
        return config('cosmo.configs.paypal_gateway_enabled') ?? false;
    }

    public function createOrder(User $buyer, Package $package, float $price, string $receiver = null): RedirectResponse
    {
        return (new CreateOrder($package, $buyer, $receiver, $price))->execute();
    }
}