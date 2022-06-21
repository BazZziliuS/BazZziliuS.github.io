<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AddThreadCharacterCountToConfigurations extends Migration
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
                'key' => 'thread_character_count_limit',
                'value' => 10000,
                'type' => 'number',
                'display_name' => 'Thread Character Count Limit',
                'category' => 'forums.general',
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
            ->where('key', 'thread_character_count_limit')
            ->delete();
    }
}
