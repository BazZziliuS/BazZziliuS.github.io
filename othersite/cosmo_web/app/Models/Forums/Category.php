<?php

namespace App\Models\Forums;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @mixin IdeHelperCategory
 */
class Category extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name', 'description'
    ];

    /**
     * @return HasMany
     */
    public function boards()
    {
        return $this->hasMany(Board::class);
    }
}
