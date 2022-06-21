<?php

namespace App\Importers;

use App\Contracts\Importer;
use App\Models\Index\Server;
use App\Models\Store\Package;
use Illuminate\Database\ConnectionInterface;
use Illuminate\Support\Facades\DB;

class PrometheusImporter implements Importer
{
    public function handle()
    {
        DB::transaction(function() {
            $this->importPackages(
                DB::connection('import')
            );
        });
    }

    protected function importPackages(ConnectionInterface $connection)
    {
        $processedServers = [];

        $connection->table('packages')
            ->get()->each(function ($package) use ($connection, &$processedServers) {
                $servers = json_decode($package->servers);
                $serverIds = [];

                foreach ($servers as $serverId) {
                    if (!isset($processedServers[$serverId])) {
                        $server = $connection->table('servers')->find($serverId);
                        if (!$server) continue;

                        // Prometheus doesn't have some of these values, so we just insert some defaults
                        $processedServers[$serverId] = Server::create([
                            'name' => $server->name,
                            'icon' => 'fad fa-server',
                            'color' => '#3498db',
                            'image' => $server->image_link,
                            'ip' => !empty(trim($server->ip)) ? $server->ip : '51.68.200.55',
                            'port' => !empty(trim($server->port)) ? $server->port : 27015
                        ])->id;
                    }

                    $serverIds[] = $processedServers[$serverId];
                }

                $package = Package::create([
                    'name' => $package->title,
                    'description' => $package->lower_text,
                    'image' => !empty(trim($package->img)) ? $package->img : null,
                    'price' => $package->price,
                    'permanent' => $package->permanent,
                    'expires_after' => $package->days,
                    'rebuyable' => !((bool)$package->once),
                    'custom_price' => $package->custom_price,
                    'actions' => []
                ]);

                $package->servers()->attach($serverIds);
            });
    }
}