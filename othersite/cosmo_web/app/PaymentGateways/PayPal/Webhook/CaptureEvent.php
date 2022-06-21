<?php

namespace App\PaymentGateways\PayPal\Webhook;

use App\Models\Store\Order;
use App\Models\Store\Transactions\PayPalTransaction;
use Illuminate\Http\Request;

class CaptureEvent
{
    /** @var object $body */
    private $body;

    /**
     * CaptureEvent constructor.
     *
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->body = json_decode($request->getContent());
    }

    public function execute()
    {
        switch ($this->body->event_type) {
            case 'PAYMENT.CAPTURE.COMPLETED':
                $this->completed();
                break;
        }
    }

    private function completed()
    {
        /** @var PayPalTransaction $transaction */
        $transaction = PayPalTransaction::whereTransactionId($this->body->resource->id)->firstOrFail();
        if ($transaction->order->status !== Order::STATUS_PENDING) return;

        $transaction->order->update([
            'status' => Order::STATUS_WAITING_FOR_PACKAGE,
        ]);

        $transaction->order->createActions();
    }
}