<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Profile\Comment;
use Illuminate\Auth\Access\HandlesAuthorization;

class CommentPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the model.
     *
     * @param User $user
     * @param Comment $comment
     * @return mixed
     */
    public function update(User $user, Comment $comment)
    {
        return $comment->user_id === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param User $user
     * @param Comment $comment
     * @return mixed
     */
    public function delete(User $user, Comment $comment)
    {
        return ($user->id === $comment->user_id) || ($comment->profile->user_id === $user->id)
            || $user->can('manage-users');
    }
}
