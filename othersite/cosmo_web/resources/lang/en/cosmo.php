<?php
return [
/**
 * @TranslationFile ENGLISH
 * @authors Morgan, Zeo
 * @helpers [
        https://morgan-lee.cc - English / Base Translations
        https://zeodev.cc - Dutch
    ],
 * @file cosmo.php
 * @version 1.0.0

 * Welcome Translator!
 * Thank you for being one of the very few people willing to translate our new addon Cosmo.
 * This translation file is the only one you'll need to translate, as everything you need is located below.
 * Please take your time to ensure everything is correct and appropriate.
 * Upon sending this file back to the authors, please make sure to add your name next to the @helpers property so you can be properly credited.
 * With any notification messages and or success messages, please feel free to come up with your own slogan as long as it sends the same message.
 * if you see a string with a comment next to it, that's to give you more context.
 * Any string with a :variable name is referring to the variable passed into the message. (LEAVE THE VARIABLES)

 * How to translate
 * You'll see two strings, please only translate the string on the right side of the arrow as seen below
 * 'search' => 'ENTER YOUR TRANSLATION HERE',
 * Please also make sure that all of the strings you edit end with a comma (,)
 * If you need to use an apostrophe (') please escape it with a backslash (\) as seen below
 * 'example' => 'You\'re awesome!',
 **/

// TRANSLATIONS START //

    // Dark Rewrite
    'dxrk' => [
        'steam_title' => 'Our Steam Group Statistics',
        'steam_desc' => 'Click :here to join our ever-growing Steam Group!',
        'join_server' => 'Join Server',
    ],


    'errors' => [
        'no_api_key' => 'Steam API key was not set',
        'failed' => 'Failed to retrieve server info'
    ],

    'navbar' => [
        'profile' => 'Profile',
        'visit_profile' => 'Visit and update your profile!',

        'management' => 'Management',
        'manage_cosmo' => 'Manage Cosmo as an Administrator.',

        'logout' => 'Logout',
        'login' => 'Login',

        'welcome_back' => 'Welcome back, :username',
        'notifications' => 'Notifications'
    ],


    'core' => [
        'home' => 'Home',
        'staff' => 'Staff',
        'threads' => 'Threads',
        'browse_threads' => 'Browse All Threads',
        'viewing_thread' => 'Viewing Thread',
        'forums' => 'Forums',
        'terms' => 'Terms Of Service',
        'store' => 'Store',
        'success' => 'Success!',
        'failed' => 'Failed!',
        'checkout' => 'Checkout',
        'users' => 'Users',
        'board' => 'Board',
        'edit' => 'Edit',

        'licensed_to' => 'Licensed to :licensee',
        'created_by' => 'Created By :author',

        'theme_specific' => [
            'group_members' => 'Group Members',
            'online_members' => 'Online Members',
            'in-game_members' => 'In-Game Members',
            'join_steam-group' => 'Join Our Steam Group',
            'players_online' => 'Players Online',
            'join_servers' => 'Join Our <span>Servers</span>',
            'join_discord' => 'Join Our <span>Discord</span>',
        ],

        'confirmation' => 'Are you sure?',
        'cancel' => 'Cancel',
    ],

    'store' => [
        'browse_packages' => 'Browse packages for :server!',
        'checkout' => 'Checkout',
        'permanent' => 'Permanent',
        'non-permanent' => 'Non Permanent',
        'login_to-checkout' => 'Login to checkout',

        'coupon-code' => 'Coupon Code',
        'enter_coupon-code' => 'Enter Coupon Code',
        'gift-purchase' => 'Buying as a gift',
        'enter_steamId' => 'Enter Steam ID',

        'finalize_purchase' => 'Finalize Your Purchase',
        'tos_agree' => 'You hereby agree to our <a href="'.route('store.tos').'">Terms Of Service</a>', // Translate around the link
        'checkout_with-paypal' => 'Checkout with PayPal',

        'complete_purchase' => 'Complete Your Purchase',
        'checking_out-package' => 'You are checking out :package', //"You are checking out package: VIP"
        'package_price' => 'Package Price',

        'sub-total' => 'Sub Totals',
        'total' => 'Total: :sign:price',
        'servers' => 'Servers',

        'monthly_goal' => 'Monthly Donation Goal',
        'table' => [
            'top_donations' => 'Top Donations',
            'recent_donations' => 'Recent Donations',
            'name' => 'Name',
            'amount' => 'Amount',
            'package' => 'Package',
        ],

        'select_server' => 'Browse',
        'store_select_server' => 'Browse',

        'success' => [
            'success' => 'Payment Successful!',
            'msg' => 'You will receive your package shortly...'
        ],
        'fail' => [
            'fail' => 'Payment Failed!',
            'msg' => 'Payment failed.... please try again later',
        ],

        'cancel' => [
            'cancel' => 'Payment Canceled!',
            'msg' => 'Your payment has successfully been canceled'
        ],

        'sale' => [
            'time-left' => 'Time left: :time',
            'info' => '<b>Hurry</b> and grab our products on sale! <span>:percentage% OFF</span>',
            'go_to_store' => 'GO TO STORE',
        ],
    ],

    'forums' => [
        'polls' => 'Polls',
        'polls_desc' => 'Have your say in the community',
        'unanswered_polls' => 'Unanswered Poll(s)',

        'search' => 'Search',
        'search_desc' => 'Browse the forums!',

        'recent_activity' => 'Recent Activity',
        'recent_desc' => 'Our Communities recent activity',

        'latest_threads' => 'Latest Threads',
        'latest_threads-desc' => 'Our communities latest threads',

        'latest_posts' => 'Latest Posts',
        'latest_posts-desc' => 'Our communities latest posts',

        'replies' => 'Replies',

        'threads' => [
            'locked' => 'LOCKED',
            'pinned' => 'PINNED',

            'edit_thread' => 'Edit Thread',
            'editing_thread' => 'Editing Thread',
            'pin_thread' => 'Pin Thread',
            'unpin_thread' => 'Unpin Thread',
            'lock_thread' => 'Lock Thread',
            'unlock_thread' => 'Unlock Thread',
            'move_thread' => 'Move Thread',
            'delete_thread'=> 'Delete Thread',

            'create_thread' => 'Create Thread',
            'update_thread' => 'Update Thread',
            'thread_title' => 'Thread Title',
            'post_reply' => 'Post',

            'created_at' => 'Created At',

            'posted_by' => 'Posted By: ',

            'locked_no_reply' => 'This thread has been locked, you can no longer reply to it!',
        ],
        'posts' => [
            'editing_post' => 'Editing Post',
            'update_post' => 'Update Post',
            'delete_post' => 'Delete Post'
        ]
    ],

    'users' => [
        'search_users' => 'Search Users...',
        'no_users-found' => 'No users found',

        'pills' => [
            'home'=> 'Home',
            'comments' => 'Comments',
            'threads' => 'Threads',
            'achievements' => 'Achievements',
            'edit' => 'Edit Profile',
        ],

        'welcome_to_profile' => 'Welcome to my profile!',

        'user_joined' => 'User Joined',
        'comment' => 'Comment',
        'editing_comment' => 'Editing Comment',

        'edit' => [
            'display_name' => 'Display Name',
            'avatar_image' => 'Avatar Image',
            'background_image' => 'Background Image',
            'biography' => 'Biography',
            'signature' => 'Signature',
            'sync_steam' => 'Sync with Steam',
            'sync_discord' => 'Sync with discord',
        ],

        'achievements' => [
            'unlock_more' => 'Unlock More...',
            'default' => 'To unlock more achievements, continue to use the forums and other features.',
            'achievement_unlocked' => 'This achievement was unlocked' // "This achievement was unlocked" 1 day ago
        ],
    ],

    'actions' => [
        'close' => 'Close',
        'save_changes' => 'Save Changes',
        'go_back' => 'Go Back',
        'submit' => 'Submit',
        'post' => 'Post',
        'create' => 'Create',
        'update' => 'Update',
        'delete' => 'Delete'
    ],

    'notifications' => [
        'new_notif' => 'NEW',
        'notifications' => 'Notifications',
        'mark_all_as_read' => 'Mark all as read',
        'delete_all' => 'Delete All',
        'no_notifications' => 'You have no notifications',

        'reply_to_thread' => ':username has replied to your thread',
        'unlocked_achievement' => 'You have unlocked the achievement: :achievement',
        'profile_comment' => ':username has commented on your profile!',
        'profile_like' => ':username has :state your profile!',
        'thread_action' => ':admin has :action your thread: :title',
        'manage' => 'Manage your outstanding Notifications',
    ],

    'toastr_alerts' => [
        'marked_notifications' => 'You have marked all of your notifications as read!',
        'cleared_notifications' => 'You have cleared all of your notifications!',

        'update_post' => 'Successfully updated post',
        'delete_post' => 'Successfully deleted post',

        'create_thread' => 'Successfully created new thread',
        'update_thread' => 'Successfully updated thread',
        'delete_thread' => 'Successfully delete thread!',
        'pin_thread' => 'Successfully pinned thead!',
        'unpin_thread' => 'Successfully unpinned thead!',
        'lock_thread' => 'Successfully locked thead!',
        'unlock_thread' => 'Successfully unlocked thead!',
        'move_thread' => 'Successfully moved thread!',

        'application_cache' => 'Cleared application cache!',

        'create_board' => 'Successfully created board',
        'update_board' => 'Successfully updated board',
        'delete_board' => 'Successfully delete board!',
        'move_board' => 'Successfully sorted the boards!',

        'create_category' => 'Successfully created new category',
        'update_category' => 'Successfully updated category',
        'delete_category' => 'Successfully delete category!',

        'create_poll' => 'Successfully started a new poll',
        'update_poll' => 'Successfully updated the poll',
        'delete_poll' => 'Successfully delete the poll!',
        'open_poll' => 'Successfully set the status of the poll to open!',
        'close_poll' => 'Successfully set the status of the poll to closed!',

        'update_configurations' => 'Successfully updated all general configurations!',
        'update_meta' => 'Successfully updated all meta configurations!',
        'update_integration' => 'Successfully updated all integration configurations!',
        'update_theme' => 'Successfully updated global theme!',
        'update_settings' => 'Successfully updated all store configurations!',
        'update_tos' => 'Successfully updated Terms Of Service!',

        'create_role' => 'Successfully created a new role',
        'update_role' => 'Successfully updated role!',
        'delete_role' => 'Successfully deleted role!',

        'update_user' => 'Successfully updated user!',

        'create_feature' => 'Successfully created a new feature!',
        'update_feature' => 'Successfully updated feature!',
        'delete_feature' => 'Successfully deleted feature!',

        'create_footer-link' => 'Successfully created a new footer link!',
        'update_footer-link' => 'Successfully updated footer link!',
        'delete_footer-link' => 'Successfully deleted footer link!',

        'create_nav-link' => 'Successfully created a new navigation link!',
        'update_nav-link' => 'Successfully updated navigation link!',
        'delete_nav-link' => 'Successfully deleted navigation link',

        'create_server' => 'Successfully created a new server!',
        'update_server' => 'Successfully updated server!',
        'delete_server' => 'Successfully deleted server!',

        'create_coupon' => 'Successfully created a new coupon code!',
        'update_coupon' => 'Successfully updated coupon code!',
        'delete_coupon' => 'Successfully deleted coupon code!',

        'invalid_coupon-code' => 'This coupon code is invalid!',
        'unusable_coupon-code' => 'This coupon code can\'t be used on this package!',
        'invalid_gift-steamId' => 'This SteamID is invalid!',

        'create_package' => 'Successfully created a new store package!',
        'update_package' => 'Successfully updated package!',
        'delete_package' => 'Successfully deleted package!',

        'create_sale' => 'Successfully added a new store sale',
        'update_sale' => 'Successfully updated store sale!',
        'delete_sale' => 'Successfully deleted store sale!',

        'create_comment' => 'Successfully posted comment!',
        'update_comment' => 'Successfully updated comment!',
        'delete_comment' => 'Successfully deleted comment!',

        'like_own_profile' => 'Sorry, you can\'t like your own profile :)',
        'remove_like' => 'Successfully removed like for :username\'s profile!',
        'create_like' => 'Successfully liked :username\'s profile!',

        'update_profile' => 'Successfully updated profile!',
    ],


    'management' => [
        'navigation' => [
            'dashboard' => 'Dashboard',

            'general' => 'General',
            'configuration' => 'Configuration',
            'meta' => 'Meta',
            'users' => 'Users',
            'roles' => 'Roles',

            'index' => 'Index',
            'components' => [
                'components' => 'Components',
                'nav-links' => 'Nav Links',
                'features' => 'Features',
                'servers' => 'Servers',
                'integrations' => 'Integrations',
                'footer-links' => 'Footer Links'
            ],
            'theme' => 'Theme',

            'forums' => 'Forums',
            'categories' => 'Categories',
            'boards' => 'Boards',
            'polls' => 'Polls',

            'store' => 'Store',
            'settings' => 'Settings',
            'packages' => [
                'packages' => 'Packages',
                'create' => 'Create',
                'manage' => 'Manage'
            ],
            'coupon_code' => 'Coupon Code',
            'sales' => 'Sales',
            'tos' => 'TOS',
            'transactions' => 'Transactions',
            'profile' => 'Profile',
            'exit_management' => 'Exit Management',
            'logout' => 'Logout',
        ],

        'core' => [
            'clear_cache' => 'Clear Cache',
            'check_for_updates' => 'Check for Updates',

            'dashboard_title' => 'Dashboard',
            'dashboard_small' => 'Page Statistics',

            'configurations_title' => 'Configurations',
            'configurations_small' => 'Manage Configuration',

            'meta_title' => 'Meta',
            'meta_small' => 'Manage Site Meta',

            'users_title' => 'Users',
            'users_small' => 'Manage Users',
            'users_search' => 'Search Users...',
            'users_role' => 'Role',

            'create_new_role' => 'Create new role',
            'roles_role-name' => 'Role Name',
            'roles_role-display' => 'Role Display',
            'roles_role-color' => 'Role Color',

            'create_new_nav' => 'Create new link',
            'nav_name' => 'Link Name',
            'nav_icon' => 'Link Icon',
            'nav_color' => 'Link Color',
            'nav_url' => 'Link URL',
            'nav_category' => 'Link Category',

            'create_new_feature' => 'Create new feature',
            'feature_name' => 'Feature Name',
            'feature_icon' => 'Feature Icon',
            'feature_color' => 'Feature Color',
            'feature_content' => 'Feature Content',

            'create_new_server' => 'Create new Server',
            'server_name' => 'Server Name',
            'server_icon' => 'Server Icon',
            'server_color' => 'Server Color',
            'server_image' => 'Server Image',
            'server_ip' => 'Server IP',
            'server_port' => 'Server Port',
            'server_description' => 'Server Description',

            'enable_steam-group_statistics' => 'Enable Steam Group Statistics',
            'enable_discord-widget' => 'Enable Discord Widget',
            'enable_widget-bot' => 'Enable Widget Bot',
            'enable_discord-sync' => 'Enable Discord Sync',

            'create_new_link' => 'Create new link',
            'link_name' => 'Link Name',
            'link_url' => 'Link URL',
            'link_category' => 'Link Category',

            'theme_title' => 'Theme',
            'theme_small' => 'Manage Themes',

            'create_new_category' => 'Create new category',
            'category_name' => 'Category Name',
            'category_desc' => 'Category Description',

            'create_new_board' => 'Create new board',
            'board_name' => 'Board Name',
            'board_icon' => 'Board Icon',
            'board_color' => 'Board Color',
            'board_desc' => 'Board Description',
            'board_category' => 'Board Category',
            'board_permission_roles' => 'Roles with access',

            'create_new_poll' => 'Create new poll',
            'poll_title' => 'Poll Title',
            'poll_description' => 'Poll Description',
            'poll_icon' => 'Poll Icon',
            'poll_answers' => 'Poll Answers',
            'poll_answer' => 'Poll Answer',

            'store_settings_title' => 'Store Settings',
            'store_settings_small' => 'Manage Store Settings',

            'enable_monthly_goal' => 'Enable Monthly Goal',
            'monthly_goal' => 'Monthly Goal',
            'display_top_recent-donations' => 'Display Top & Recent Donations',

            'paypal_client_id' => 'PayPal Client ID',
            'paypal_client_secret' => 'PayPal Client Secret',
            'paypal_webhook_id' => 'PayPal Webhook ID',

            'enable_chargeback-bans' => 'Enable chargeback bans',
            'chargeback-ban' => '<code>Enable chargeback bans</code> - When a user tries to initiate a charge back via paypal, we will automatically ban the user from accessing your website.',

            'package_title' => 'Packages',
            'package_small' => 'Create Packages',
            'create_new_package' => 'Create new package!',
            'package_name' => 'Package Name',
            'package_price' => 'Package Price',
            'package_image' => 'Package Image',
            'package_servers' => 'Servers',
            'package_category' => 'Category',
            'package_description' => 'Package Description',

            'create_new_coupon' => 'Create new coupon',
            'coupon_code' => 'Coupon Code',
            'coupon_percentage' => 'Percentage',
            'coupon_packages' => 'Packages',
            'coupon_packages_info' => 'These are the packages this code can be used on',
            'coupon_package_use-amt' => 'Use Amount',
            'coupon_package_use-amt_info' => 'The amount of time the coupon can be used. 0 for unlimited',
            'coupon_package_start-date' => 'Start Date',
            'coupon_package_start-date_info' => 'The coupon will become active once this date passes',
            'coupon_package_end-date' => 'Expiration Date',
            'coupon_package_end-date_info' => 'After this date, the coupon will not be able to get used again',

            'create_new_sale' => 'Create new sale',
            'sale_title' => 'Sale Title',
            'sale_percentage' => 'Sale Percentage',
            'sale_packages' => 'Sale Packages',
            'sale_start-date' => 'Start Date',
            'sale_end-date' => 'Expiration Date',

            'update_terms' => 'Update Terms Of Service',

            'disable_maintenance' => 'Disable Maintenance',
            'enable_maintenance' => 'Enable Maintenance',

            'reinstall' => 'Reinstall',
            'reinstall_confirm' => 'Are you sure you want to reinstall the application?',

            'toggle_dark_mode' => 'Toggle Dark Mode',

            'yearly_sales' => 'Yearly Sales',
            'monthly_sales' => 'Monthly Sales',

            'stats' => [
                'earnings' => [
                    'total' => 'Total Earnings',
                    'monthly' => 'Monthly Earnings',
                    'weekly' => 'Weekly Earnings',
                    'daily' => 'Daily Earnings',
                ],
                'total_packages' => 'Total Packages',
                'total_purchases' => 'Total Purchases',
                'forum' => [
                    'categories' => 'Total Categories',
                    'boards' => 'Total Boards',
                    'threads' => 'Total Threads',
                ],
                'users' => 'Total Users',
                'roles' => 'Total Roles',
                'tickets' => 'Open Support Tickets',
            ],
        ],

        'save_configurations' => 'Save Configurations',

    ]
];
