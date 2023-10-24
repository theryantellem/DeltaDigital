<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AdminResource;
use App\Http\Resources\EducatorResource;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;

class AdminManagementController extends Controller
{
    function index()
    {
        return view('admin.administrators.index');
    }

    function allAdmins()
    {
        $admins = Admin::whereDoesntHave('roles', function ($query) {
            $query->where('name', 'educator')
                ->orWhere('name', 'super_admin');
        })->get();

        $admins = AdminResource::collection($admins);

        $roles = Role::whereNotIn('name', ['educator', 'super_admin'])->get();

        return response()->json(['success' => true, 'admins' => $admins, 'roles' => $roles], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email|unique:admins,email',
            'phone_number' => 'nullable|numeric',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'password' => 'required',
            'roles' => 'required'
        ]);

        // Handle validation errors
        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        try {

            $imageUrl = null;

            if ($request->hasFile('photo')) {
                $imageUrl = uploadFile($request->file('photo'), "educator", "do_spaces");
            }

            $admin = Admin::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'photo' => $imageUrl,
            ]);

            $admin->assignRole($request->roles);

            $admin = new AdminResource($admin->refresh());

            return response()->json(['success' => true, 'admin' => $admin, 'message' => 'Admin created successfully.'], 201);
        } catch (\Exception $e) {
            sendToLog($e);
            // DB::rollBack();

            return response()->json(['success' => false, 'error' => 'Service currently unavailable'], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $admin = Admin::where('uuid', $id)->first();

        if (!$admin) {
            return response()->json(['success' => false, 'message' => 'Admin not found.'], 404);
        }

        return response()->json(['success' => true, 'admin' => $admin], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $admin = Admin::where('uuid', $id)->first();

        if (!$admin) {
            return response()->json(['success' => false, 'message' => 'Admin not found.']);
        }

        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            // 'email' => 'required|email|unique:admins,email',
            'phone_number' => 'nullable|numeric',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'roles' => 'required'
            // 'password' => 'required'
        ]);

        // Handle validation errors
        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        $imageUrl = $admin->photo;

        if ($request->hasFile('photo')) {
            $imageUrl = uploadFile($request->file('photo'), "educator", "do_spaces");
        }

        $admin->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'photo' => $imageUrl,
        ]);

        $admin->syncRoles($request->roles);

        return response()->json(['success' => true, 'message' => 'User updated  successfully.'], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $admin = Admin::where('uuid', $id)->first();

        if (!$admin) {
            return response()->json(['success' => false, 'message' => 'Admin not found.'], 404);
        }

        $admin->delete();

        return response()->json(['success' => true, 'message' => 'Admin was successfully deleted.'], 201);
    }
}
