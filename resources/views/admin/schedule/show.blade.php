@extends('layouts.admin.app')

@section('title', 'Schedule Details')

@section('content')
    <div id="schedule">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="heading mb-0">Schedule Details</h2>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="card card-body">
                    <div class="d-flex">
                        <div>
                            <h4 class="text-primary mb-0">
                                {{ $schedule->name }}
                            </h4>
                            <p>
                                <span>
                                    <strong>Day:</strong> {{ $schedule->schedule_day }}
                                </span>
                                <span>
                                    <strong>Time:</strong> {{ $schedule->schedule_time }}
                                </span>
                            </p>
                        </div>
                        <div class="ms-auto">
                            <button class="btn btn-success">Go Live</button>
                            <button class="btn btn-primary">Upload Video</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-4">
                <div class="card">
                    <div class="card-body">
                        <div class="post-img">
                            <img src="images/post/post1.jpg" height="200px">
                        </div>
                        <div class="post-see d-flex align-items-center mt-3">
                            <div class="d-flex justify-content-between">
                                <h6 class="mb-0">people see this post</h6>
                            </div>
                        </div>
                        <div class="mt-3">
                            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                        </div>
                        <ul class="post-comment d-flex mt-3">
                            <li>
                                <label class="me-3">
                                    <a href="javascript:void(0)"><i class="fa-regular fa-heart me-2"></i>Favourite</a>
                                </label>
                            </li>
                            <li>
                                <label class="me-3"><a href="javascript:void(0)">
                                        <i class="fa fa-pencil me-2 text-primary"></i>Edit</a>
                                </label>
                            </li>
                            <li>
                                <label class="me-3">
                                    <a href="javascript:void(0)">
                                        <i class="fa fa-trash me-2 text-danger"></i>Delete
                                    </a>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@push('scripts')
    <script>
        const educator = new Vue({
            el: '#schedule',
            data() {
                return {
                    title: "",
                    schedule: "{{ $schedule->uuid }}",
                    file: null,
                    progress: 0,
                    videos: [],
                    file_preview: null,
                    loading: false,
                }
            },
            created() {
                this.getVideos();
            },
            methods: {
                async getVideos() {
                    await axios.get(`/admin/schedule/${this.schedule}`).then(response => {
                        const data = response.data

                        this.videos = data.videos

                    }).catch(error => {
                        console.log(error);
                    });
                },
                handleFileChange(event) {
                    this.file = event.target.files[0];

                    // if (this.file) {
                    //     const reader = new FileReader();
                    //     reader.onload = (e) => {
                    //         this.file_preview = e.target.result; // Set the preview URL
                    //     };
                    //     reader.readAsDataURL(this.file);

                    // }
                },
                handleCloseModal() {
                    this.clearForm()
                },
                clearForm() {
                    this.file = null;
                    this.file_preview = null;
                    this.$refs.fileInput.value = null;
                },
                uploadFile() {
                    let formData = new FormData();
                    formData.append('file', this.file);
                    formData.append('title', this.title);

                    axios.post("{{ route('admin.schedule.upload') }}", formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            },
                            onUploadProgress: progressEvent => {
                                this.progress = Math.round((progressEvent.loaded / progressEvent.total) *
                                    100);
                            }
                        })
                        .then(response => {
                            console.log('File uploaded:', response.data);
                        })
                        .catch(error => {
                            console.error('Error uploading file:', error);
                        });
                },
            }
        })
    </script>
@endpush
