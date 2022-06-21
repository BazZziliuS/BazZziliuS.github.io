<?php

namespace App\Http\Middleware;

use Closure;

/**
 * Class Permission
 * @package App\Http\Middleware
 */
class Permission
{
    /**
     * Handle an incoming request.
     *
     * @param         $request
     * @param Closure $next
     * @param string  $permission
     * @return mixed
     */
    public function handle($request, Closure $next, string $permission)
    {
        if (!auth()->check()) abort(403);

        $role = auth()->user()->role;
        if (!$role->hasPermission($permission)) abort(403);

        return $next($request);
    }
}
