<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\PaymentGateways\PayPal\Order\CaptureOrder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class PayPalCaptureController extends Controller
{
    public function __invoke(Request $request): RedirectResponse
    {
        return (new CaptureOrder($request))->execute();
    }
}
