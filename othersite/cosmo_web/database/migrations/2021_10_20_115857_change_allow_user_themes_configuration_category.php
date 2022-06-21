<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class ChangeAllowUserThemesConfigurationCategory extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('configurations')
            ->where('key', 'allow_user_themes')
            ->update([
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
            ->where('key', 'allow_user_themes')
            ->update([
                'category' => 'general',
            ]);
    }
}
