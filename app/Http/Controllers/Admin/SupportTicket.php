<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;

class SupportTicket extends Controller
{
    public function index()
    {
        $data['tickets'] = Ticket::get();

        return view('admin.supports.index',$data);
    }

    public function show()
    {
        $data['ticket'] = Ticket::get();

        return view('admin.supports.show',$data);
    }
}
