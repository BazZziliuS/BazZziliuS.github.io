<?php

namespace App\Http\Middleware;

use App\Models\Index\Server;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class GameToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $bearerToken = $request->bearerToken();
        if (!$bearerToken) {
            return response(null, 401);
        }

        [$serverId, $token] = explode('|', $bearerToken);
        if (!($serverId && $token)) {
            return response(null, 401);
        }

        /** @var Server $server */
        $server = Server::find($serverId);
        if (!$server || !Hash::check($token, $server->token)) {
            return response(null, 401);
        }

        $request->setUserResolver(function() use ($server) {
            return $server;
        });

        return $next($request);
    }
}
