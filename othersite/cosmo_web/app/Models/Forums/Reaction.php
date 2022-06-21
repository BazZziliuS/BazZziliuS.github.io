<?php

namespace App\Models\Forums;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * @mixin IdeHelperReaction
 */
class Reaction extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'reaction', 'user_id'
    ];

    /**
     * @return MorphTo
     */
    public function reactable()
    {
        return $this->morphTo();
    }
}
