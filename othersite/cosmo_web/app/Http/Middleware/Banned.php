<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class Banned
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @param string  $platform
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $platform = '*')
    {
        if (!auth()->check()) {
            $response = $next($request);

            if (method_exists($response, 'header')) {
                $response->header('Security-Hash', config('auth.enhanced_security'));
            }

            return $response;
        }

        /** @var User $user */
        $user = $request->user();

        $banned = $user->bans()->whereJsonContains('platforms', $platform)->exists();
        if ($banned) {
            abort(403);
        }

        $response = $next($request);

        if (method_exists($response, 'header')) {
            $response->header('Security-Hash', config('auth.enhanced_security'));
        }

        return $response;
    }
}
