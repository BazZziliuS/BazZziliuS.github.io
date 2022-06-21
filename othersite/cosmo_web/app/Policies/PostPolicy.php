<?php

namespace App\Policies;

use App\Models\Forums\Post;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PostPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the model.
     *
     * @param User $user
     * @param Post $post
     * @return mixed
     */
    public function update(User $user, Post $post)
    {
        return $user->can('manage-threads') || $user->id === $post->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param User $user
     * @param Post $post
     * @return mixed
     */
    public function delete(User $user, Post $post)
    {
        return $user->can('manage-threads') || $user->id === $post->user_id;
    }
}
