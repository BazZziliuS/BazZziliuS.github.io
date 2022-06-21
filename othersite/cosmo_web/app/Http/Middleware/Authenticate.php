<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

/**
 * Class Authenticate
 * @package App\Http\Middleware
 */
class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  $request
     * @return string|void
     */
    protected function redirectTo($request)
    {
        if (!$request->expectsJson()) {
            return route('login.steam');
        }
    }
}