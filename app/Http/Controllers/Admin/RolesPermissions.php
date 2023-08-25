<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesPermissions extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['roles'] = Role::get();

        return view('admin.roles.index', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.roles.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'role_name' => ['required', 'string', 'max:120'],
            'permissions' => ['required'],
            'permissions.*' => ['required'],
        ]);

        $checkRole = Role::where('name', $request->role_name)->first();

        if ($checkRole) {
            return back()->with('error', 'a role with this name ' . $request->role_name . ' already exist');
        }

        $role = Role::create([
            'name' => $request->role_name,
            'guard_name' => 'admin'
        ]);

        $role->syncPermissions($request->permissions);

        return redirect()->route('admin.roles.index')->with('success', ' Role was successfully created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($role)
    {
        $role = Role::where('uuid', $role)->firstOrFail();

        return view('admin.roles.edit', [
            'role'      => $role,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $role)
    {
        $request->validate([
            'role_name' => 'required'
        ]);

        $role = Role::where('uuid', $role)->firstOrFail();

        $checkRole = Role::where('name', $request->role_name)->first();

        if ($checkRole && $request->role_name != $role->name) {
            return back()->with('error', 'A role with the name ' . $request->role_name . ' already exist');
        }

        $role->update(['name' => $request->role_name]);

        $role->syncPermissions($request->permissions);

        return  redirect()->route('admin.roles.index')->with('success', ' role was successfully updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

        $role = Role::where('uuid', $id)->first();

        if (!$role) {
            return response()->json(['success' => false, 'message' => 'Role not found.']);
        }

        $newRole = Role::where('name', 'default')->first();

        if ($newRole) {
            $usersWithRole = $role->users;

            foreach ($usersWithRole as $user) {
                $user->syncRoles([$newRole->id]);
            }
        }
        $role->delete();

        return response()->json(['success' => true, 'message' => ucfirst($role['name']) . ' Role was successfully deleted.']);
    }
}
