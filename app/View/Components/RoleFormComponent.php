<?php

namespace App\View\Components;

use Closure;
use Illuminate\View\Component;
use Illuminate\Contracts\View\View;
use Spatie\Permission\Models\Permission;

class RoleFormComponent extends Component
{
    public $role;
    /**
     * Create a new component instance.
     */
    public function __construct($role=null)
    {
        $this->role = $role;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        $data['permissions'] = Permission::get();

        $role = $this->role;

        if (!empty($role)) {
            $data['role'] = $role;
            $role_permissions = count($role->permissions) > 0 ? $role->permissions->map(fn ($permissions) => $permissions->id) : $role->permissions;
            $data['role_permissions'] = json_decode($role_permissions, 1);
        }

        return view('components.role-form-component', $data);
    }
}
