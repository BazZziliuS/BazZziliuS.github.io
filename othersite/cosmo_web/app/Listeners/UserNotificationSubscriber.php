<?php

namespace App\Listeners;

use App\Events\ThreadActionExecuted;
use App\Models\Forums\Post;
use App\Models\Profile\Comment;
use App\Models\Profile\Like;
use App\Notifications\AchievementUnlocked;
use App\Notifications\ProfileComment;
use App\Notifications\ProfileLike;
use App\Notifications\ThreadAction;
use App\Notifications\ThreadReply;
use Illuminate\Contracts\Events\Dispatcher;
use tehwave\Achievements\Models\Achievement;

class UserNotificationSubscriber
{
    public function onPostCreated(Post $post)
    {
        if ($post->user->is($post->thread->user)) return; // Ignore original poster.

        $post->user->notify(
            new ThreadReply($post)
        );
    }

    public function onCommentCreated(Comment $comment)
    {
        if ($comment->user->is($comment->profile->user)) return;

        $comment->profile->user->notify(
            new ProfileComment($comment)
        );
    }

    public function sendLikeNotification(Like $like, bool $state)
    {
        $like->profile->user->notify(
            new ProfileLike($like->user, $state)
        );
    }

    public function onAchievementUnlocked(Achievement $achievement)
    {
        $achievement->achiever->notify(
            new AchievementUnlocked($achievement)
        );
    }

    public function onThreadActionExecuted(ThreadActionExecuted $event)
    {
        if ($event->thread->user->is($event->user)) return;

        $event->thread->user->notify(
            new ThreadAction($event->thread, $event->user, $event->action)
        );
    }

    public function subscribe(Dispatcher $events)
    {
        $events->listen('eloquent.created: ' . Post::class, [static::class, 'onPostCreated']);
        $events->listen('eloquent.created: ' . Comment::class, [static::class, 'onCommentCreated']);

        $events->listen('eloquent.created: ' . Like::class, fn(Like $like) => $this->sendLikeNotification($like, true));
        $events->listen('eloquent.deleted: ' . Like::class, fn(Like $like) => $this->sendLikeNotification($like, false));

        $events->listen('eloquent.created: ' . Achievement::class, [static::class, 'onAchievementUnlocked']);
        $events->listen(ThreadActionExecuted::class, [static::class, 'onThreadActionExecuted']);
    }
}