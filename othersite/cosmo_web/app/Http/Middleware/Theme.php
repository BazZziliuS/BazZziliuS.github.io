<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Igaster\LaravelTheme\Facades\Theme as ThemeFacade;

class Theme
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
        $theme = null;

        if ($request->session()->has('theme')) {
            $theme = $request->session()->get('theme');

            if (!ThemeFacade::exists($theme) || !config('cosmo.configs.allow_user_themes', false)) {
                $request->session()->remove('theme');
                $theme = null;
            }
        }

        $theme = $theme ?: config('cosmo.configs.active_theme', config('themes.default'));

        ThemeFacade::set($theme);

        return $next($request);
    }
}
