<?php

namespace App\Events;

use App\Models\Forums\Thread;
use App\Models\User;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ThreadActionExecuted
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Thread $thread;
    public User $user;
    public string $action;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Thread $thread, User $user, string $action)
    {
        $this->thread = $thread;
        $this->user = $user;
        $this->action = $action;
    }
}
