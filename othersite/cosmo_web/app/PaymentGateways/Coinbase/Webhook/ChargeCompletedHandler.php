<?php

namespace App\PaymentGateways\Coinbase\Webhook;

use App\Models\Store\Order;
use App\Models\Store\Transactions\CoinbaseTransaction;

class ChargeCompletedHandler
{
    protected array $data;

    public function __construct(array $data)
    {
        $this->data = $data;
    }

    public function __invoke()
    {
        /** @var CoinbaseTransaction $transaction */
        $transaction = CoinbaseTransaction::whereChargeId($this->data['id'])->first();
        if (!$transaction || $transaction->order->status !== Order::STATUS_WAITING_FOR_PAYMENT) return;

        $transaction->order->update([
            'status' => Order::STATUS_WAITING_FOR_PACKAGE
        ]);

        $transaction->order->createActions();
    }
}