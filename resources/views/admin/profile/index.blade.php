@extends('layouts.admin.app')

@section('content')
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="heading mb-0">Profile</h2>
    </div>
    <div class="row" id="profile">
        <div class="col-xl-3 col-lg-4">
            <div class="clearfix">
                <div class="card card-bx profile-card author-profile m-b30">
                    <div class="card-body">
                        <div class="p-5">
                            <div class="author-profile">
                                <div class="author-media">
                                    @php
                                        $photo = !empty($user->photo) ? $user->photo : url('/') . '/images/educator/default.png';
                                    @endphp
                                    <img src="{{ $photo }}" alt="">
                                    <div class="upload-link" title="" data-toggle="tooltip" data-placement="right"
                                        data-original-title="update">
                                        <input type="file" class="update-flie" @change="handleFileUpload">
                                        <i class="fa fa-camera"></i>
                                    </div>
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
        <div class="modal fade" id="previewImage" data-bs-backdrop="static">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        {{-- <h5 class="modal-title">Modal title</h5> --}}
                        <button type="button" class="btn-close" data-bs-dismiss="modal" @click.prevent="clearForm">
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="d-flex justify-content-center mb-3">
                            <svg v-if="!photo_preview" width="41" height="200" viewbox="0 0 41 40" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M27.1666 26.6667L20.4999 20L13.8333 26.6667" stroke="#DADADA" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M20.5 20V35" stroke="#DADADA" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                                <path
                                    d="M34.4833 30.6501C36.1088 29.7638 37.393 28.3615 38.1331 26.6644C38.8731 24.9673 39.027 23.0721 38.5703 21.2779C38.1136 19.4836 37.0724 17.8926 35.6111 16.7558C34.1497 15.619 32.3514 15.0013 30.4999 15.0001H28.3999C27.8955 13.0488 26.9552 11.2373 25.6498 9.70171C24.3445 8.16614 22.708 6.94647 20.8634 6.1344C19.0189 5.32233 17.0142 4.93899 15.0001 5.01319C12.9861 5.0874 11.015 5.61722 9.23523 6.56283C7.45541 7.50844 5.91312 8.84523 4.7243 10.4727C3.53549 12.1002 2.73108 13.9759 2.37157 15.959C2.01205 17.9421 2.10678 19.9809 2.64862 21.9222C3.19047 23.8634 4.16534 25.6565 5.49994 27.1667"
                                    stroke="#DADADA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                </path>
                                <path d="M27.1666 26.6667L20.4999 20L13.8333 26.6667" stroke="#DADADA" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                            <a v-else :href="photo_preview" data-lightbox="profile">
                                <img :src="photo_preview" alt="Media Preview"
                                    style="max-width: 100%; max-height: 200px; height: 200px">
                            </a>
                        </div>

                        <div v-if="errors?.media" class="text-danger">@{{ errors?.media[0] }}</div>
                    </div>
                    <div class="modal-footer">
                        {{-- <button type="button" class="btn btn-danger light" data-bs-dismiss="modal">Close</button> --}}
                        <button :disabled="loading" @click.prevent="updateProfilePhoto" class="btn btn-primary me-1">
                            <span v-if="loading" class="spinner-border spinner-border-sm" role="status"
                                aria-hidden="true"></span>
                            <span v-else>Upload</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@push('scripts')
    <script>
        const profile = new Vue({
            el: '#profile',
            data() {
                return {
                    media: null,
                    photo_preview: null,
                    loading: false,
                    errors: {}
                }
            },
            methods: {
                closeModal() {
                    this.errors = {}
                    this.photo_preview = null
                    this.media = null
                    previewMediaModal.hide()
                },
                handleFileUpload(event) {
                    this.media = event.target.files[0];

                    if (this.media) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            this.photo_preview = e.target.result; // Set the preview URL
                        };
                        reader.readAsDataURL(this.media);

                        previewMediaModal.show()

                    }
                },
                async updateProfilePhoto() {
                    this.errors = {}

                    const formData = new FormData();
                    formData.append('_token', '{{ csrf_token() }}');
                    formData.append('photo', this.media)

                    this.loading = true

                    await axios.post('{{ route('admin.profile.update.photo') }}', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(
                        response => {
                            const data = response.data
                            // console.log(data)
                            if (data.success) {

                                location.reload()

                                previewMediaModal.hide()
                            } else {
                                console.log(data)
                            }
                        }).catch(error => {

                        console.log(error)

                        if (error.response && error.response.data && error.response.data.errors) {
                            // Set validation errors from the backend response
                            this.errors = error.response.data.errors;

                        } else {
                            // console.log(error.response)
                            Notiflix.Notify.Failure(error.response.data.message)
                            // Handle other types of errors, if needed
                        }

                    }).finally(() => {
                        this.clearForm()
                        this.loading = false
                    })
                }
            }
        })

        var previewMediaModal = new bootstrap.Modal(document.getElementById('previewImage'), {
            keyboard: false
        })
    </script>
@endpush
