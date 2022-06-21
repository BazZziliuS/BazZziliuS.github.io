<?php

namespace App\PaymentGateways\Stripe\Webhook;

use Illuminate\Http\Request;
use Stripe\Exception\SignatureVerificationException;
use Stripe\Exception\UnexpectedValueException;
use Stripe\Stripe;
use Stripe\Webhook;

class WebhookHandler
{
    /** @var \Illuminate\Http\Request */
    private $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

   public function __invoke()
   {
       try {
           Stripe::setApiKey(config('cosmo.configs.stripe_secret_key'));

           $event = Webhook::constructEvent(
               $this->request->getContent(),
               $this->request->header('stripe-signature'),
               config('cosmo.configs.stripe_webhook_secret')
           );
       } catch (SignatureVerificationException | UnexpectedValueException $ex) {
           abort(403);
       }

       switch ($event->type) {
           case 'checkout.session.completed':
               $resource = new CheckoutSessionCompletedHandler($event);
               break;
           case 'charge.dispute.created':
                $resource = new DisputeCreatedHandler($event);
                break;
           default:
               abort(200);
       }

       return $resource();
   }
}