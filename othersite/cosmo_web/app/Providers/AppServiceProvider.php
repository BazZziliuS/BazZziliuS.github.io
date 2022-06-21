<?php

namespace App\Providers;

use App\Models\Configuration;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Schema::defaultStringLength(191);
        Paginator::useBootstrap();

        $this->loadConfigurations();

        Configuration::updated(function () {
            Cache::forget('configurations');
            $this->loadConfigurations();
        });
    }

    protected function loadConfigurations()
    {
        if ($this->app->runningInConsole() || !Storage::exists('installed.txt')) return;

        $configurations = Cache::rememberForever('configurations', function () {
            return Configuration::all()
                ->mapWithKeys(function ($configuration) {
                    return [$configuration->key => $configuration->value];
                });
        });

        config()->set('cosmo.configs', $configurations);
    }
}
