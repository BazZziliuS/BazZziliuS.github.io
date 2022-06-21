<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

/**
 * Class RoleSeeder
 */
class RoleSeeder extends Seeder
{
    /**
     * Run the database seeders.
     *
     * @return void
     */
    public function run()
    {
        $adminPerms = array_map(function($perm) {
            return [
                'permission' => $perm,
                'role_id' => 2,
            ];
        }, array_keys(config('cosmo.permissions')));

        Role::factory()->createMany([
            [
                'name' => 'user',
                'display_name' => 'User',
                'color' => '#9E9E9E',
                'deletable' => false
            ],
            [
                'name' => 'admin',
                'display_name' => 'Administrator',
                'color' => '#F44336',
                'deletable' => false
            ]
        ]);

        Permission::factory()->createMany($adminPerms);
    }
}
