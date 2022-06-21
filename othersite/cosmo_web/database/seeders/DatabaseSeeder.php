<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

/**
 * Class DatabaseSeeder
 */
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(ConfigurationSeeder::class); // Seeding Configurations
        $this->call(RoleSeeder::class); // Seeding Roles
        $this->call(UserSeeder::class); // Seeding Default Users
        $this->call(IndexSeeder::class); // Seeding Default Index
        $this->call(ForumSeeder::class); // Seeding Default Forum Threads
        $this->call(StoreSeeder::class);
    }
}
