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
                            <div v-if="is_live">
                                <button class="btn btn-danger" @click="stopLive">Stop Live</button>
                            </div>
                            <div v-else>
                                <button class="btn btn-success" @click="goLive">Go Live</button>
                                <button class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasUpload"
                                    role="button">Upload Video</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="is_live">
            <div class="d-flex flex-column justify-content-center align-items-center">
                <img src="{{ asset('images/live.png') }}" width="250px" height="250px" alt="">
                <h3 class="text-uppercase">You are live</h3>
            </div>
        </div>
        <div v-else class="row">
            @include('admin.schedule.videoList')
        </div>
        @include('admin.schedule.uploadModal')
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
                    errors: {},
                    is_live: false,
                    duration: 0
                }
            },
            created() {
                this.is_live = "{{ Auth::user()->is_live ? true : false }}";

                this.getVideos();
            },
            methods: {
                async goLive() {
                    await axios.post(`/admin/schedule/live/start/${this.schedule}`).then(response => {
                        this.is_live = true
                    }).then(error => {
                        console.log(error);
                    })
                },
                async stopLive() {
                    await axios.post(`/admin/schedule/live/stop/${this.schedule}`).then(response => {
                        this.is_live = false
                    }).then(error => {
                        console.log(error);
                    })
                },
                async getVideos() {
                    await axios.get(`/admin/schedule/videos/${this.schedule}`).then(response => {
                        const data = response.data

                        this.videos = data.videos

                    }).catch(error => {
                        console.log(error);
                    });
                },
                handleFileChange(event) {
                    this.file = event.target.files[0];

                    if (this.file) {
                        // Check if the file is a video
                        if (this.file.type.startsWith('video')) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                this.file_preview = e.target.result; // Set the preview URL

                                // Create a video element to get the video duration
                                const videoElement = document.createElement('video');
                                videoElement.src = this.file_preview;

                                // Ensure metadata is loaded to get the duration
                                videoElement.addEventListener('loadedmetadata', () => {
                                    const duration = videoElement
                                        .duration; // Get the duration in seconds
                                    // console.log('Video duration:', duration);
                                    this.duration = duration
                                });

                            };
                            reader.readAsDataURL(this.file);
                        } else {
                            Notiflix.Notify.Failure("The selected file is not a video.");
                        }
                    }
                },
                handleCloseModal() {
                    this.clearForm()
                },
                clearForm() {
                    this.file = null;
                    this.file_preview = null;
                    this.$refs.fileInput.value = null;
                },
                async uploadFile() {

                    this.loading = true

                    let formData = new FormData();
                    formData.append('file', this.file);
                    formData.append('schedule', this.schedule);
                    formData.append('title', this.title);

                    await axios.post("{{ route('admin.schedule.upload') }}", formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            },
                            onUploadProgress: progressEvent => {
                                if (!this.errors) {
                                    this.progress = Math.round((progressEvent.loaded / progressEvent
                                        .total) * 100);
                                }
                            }
                        })
                        .then(response => {

                            this.clearForm();

                            Notiflix.Notify.Success(response.data.message);

                        })
                        .catch(error => {
                            if (error.response && error.response.data && error.response.data.errors) {
                                // Set validation errors from the backend response
                                this.errors = error.response.data.errors;
                            } else {
                                // console.log(error.response)
                                Notiflix.Notify.Failure("Service unavailable");
                                // Handle other types of errors, if needed
                            }

                        }).finally(() => {
                            this.loading = false
                        });
                },
            }
        })
    </script>
@endpush
