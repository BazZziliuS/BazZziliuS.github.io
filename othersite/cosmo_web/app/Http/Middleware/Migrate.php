<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class Migrate
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
        if (!Storage::exists('installed.txt')) return $next($request);

        $needsMigrate = Cache::remember('needs-migrate', 360, function() {
            return Storage::exists('migrate');
        });

        if ($needsMigrate) {
            Artisan::call('migrate', ['--force' => true]);
            Artisan::call('optimize:clear');

            Storage::delete('migrate');
        }

        return $next($request);
    }
}
