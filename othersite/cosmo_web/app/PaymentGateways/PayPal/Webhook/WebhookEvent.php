<?php


namespace App\PaymentGateways\PayPal\Webhook;

use App\PaymentGateways\PayPal\ApiClient;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use PayPal\Api\VerifyWebhookSignature;
use PayPal\Core\PayPalConstants;
use PayPal\Exception\PayPalConfigurationException;
use Symfony\Component\HttpFoundation\HeaderBag;

class WebhookEvent
{
    private HeaderBag $headers;
    private string $body;
    private Request $request;

    /**
     * WebhookEvent constructor.
     *
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->headers = $request->headers;
        $this->body = $request->getContent();
        $this->request = $request;
    }

    /**
     * Verifies the webhook through the PayPal API
     *
     * @return bool
     * @throws \PayPal\Exception\PayPalConfigurationException
     */
    private function verify(): bool
    {
        $client = ApiClient::client();
        $baseUrl = $this->getBaseURL($client->getConfig());
        $token = $client->getCredential()->getAccessToken($client->getConfig());

        $res = Http::withToken($token)->post($baseUrl.'v1/notifications/verify-webhook-signature', [
            'auth_algo' => $this->headers->get('PAYPAL-AUTH-ALGO'),
            'cert_url' => $this->headers->get('PAYPAL-CERT-URL'),
            'transmission_id' => $this->headers->get('PAYPAL-TRANSMISSION-ID'),
            'transmission_sig' => $this->headers->get('PAYPAL-TRANSMISSION-SIG'),
            'transmission_time' => $this->headers->get('PAYPAL-TRANSMISSION-TIME'),
            'webhook_id' => config('cosmo.configs.paypal_webhook_id'),
            'webhook_event' => json_decode($this->body),
        ]);

        return $res->ok() && $res->json('verification_status') === 'SUCCESS';
    }

    /**
     * @param $config
     * @return mixed|string
     * @throws PayPalConfigurationException
     */
    private function getBaseURL($config)
    {
        if (isset($config['service.EndPoint'])) {
            return $config['service.EndPoint'];
        } elseif (isset($config['mode'])) {
            switch (strtoupper($config['mode'])) {
                case 'SANDBOX':
                    return PayPalConstants::REST_SANDBOX_ENDPOINT;
                case 'LIVE':
                    return PayPalConstants::REST_LIVE_ENDPOINT;
                default:
                    throw new PayPalConfigurationException('The mode config parameter must be set to either sandbox/live');
            }
        } else {
            // Defaulting to Sandbox
            return PayPalConstants::REST_SANDBOX_ENDPOINT;
        }
    }

    /**
     * Execute the webhook with the corresponding event class
     *
     * @throws PayPalConfigurationException
     * @throws GuzzleException
     */
    public function execute()
    {
        if (!$this->verify()) abort(404);

        $res_type = $this->request->get('resource_type');
        $res = null;

        switch ($res_type) {
            case 'capture':
                $res = new CaptureEvent($this->request);
                break;
            case 'dispute':
                $res = new DisputeEvent($this->request);
                break;
            default:
                abort(200);
        }

        $res->execute();
    }
}
