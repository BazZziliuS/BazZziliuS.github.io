<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperRole
 */
class Role extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name', 'display_name', 'color'
    ];

    protected static function boot()
    {
        // Set all the users in the role to User
        static::deleting(function ($role) {
            if (!$role->deletable) {
                return false;
            }

            foreach ($role->users as $user) {
                $user->update([
                    'role_id' => 1
                ]);
            }

            return true;
        });

        parent::boot();
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function permissions()
    {
        return $this->hasMany(Permission::class);
    }

    public function hasPermission($permission)
    {
        $perm = array_search($permission, Permission::permissionStrings());

        return $perm !== false && $this->permissions()
            ->where('permission', $perm)
            ->exists();
    }
}
