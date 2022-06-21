<?php

namespace App\GameTypes;

use App\Contracts\GameType;
use App\Models\Index\Server;
use App\Support\ServerInfo;
use Illuminate\Support\Facades\Http;
use JsonException;

class Source implements GameType
{
    protected int $appId;

    public function __construct(int $appId)
    {
        $this->appId = $appId;
    }

    /**
     * @throws JsonException
     */
    public function getServerInfo(Server $server): ServerInfo
    {
        $apiKey = config('cosmo.configs.steam_api_key');
        if (empty($apiKey)) {
            return ServerInfo::failed(
                __('cosmo.errors.no_api_key')
            );
        }

        $res = Http::get('https://api.steampowered.com/IGameServersService/GetServerList/v1/', [
            'filter' => "\appid\\$this->appId\addr\\$server->ip:$server->port",
            'key' => $apiKey
        ]);

        if (!$res->ok() || !$rawData = $res->body()) {
            return ServerInfo::failed(
                __('cosmo.errors.failed')
            );
        }

        $data = json_decode(
            $rawData, true, 512, JSON_THROW_ON_ERROR | JSON_INVALID_UTF8_SUBSTITUTE
        );

        $serverInfo = data_get($data, 'response.servers.0');

        return ServerInfo::make()
            ->setMap($serverInfo['map'])
            ->setPlayers($serverInfo['players'])
            ->setMaxPlayers($serverInfo['max_players']);
    }

    public static function __set_state(array $data)
    {
        return new static($data['appId']);
    }
}
