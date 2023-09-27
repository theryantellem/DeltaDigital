@extends('layouts.admin.app')

@section('title', 'Roles Management')

@section('content')
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="heading mb-0">Edit Role</h2>
    </div>

    <div class="card dz-card">
        <div class="card-body">
            <form method="POST" action="{{ route('admin.roles.edit', $role->uuid) }}">
                @csrf
                @method('PUT')
                <x-role-form-component :role="$role" />
            </form>
        </div>
    </div>
@endsection
