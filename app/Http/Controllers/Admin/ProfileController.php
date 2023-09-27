<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    function index(Request $request)
    {
        $data['user'] = $request->user();

        return view('admin.profile.index', $data);
    }

    function updateProfile(Request $request)
    {
        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required|confirmed',
            'phone_number'=> 'nullable'
        ]);


        $user = $request->user();

        $user->update([
            'first_name'=> $request->first_name,
            'last_name'=> $request->last_name,
            'phone_number'=> $request->phone_number
        ]);

        return back()->with('success','Profile updated successfully.');

    }

    function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'password' => 'required|confirmed',
        ]);

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return back()->with('error', 'Invalid current password.');
        }

        $user->update([
            'password' => Hash::make($request->password)
        ]);

        return back()->with('success', 'Password updated successfully');
    }

    function updateProfileImage(Request $request)
    {
        $request->validate([
            'photo' => 'required|image|mimes:png,jpg',
        ]);

        $user = $request->user();

        if ($request->hasFile('photo')) {
            // $imageUrl = $this->uploadFile($request->file('photo'), "strategy");
            $image = $request->file('photo');
            $image_name = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images/profile'), $image_name);

            $photo = url('/images/profile/' . $image_name);
        } else {
            $photo = null;
        }

        $user->update([
            'photo' => $photo,
        ]);

        return back()->with('success', 'Profile photo updated successfully.');
    }
}
