<?php

namespace App\PaymentGateways\PayPal\Dispute;

use App\PaymentGateways\PayPal\ApiClient;
use Illuminate\Support\Facades\Http;
use PayPal\Core\PayPalConstants;
use PayPal\Exception\PayPalConfigurationException;

/**
 * @class Send Message
 * @classdesc Utilized for automatic dispute responses
 * @classdesc Extends from PayPalResourceModel to make use of the executeCall method
 * @package App\PayPal\Dispute
 */
class SendMessage
{
    private $message;
    private $dispute;

    public function __construct($dispute, $message)
    {
        $this->dispute = $dispute;
        $this->message = $message;
    }

    /**
     * @throws \PayPal\Exception\PayPalConfigurationException
     */
    public function execute()
    {
        $client = ApiClient::client();
        $baseUrl = $this->getBaseURL($client->getConfig());
        $token = $client->getCredential()->getAccessToken($client->getConfig());

        Http::withToken($token)->post($baseUrl.'v1/customer/disputes/'.$this->dispute.'/send-message', [
            'message' => $this->message,
        ]);
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
}