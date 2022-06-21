<?php

namespace App\Models\Forums;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @mixin IdeHelperPollAnswer
 */
class PollAnswer extends Model
{
    protected $fillable = ['answer', 'user_id'];

    /**
     * @return BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return BelongsTo
     */
    public function poll()
    {
        return $this->belongsTo(Poll::class);
    }
}
