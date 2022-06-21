<?php

return [
    'version_id' => '712567998464720899',
    'version' => '1.3.1',

    'general' => [
        'show_copyright' => true,
        'show_credits' => true,
    ],

    'forums' => [
        // Changing this value will change the order of the Forum Stats. It will swap sides, from left to right
        'left_layout' => false,
    ],

    'reactions' => [
        [
            'emoji' => 'img/reactions/check.svg',
            'display' => 'Agree'
        ],
        [
            'emoji' => 'img/reactions/cross.svg',
            'display' => 'Disagree'
        ],
        [
            'emoji' => 'img/reactions/funny.svg',
            'display' => 'Funny'
        ],
        [
            'emoji' => 'img/reactions/confused.svg',
            'display' => 'Confused'
        ],
        [
            'emoji' => 'img/reactions/medal.svg',
            'display' => 'Winner'
        ],
        [
            'emoji' => 'img/reactions/heart.svg',
            'display' => 'Friendly'
        ],
        [
            'emoji' => 'img/reactions/pow.svg',
            'display' => 'Zing'
        ]
    ],

    /* DO NOT TOUCH THIS */
    'permissions' => [
        [
            'reference' => 'view-management',
            'display' => 'View Management',
            'description' => 'Has permission to access the management page'
        ],
        [
            'reference' => 'manage-settings',
            'display' => 'Manage Settings',
            'description' => 'Has permission to manage the application settings'
        ],
        [
            'reference' => 'manage-users',
            'display' => 'Manage Users',
            'description' => 'Has permission to manage user roles and delete users'
        ],
        [
            'reference' => 'manage-roles',
            'display' => 'Manage Roles',
            'description' => 'Has permission to manage roles'
        ],
        [
            'reference' => 'toggle-maintenance',
            'display' => 'Toggle Maintenance Mode',
            'description' => 'Has permission to toggle maintenance mode'
        ],
        [
            'reference' => 'clear-cache',
            'display' => 'Clear Cache',
            'description' => 'Has permission to clear the application cache'
        ],
        [
            'reference' => 'reinstall-app',
            'display' => 'Reinstall App',
            'description' => 'Has permission to reinstall the ENTIRE application'
        ],
        [
            'reference' => 'update-app',
            'display' => 'Update Application',
            'description' => 'Has permission to check for updates and update the application'
        ],
        [
            'reference' => 'manage-servers',
            'display' => 'Manage Servers',
            'description' => 'Has permission to manage servers'
        ],
        [
            'reference' => 'manage-features',
            'display' => 'Manage Features',
            'description' => 'Has permission to manage features'
        ],
        [
            'reference' => 'display-leadership',
            'display' => 'Display on Leadership',
            'description' => 'Will show the user in the Leadership section on the index'
        ],
        [
            'reference' => 'manage-theme',
            'display' => 'Manage Theme',
            'description' => 'Has permission to set the active theme'
        ],
        [
            'reference' => 'manage-navlinks',
            'display' => 'Manage Navigation Links',
            'description' => 'Has permission to manage navigation links'
        ],
        [
            'reference' => 'manage-footerlinks',
            'display' => 'Manage Footer Links',
            'description' => 'Has permission to manage footer links'
        ],
        [
            'reference' => 'manage-categories',
            'display' => 'Manage Forum Categories',
            'description' => 'Has permission to manage forum categories'
        ],
        [
            'reference' => 'manage-boards',
            'display' => 'Manage Forum Boards',
            'description' => 'Has permission to manage forum boards'
        ],
        [
            'reference' => 'lock-threads',
            'display' => 'Lock Threads',
            'description' => 'Has permission to lock threads'
        ],
        [
            'reference' => 'sticky-threads',
            'display' => 'Sticky Thread',
            'description' => 'Has permission to sticky threads'
        ],
        [
            'reference' => 'move-threads',
            'display' => 'Move Threads',
            'description' => 'Has permission to move threads'
        ],
        [
            'reference' => 'manage-threads',
            'display' => 'Manage Threads',
            'description' => 'Has permission to manage anything thread-related'
        ],
        [
            'reference' => 'display-staff',
            'display' => 'Display on Staff',
            'description' => 'Will show this every user in this role on the staff page'
        ],
        [
            'reference' => 'manage-polls',
            'display' => 'Manage Polls',
            'description' => 'Has permission to manage polls'
        ],
        [
            'reference' => 'manage-packages',
            'display' => 'Manage Packages',
            'description' => 'Has permission to manage store packages'
        ],
        [
            'reference' => 'manage-transactions',
            'display' => 'Manage Transactions',
            'description' => 'Has permission to manage store transactions'
        ],
        [
            'reference' => 'manage-coupons',
            'display' => 'Manage Coupon Codes',
            'description' => 'Has permission to manage coupon codes'
        ],
        [
            'reference' => 'manage-sales',
            'display' => 'Manage Sales',
            'description' => 'Has permission to manage sales'
        ],
        [
            'reference' => 'manage-changelogs',
            'display' => 'Manage Changelogs',
            'description' => 'Has permission to manage changelogs'
        ],
        [
            'reference' => 'manage-bans',
            'display' => 'Manage Bans',
            'description' => 'Has permission to manage bans'
        ]
    ],

    'actions' => [
        'usergroup' => [
            'component' => 'actions.usergroup',
            'fields' => [
                'group' => ['required'],
                'expire_group' => ['required_without:permanent|nullable']
            ],
        ],
        'darkrp_money' => [
            'component' => 'actions.darkrp-money',
            'fields' => [
                'amount' => ['required', 'integer']
            ]
        ],
        'console_command' => [
            'component' => 'actions.console-command',
            'fields' => [
                'cmd' => ['required'],
                'expire_cmd' => ['nullable']
            ]
        ],
        'weapons' => [
            'component' => 'actions.weapons',
            'fields' => [
                'classes' => ['array'],
                'perm' => ['nullable', 'boolean']
            ]
        ],
        'custom_lua' => [
            'component' => 'actions.custom-lua',
            'fields' => [
                'on_bought' => ['required'],
                'on_expired' => ['nullable']
            ]
        ]
    ],

    'currencies' => [
        'EUR' => '€',
        'USD' => '$',
        'GBP' => '£',
        'CAD' => 'C$',
        'AUD' => 'A$',
        'BRL' => 'R$'
    ],

    'payment_gateways' => [
        'paypal' => \App\PaymentGateways\PayPal\Gateway::class,
        'stripe' => \App\PaymentGateways\Stripe\Gateway::class,
        'coinbase' => \App\PaymentGateways\Coinbase\Gateway::class
    ],

    'stripe_payment_methods' => [
        'acss_debit',
        'afterpay_clearpay',
        'alipay',
        'bacs_debit',
        'bancontact',
        'boleto',
        'card',
        'eps',
        'fpx',
        'giropay',
        'grabpay',
        'ideal',
        'oxxo',
        'p24',
        'sepa_debit',
        'sofort',
        'wechat_pay'
    ],

    'games' => [
        'gmod' => [
            'type' => new App\GameTypes\Source(4000),
            'display' => 'Garry\'s Mod',
        ],

        'rust' => [
            'type' => new App\GameTypes\Source(252490),
            'display' => 'Rust',
        ],

        'fivem' => [
            'type' => \App\GameTypes\FiveM::class,
            'display' => 'FiveM',
        ],

        'csgo' => [
            'type' => new App\GameTypes\Source(730),
            'display' => 'CSGO',
        ],
    ],

    'analytics_enabled' => (bool) env('ANALYTICS_ENABLED', true),
];
