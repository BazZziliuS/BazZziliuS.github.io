<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Profile;
use Illuminate\Auth\Access\HandlesAuthorization;

/**
 * Class ProfilePolicy
 * @package App\Policies
 */
class ProfilePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the model.
     *
     * @param User    $user
     * @param Profile $profile
     * @return mixed
     */
    public function update(User $user, Profile $profile)
    {
        return $user->is($profile->user);
    }
}
