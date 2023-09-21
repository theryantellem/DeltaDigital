<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    function index()
    {
        $user = Auth::guard('admin')->user();

        if ($user->hasRole('super_admin')) {
            return redirect()->route('admin.educators.index');
        } else {
            return redirect()->route('admin.signals.index');
        }

        return view('admin.dashboard.index');
    }
}
