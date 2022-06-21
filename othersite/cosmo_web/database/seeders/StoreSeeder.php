<?php

namespace Database\Seeders;

use App\Models\Store\Package;
use Illuminate\Database\Seeder;

class StoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Package::factory()->createMany([
            [
                'name' => 'VIP',
                'description' => '<h1>VIP Package</h1>',
                'price' => 10.00,
                'permanent' => true,
                'rebuyable' => false,
                'custom_price' => false,
                'category' => 'Ranks'
            ],
            [
                'name' => 'Ultra VIP',
                'description' => '<h1>Ultra VIP Package</h1>',
                'price' => 10.00,
                'permanent' => true,
                'rebuyable' => false,
                'custom_price' => false,
                'category' => 'Ranks'
            ],
            [
                'name' => 'AK-47',
                'description' => '<h1>A very over-powered weapon</h1>',
                'price' => 7.50,
                'permanent' => false,
                'rebuyable' => true,
                'custom_price' => false,
                'category' => 'Weapons'
            ],
            [
                'name' => 'Custom Donations',
                'description' => '<h1>Donate whatever you want</h1>',
                'price' => 0,
                'permanent' => false,
                'rebuyable' => false,
                'custom_price' => true
            ]
        ])->each(function($package) {
            $package->servers()->attach([1, 2]);
        });
    }
}
