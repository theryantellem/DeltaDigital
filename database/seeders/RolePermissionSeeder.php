<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Str;
use Spatie\Permission\PermissionRegistrar;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Delete all assigned roles and permissions for users
        Admin::all()->each(function ($user) {
            $user->roles()->sync([]);
        });

        // Delete all existing roles
        Role::query()->delete();

        // Delete all existing permissions
        Permission::query()->delete();

        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // educator management
        Permission::create(['name' => 'manage_educator', 'guard_name' => 'admin']);
        Permission::create(['name' => 'create_educator', 'guard_name' => 'admin']);
        Permission::create(['name' => 'edit_educator', 'guard_name' => 'admin']);
        Permission::create(['name' => 'delete_educator', 'guard_name' => 'admin']);
        Permission::create(['name' => 'banned_educator', 'guard_name' => 'admin']);
        Permission::create(['name' => 'suspend_educator', 'guard_name' => 'admin']);

        // chat room management
        Permission::create(['name' => 'manage_chat_room', 'guard_name' => 'admin']);
        Permission::create(['name' => 'create_chat_room', 'guard_name' => 'admin']);

        // signal permissions
        Permission::create(['name' => 'manage_signal', 'guard_name' => 'admin']);
        Permission::create(['name' => 'create_signal', 'guard_name' => 'admin']);
        Permission::create(['name' => 'delete_signal', 'guard_name' => 'admin']);
        Permission::create(['name' => 'update_signal', 'guard_name' => 'admin']);

        // news permissions
        Permission::create(['name' => 'manage_news', 'guard_name' => 'admin']);
        Permission::create(['name' => 'create_news', 'guard_name' => 'admin']);
        Permission::create(['name' => 'delete_news', 'guard_name' => 'admin']);

        // banner permissions
        Permission::create(['name' => 'manage_banner', 'guard_name' => 'admin']);
        Permission::create(['name' => 'create_banner', 'guard_name' => 'admin']);
        Permission::create(['name' => 'delete_banner', 'guard_name' => 'admin']);

        // support management
        Permission::create(['name' => 'manage_tickets', 'guard_name' => 'admin']);
        Permission::create(['name' => 'reply_tickets', 'guard_name' => 'admin']);
        Permission::create(['name' => 'create_tickets', 'guard_name' => 'admin']);

        $permissions = Permission::get();

        $role = Role::create(['name' => 'super_admin', 'guard_name' => 'admin']);

        $defaultRole = Role::create(['name' => 'default', 'guard_name' => 'admin']);

        $educator = Role::create(['name' => 'educator', 'guard_name' => 'admin']);

        $defaultRole->syncPermissions([
            'manage_educator', 'manage_news', 'manage_banner', 'manage_tickets'
        ]);

        $educator->syncPermissions([
            'manage_signal',
            'create_signal',
            'delete_signal',
            'update_signal',
            'create_chat_room',
            'manage_chat_room'
        ]);

        $role->syncPermissions([$permissions->map(fn ($permission) => $permission->name)]);

        $admin = Admin::first();

        $admin->assignRole($role);
    }
}
