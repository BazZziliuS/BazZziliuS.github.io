<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperPermission
 */
class Permission extends Model
{
    use HasFactory;

    protected $fillable = [
        'permission'
    ];

    public static function permissionStrings()
    {
        return array_map(function($permission) {
            return $permission['reference'];
        }, config('cosmo.permissions'));
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}
