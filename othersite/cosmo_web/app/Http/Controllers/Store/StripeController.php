<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;

class StripeController extends Controller
{
    public function redirect($session)
    {
        return view('store.stripe.redirect', [
            'session' => $session
        ]);
    }

    public function cancel()
    {
        return view('store.checkout.cancel');
    }
}
