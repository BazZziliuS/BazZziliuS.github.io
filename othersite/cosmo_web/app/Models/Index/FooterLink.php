<?php

namespace App\Models\Index;

use App\Traits\ClearsCacheKeysOnModification;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperFooterLink
 */
class FooterLink extends Model
{
    use ClearsCacheKeysOnModification;

    public $timestamps = false;
    protected static $cacheKeys = ['footerlinks'];

    protected $fillable = [
        'name', 'category', 'url'
    ];
}
