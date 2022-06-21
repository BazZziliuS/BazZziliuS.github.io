<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class AddChangelogDefaults extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $now = now();

        DB::table('configurations')
            ->insert([
                'key' => 'changelogs_enabled',
                'value' => false,
                'type' => 'boolean',
                'updated_at' => $now
            ]);

        DB::table('changelog_labels')
            ->insert([
                [
                    'name' => 'Addition',
                    'color' => '#2ecc71'
                ],
                [
                    'name' => 'Bug Fix',
                    'color' => '#e67e22'
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
            ->where('key', 'changelogs_enabled')
            ->delete();
    }
}
