<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddPaymentOverhaulConfigs extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('configurations')
            ->insertOrIgnore([
                [
                    'key' => 'paypal_gateway_enabled',
                    'value' => false,
                    'type' => 'boolean',
                    'display_name' => 'PayPal Gateway Enabled',
                    'category' => 'store.paypal',
                    'updated_at' => now()
                ],
                [
                    'key' => 'stripe_gateway_enabled',
                    'value' => false,
                    'type' => 'boolean',
                    'display_name' => 'Stripe Gateway Enabled',
                    'category' => 'store.stripe',
                    'updated_at' => now()
                ],
                [
                    'key' => 'stripe_secret_key',
                    'value' => null,
                    'type' => 'text',
                    'display_name' => 'Stripe Secret Key',
                    'category' => 'store.stripe',
                    'updated_at' => now()
                ],
                [
                    'key' => 'stripe_public_key',
                    'value' => null,
                    'type' => 'text',
                    'display_name' => 'Stripe Public Key',
                    'category' => 'store.stripe',
                    'updated_at' => now()
                ],
                [
                    'key' => 'stripe_webhook_secret',
                    'value' => null,
                    'type' => 'text',
                    'display_name' => 'Stripe Webhook Secret',
                    'category' => 'store.stripe',
                    'updated_at' => now()
                ],
                [
                    'key' => 'stripe_payment_methods',
                    'value' => "['card']",
                    'type' => 'stripe-payment-methods',
                    'display_name' => 'Stripe Payment Methods',
                    'category' => 'store.stripe',
                    'updated_at' => now()
                ]
            ]);

        DB::table('configurations')
            ->where('key', 'ban_user_on_chargeback')
            ->update([
                'category' => 'store.misc'
            ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('configurations')
            ->whereIn('key', [
                'paypal_gateway_enabled',
                'stripe_gateway_enabled',
                'stripe_secret_key',
                'stripe_public_key',
                'stripe_webhook_secret'
            ])->delete();

        DB::table('configurations')
            ->where('key', 'ban_user_on_chargeback')
            ->update([
                'category' => 'store.paypal'
            ]);
    }
}
