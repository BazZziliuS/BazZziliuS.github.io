<?php

namespace App\Models\Index;

use App\Traits\ClearsCacheKeysOnModification;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperNavLink
 */
class NavLink extends Model
{
    use ClearsCacheKeysOnModification;

    public $timestamps = false;
    protected static $cacheKeys = ['navlinks'];

    protected $fillable = [
        'name', 'icon', 'color', 'url', 'category'
    ];
}
