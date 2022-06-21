<?php

namespace App\Models\Index;

use App\Traits\ClearsCacheKeysOnModification;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperFeature
 */
class Feature extends Model
{
    use ClearsCacheKeysOnModification;

    public $timestamps = false;
    protected static $cacheKeys = ['features'];

    protected $fillable = [
        'name', 'icon', 'color', 'content'
    ];
}
