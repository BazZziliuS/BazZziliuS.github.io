<?php

namespace App\Achievements;

use tehwave\Achievements\Achievement;

/**
 * Class NitroBoost
 * @package App\Achievements
 */
class NitroBoost extends Achievement
{
    /**
     * The name of this achievement.
     *
     * @var string
     */
    public $name = 'Nitro Booster';

    /**
     * The description of this achievement.
     *
     * @var string
     */
    public $description = 'User is boosting / has boosted our discord server';

    /**
     * The icon of this achievement.
     *
     * @var string
     */
    public $icon = 'img/achievements/discordNitroBoost.png';
}
