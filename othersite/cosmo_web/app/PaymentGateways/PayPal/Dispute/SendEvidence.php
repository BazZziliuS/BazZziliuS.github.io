<?php

namespace App\PaymentGateways\PayPal\Dispute;

use App\Models\Store\Order;
use App\PaymentGateways\PayPal\ApiClient;
use Barryvdh\DomPDF\Facade as PDF;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use PayPal\Core\PayPalConstants;
use PayPal\Exception\PayPalConfigurationException;

class SendEvidence
{
    /** @var string $disputeId */
    private $disputeId;

    /** @var Order $transaction */
    private $transaction;

    /** @var Client $client */
    private $client;

    public function __construct(string $disputeId, Order $transaction)
    {
        $this->disputeId = $disputeId;
        $this->transaction = $transaction;
        $this->client = new Client();
    }

    /**
     * @throws PayPalConfigurationException
     * @throws GuzzleException
     */
    public function execute()
    {
        $client = ApiClient::client();
        $pdf = PDF::loadView('pdf.evidence', [
            'order' => $this->transaction
        ]);

        $baseUrl = $this->getBaseURL(ApiClient::client()->getConfig());
        $token = $client->getCredential()->getAccessToken($client->getConfig());

        $this->client->post("{$baseUrl}v1/customer/disputes/{$this->disputeId}/provide-evidence", [
            "headers" => [
                "Authorization" => "Bearer $token"
            ],
            "multipart" => [
                [
                    "name" => "evidence",
                    "contents" => $pdf->stream(),
                    "filename" => "evidence.pdf"
                ],
                [
                    "name" => "input",
                    "contents" => json_encode([
                        "evidences" => [
                            [
                                "evidence_type" => "RETURN_POLICY",
                                "notes" => trans("cosmo/store.evidence.note")
                            ]
                        ]
                    ]),
                    "headers" => [
                        "Content-Type" => "application/json"
                    ]
                ]
            ]
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
