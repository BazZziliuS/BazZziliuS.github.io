<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FullyInstalled
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (!str_starts_with($request->route()->getName(), 'install.') &&
            !Storage::exists('installed.txt')) {

            return redirect()->route('install.welcome');
        }

        return $next($request);
    }
}
