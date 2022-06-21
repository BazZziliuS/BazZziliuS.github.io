<?php

namespace Database\Seeders;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class UserSeeder
 */
class UserSeeder extends Seeder
{
    /**
     * Run the database seeders.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->createMany([
            [
                'username' => 'Mørgan.M',
                'steamid' => '76561198372393703',
                'avatar' => 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/f0/f0e5a72511df3adf669adb2854e5811050cc6933_medium.jpg',
                'role_id' => '1'
            ],
            [
                'username' => 'Zeo',
                'steamid' => '76561198251742058',
                'avatar' => 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/5e/5ec69be738df13e9cc072a6169b6af3f7d3c3eab_medium.jpg',
                'role_id' => '1'
            ],
        ]);

        if (env('APP_RANDOM_SEED_PLEASE', false)) {
            User::factory()->count(50)->make();
        }
    }
}
