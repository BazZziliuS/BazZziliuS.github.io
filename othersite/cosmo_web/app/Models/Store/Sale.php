<?php

namespace App\Models\Store;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @mixin IdeHelperSale
 */
class Sale extends Model
{
    use SoftDeletes;

    public $timestamps = false;

    protected $fillable = [
        'title', 'starts_at', 'ends_at', 'percentage'
    ];

    protected $casts = [
        'starts_at' => 'date',
        'ends_at' => 'date'
    ];

    public function packages()
    {
        return $this->morphToMany(Package::class, 'packageable');
    }

    public function getTimeDifferenceAttribute()
    {
        return $this->ends_at->longAbsoluteDiffForHumans();
    }

    public function getPackagesMappedAttribute()
    {
        return $this->packages->map(function ($item) {
            return $item->id;
        })->join(',');
    }
}
