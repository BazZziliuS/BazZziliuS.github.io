<?php

namespace App\Achievements;

use tehwave\Achievements\Achievement;

class Designer extends Achievement
{
    /**
     * The name of this achievement.
     *
     * @var string
     */
    public $name = 'Designer';

    /**
     * The description of this achievement.
     *
     * @var string
     */
    public $description = 'User has designed their profile to their dreams';

    /**
     * The icon of this achievement.
     *
     * @var string
     */
    public $icon = 'img/achievements/designer.png';
}
