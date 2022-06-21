<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class ConfigurationSeeder
 */
class ConfigurationSeeder extends Seeder
{
    /**
     * Run the database seeders.
     *
     * @return void
     */
    public function run()
    {
        $curDate = now();

        $configurations = collect(array_merge(
            $this->metaConfigurations(),
            $this->generalConfigurations(),
            $this->integrationConfigurations(),
            $this->storeConfigurations(),
            $this->otherConfigurations()
        ))->map(function($configuration) use ($curDate) {
            return $configuration + [
                'display_name' => null,
                'category' => null,
                'updated_at' => $curDate
            ];
        })->toArray();

        DB::table('configurations')->insertOrIgnore($configurations);
    }

    /**
     * Returns an array of configurations belonging to the "meta" category
     *
     * @return array
     */
    protected function metaConfigurations()
    {
        return [
            [
                'key' => 'meta_title',
                'value' => 'Cosmo',
                'type' => 'text',
                'display_name' => 'Meta Title',
                'category' => 'general.meta',
            ],
            [
                'key' => 'meta_description',
                'value' => 'Cosmo the only web application you\'ll ever need',
                'type' => 'text',
                'display_name' => 'Meta Description',
                'category' => 'general.meta'
            ],
            [
                'key' => 'meta_keywords',
                'value' => 'cosmo,web,index,forums,store,gmodstore,gms,gmod,steam',
                'type' => 'text',
                'display_name' => 'Meta Keywords',
                'category' => 'general.meta',
            ],
            [
                'key' => 'meta_type',
                'value' => 'article',
                'type' => 'text',
                'display_name' => 'Meta Type',
                'category' => 'general.meta',
            ],
            [
                'key' => 'meta_color',
                'value' => '#2196F3',
                'type' => 'color',
                'display_name' => 'Meta Color',
                'category' => 'general.meta',
            ]
        ];
    }

