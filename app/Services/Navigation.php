<?php

namespace App\Services;


class Navigation
{
    public static function adminRoutes()
    {
        return [
            (object) [
                (object) [
                    'name'  => 'Dashboard',
                    'route' => 'admin.dashboard',
                    'icon'  => 'bi bi-house-fill fs-3',
                    'hasPermission' => true
                ],
                (object) [
                    'name'  => 'Inbox',
                    'route' => 'admin.inbox.index',
                    'icon'  => 'bi bi-house-fill fs-3',
                    'hasPermission' => auth()->user()->hasRole('educator')
                ],
                // (object) [
                //     'name'  => 'User Management',
                //     'route' => 'admin.users.index',
                //     'icon'  => 'bi bi-house-fill fs-3',
                //     'hasPermission' => true
                // ],
                (object) [
                    'name'  => 'Administrators',
                    'route' => 'admin.administrative.index',
                    'icon'  => 'bi bi-house-fill fs-3',
                    'hasPermission' =>  auth()->user()->hasRole('super_admin')
                ]
            ],
            // 'Cyborg' => (object) [
            //     (object) [
            //         'name'  => 'Strategies',
            //         'route' => 'admin.cyborg.strategy.index',
            //         'icon'  => 'bi bi-house-fill fs-3',
            //         'hasPermission' => true
            //     ]
            // ],
            'Signal' => (object) [
                (object) [
                    'name'  => 'Manage Signals',
                    'route' => 'admin.signals.index',
                    'icon'  => 'bi bi-house-fill fs-3',
                    'hasPermission' => auth()->user()->can('manage_signal')
                ]
            ],
            'Extras' => (object) [
                // (object) [
                //     'name'  => 'News Management',
                //     'route' => 'admin.news.index',
                //     'icon'  => 'bi bi-house-fill fs-3',
                //     'hasPermission' => true
                // ],
                // (object) [
                //     'name'  => 'Banner Management',
                //     'route' => 'admin.banners.index',
                //     'icon'  => 'bi bi-house-fill fs-3',
                //     'hasPermission' => true
                // ],
                // (object) [
                //     'name'  => 'Support Tickets',
                //     'route' => 'admin.tickets.index',
                //     'icon'  => 'bi bi-house-fill fs-3',
                //     'hasPermission' => true
                // ],
                (object) [
                    'name'  => 'Manage Categories',
                    'route' => 'admin.category.index',
                    'icon'  => 'bi bi-house-fill fs-3',
                    'hasPermission' => auth()->user()->can('manage_categories'),
                ],
                (object) [
                    'name'  => 'Manage Assets',
                    'route' => 'admin.assets.index',
                    'icon'  => 'bi bi-house-fill fs-3',
                    'hasPermission' => auth()->user()->can('manage_assets'),
                ],
                (object) [
                    'name'  => 'Manage Educators',
                    'route' => 'admin.educators.index',
                    'icon'  => 'bi bi-house-fill fs-3',
                    'hasPermission' => auth()->user()->can('manage_educator'),
                ],
                (object) [
                    'name'  => 'Roles Management',
                    'route' => 'admin.roles.index',
                    'icon'  => 'bi bi-house-fill fs-3',
                    'hasPermission' => auth()->user()->hasRole('super_admin'),
                ],
            ],

        ];
    }
}
