@extends('layouts.admin.app')

@section('content')
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="heading mb-0">Profile</h2>
    </div>
    <div class="row">
        <div class="col-xl-3 col-lg-4">
            <div class="clearfix">
                <div class="card card-bx profile-card author-profile m-b30">
                    <div class="card-body">
                        <div class="p-5">
                            <div class="author-profile">
                                <div class="author-media">
                                      @php
                                          $photo = !empty($user->photo) ? $user->photo : url('/') . "/images/educator/default.png";
                                      @endphp
                                    <img src="{{ $photo }}" alt="">
                                    {{-- <div class="upload-link" title="" data-toggle="tooltip" data-placement="right"
                                        data-original-title="update">
                                        <input type="file" class="update-flie">
                                        <i class="fa fa-camera"></i>
                                    </div> --}}
                                </div>
                                <div class="author-info">
                                    <h6 class="title text-capitalize">{{ $user->first_name }} {{ $user->last_name }}</h6>
                                    {{-- <span>Developer</span> --}}
                                </div>
                            </div>
                        </div>
                        {{-- <div class="info-list">
                            <ul>
                                <li><a href="page-error-404.html">Models</a><span>36</span></li>
                                <li><a href="uc-lightgallery.html">Gallery</a><span>3</span></li>
                                <li><a href="page-error-404.html">Lessons</a><span>1</span></li>
                            </ul>
                        </div> --}}
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Reset Password</h4>
                    </div>
                    <div class="card-body">
                        <div class="basic-form">
                            <form method="POST" action="{{ route('admin.profile.update.password') }}">
                                @csrf
                                <div class="mb-3">
                                    <label for="">Current Password</label>
                                    <input type="password" class="form-control input-rounded" placeholder="Current Password"
                                        name="current_password">
                                    @error('current_password')
                                        <div class="text-danger">{{ $message }}</div>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="">Password</label>
                                    <input type="password" class="form-control input-rounded" placeholder="Password"
                                        name="password">
                                    @error('password')
                                        <div class="text-danger">{{ $message }}</div>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="">Password Confirmation</label>
                                    <input type="password" class="form-control input-rounded" placeholder="Confirm Password"
                                        name="password_confirmation">
                                </div>
                                <div class="mb-3">
                                    <button type="submit" class="btn btn-primary btn-rounded btn-block">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-9 col-lg-8">
            <div class="card profile-card card-bx m-b30">
                <div class="card-header">
                    <h6 class="title">Account setup</h6>
                </div>
                <form class="profile-form" action="{{ route('admin.profile.update.profile') }}" method="POST">
                    @csrf
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-6 m-b30">
                                <label class="form-label">First Name</label>
                                <input type="text" class="form-control" name="first_name"
                                    value="{{ $user->first_name }}">
                                @error('first_name')
                                    <div class="text-danger">{{ $message }}</div>
                                @enderror
                            </div>
                            <div class="col-sm-6 m-b30">
                                <label class="form-label">Last Name</label>
                                <input type="text" class="form-control" name="last_name" value="{{ $user->last_name }}">
                                @error('last_name')
                                    <div class="text-danger">{{ $message }}</div>
                                @enderror
                            </div>
                            <div class="col-sm-6 m-b30">
                                <label class="form-label">Email</label>
                                <input type="text" class="form-control" readonly name="email"
                                    value="{{ $user->email }}">
                                @error('email')
                                    <div class="text-danger">{{ $message }}</div>
                                @enderror
                            </div>
                            <div class="col-sm-6 m-b30">
                                <label class="form-label">Phone Number</label>
                                <input type="text" class="form-control" name="phone_number"
                                    value="{{ $user->phonr_number }}">
                                @error('phone_number')
                                    <div class="text-danger">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary btn-rounded">UPDATE</button>
                    </div>

                </form>
            </div>
        </div>
    </div>
@endsection
