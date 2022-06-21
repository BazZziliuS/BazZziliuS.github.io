<?php

namespace App\PaymentGateways\Coinbase\Webhook;

use Illuminate\Http\Request;

class WebhookHandler
{
    protected Request $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    protected function verifySignature(): bool
    {
        $signature = $this->request->header('X-CC-Webhook-Signature');

        $computed = hash_hmac(
            'sha256', $this->request->getContent(), config('cosmo.configs.coinbase_webhook_secret')
        );

        return hash_equals($signature, $computed);
    }

    public function __invoke()
    {
        if (!$this->verifySignature()) {
            abort(403);
        }

        $event = $this->request->json('event');
        $data = $event['data'];

        switch ($event['type']) {
            case 'charge:failed':
                $resource = new ChargeFailedHandler($data);
                break;

            case 'charge:confirmed':
            case 'charge:resolved':
                $resource = new ChargeCompletedHandler($data);
                break;

            default:
                abort(200);
        }

        return $resource();
    }
}