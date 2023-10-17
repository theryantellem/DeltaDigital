@extends('layouts.admin.app')

@section('title', 'Module Details')

@section('content')
    <div id="schedule">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="heading mb-0">Module</h2>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="card card-body">
                    <div class="d-flex">
                        <div>
                            <h4 class="text-primary mb-0">
                                {{ $module->name }}
                            </h4>
                            <p>
                                {{ $module->description }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-between">
            <h4>Videos</h4>
            @if (auth()->user()->hasRole('educator'))
                <button class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasUpload" role="button">Upload
                    Video</button>
            @endif
        </div>
        <div class="row">
            @include('admin.academy.videoList')
        </div>
        @include('admin.academy.uploadModal')
    </div>
@endsection
@push('scripts')
    <script>
        new Vue({
            el: '#schedule',
            data() {
                return {
                    name: "",
                    description: "",
                    module: "{{ $module->uuid }}",
                    file: null,
                    progress: 0,
                    videos: [],
                    file_preview: null,
                    loading: false,
                    duration: "",
                    errors: {}
                }
            },
            created() {
                this.getVideos();
            },
            methods: {
                async getVideos() {
                    await axios.get(`/admin/academy/modules/show/${this.module}`).then(response => {
                        const data = response.data.data

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
                                    console.log('Video duration:', duration);
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
                    this.name = ""
                    this.description = ""
                    this.file_preview = null;
                    this.progress = 0;
                    this.$refs.fileInput.value = null;
                },
                async uploadFile() {

                    this.loading = true

                    let formData = new FormData();
                    formData.append('video_file', this.file);
                    formData.append('module_uuid', this.module);
                    formData.append('name', this.name);
                    formData.append('description', this.description);
                    formData.append('length', this.duration)

                    await axios.post("{{ route('admin.academy.videos.store') }}", formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            },
                            onUploadProgress: progressEvent => {
                                this.progress = Math.round((progressEvent.loaded / progressEvent
                                    .total) * 100);
                            }
                        })
                        .then(response => {

                            this.clearForm();

                            this.videos.push(response.data.video);

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
                deleteVideo(videoId) {
                    Notiflix.Confirm.Show(
                        'Are you sure?',
                        'you want to Delete Video.',
                        'Delete',
                        'Cancle',
                        function okCb() {
                            axios.delete(`/admin/academy/videos/delete/${videoId}`)
                                .then(function(response) {
                                    if (response.data.success) {
                                        Notiflix.Notify.Success(response.data.message);

                                        // Remove the deleted schedule row from the table
                                        const tableRow = document.getElementById(
                                            `video_${videoId}`);
                                        if (tableRow) {
                                            tableRow.remove();
                                        }
                                    } else {
                                        Notiflix.Notify.Failure("Could not find strategy");
                                    }
                                })
                                .catch(error => {
                                    console.log(error);
                                    Notiflix.Notify.Failure(
                                        "Error Occurred while trying to delete strategy.");
                                })
                        }
                    );
                }
            }
        })
    </script>
@endpush