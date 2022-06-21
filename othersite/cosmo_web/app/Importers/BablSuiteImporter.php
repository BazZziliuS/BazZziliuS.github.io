<?php

namespace App\Importers;

use App\Contracts\Importer;
use App\Models\Index\Feature;
use App\Models\Index\NavLink;
use App\Models\Index\Server;
use Illuminate\Database\ConnectionInterface;
use Illuminate\Support\Facades\DB;

class BablSuiteImporter implements Importer
{
    public function handle()
    {
        DB::transaction(function() {
            $importConnection = DB::connection('import');

            $this->importNavlinks($importConnection);
            $this->importBiglinks($importConnection);
            $this->importFeatures($importConnection);
            $this->importServers($importConnection);
        });
    }

    protected function importNavlinks(ConnectionInterface $connection)
    {
        $links = $connection->table('nav_links')
            ->get()->map(function($link) {
                return [
                    'name' => $link->title,
                    'url' => $link->url,
                    'color' => $link->color ?? '#3498db'
                ];
            })->toArray();

        NavLink::insert($links);
    }

    protected function importBiglinks(ConnectionInterface $connection)
    {
        $bigLinks = $connection->table('big_links')
            ->get()->map(function($link) {
                return [
                    'name' => $link->title,
                    'url' => $link->url,
                    'icon' => $link->fa_icon,
                    'color' => $link->fa_color,
                    'category' => 'Big Link'
                ];
            })->toArray();

        NavLink::insert($bigLinks);
    }

    protected function importFeatures(ConnectionInterface $connection)
    {
        $features = $connection->table('features')
            ->get()->map(function($feature) {
                return [
                    'name' => $feature->title,
                    'icon' => $feature->fa_icon,
                    'color' => $feature->fa_color,
                    'content' => $feature->description
                ];
            })->toArray();

        Feature::insert($features);
    }

    protected function importServers(ConnectionInterface $connection)
    {
        $connection->table('serverquery')
            ->get()->map(function($server) {
                return [
                    'name' => $server->name,
                    'icon' => $server->fa_icon,
                    'color' => $server->fa_color,
                    'description' => $server->description,
                    'image' => $server->image,
                    'ip' => $server->ip,
                    'port' => $server->port
                ];
            })->each(fn($server) => Server::create($server));
    }
}