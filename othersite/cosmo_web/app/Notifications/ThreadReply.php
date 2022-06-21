<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;

/**
 * Class ThreadReply
 * @package App\Notifications
 */
class ThreadReply extends Notification
{
    private $post;

    /**
     * Create a new notification instance.
     *
     * @param $post
     */
    public function __construct($post)
    {
        $this->post = $post;
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
     * @return array
     */
    public function toArray()
    {
        return [
            'post_id' => $this->post->id,
            'username' => $this->post->user->username,
            'url' => route('forums.posts.show', $this->post->id)
        ];
    }
}
