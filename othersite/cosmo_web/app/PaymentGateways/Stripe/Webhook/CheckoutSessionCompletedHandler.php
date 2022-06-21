<?php

namespace App\PaymentGateways\Stripe\Webhook;

use App\Models\Store\Order;
use App\Models\Store\Transactions\StripeTransaction;
use Stripe\Checkout\Session;
use Stripe\Event;

class CheckoutSessionCompletedHandler
{
    /** @var \Stripe\Event */
    protected $event;

    /** @var Session */
    protected $session;

    public function __construct(Event $event)
    {
        $this->event = $event;
        $this->session = Session::constructFrom($event->data['object']->toArray());
    }

    public function __invoke()
    {
        /** @var StripeTransaction $transaction */
        $transaction = StripeTransaction::whereSessionId($this->session->id)->first();

        $transaction->update([
            'payment_intent_id' => $this->session->payment_intent,
            'buyer_email' => $this->session->customer_details ? $this->session->customer_details['email'] : null
        ]);

        $transaction->order->update([
            'status' => Order::STATUS_WAITING_FOR_PACKAGE,
        ]);

        $transaction->order->createActions();
    }
}