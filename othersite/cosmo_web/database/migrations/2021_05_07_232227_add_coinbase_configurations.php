<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class AddCoinbaseConfigurations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('configurations')
            ->insert([
                [
                    'key' => 'coinbase_gateway_enabled',
                    'value' => false,
                    'type' => 'boolean',
                    'display_name' => 'Coinbase Gateway Enabled',
                    'category' => 'store.coinbase',
                    'updated_at' => now()
                ],
                [
                    'key' => 'coinbase_api_key',
                    'value' => null,
                    'type' => 'text',
                    'display_name' => 'Coinbase API Key',
                    'category' => 'store.coinbase',
                    'updated_at' => now()
                ],
                [
                    'key' => 'coinbase_webhook_secret',
                    'value' => null,
                    'type' => 'text',
                    'display_name' => 'Coinbase Shared Webhook Secret',
                    'category' => 'store.coinbase',
                    'updated_at' => now()
                ]
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
            ->whereIn('key', ['coinbase_gateway_enabled', 'coinbase_api_key', 'coinbase_webhook_secret'])
            ->delete();
    }
}
