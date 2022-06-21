<?php

namespace App\GameTypes;

use App\Contracts\GameType;
use App\Models\Index\Server;
use App\Support\ServerInfo;
use Illuminate\Http\Client\Factory;
use Illuminate\Http\Response;

class FiveM implements GameType
{
    private Factory $client;

    public function __construct(Factory $client)
    {
        $this->client = $client;
    }

    public function getServerInfo(Server $server): ServerInfo
    {
        $url = sprintf('http://%s:%s/', $server->ip, $server->port);

        $data = $this->getServerDocument($url, 'info.json');
        $players = $this->getServerDocument($url, 'players.json');

        if (!$data || !$players) {
            return ServerInfo::failed(
                __('cosmo.errors.failed')
            );
        }

        return ServerInfo::make()
            ->setMap('Los Santos')
            ->setPlayers(
                count($players)
            )
            ->setMaxPlayers($data['vars']['sv_maxClients']);
    }

    private function getServerDocument(string $url, string $endpoint): ?array
    {
        $res = $this->client->get($url . $endpoint);
        if (!$res->ok() || !$data = $res->json()) {
            return null;
        }

        return $data;
    }
}