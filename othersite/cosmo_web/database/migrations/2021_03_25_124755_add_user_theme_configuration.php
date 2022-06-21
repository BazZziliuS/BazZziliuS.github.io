<?php

use Illuminate\Database\Migrations\Migration;
use \Illuminate\Support\Facades\DB;

class AddUserThemeConfiguration extends Migration
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
                'key' => 'allow_user_themes',
                'value' => true,
                'type' => 'boolean',
                'display_name' => 'Allow users to select theme',
                'category' => 'general',
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
            ->where('key', 'allow_user_themes')
            ->delete();
    }
}
