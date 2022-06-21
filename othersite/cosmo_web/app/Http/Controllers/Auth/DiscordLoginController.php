<?php

namespace App\Http\Controllers\Auth;

use App\Achievements\DiscordServer;
use App\Achievements\NitroBoost;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Http\RedirectResponse;
use Laravel\Socialite\Facades\Socialite;

class DiscordLoginController extends Controller
{
    private $client;

    public function __construct()
    {
        $this->middleware('auth');
        $this->client = new Client([
            'base_uri' => 'https://discord.com/api/v6/'
        ]);

        // Set config values for socialite
        config()->set('services.discord',[
            'client_id' => config('cosmo.configs.discord_client_id'),
            'client_secret' => config('cosmo.configs.discord_client_secret'),
            'redirect' => route('auth.discord')
        ]);
    }

    public function redirect()
    {
        if (!config('cosmo.configs.discord_sync_enabled')) {
            return back();
        }

        return Socialite::driver('discord')->redirect();
    }

    /**
     * @return RedirectResponse
     * @throws GuzzleException
     */
    public function authenticated()
    {
        $user = Socialite::driver('discord')->user();

        $discordId = $user->getId();
        $userModel = auth()->user();

        $userModel->update([
            'discord_id' => $discordId
        ]);

        $guildInfo = $this->getGuildInfo($discordId);
        if ($guildInfo) {
            // Give badge for being in the server
            if (!$userModel->hasAchievement(DiscordServer::class))
                $userModel->achieve(DiscordServer::class);

            if (!is_null($guildInfo->premium_since) && !$userModel->hasAchievement(NitroBoost::class)) {
                // Give nitro booster badge
                $userModel->achieve(NitroBoost::class);
            }
        }

        return redirect()->route('home');
    }

    /**
     * @param $discordId
     * @return false|mixed
     * @throws GuzzleException
     */
    private function getGuildInfo($discordId)
    {
        $res = $this->client->get(
            'guilds/' . config('cosmo.configs.discord_widget_id') . '/members/' . $discordId,
            [
                'headers' => [
                    'Authorization' => 'Bot ' . config('cosmo.configs.discord_bot_token')
                ]
            ]
        );

        if ($res->getStatusCode() !== 200) {
            return false;
        }

        return json_decode($res->getBody());
    }
}
