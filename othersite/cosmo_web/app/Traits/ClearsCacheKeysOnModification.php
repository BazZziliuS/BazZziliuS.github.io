<?php

namespace App\Traits;

use Illuminate\Support\Facades\Cache;

trait ClearsCacheKeysOnModification
{
    public static function bootClearsCacheKeysOnModification()
    {
        static::created(function() {
            static::clearCacheKeys();
        });

        static::updated(function() {
            static::clearCacheKeys();
        });

        static::deleted(function() {
            static::clearCacheKeys();
        });
    }

    protected static function clearCacheKeys()
    {
        foreach (static::$cacheKeys as $key) {
            Cache::forget($key);
        }
    }
}