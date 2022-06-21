<?php
return [
    /**
     * @TranslationFile FRENCH
     * @authors Morgan, Zeo
     * @helpers [
    https://morgan-lee.cc - English / Base Translations
    https://zeodev.cc - Dutch
    https://steamcommunity.com/id/Vister_/ - French
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
        'steam_title' => 'Nos statistiques du groupe Steam',
        'steam_desc' => 'Cliquez :here pour rejoindre notre groupe Steam qui n\'arrêtera pas de grandir !',
        'join_server' => 'Rejoindre le serveur',
    ],


    'errors' => [
        'no_api_key' => 'La clé API Steam n\'a pas été définie',
        'failed' => 'Échec de la récupération des informations sur le serveur.'
    ],

    'navbar' => [
        'profile' => 'Profil',
        'visit_profile' => 'Visitez et mettez à jour votre profil!',

        'management' => 'Gestion',
        'manage_cosmo' => 'Gérez Cosmo en tant qu\'administrateur.',

        'logout' => 'Se déconnecter',
        'login' => 'Se connecter',

        'welcome_back' => 'Bon retour, :username',
        'notifications' => 'Notifications'
    ],


    'core' => [
        'home' => 'Accueil',
        'staff' => 'Staff',
        'threads' => 'Fils de discussion',
        'browse_threads' => 'Consulter tout les fils de discussion',
        'viewing_thread' => 'Regarde un fil de discussion',
        'forums' => 'Forums',
        'terms' => 'Conditions d\'utilisation',
        'store' => 'Magasin',
        'success' => 'Succès!',
        'failed' => 'Échoué!',
        'checkout' => 'Commander',
        'users' => 'Utilisateurs',
        'board' => 'Panneau',
        'edit' => 'Editer',

        'licensed_to' => 'Sous licence pour :licensee ',
        'created_by' => 'Crée par :author',

        'theme_specific' => [
            'group_members' => 'Membres du Groupe',
            'online_members' => 'Membre en ligne',
            'in-game_members' => 'Membres en jeu',
            'join_steam-group' => 'Rejoindre notre groupe Steam',
            'players_online' => 'Joueurs en ligne',
            'join_servers' => 'Rejoindre nos <span>Serveurs</span>',
            'join_discord' => 'Rejoindre notre <span>Discord</span>',
        ],

        'confirmation' => 'Êtes vous sûr ?',
        'cancel' => 'Annuler',
    ],

    'store' => [
        'browse_packages' => 'Parcourir les packs pour :server!',
        'checkout' => 'Commander',
        'permanent' => 'Permanent',
        'non-permanent' => 'Non Permanent',
        'login_to-checkout' => 'Se connecter pour payer',
        'coupon-code' => 'Code de réduction',
        'enter_coupon-code' => 'Entrer le code de réduction',
        'gift-purchase' => 'Acheter en tant que cadeau',
        'enter_steamId' => 'Entrer le Steam ID',

        'finalize_purchase' => 'Finaliser votre achat',
        'tos_agree' => 'Vous acceptez nos <a href="'.route('store.tos').'">Conditions d\'utilisation</a>', // Translate around the link
        'checkout_with-paypal' => 'Payer avec PayPal',

        'complete_purchase' => 'Compléter votre achat',
        'checking_out-package' => 'Vous êtes en train de commander :package', //"You are checking out package: VIP"
        'package_price' => 'Prix du pack',

        'sub-total' => 'Sous-totaux',
        'total' => 'Total: :sign:price',
        'servers' => 'Serveurs',

        'monthly_goal' => 'Objectif de dons par mois',
        'table' => [
            'top_donations' => 'Top Donations',
            'recent_donations' => 'Donations récentes',
            'name' => 'Nom',
            'amount' => 'Montant',
            'package' => 'Pack',
        ],

        'select_server' => 'Parcourir',
        'store_select_server' => 'Parcourir',

        'success' => [
            'success' => 'Paiement réussi !',
            'msg' => 'Vous recevrez votre pack sous peu de temps...'
        ],
        'fail' => [
            'fail' => 'Échec du paiement !',
            'msg' => 'Paiement échoué.... veuillez réessayer plus tard',
        ],

        'cancel' => [
            'cancel' => 'Paiement annulé !',
            'msg' => 'Votre paiement a été annulé avec succès'
        ],

        'sale' => [
            'time-left' => 'Temps restant: :time',
            'info' => '<b>Dépêchez-vous</b> et prenez nos produits en solde ! <span>-:percentage%</span>',
            'go_to_store' => 'ALLER AU MAGASIN',
        ],
    ],

    'forums' => [
        'polls' => 'Sondages',
        'polls_desc' => 'Ayez votre mot à dire dans la communauté',
        'unanswered_polls' => 'Sondage(s) sans réponse',

        'search' => 'Rechercher',
        'search_desc' => 'Parcourez les forums !',

        'recent_activity' => 'Activités récente',
        'recent_desc' => 'Les activités récente de nos communauté',

        'latest_threads' => 'Derniers fils de discussion',
        'latest_threads-desc' => 'Les derniers threads de nos communautés',

        'latest_posts' => 'Derniers posts',
        'latest_posts-desc' => 'Les derniers messages de nos communautés',

        'replies' => 'Réponses',

        'threads' => [
            'locked' => 'VERROUILLÉ',
            'pinned' => 'ÉPINGLÉ',

            'edit_thread' => 'Editer le fil de discussion',
            'editing_thread' => 'Modification du fil de discussion',
            'pin_thread' => 'Épingler le fil de discussion',
            'unpin_thread' => 'Désépingler le fil de discussion',
            'lock_thread' => 'Verrouiller le fil de discussion',
            'unlock_thread' => 'Déverrouiller le fil de discussion',
            'move_thread' => 'Déplacer le fil de discussion',
            'delete_thread'=> 'Supprimmer le fil de discussion',

            'create_thread' => 'Créer un fil de discussion',
            'update_thread' => 'Mettre à jour le fil de discussion',
            'thread_title' => 'Titre du fil de discussion',
            'post_reply' => 'Post',

            'created_at' => 'Créé à',

            'posted_by' => 'Posté par: ',

            'locked_no_reply' => 'Ce fil de discussion a été verrouillé, vous ne pouvez plus y répondre !',
        ],
        'posts' => [
            'editing_post' => 'Modification du Post',
            'update_post' => 'Mettre à jour le Post',
            'delete_post' => 'Supprimer le Post'
        ]
    ],

    'users' => [
        'search_users' => 'Rechercher des utilisateurs...',
        'no_users-found' => 'Aucun utilisateur trouvé',

        'pills' => [
            'home'=> 'Accueil',
            'comments' => 'Commentaires',
            'threads' => 'Fils de discussion',
            'achievements' => 'Succès',
            'edit' => 'Modifier le profil',
        ],

        'welcome_to_profile' => 'Bienvenue sur mon profil !',

        'user_joined' => 'Utilisateur rejoint',
        'comment' => 'Commenter',
        'editing_comment' => 'Modification du Commentaire',

        'edit' => [
            'display_name' => 'Nom d\'affichage',
            'avatar_image' => 'Image de l\'avatar',
            'background_image' => 'Image de fond',
            'biography' => 'Biographie',
            'signature' => 'Signature',
            'sync_steam' => 'Synchroniser avec Steam',
            'sync_discord' => 'Synchroniser avec Discord',
        ],

        'achievements' => [
            'unlock_more' => 'Déverrouiller plus...',
            'default' => 'Pour débloquer d\'autres succès, continuez à utiliser les forums et d\'autres fonctionnalités..',
            'achievement_unlocked' => 'Ce succès a été débloqué' // "This achievement was unlocked" 1 day ago
        ],
    ],

    'actions' => [
        'close' => 'Fermer',
        'save_changes' => 'Sauvegarder les changements',
        'go_back' => 'Retour en arrière',
        'submit' => 'Soumettre',
        'post' => 'Poster',
        'create' => 'Créer',
        'update' => 'Mettre à jour',
        'delete' => 'Supprimer'
    ],

    'notifications' => [
        'new_notif' => 'NOUVEAU',
        'notifications' => 'Notifications',
        'mark_all_as_read' => 'Marquer tout comme lu',
        'delete_all' => 'Supprimer tout',
        'no_notifications' => 'Vous n\'avez pas de notifications',

        'reply_to_thread' => ':username a répondu à votre thread',
        'unlocked_achievement' => 'Vous avez débloqué le succès: :achievement',
        'profile_comment' => ':username a commenté sur votre profil!',
        'profile_like' => ':username a :state votre profile!',
        'thread_action' => ':admin a :action votre thread: :title',
        'manage' => 'Gérez vos notifications en suspens',
    ],

    'toastr_alerts' => [
        'marked_notifications' => 'Vous avez marqué toutes vos notifications comme étant lues !',
        'cleared_notifications' => 'Vous avez effacé toutes vos notifications!',

        'update_post' => 'Post mis à jour avec succès',
        'delete_post' => 'Post supprimé avec succès',

        'create_thread' => 'Nouveau fil de discussion créé avec succès',
        'update_thread' => 'Mise à jour réussie du fil de discussion',
        'delete_thread' => 'Fil de discussion supprimé !',
        'pin_thread' => 'Fil de discussion épinglé !',
        'unpin_thread' => 'Fil de discussion désépinglé !',
        'lock_thread' => 'Fil de discussion verrouillé !',
        'unlock_thread' => 'Fil de discussion déverrouillé !',
        'move_thread' => 'Fil de discussion déplacé !',

        'application_cache' => 'Cache nettoyé !',

        'create_board' => 'Planche créé avec succès',
        'update_board' => 'Mise à jour de la planche réussie',
        'delete_board' => 'Suppression de la planche réussie !',
        'move_board' => 'Les planches ont été triées avec succès !',

        'create_category' => 'Catégorie créée avec succès',
        'update_category' => 'Catégorie mise à jour avec succès',
        'delete_category' => 'Catégorie supprimée avec succès !',

        'create_poll' => 'Sondage créé avec succès',
        'update_poll' => 'Sondage mis à jour avec succès',
        'delete_poll' => 'Sondage supprimé avec succès !',
        'open_poll' => 'Le statut du sondage a été défini comme ouvert !',
        'close_poll' => 'Le statut du sondage est passé à fermé !',

        'update_configurations' => 'Mise à jour réussie de toutes les configurations générales !',
        'update_meta' => 'Configurations Meta mise à jour avec succès !',
        'update_integration' => 'Mise à jour réussie de toutes les configurations d\'intégrations !',
        'update_theme' => 'Mise à jour du thème global réussie !',
        'update_settings' => 'Mise à jour de toutes les configurations des magasins réussie !',
        'update_tos' => 'Mise à jour des conditions d\'utilisation réussie !',

        'create_role' => 'Rôle crée avec succès',
        'update_role' => 'Rôle mis à jour avec succès !',
        'delete_role' => 'Rôle supprimé avec succès !',

        'update_user' => 'Mise à jour de l\'utilisateur réussie !',

        'create_feature' => 'Feature créée avec succès !',
        'update_feature' => 'Feature mise à jour avec succès !',
        'delete_feature' => 'Feature supprimée avec succès !',

        'create_footer-link' => 'Lien de pied de page créé avec succès !',
        'update_footer-link' => 'Lien de pied de page mis à jour avec succès !',
        'delete_footer-link' => 'Lien de pied de page supprimé avec succès !',

        'create_nav-link' => 'Lien de navigation créé avec succès !',
        'update_nav-link' => 'Lien de navigation mis a jour avec succès !',
        'delete_nav-link' => 'Lien de navigation supprimé avec succès !',

        'create_server' => 'Serveur créé avec succès !',
        'update_server' => 'Serveur mis à jour avec succès !',
        'delete_server' => 'Serveur supprimé avec succès !',

        'create_coupon' => 'Code de réduction créé avec succès !',
        'update_coupon' => 'Code de réduction mis à jour avec succès !',
        'delete_coupon' => 'Code de réduction supprimé avec succès !',

        'invalid_coupon-code' => 'Ce code de réduction n\'est pas valide !',
        'unusable_coupon-code' => 'Ce code de réduction ne peux pas être utilisé sur ce pack !',
        'invalid_gift-steamId' => 'Ce SteamID n\'est pas valide !',

        'create_package' => 'Pack créé avec succès !',
        'update_package' => 'Pack mis à jour avec succès !',
        'delete_package' => 'Pack supprimé avec succès !',

        'create_sale' => 'Solde créé avec succès !',
        'update_sale' => 'Solde mise à jour avec succès !',
        'delete_sale' => 'Solde supprimée avec succès !',

        'create_comment' => 'Commentaire posté avec succès !',
        'update_comment' => 'Commentaire mis à jour avec succès !',
        'delete_comment' => 'Commentaire supprimé avec succès !',

        'like_own_profile' => 'Désolé, vous ne pouvez pas aimer votre propre profil :)',
        'remove_like' => 'Le like sur le profile de :username\'s a été supprimé avec succès !',
        'create_like' => 'Le profil de :username\'s a été liké avec succès !',

        'update_profile' => 'Le profil a été mis à jour avec succès !',
    ],


    'management' => [
        'navigation' => [
            'dashboard' => 'Tableau de bord',

            'general' => 'Géneral',
            'configuration' => 'Configuration',
            'meta' => 'Meta',
            'users' => 'Utilisateurs',
            'roles' => 'Rôles',

            'index' => 'Index',
            'components' => [
                'components' => 'Composants',
                'nav-links' => 'Liens de navigation',
                'features' => 'Features',
                'servers' => 'Serveurs',
                'integrations' => 'Intégrations',
                'footer-links' => 'Liens en bas de page'
            ],
            'theme' => 'Thème',

            'forums' => 'Forums',
            'categories' => 'Catégories',
            'boards' => 'Planches',
            'polls' => 'Sondages',

            'store' => 'Magasin',
            'settings' => 'Paramètres',
            'packages' => [
                'packages' => 'Packs',
                'create' => 'Créer',
                'manage' => 'Gérer'
            ],
            'coupon_code' => 'Code de réduction',
            'sales' => 'Ventes',
            'tos' => 'CDS',
            'transactions' => 'Transactions',
            'profile' => 'Profil',
            'exit_management' => 'Sortir de la gestion',
            'logout' => 'Se Déconnecter',
        ],

        'core' => [
            'clear_cache' => 'Vider le cache',
            'check_for_updates' => 'Chercher des mis à jour',

            'dashboard_title' => 'Tableau de bord',
            'dashboard_small' => 'Statistiques du site',

            'configurations_title' => 'Configurations',
            'configurations_small' => 'Gérer la configuration',

            'meta_title' => 'Meta',
            'meta_small' => 'Gérer la Meta du site',

            'users_title' => 'Utilisateurs',
            'users_small' => 'Gérer les utilisateurs',
            'users_search' => 'Rechercher des utilisateurs...',
            'users_role' => 'Rôle',

            'create_new_role' => 'Créer un nouveau rôle',
            'roles_role-name' => 'Nom du rôle',
            'roles_role-display' => 'Nom montré',
            'roles_role-color' => 'Couleur du rôle',

            'create_new_nav' => 'Créer un nouveau lien',
            'nav_name' => 'Nom du lien',
            'nav_icon' => 'Icone du lien',
            'nav_color' => 'Coleur du lien',
            'nav_url' => 'URL du lien',
            'nav_category' => 'Catégorie du lien',

            'create_new_feature' => 'Créer une nouvelle feature',
            'feature_name' => 'Nom de la feature',
            'feature_icon' => 'Icone de la feature',
            'feature_color' => 'Couleur de la feature',
            'feature_content' => 'Contenu de la feature',

            'create_new_server' => 'Créer un nouveau serveur',
            'server_name' => 'Nom du serveur',
            'server_icon' => 'Icone du serveur',
            'server_color' => 'Couleur du serveur',
            'server_image' => 'Image du serveur',
            'server_ip' => 'IP du serveur',
            'server_port' => 'Port du serveur',
            'server_description' => 'Description du serveur',

            'enable_steam-group_statistics' => 'Activer les statistiques du groupe Steam',
            'enable_discord-widget' => 'Activer le widget Discord',
            'enable_widget-bot' => 'Activer Widget Bot',
            'enable_discord-sync' => 'Activer la synchronisation Discord',

            'create_new_link' => 'Créer un nouveau lien',
            'link_name' => 'Nom du lien',
            'link_url' => 'URL du lien',
            'link_category' => 'Catégorie du lien',

            'theme_title' => 'Thème',
            'theme_small' => 'Gérer les thèmes',

            'create_new_category' => 'Créer une nouvelle catégorie',
            'category_name' => 'Nom de la catégorie',
            'category_desc' => 'Description de la catégorie',

            'create_new_board' => 'Créer une nouvelle planche',
            'board_name' => 'Nom de la planche',
            'board_icon' => 'Icone de la planche',
            'board_color' => 'Couleur de la planches',
            'board_desc' => 'Description de la planche',
            'board_category' => 'Catégorie de la planche',
            'board_permission_roles' => 'Rôles avec accès',

            'create_new_poll' => 'Créer un nouveau sondage',
            'poll_title' => 'Titre du sondage',
            'poll_description' => 'Description du sondage',
            'poll_icon' => 'Icone du sondage',
            'poll_answers' => 'Réponses du sondage',
            'poll_answer' => 'Réponse du sondage',

            'store_settings_title' => 'Paramètres du magasin',
            'store_settings_small' => 'Gérer les paramètres du magasin',

            'enable_monthly_goal' => 'Activer l\'objectif de dons par mois',
            'monthly_goal' => 'Objectif par mois',
            'display_top_recent-donations' => 'Afficher les top donations et les donations récentes',

            'paypal_client_id' => 'Client ID PayPal',
            'paypal_client_secret' => 'Client Secret Paypal',
            'paypal_webhook_id' => 'Webhook ID PayPal',

            'enable_chargeback-bans' => 'Activer le chargeback ban',
            'chargeback-ban' => '<code>Activer le chargeback ban</code> - Quand un utilisateur essaie d\'initier un charge back via PayPal, cela va automatiquement le bannir du site web.',

            'package_title' => 'Packs',
            'package_small' => 'Créer un pack',
            'create_new_package' => 'Créer un nouveau pack !',
            'package_name' => 'Nom du pack',
            'package_price' => 'Prix du pack',
            'package_image' => 'Image du pack',
            'package_servers' => 'Serveurs',
            'package_category' => 'Categorie',
            'package_description' => 'Description du pack',

            'create_new_coupon' => 'Créer un nouveau code de réduction',
            'coupon_code' => 'code de réduction',
            'coupon_percentage' => 'Pourcentage',
            'coupon_packages' => 'Packs',
            'coupon_packages_info' => 'Ce sont les packs sur lesquels on peut utliser le code de réduction',
            'coupon_package_use-amt' => 'Nombre d\'utilisation',
            'coupon_package_use-amt_info' => 'Le nombre de fois que le code de réduction peut être utilisé. 0 pour illimité',
            'coupon_package_start-date' => 'Date de début',
            'coupon_package_start-date_info' => 'Le code de réduction deviendra actif une fois cette date passée',
            'coupon_package_end-date' => 'Date d\'expiration',
            'coupon_package_end-date_info' => 'Après cette date, le code de réduction ne pourra plus être utilisé',

            'create_new_sale' => 'Créer une nouvelle solde',
            'sale_title' => 'Titre de la solde',
            'sale_percentage' => 'Pourcentage de la solde',
            'sale_packages' => 'Packs en solde',
            'sale_start-date' => 'Date de début',
            'sale_end-date' => 'Date d\'expiration',

            'update_terms' => 'Mise à jour des conditions de service',

            'disable_maintenance' => 'Désactiver la maintenance',
            'enable_maintenance' => 'Activer une maintenance',

            'reinstall' => 'Réinstaller',
            'reinstall_confirm' => 'Êtes vous sûr de vouloir réinstaller l\'application ?',

            'toggle_dark_mode' => 'Activer le mode nuit',

            'yearly_sales' => 'Ventes annuelles',
            'monthly_sales' => 'Ventes mensuelles',

            'stats' => [
                'earnings' => [
                    'total' => 'Gains totaux',
                    'monthly' => 'Gains mensuels',
                    'weekly' => 'Gains hebdomadaires',
                    'daily' => 'Gains quotidiens',
                ],
                'total_packages' => 'Total des packs',
                'total_purchases' => 'Total des achats',
                'forum' => [
                    'categories' => 'Catégories totales',
                    'boards' => 'Planches totales',
                    'threads' => 'Fils de discussion totaux',
                ],
                'users' => 'Utilisateurs totaux',
                'roles' => 'Rôles totaux',
                'tickets' => 'Nombre de tickets ouverts',
            ],
        ],

        'save_configurations' => 'Enregistrer les configurations',

    ]
];