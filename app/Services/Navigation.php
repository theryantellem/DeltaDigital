<?php

namespace App\Services;


class Navigation
{
    public static function adminRoutes()
    {
        return [
             (object) [
                // (object) [
                //     'name'  => 'Dashboard',
                //     'route' => 'admin.dashboard',
                //     'icon'  => 'bi bi-house-fill fs-3',
                //     'hasPermission' => true
                // ],
                // (object) [
                //     'name'  => 'User Management',
                //     'route' => 'admin.users.index',
                //     'icon'  => 'bi bi-house-fill fs-3',
                //     'hasPermission' => true
                // ],
                // (object) [
                //     'name'  => 'Admin Management',
                //     'route' => 'admin.administrative.index',
                //     'icon'  => 'bi bi-house-fill fs-3',
                //     'hasPermission' => true
                // ]
            ],
            'Cyborg' => (object) [
                (object) [
                    'name'  => 'Strategies',
                    'route' => 'admin.cyborg.strategy.index',
                    'icon'  => 'bi bi-house-fill fs-3',
                    'hasPermission' => true
                ]
            ]
        ];
    }
}
