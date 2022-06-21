<?php

namespace App\Policies;

use App\Models\Forums\Board;
use App\Models\User;
use App\Models\Forums\Thread;
use Illuminate\Auth\Access\HandlesAuthorization;

/**
 * Class ThreadPolicy
 * @package App\Policies
 */
class ThreadPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can create models.
     *
     * @param User  $user
     * @param Board $board
     * @return mixed
     */
    public function create(User $user, Board $board)
    {
        return $board->roleHasAccess($user->role->name);
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param User   $user
     * @param Thread $thread
     * @return mixed
     */
    public function update(User $user, Thread $thread)
    {
        return $user->can('manage-threads') || $thread->user_id === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param User        $user
     * @param Thread $thread
     * @return mixed
     */
    public function delete(User $user, Thread $thread)
    {
        return $user->can('manage-threads') || $user->id === $thread->user_id;
    }

    /**
     * @param User   $user
     * @return bool
     */
    public function sticky(User $user)
    {
        return $user->can('sticky-threads');
    }

    /**
     * @param User   $user
     * @return bool
     */
    public function lock(User $user)
    {
        return $user->can('lock-threads');
    }

    /**
     * @param User   $user
     * @return bool
     */
    public function move(User $user)
    {
        return $user->can('move-threads');
    }
}
