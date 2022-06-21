<?php

use Illuminate\Database\Migrations\Migration;
use \Illuminate\Support\Facades\DB;

class AddGmsApiKeyToConfigurations extends Migration
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
                'key' => 'gms_api_key',
                'value' => null,
                'type' => 'text',
                'display_name' => 'GmodStore API Key',
                'category' => 'general.site',
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
            ->where('key', 'gms_api_key')
            ->delete();
    }
}
