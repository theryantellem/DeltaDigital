@extends('admin.auth.layout')

@section('title', 'Administrative login')

@section('content')
    <form action="{{ route('admin.authenticate') }}" method="POST">
        @csrf
        <div class="mb-3">
            <label class="mb-1"><strong>Email</strong></label>
            <input type="email" class="form-control" name="email" placeholder="hello@example.com">
            @error('email')
                <div class="text-danger">{{ $message }}</div>
            @enderror
        </div>
        <div class="mb-3">
            <label class="mb-1"><strong>Password</strong></label>
            <input type="password" class="form-control" name="password" placeholder="Password">
            @error('password')
                <div class="text-danger">{{ $message }}</div>
            @enderror
        </div>
        <div class="text-center mt-4">
            <button type="submit" class="btn btn-primary btn-block">Login</button>
        </div>
    </form>
@endsection
