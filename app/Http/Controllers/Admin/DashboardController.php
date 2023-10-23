<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\SignalCollection;
use App\Http\Resources\SignalResource;
use App\Models\Signal;
use App\Models\User;
use App\Models\UserFollower;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    function index()
    {
        $user = Auth::guard('admin')->user();

        if ($user->hasRole('super_admin')) {
            $data['signals'] = Signal::with('asset')->get();
            $data['followerscount'] = User::count();
            $data['signalscount'] = Signal::count();
        } else {
            $data['signals'] = Signal::with('asset')->where('admin_id', $user->id)->get();
            $data['followerscount'] = UserFollower::where('admin_id', $user->id)->count();
            $data['signalscount'] = Signal::where('admin_id', $user->id)->count();
        }

        return view('admin.dashboard.index', $data);
    }
}