    /**
     * Returns an array of configurations belonging to the "general" category
     *
     * @return array
     */
    protected function generalConfigurations()
    {
        return [
            [
                'key' => 'site_name',
                'value' => 'Cosmo Ltd',
                'type' => 'text',
                'display_name' => 'Site Name',
                'category' => 'general.site'
            ],
            [
                'key' => 'site_logo',
                'value' => asset('img/logo.png'),
                'type' => 'text',
                'display_name' => 'Site Logo',
                'category' => 'general.site'
            ],
            [
                'key' => 'site_color',
                'value' => '#3F51B5',
                'type' => 'color',
                'display_name' => 'Site Color',
                'category' => 'general.site'
            ],
            [
                'key' => 'site_background',
                'value' => '',
                'type' => 'text',
                'display_name' => 'Site Background',
                'category' => 'general.site'
            ],
            [
                'key' => 'header_title',
                'value' => 'Cosmo',
                'type' => 'text',
                'display_name' => 'Header Title',
                'category' => 'general'
            ],
            [
                'key' => 'header_description',
                'value' => 'Give your community some style!',
                'type' => 'text',
                'display_name' => 'Header Description',
                'category' => 'general'
            ],
            [
                'key' => 'features_title',
                'value' => 'Features',
                'type' => 'text',
                'display_name' => 'Features Title',
                'category' => 'general'
            ],
            [
                'key' => 'features_description',
                'display_name' => 'Features Description',
                'type' => 'text',
                'value' => 'Here are our features',
                'category' => 'general'
            ],
            [
                'key' => 'servers_title',
                'value' => 'Servers',
                'type' => 'text',
                'display_name' => 'Servers Title',
                'category' => 'general'
            ],
            [
                'key' => 'servers_description',
                'value' => 'What are you waiting for? Join today!',
                'type' => 'text',
                'display_name' => 'Servers Description',
                'category' => 'general'
            ],
            [
                'key' => 'leadership_title',
                'value' => 'Leadership',
                'type' => 'text',
                'display_name' => 'Leadership Title',
                'category' => 'general'
            ],
            [
                'key' => 'leadership_description',
                'value' => 'The immense team of individuals keeping this community afloat!',
                'type' => 'text',
                'display_name' => 'Leadership Description',
                'category' => 'general'
            ],
            [
                'key' => 'discord_title',
                'value' => 'Discord',
                'type' => 'text',
                'display_name' => 'Discord Title',
                'category' => 'general'
            ],
            [
                'key' => 'discord_description',
                'value' => 'Missing out on crucial updates and announcements? Join our discord!',
                'type' => 'text',
                'display_name' => 'Discord Description',
                'category' => 'general'
            ],
            [
                'key' => 'users_title',
                'value' => 'Users',
                'type' => 'text',
                'display_name' => 'Users Title',
                'category' => 'general'
            ],
            [
                'key' => 'users_description',
                'value' => 'The wonderful people in this community',
                'type' => 'text',
                'display_name' => 'Users Description',
                'category' => 'general'
            ],
            [
                'key' => 'footer_title',
                'value' => 'Cosmo',
                'type' => 'text',
                'display_name' => 'Footer Title',
                'category' => 'general'
            ],
            [
                'key' => 'footer_description',
                'value' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
                'type' => 'text',
                'display_name' => 'Footer Description',
                'category' => 'general'
            ],
            [
                'key' => 'forums_title',
                'value' => 'Forums',
                'type' => 'text',
                'display_name' => 'Forums Title',
                'category' => 'general'
            ],
            [
                'key' => 'forums_description',
                'value' => 'See what\'s everyone is up to!',
                'type' => 'text',
                'display_name' => 'Forums Description',
                'category' => 'general'
            ],
            [
                'key' => 'store_title',
                'value' => 'Store',
                'type' => 'text',
                'display_name' => 'Store Title',
                'category' => 'general'
            ],
            [
                'key' => 'store_description',
                'value' => 'Get your in-game perks here!',
                'type' => 'text',
                'display_name' => 'Store Description',
                'category' => 'general'
            ],
            [
                'key' => 'staff_title',
                'value' => 'Staff',
                'type' => 'text',
                'display_name' => 'Staff Title',
                'category' => 'general'
            ],
            [
                'key' => 'staff_description',
                'value' => 'View all our amazing staff',
                'type' => 'text',
                'display_name' => 'Staff Description',
                'category' => 'general'
            ],
            [
                'key' => 'notifications_title',
                'value' => 'Notifications',
                'type' => 'text',
                'display_name' => 'Notifications Title',
                'category' => 'general'
            ],
            [
                'key' => 'notifications_description',
                'value' => 'Manage your outstanding Notifications',
                'type' => 'text',
                'display_name' => 'Notifications Description',
                'category' => 'general'
            ],
            [
                'key' => 'tos_title',
                'value' => 'Terms of Service',
                'type' => 'text',
                'display_name' => 'TOS Title',
                'category' => 'general'
            ],
        ];
    }

    /**
     * Returns an array of configurations belonging to the "integrations" category
     *
     * @return array
     */
    protected function integrationConfigurations()
    {
        return [
            [
                'key' => 'discord_widget_enabled',
                'value' => false,
                'type' => 'boolean',
                'display_name' => 'Enable Discord Widget',
                'category' => 'integrations.discord',
            ],
            [
                'key' => 'discord_widget_bot_enabled',
                'value' => false,
                'type' => 'boolean',
                'display_name' => 'Enable Widget Bot',
                'category' => 'integrations.discord'
            ],
            [
                'key' => 'discord_widget_id',
                'value' => '709488813109673995',
                'type' => 'text',
                'display_name' => 'Discord Widget ID',
                'category' => 'integrations.discord',
            ],
            [
                'key' => 'discord_channel_id',
                'value' => '709502371411001484',
                'type' => 'text',
                'display_name' => 'Discord Channel ID',
                'category' => 'integrations.discord',
            ],
            [
                'key' => 'discord_invite_url',
                'value' => 'https://discord.gg/WzqQMBU',
                'type' => 'text',
                'display_name' => 'Discord Invite URL',
                'category' => 'integrations.discord',
            ],
            [
                'key' => 'discord_sync_enabled',
                'value' => false,
                'type' => 'boolean',
                'display_name' => 'Discord Sync Enabled',
                'category' => 'integrations.discord'
            ],
            [
                'key' => 'discord_client_id',
                'value' => '',
                'type' => 'text',
                'display_name' => 'Discord Client ID (<a href="https://discord.com/developers">https://discord.com/developers</a>)',
                'category' => 'integrations.discord'
            ],
            [
                'key' => 'discord_client_secret',
                'value' => '',
                'type' => 'text',
                'display_name' => 'Discord Client Secret (<a href="https://discord.com/developers">https://discord.com/developers</a>)',
                'category' => 'integrations.discord'
            ],
            [
                'key' => 'discord_bot_token',
                'value' => '',
                'type' => 'text',
                'display_name' => 'Discord Bot Token (<a href="https://discord.com/developers">https://discord.com/developers</a>)',
                'category' => 'integrations.discord'
            ],
            [
                'key' => 'steam_api_key',
                'value' => '',
                'type' => 'text',
                'display_name' => 'Steam API Key (<a href="https://steamcommunity.com/dev/apikey">https://steamcommunity.com/dev/apikey</a>)',
                'category' => 'integrations.steam'
            ],
            [
                'key' => 'steam_group_enabled',
                'value' => false,
                'type' => 'boolean',
                'display_name' => 'Enable Steam Group Statistics',
                'category' => 'integrations.steam',
            ],
            [
                'key' => 'steam_group_slug',
                'value' => 'asap-rp',
                'type' => 'text',
                'display_name' => 'Steam Group Slug',
                'category' => 'integrations.steam'
            ]
        ];
    }

