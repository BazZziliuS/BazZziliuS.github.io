<?php

namespace App\Contracts;

use App\Models\Store\Package;
use App\Models\User;
use Illuminate\Http\RedirectResponse;

interface PaymentGateway
{
    public static function isEnabled(): bool;

    public function createOrder(
        User $buyer, Package $package, float $price, string $receiver = null
    ): RedirectResponse;
}