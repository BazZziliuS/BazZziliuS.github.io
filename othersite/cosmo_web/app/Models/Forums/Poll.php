<?php

namespace App\Models\Forums;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @mixin IdeHelperPoll
 */
class Poll extends Model
{
    protected $fillable = ['title', 'description', 'answers', 'closed', 'icon'];

    protected $casts = [
        'answers' => 'array',
        'closed' => 'bool'
    ];

    /**
     * @return HasMany
     */
    public function userAnswers(): HasMany
    {
        return $this->hasMany(PollAnswer::class);
    }

    public function userHasAnswered(User $user): bool
    {
        return $this->userAnswers()
            ->whereRelation('user', 'id', $user->id)
            ->exists();
    }
}
