<?php

use App\Http\Controllers\Api\Game\StoreController;
use App\PaymentGateways\PayPal\Webhook\WebhookEvent;
use App\PaymentGateways\Stripe\Webhook\WebhookHandler as StripeWebhookHandler;
use App\PaymentGateways\Coinbase\Webhook\WebhookHandler as CoinbaseWebhookHandler;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// PayPal webhook route
Route::post('/paypal', [WebhookEvent::class, 'execute']);

Route::post('/stripe', StripeWebhookHandler::class);
Route::post('/coinbase', CoinbaseWebhookHandler::class);

Route::prefix('/game')->middleware(['game'])->group(function() {
    Route::prefix('/store')->group(function() {
        Route::get('/pending', [StoreController::class, 'pending']);

        Route::put('/actions/{action}/complete', [StoreController::class, 'completeAction']);
        Route::put('/actions/{action}/expire', [StoreController::class, 'expireAction']);

        Route::put('/orders/{order}/deliver', [StoreController::class, 'deliverOrder']);
    });
});