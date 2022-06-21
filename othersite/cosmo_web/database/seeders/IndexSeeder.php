<?php

namespace Database\Seeders;

use App\Models\Index\Server;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class IndexSeeder
 */
class IndexSeeder extends Seeder
{
    /**
     * Run the database seeders.
     *
     * @return void
     */
    public function run()
    {
        DB::table('nav_links')->insert([
            [
                'name' => 'Home',
                'icon' => 'fad fa-home',
                'color' => '#d63031',
                'url' => '/',
                'category' => null
            ],
            [
                'name' => 'Forums',
                'icon' => 'fad fa-comment',
                'color' => '#e84393',
                'url' => '/forums',
                'category' => null
            ],
            [
                'name' => 'Store',
                'icon' => 'fad fa-store',
                'color' => '#4CAF50',
                'url' => '/store',
                'category' => null
            ],
            [
                'name' => 'Users',
                'icon' => 'fad fa-users',
                'color' => '#fdcb6e',
                'url' => '/users',
                'category' => 'Community'
            ],
            [
                'name' => 'Staff',
                'icon' => 'fad fa-user-shield',
                'color' => '#8e44ad',
                'url' => '/staff',
                'category' => 'Community'
            ],
            [
                'name' => 'TBDScripts',
                'icon' => 'fad fa-code',
                'color' => '#55efc4',
                'url' => 'https://tbdscripts.com',
                'category' => 'TBD Scripts'
            ],
            [
                'name' => 'Purchase Cosmo',
                'icon' => 'fad fa-rocket',
                'color' => '#6c5ce7',
                'url' => 'https://www.gmodstore.com/market/view/cosmo-the-all-in-one-suite',
                'category' => 'TBD Scripts'
            ],
            [
                'name' => 'Morgan',
                'icon' => 'fad fa-pizza-slice',
                'color' => '#0984e3',
                'url' => 'https://morgan-lee.cc',
                'category' => 'TBD Scripts'
            ],
            [
                'name' => 'Zeo',
                'icon' => 'fad fa-hamburger',
                'color' => '#e17055',
                'url' => 'https://zeodev.cc',
                'category' => 'TBD Scripts'
            ],
        ]);

        DB::table('features')->insert([
            [
                'name' => 'Lorem One',
                'icon' => 'fad fa-paint-brush',
                'color' => '#FF5722',
                'content' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.'
            ],
            [
                'name' => 'Lorem Two',
                'icon' => 'fad fa-users',
                'color' => '#673AB7',
                'content' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.'
            ],
            [
                'name' => 'Lorem Three',
                'icon' => 'fad fa-cog',
                'color' => '#673AB7',
                'content' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.'
            ],
            [
                'name' => 'Lorem Four',
                'icon' => 'fad fa-download',
                'color' => '#673AB7',
                'content' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.'
            ]
        ]);

        $servers = [
            [
                'name' => 'DarkRP',
                'icon' => 'fad fa-server',
                'color' => '#E91E63',
                'description' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                'image' => 'https://wallpaperaccess.com/full/1801201.jpg',
                'ip' => '51.68.200.55',
                'port' => 27015
            ],
            [
                'name' => 'Star Wars RP',
                'icon' => 'fad fa-microchip',
                'color' => '#3F51B5',
                'description' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                'image' => 'https://wallpaperaccess.com/full/1801201.jpg',
                'ip' => '51.68.200.55',
                'port' => 27015
            ]
        ];

        foreach ($servers as $server) {
            Server::create($server);
        }

        DB::table('footer_links')->insert([
            [
                'name' => 'Forums',
                'url' => 'forums',
                'category' => 'Cosmo'
            ],
            [
                'name' => 'Store',
                'url' => 'store',
                'category' => 'Cosmo'
            ],
            [
                'name' => 'Users',
                'url' => 'users',
                'category' => 'Cosmo'
            ],
            [
                'name' => 'Morgan',
                'url' => 'https://morgan-lee.cc',
                'category' => 'Misc'
            ],
            [
                'name' => 'Zeo',
                'url' => 'https://zeodev.cc',
                'category' => 'Misc'
            ],
        ]);
    }
}
