<?php

namespace App\Achievements;

use tehwave\Achievements\Achievement;

/**
 * Class FirstThread
 * @package App\Achievements
 */
class FirstThread extends Achievement
{
    /**
     * The name of this achievement.
     *
     * @var string
     */
    public $name = 'First Thread';

    /**
     * The description of this achievement.
     *
     * @var string
     */
    public $description = 'User has made a thread on the forums';

    /**
     * The icon of this achievement.
     *
     * @var string
     */
    public $icon = 'img/achievements/firstThread.png';
}
