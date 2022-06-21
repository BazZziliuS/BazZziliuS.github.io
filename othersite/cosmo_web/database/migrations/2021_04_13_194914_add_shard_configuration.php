<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class AddShardConfiguration extends Migration
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
                'key' => 'discord_widget_shard',
                'value' => 'https://e.widgetbot.io',
                'type' => 'text',
                'display_name' => 'Discord Widget Shard',
                'category' => 'integrations.discord',
                'updated_at' => now()
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
            ->where('key', 'discord_widget_shard')
            ->delete();
    }
}
