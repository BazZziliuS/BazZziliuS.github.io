<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class ChangeThreadCharacterCountCategory extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('configurations')
            ->where('key', 'thread_character_count_limit')
            ->update([
                'category' => 'forums.threads',
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
            ->update([
                'category' => 'forums.general',
            ]);
    }
}
