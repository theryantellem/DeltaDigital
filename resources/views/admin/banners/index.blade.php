@extends('layouts.admin.app')

@section('title', 'Banners')

@section('content')
    <div id="banner">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="heading mb-0">Banner Management</h2>
            <div class="d-flex align-items-center">
                <a href="#" class="btn btn-primary btn-sm ms-2" data-bs-toggle="modal" data-bs-target="#createBanner">Add
                    Banners</a>
            </div>
        </div>
        <div class="row">
            @forelse ($banners as $item)
                <div class="col-xl-4 col-md-4 col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <div class="new-arrival-product">
                                <div class="new-arrivals-img-contnent">
                                    <img class="img-fluid" src="{{ $item->file_url }}" alt="">
                                </div>
                                <div class="new-arrival-content text-center mt-3">
                                    <a class="btn btn-danger btn-sm delete"
                                        href="{{ route('admin.banners.destroy', $item->uuid) }}">Delete</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            @empty
            @endforelse
        </div>
        @include('admin.banners.modal.createBanner')
    </div>

@endsection
@push('scripts')
    <script>
        const banner = new Vue({
            el: '#banner',
            data() {
                return {
                    banners: [],
                    photo: "",
                    imagePreviewUrl: null,
                    loading: false,
                    errors: {},
                }
            },
            methods: {
                handleFileUpload(event) {
                    const file = event.target.files[0];

                    if (!file) {
                        // No file selected or selection was canceled
                        return;
                    }

                    this.photo = file

                    // Read the image file and create a URL for preview
                    this.imagePreviewUrl = URL.createObjectURL(file);
                },
                createBanner() {
                    // Reset errors
                    this.errors = {};

                    this.loading = true

                    let formData = new FormData();
                    formData.append('_token', '{{ csrf_token() }}');
                    formData.append('photo', this.photo);

                    axios.post("{{ route('admin.banners.store') }}", formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(response => {
                            this.photo = "";
                            Notiflix.Notify.Success(response.data.message);
                            //set dalay
                            setTimeout(() => {

                                window.location.reload();
                            }, 2000);
                        })
                        .catch(error => {

                            if (error.response && error.response.data && error.response.data.errors) {
                                // Set validation errors from the backend response
                                this.errors = error.response.data.errors;

                            } else {
                                // console.log(error.response)
                                Notiflix.Notify.Failure(error.response.data.message)
                                // Handle other types of errors, if needed
                            }

                        }).finally(() => {
                            this.loading = false;
                        })
                }
            }
        })

        var createStrategyModal = new bootstrap.Modal(document.getElementById('createBanner'), {
            keyboard: false
        })
    </script>
    <script>
        $('.delete').click(function(e) {
            e.preventDefault();
            var url = $(this).attr('href');
            Notiflix.Confirm.Show(
                'Are you sure?',
                'you want delete banner.',
                'Delete',
                'Cancle',
                function okCb() {
                    $.ajax({
                        url: url,
                        type: 'DELETE',
                        dataType: 'json',
                        data: {
                            _token: "{{ csrf_token() }}"
                        },
                        success: function(response) {
                            Notiflix.Notify.Success(response.message);
                            window.location.reload();
                        },
                        error: function(response) {
                            Notiflix.Notify.Failure(
                                "An error occurred while processing the request, please try again later."
                            );
                        }
                    })
                }
            );
        })
    </script>
@endpush
