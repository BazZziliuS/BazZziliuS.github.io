<?php

namespace App\Achievements;

use tehwave\Achievements\Achievement;

/**
 * Class DiscordServer
 * @package App\Achievements
 */
class DiscordServer extends Achievement
{
    /**
     * The name of this achievement.
     *
     * @var string
     */
    public $name = 'Discord Server';

    /**
     * The description of this achievement.
     *
     * @var string
     */
    public $description = 'User is apart of our discord community';

    /**
     * The icon of this achievement.
     *
     * @var string
     */
    public $icon = 'img/achievements/discord.png';
}
