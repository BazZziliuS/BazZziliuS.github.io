<?php

namespace App\Http\Controllers;

use App\Contracts\GameType;
use App\Models\Index\Feature;
use App\Models\Index\Server;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use SimpleXMLElement;

class IndexController extends Controller
{
    public function index()
    {
        $features = Cache::rememberForever('features', function() {
            return Feature::all();
        });

        $servers = Cache::rememberForever('servers', function() {
            return Server::all();
        });

        $leadership = Cache::rememberForever('leadership', function() {
            return User::all()->filter(function($value) {
                return $value->can('display-leadership');
            });
        });

        $steamData = Cache::remember('steamData', 60, function() {
            return $this->getSteamGroupData();
        });

        return view('index', compact(
            'features', 'servers', 'leadership', 'steamData'
        ));
    }

    protected function getSteamGroupData(): ?array
    {
        if (!config('cosmo.configs.steam_group_enabled')) return null;

        $groupSlug = config('cosmo.configs.steam_group_slug');
        if (!$groupSlug || $groupSlug == "") return null;

        $url = "https://steamcommunity.com/groups/$groupSlug/memberslistxml/?xml=1&p=1";

        try {
            $body = Http::get($url)->body();
            $data = new SimpleXMLElement($body);
            $groupDetails = (array) $data->groupDetails;

            return [
                'total' => $groupDetails['memberCount'],
                'online' => $groupDetails['membersOnline'],
                'ingame' => $groupDetails['membersInGame']
            ];
        } catch (Exception $e) {
            return null;
        }
    }

    public function serverInfo(Server $server)
    {
        return Cache::remember("servers.info.$server", 60, function() use ($server) {
            $game = $server->game;
            if (!$game || !isset($game['type'])) return null;

            $type = $game['type'];
            if (is_string($type)) {
                $type = app($type);
            }

            if (!($type instanceof GameType)) return null;

            return $type->getServerInfo($server)->toResponse();
        });
    }
}