    /**
     * Returns an array of configurations belonging to the "store" category
     *
     * @return array
     */
    protected function storeConfigurations()
    {
        return [
            [
                'key' => 'monthly_goal_enabled',
                'value' => true,
                'type' => 'boolean',
                'display_name' => 'Monthly Goal Enabled',
                'category' => 'store'
            ],
            [
                'key' => 'monthly_goal',
                'value' => 5,
                'type' => 'number',
                'display_name' => 'Monthly Goal',
                'category' => 'store'
            ],
            [
                'key' => 'show_store_statistics',
                'value' => true,
                'type' => 'boolean',
                'display_name' => 'Display Top & Recent Donations',
                'category' => 'store'
            ],
            [
                'key' => 'store_header',
                'value' => '<h1 class="text-center text-white mt-0 pt-0">Welcome to our store!</h1><p>This is our community\'s donation system. It is fully automatic and you are able to buy various packages for different servers. They may include anything from ranks to custom perks.</p>',
                'type' => 'rich_text',
                'display_name' => 'Store Header Text',
                'category' => 'store'
            ],
            [
                'key' => 'paypal_client_id',
                'value' => '',
                'type' => 'text',
                'display_name' => 'PayPal Client ID (<a href="https://developer.paypal.com">https://developer.paypal.com</a>)',
                'category' => 'store.paypal'
            ],
            [
                'key' => 'paypal_client_secret',
                'value' => '',
                'type' => 'text',
                'display_name' => 'PayPal Client Secret (<a href="https://developer.paypal.com">https://developer.paypal.com</a>)',
                'category' => 'store.paypal'
            ],
            [
                'key' => 'paypal_webhook_id',
                'value' => '',
                'type' => 'text',
                'display_name' => 'PayPal Webhook ID (<a href="https://developer.paypal.com">https://developer.paypal.com</a>)',
                'category' => 'store.paypal'
            ],
            [
                'key' => 'paypal_sandbox_enabled',
                'value' => false,
                'type' => 'boolean',
                'display_name' => 'PayPal Sandbox Mode',
                'category' => 'store.paypal'
            ],
            [
                'key' => 'ban_user_on_chargeback',
                'value' => true,
                'type' => 'boolean',
                'display_name' => 'User Chargeback Ban',
                'category' => 'store.paypal',
            ],
            [
                'key' => 'store_currency',
                'value' => 'USD',
                'type' => 'currency',
                'display_name' => 'Store Currency',
                'category' => 'store.misc'
            ],
            [
                'key' => 'terms_of_service',
                'value' => '<strong>Your terms of service go here!</strong>',
                'type' => 'rich_text',
                'display_name' => 'Terms of Service',
                'category' => 'store.misc'
            ]
        ];
    }

    /**
     * Returns an array of configurations which have no category
     *
     * @return array
     */
    protected function otherConfigurations()
    {
        return [
            [
                'key' => 'active_theme',
                'value' => config('themes.default', 'havart'),
                'type' => 'text'
            ]
        ];
    }
}
