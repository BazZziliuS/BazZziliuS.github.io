<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use tehwave\Achievements\Models\Achievement;

/**
 * Class AchievementUnlocked
 * @package App\Notifications
 */
class AchievementUnlocked extends Notification
{
    use Queueable;

    private $achievement;

    /**
     * Create a new notification instance.
     *
     * @param Achievement $achievement
     */
    public function __construct(Achievement $achievement)
    {
        $this->achievement = $achievement;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array
     */
    public function via()
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'name' => $this->achievement->name,
            'url' => route('users.show.achievements', $notifiable->steamid)
        ];
    }
}
