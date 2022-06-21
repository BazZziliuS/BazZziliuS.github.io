<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @mixin IdeHelperChangelogLabel
 */
class ChangelogLabel extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = ['name', 'description', 'color'];

    public function changelogs(): BelongsToMany
    {
        return $this->belongsToMany(Changelog::class, 'changelog_label');
    }
}
