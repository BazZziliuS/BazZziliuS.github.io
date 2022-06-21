<?php

namespace App\Providers;

use App\Listeners\UserNotificationSubscriber;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use SocialiteProviders\Manager\SocialiteWasCalled;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        SocialiteWasCalled::class => [
            'SocialiteProviders\\Steam\\SteamExtendSocialite@handle',
            'SocialiteProviders\\Discord\\DiscordExtendSocialite@handle',
        ]
    ];

    /**
     * The subscriber classes to register.
     *
     * @var array
     */
    protected $subscribe = [
        UserNotificationSubscriber::class,
//        SendDiscordWebhooksSubscriber::class,
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();
    }
}
