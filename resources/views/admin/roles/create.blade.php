@extends('layouts.admin.app')

@section('title', 'Roles Management')

@section('content')
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="heading mb-0">Roles Management</h2>
        <div class="d-flex align-items-center">
            <a href="#" class="btn btn-primary btn-sm ms-2">Create Role</a>
        </div>
    </div>

    <div class="card dz-card">
        <div class="card-body">
            <form method="POST" action="">{{ route('admin.roles.store') }}
                @csrf
                @include('admin.roles.form')
            </form>
        </div>
    </div>
@endsection
