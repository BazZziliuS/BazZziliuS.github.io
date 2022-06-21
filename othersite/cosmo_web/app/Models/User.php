<?php

namespace App\Models;

use App\Models\Forums\Thread;
use App\Models\Profile\Comment;
use App\Models\Store\Order;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use tehwave\Achievements\Traits\Achiever;

/**
 * @mixin IdeHelperUser
 */
class User extends Authenticatable
{
    use Notifiable, Achiever, HasFactory;

    protected $fillable = [
        'username', 'steamid', 'avatar', 'role_id', 'discord_id'
    ];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function profile()
    {
        return $this->hasOne(Profile::class);
    }

    public function threads()
    {
        return $this->hasMany(Thread::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'buyer_id');
    }

    public function bans()
    {
        return $this->hasMany(Ban::class);
    }

    /**
     * @param iterable|string $abilities
     * @param array           $arguments
     * @return bool
     */
    public function can($abilities, $arguments = [])
    {
        return $this->role->hasPermission($abilities) || parent::can($abilities, $arguments);
    }

    public function resolveRouteBinding($value, $field = null)
    {
        return static::firstWhere('steamid', $value);
    }

    public function ban($reason, $platforms = ['*']) {
        return $this->bans()->create([
            'reason' => $reason,
            'platforms' => $platforms
        ]);
    }

    protected static function boot()
    {
        static::created(function ($user) {
            $user->profile()->create();
        });

        parent::boot();
    }
}
