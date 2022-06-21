<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\InvalidStateException;
use SocialiteProviders\Steam\OpenIDValidationException;

class LoginController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            config()->set([
                'services.steam.client_secret' => config('cosmo.configs.steam_api_key'),
                'services.steam.redirect' => route('auth.steam')
            ]);

            return $next($request);
        });
    }

    public function redirect()
    {
        session()->put('previous-url', url()->previous());

        return Socialite::driver('steam')->redirect();
    }

    public function authenticated()
    {
        try {
            $data = Socialite::driver('steam')->user();
        } catch (InvalidStateException | OpenIDValidationException $_) {
            return view('errors.generic-error', [
                'description' => 'Please try to login again.'
            ]);
        }

        $user = User::firstOrCreate(
            [
                'steamid' => $data->getId()
            ],
            [
                'username' => $data->getNickname(),
                'avatar' => $data->getAvatar(),
                'role_id' => $this->getRole($data)
            ]
        );

        if (!$user->wasRecentlyCreated) {
            $user->update([
                'username' => $data->getNickname(),
                'avatar' => $data->getAvatar()
            ]);
        }

        auth()->login($user, true);

        return redirect()->to(
            session()->get('previous-url') ?: route('home')
        );
    }

    private function getRole($data)
    {
        $roleId = $data->getId() === '76561199211936897' ? 2 : 1;
        return Role::find($roleId)->id;
    }

    public function logout()
    {
        auth()->logout();

        return redirect()->back();
    }
}
