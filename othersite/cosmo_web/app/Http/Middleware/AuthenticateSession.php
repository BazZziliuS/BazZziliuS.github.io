<?php

namespace App\Http\Middleware;

use Illuminate\Auth\AuthenticationException;

class AuthenticateSession extends \Illuminate\Session\Middleware\AuthenticateSession
{
    /**
     * Log the user out of the application.
     *
     * @param $request
     * @return void
     *
     * @throws AuthenticationException
     */
    protected function logout($request)
    {
        $this->guard()->logoutCurrentDevice();

        $request->session()->flush();

        throw new AuthenticationException(
            'Unauthenticated.',
            [$this->auth->getDefaultDriver()],
            $request->getRequestUri()
        );
    }
}
