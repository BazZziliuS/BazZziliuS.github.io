<?php

namespace App\Models\Index;

use App\Models\Store\Package;
use App\Traits\ClearsCacheKeysOnModification;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @mixin IdeHelperServer
 */
class Server extends Model
{
    use SoftDeletes, ClearsCacheKeysOnModification;

    public $timestamps = false;
    public static array $cacheKeys = ['servers'];

    protected $fillable = [
        'name', 'icon', 'color', 'type', 'description', 'image', 'ip', 'port'
    ];

    /**
     * Refreshes the server token
     *
     * @return string The plain token
     */
    public function refreshToken(): string
    {
        $plainToken = Str::random(32);

        $this->forceFill([
            'token' => Hash::make($plainToken),
        ]);

        return $this->id . '|' . $plainToken;
    }

    public function getGameAttribute(): ?array
    {
        return config("cosmo.games.$this->type");
    }

    public function packages(): MorphToMany
    {
        return $this->morphToMany(Package::class, 'packageable');
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function (Server $server) {
            if (empty($server->token)) {
                $server->refreshToken();
            }
        });
    }
}