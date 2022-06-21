<?php

namespace App\Traits;

use App\Models\Forums\Reaction;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait Reactable
{
    public function reactions(): MorphMany
    {
        return $this->morphMany(Reaction::class, 'reactable');
    }

    public function react($reaction): Model
    {
        return $this->reactions()->create([
            'reaction' => $reaction,
            'user_id' => auth()->id()
        ]);
    }

    public function canReact($userId): bool
    {
        if (!auth()->check()) {
            return false;
        }

        if ($this->relationLoaded('reactions')) {
            return $this->getRelation('reactions')->where('user_id', $userId)->isEmpty();
        }

        return !$this->reactions()->where('user_id', $userId)->exists();
    }

    public function getReactionsAttribute(): array
    {
        if (!$this->relationLoaded('reactions')) {
            $this->load('reactions');
        }

        $reactions = $this->getRelation('reactions');
        $res = [];

        foreach($reactions as $reaction) {
            $reactions = config('cosmo.reactions');
            if (!array_key_exists($reaction->reaction, $reactions)) {
                continue;
            }

            $reactionData = config('cosmo.reactions')[$reaction->reaction];

            if(!isset($res[$reactionData['emoji']])) {
                $res[$reactionData['emoji']] = 1;
            } else {
                $res[$reactionData['emoji']]++;
            }
        }

        return $res;
    }
}
