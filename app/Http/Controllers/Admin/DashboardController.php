<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\SignalCollection;
use App\Http\Resources\SignalResource;
use App\Models\Signal;
use App\Models\UserFollower;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    function index()
    {
        $user = Auth::guard('admin')->user();

        $data['followerscount'] = UserFollower::where('admin_id', $user->id)->count();
        $data['signalscount'] = Signal::where('admin_id', $user->id)->count();

        $data['signals'] = Signal::with('asset')->where('admin_id', $user->id)->get();

        // if ($user->hasRole('super_admin')) {
        //     return redirect()->route('admin.educators.index');
        // } else {
        //     return redirect()->route('admin.signals.index');
        // }

        return view('admin.dashboard.index', $data);
    }
}
