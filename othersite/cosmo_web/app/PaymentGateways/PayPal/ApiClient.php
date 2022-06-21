<?php

namespace App\PaymentGateways\PayPal;

use PayPal\Auth\OAuthTokenCredential;
use PayPal\Rest\ApiContext;
use PayPalCheckoutSdk\Core\PayPalHttpClient;
use PayPalCheckoutSdk\Core\ProductionEnvironment;
use PayPalCheckoutSdk\Core\SandboxEnvironment;

class ApiClient
{
    /* @var ApiContext $client */
    private static $client;

    public static function client()
    {
        if (!isset(self::$client)) {
            self::$client = new ApiContext(
                new OAuthTokenCredential(
                    config('cosmo.configs.paypal_client_id'),
                    config('cosmo.configs.paypal_client_secret')
                )
            );

            self::$client->setConfig([
                'mode' => config('cosmo.configs.paypal_sandbox_enabled') ? 'sandbox' : 'live'
            ]);
        }

        return self::$client;
    }

    /**
     * Creates a PayPal checkout client
     *
     * @return PayPalHttpClient
     */
    public static function getCheckoutClient()
    {
        return new PayPalHttpClient(static::getCheckoutEnvironment());
    }

    /**
     * Creates an environment, production or sandbox depending on app settings
     *
     * @return SandboxEnvironment|ProductionEnvironment
     */
    protected static function getCheckoutEnvironment()
    {
        $clientId = config('cosmo.configs.paypal_client_id');
        $clientSecret = config('cosmo.configs.paypal_client_secret');

        if (config('cosmo.configs.paypal_sandbox_enabled')) {
            return new SandboxEnvironment($clientId, $clientSecret);
        } else {
            return new ProductionEnvironment($clientId, $clientSecret);
        }
    }
}