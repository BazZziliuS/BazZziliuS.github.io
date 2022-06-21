<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

/**
 * Class RouteServiceProvider
 * @package App\Providers
 */
class RouteServiceProvider extends ServiceProvider
{
    /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'App\Http\Controllers';

    /**
     * The path to the "home" route for your application.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();
    }

    /**
     * Define the routes for the application.
     *
     * @return void
     */
    public function map()
    {
        $this->mapApiRoutes();

        // Map specific application routes
        $this->mapWebRoutes();
        $this->mapProfileRoutes();
        $this->mapManageRoutes();
        $this->mapForumRoutes();
        $this->mapStoreRoutes();
    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapWebRoutes()
    {
        Route::middleware('web')
            //->namespace($this->namespace)
            ->group(base_path('routes/web.php'));
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api')
            ->middleware('api')
            //->namespace($this->namespace)
            ->group(base_path('routes/api.php'));
    }

    protected function mapManageRoutes()
    {
        Route::prefix('manage')
            ->name('manage.')
            ->middleware(['web', 'auth'])
            ->group(base_path('routes/web/manage.php'));
    }

    protected function mapForumRoutes()
    {
        Route::prefix('forums')
            ->name('forums.')
            ->middleware(['web', 'banned:forums'])
            ->group(base_path('routes/web/forums.php'));
    }

    protected function mapProfileRoutes()
    {
        Route::prefix('users')
            ->name('users.')
            ->middleware('web')
            ->group(base_path('routes/web/profile.php'));
    }

    protected function mapStoreRoutes()
    {
        Route::prefix('store')
            ->name('store.')
            ->middleware(['web', 'banned:store'])
            ->group(base_path('routes/web/store.php'));
    }
}
