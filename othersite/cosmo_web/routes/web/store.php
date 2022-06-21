<?php

use App\Http\Controllers\Store\PayPalCaptureController;
use App\Http\Controllers\Store\StripeController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Store\ServerController;
use App\Http\Controllers\Store\TOSController;
use App\Http\Controllers\Store\CheckoutController;

/*
|--------------------------------------------------------------------------
| Store Routes
|--------------------------------------------------------------------------
*/

Route::get('/', [ServerController::class, 'index'])->name('index');
Route::get('/tos', [TOSController::class, 'index'])->name('tos');

Route::get('/servers/{server}', [ServerController::class, 'show'])->name('servers.show');

Route::get('/checkout/cancel', [CheckoutController::class, 'cancel'])->name('checkout.cancel');
Route::get('/checkout/execute', [CheckoutController::class, 'execute'])->name('checkout.execute');
Route::view('/checkout/success', 'store.checkout.success')->name('checkout.success');
Route::view('/checkout/fail', 'store.checkout.fail')->name('checkout.fail');

Route::get('/checkout/paypal/capture', PayPalCaptureController::class)
    ->name('checkout.paypal.capture');

Route::get('/checkout/stripe/cancel', [StripeController::class, 'cancel'])->name('checkout.stripe.cancel');
Route::get('/checkout/stripe/{session}', [StripeController::class, 'redirect'])->name('checkout.stripe.redirect');

Route::get('/checkout/{package}', [CheckoutController::class, 'show'])->name('checkout.show');

Route::post('/checkout/{package}/{gateway}', [CheckoutController::class, 'purchase'])
//    ->middleware('throttle:3,1')
    ->name('checkout.purchase');

