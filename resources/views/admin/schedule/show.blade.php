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
                            <p>
                                <span>
                                    <strong>Stream Key:</strong> {{ auth()->user()->stream_key }}
                                </span>
                            </p>
                            <h4 v-if="is_live">Users on Live: @{{ liveCount }}</h4>
                        </div>
                        <div class="ms-auto">
                            @if (auth()->user()->hasRole('educator'))
                                <div class="d-flex gap-3">
                                    <div v-if="is_live">
                                        @if (!empty(auth()->user()->stream_key))
                                            <button class="btn btn-danger btn-sm" @click="stopLive">Stop Live</button>
                                        @endif
                                    </div>
                                    <div v-else>
                                        <button class="btn btn-success btn-sm" @click="goLive">Go Live</button>
                                        <button class="btn btn-primary btn-sm" data-bs-toggle="offcanvas"
                                            href="#offcanvasSignal">Thumbnail</button>
                                        <button class="btn btn-primary btn-sm" data-bs-toggle="offcanvas"
                                            href="#offcanvasUpload" role="button">Upload Video</button>
                                    </div>
                                </div>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="is_live">
            {{-- <div class="d-flex flex-column justify-content-center align-items-center">
                <img src="{{ asset('images/live.png') }}" width="250px" height="250px" alt="">
                <h3 class="text-uppercase">You are live</h3>
            </div> --}}
            @include('admin.schedule.live-chat')
        </div>
        <div v-else class="row">
            @include('admin.schedule.videoList')
        </div>
        @include('admin.schedule.uploadModal')
        @include('admin.schedule.PlayVideo')
    </div>
    @include('admin.thumbnailModal')
@endsection
@push('scripts')
    <script src="https://js.pusher.com/7.0/pusher.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.7.2/socket.io.js"></script>
    <script>
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true
        });
    </script>
    <script>
        //$(".nav-control").on('click', function() {
        $(".chat-toggle").on('click', function() {
            $(' .chat-left-area ,.chat-toggle').toggleClass("active");
        });
    </script>
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
                    duration: 0,
                    video: "",
                    messages: [],
                    message: "",
                    followers: [],
                    educator: "{{ Auth::guard('admin')->user()->uuid }}",
                    currentDate: "",
                    media: null,
                    photo_preview: null,
                    thumbnail_preview: null,
                    thumbnail: null,
                    loading: false,
                    errors: {},
                    liveCount: "{{ $schedule->viewers }}",
                    socket: ""
                }
            },
            mounted() {
                this.getFollowers()
                this.getMessages()
                this.getCurrentDate()

                // var pusher = new Pusher("{{ env('PUSHER_APP_KEY') }}", {
                //     cluster: "{{ env('PUSHER_APP_CLUSTER') }}",
                // });

                // const chatChannel = pusher.subscribe(`chat.${this.educator}`);
                // chatChannel.bind('chat-message', (data) => {
                //     this.messages.unshift(data.message)
                //     this.scrollToBottom()
                // });

                // const liveJoined = pusher.subscribe(`joined-stream.${this.schedule}`);
                // liveJoined.bind('joined-stream', (data) => {
                //     this.getViewers()
                // });

                // const liveEnded = pusher.subscribe(`stop-live.${this.schedule}`);
                // liveEnded.bind('StopLive', (data) => {
                //     this.liveCount = 0
                // });

                this.socket = io("{{ env('SOCKET_IO_ENDPOINT') }}");

                this.socket.on(`message:received:${this.educator}`, (message) => {
                    this.messages.unshift(message)
                });

                this.socket.on(`joined:stream:${this.schedule}`, () => {
                    this.getViewers()
                });

                this.socket.on(`left:stream:${this.schedule}`, () => {
                    this.getViewers()
                });

                this.socket.on(`stop:live:${this.schedule}`, () => {
                    this.liveCount = 0
                });

            },
            created() {
                this.is_live = "{{ Auth::user()->is_live ? true : false }}";

                this.getVideos();

            },
            methods: {
                openFileInput() {
                    this.$refs.chatFileInput.click();
                },
                getViewers() {
                    axios.get(`/admin/schedule/live/count/${this.schedule}`).then(res => {
                        this.liveCount = res.data.count
                    }).catch(err => {
                        console.log(err)
                    })
                },
                getMessageClasses(message) {
                    return {
                        'justify-content-end align-items-end ms-auto': message.sender.id === this.educator
                    };
                },
                shouldDisplayDate(message, index) {
                    const nextMessage = this.reversedMessages[index - 1];
                    if (nextMessage) {
                        return message.formatedDate !== nextMessage.formatedDate;
                    }
                    return true;
                },
                scrollToBottom() {
                    this.$nextTick(() => {
                        const chatBox = this.$refs.chartBox2;
                        chatBox.scrollTop = chatBox.scrollHeight;
                    });
                },
                async getMessages() {
                    await axios.get("{{ route('admin.schedule.live.message') }}").then(
                        response => {
                            const data = response.data
                            if (data.success) {
                                this.messages = data.messages
                                this.scrollToBottom()
                            } else {
                                console.log(data)
                            }
                        }).catch(error => {
                        console.log(error)
                    })
                },
                getCurrentDate() {
                    const today = new Date();
                    const day = String(today.getDate()).padStart(2, '0');
                    const month = String(today.getMonth() + 1).padStart(2, '0');
                    const year = today.getFullYear();
                    this.currentDate = `${day}/${month}/${year}`;
                },
                async getFollowers() {
                    await axios.get('{{ route('admin.inbox.followers') }}').then(response => {
                        const data = response.data
                        if (data.success) {
                            this.followers = data.followers
                        } else {
                            console.log(data)
                        }
                    }).catch(error => {
                        console.log(error)
                    })
                },
                async goLive() {
                    await axios.post(`/admin/schedule/live/start/${this.schedule}`).then(response => {
                        this.is_live = true

                        this.socket.emit("start:live", {
                            educator: {
                                id: "{{ Auth::user()->uuid }}",
                                name: "{{ Auth::user()->first_name }} {{ Auth::user()->last_name }}",
                            },
                        });
                    }).catch(error => {
                        console.log(error);
                    })
                },
                async stopLive() {
                    await axios.post(`/admin/schedule/live/stop/${this.schedule}`).then(response => {
                        this.is_live = false

                        this.socket.emit("stop:live", {
                            educator: {
                                id: "{{ Auth::user()->uuid }}",
                                name: "{{ Auth::user()->first_name }} {{ Auth::user()->last_name }}",
                            },
                        });
                    }).catch(error => {
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
                playVideo(video) {
                    this.video = video

                    offcanvasPlayVideo.show()
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
                async sendMessage() {

                    this.errors = {}

                    if (this.message === "" && this.media === "") {
                        return
                    }

                    const formData = new FormData();

                    formData.append('_token', '{{ csrf_token() }}');

                    formData.append('message', this.message)

                    if (this.media) {
                        formData.append('media', this.media)
                    }

                    // this.educator

                    this.loading = true

                    await axios.post("{{ route('admin.schedule.live.message.send') }}", formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(
                        response => {
                            const data = response.data
                            // console.log(data)
                            if (data.success) {
                                this.clearForm()
                                this.message = ""

                                this.messages.unshift(data.message)

                                this.socket.emit("message:send", {
                                    message: data.message,
                                    messages: this.messages,
                                    room: this.educator,
                                });

                                this.scrollToBottom()

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
                },
                handleThumbnailUpload(event) {
                    this.thumbnail = event.target.files[0];

                    if (this.thumbnail) {
                        // Read the selected image and create a preview URL
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            this.thumbnail_preview = e.target.result; // Set the preview URL
                        };
                        reader.readAsDataURL(this.thumbnail);
                    }
                },
                handleClose() {
                    // Access the video element using the ref
                    const videoElement = this.$refs.videoPlayer;

                    // Pause the video
                    if (videoElement) {
                        videoElement.pause();
                    }
                },
                clearForm() {
                    this.title = ""
                    this.file = "";
                    this.file_preview = "";
                    this.progress = 0;
                    this.$refs.fileInput.value = null;
                    this.message = null
                },
                async uploadFile() {

                    this.errors = {}

                    if (!this.title) {
                        this.errors.title = "Title is required.";
                    }

                    if (!this.file) {
                        this.errors.file = "Video file is required.";
                    }

                    // Check file type
                    const allowedTypes = ['video/mp4', 'video/x-matroska', 'video/avi', 'video/flv',
                        'video/quicktime',
                        'video/x-ms-wmv'
                    ]; // Add more allowed types as needed

                    if (this.file && !allowedTypes.includes(this.file.type)) {
                        this.errors.file = "Invalid file type. Supported types are: " + allowedTypes.join(', ');
                    }

                    // Check file size (e.g., 10MB limit)
                    // const maxSizeInBytes = 1 * 1024 * 1024 * 1024; // 1 GB
                    const maxSizeInBytes = 500 * 1024 * 1024; // 500 MB

                    if (this.file && this.file.size > maxSizeInBytes) {
                        this.errors.file = "File size exceeds the allowed limit (500MB).";
                    }

                    if (Object.keys(this.errors).length > 0) {
                        return false
                    }

                    this.loading = true

                    let formData = new FormData();
                    formData.append('file', this.file);
                    formData.append('schedule', this.schedule);
                    formData.append('title', this.title);
                    formData.append('thumbnail', this.thumbnail);

                    await axios.post("{{ route('admin.schedule.upload') }}", formData, {
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

                            this.getVideos();

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
                async toggleFavorite(video) {
                    await axios.post(`/admin/schedule/videos/favourite/${video?.id}`).then(response => {
                        this.getVideos();
                        Notiflix.Notify.Success(response.data.message);
                    }).catch((error) => {
                        Notiflix.Notify.Failure(error.response.data.message);
                    })
                },
                deleteVideo(video) {
                    Notiflix.Confirm.Show(
                        'Are you sure?',
                        'you want Delete Video.',
                        'Delete',
                        'Cancle',
                        function okCb() {
                            axios.delete(`/admin/schedule/videos/delete/${video?.id}`)
                                .then((response) => {
                                    if (response.data.success) {
                                        Notiflix.Notify.Success(response.data.message);

                                        // Remove the deleted schedule row from the table
                                        const tableRow = document.getElementById(
                                            `video_${video.id}`);
                                        if (tableRow) {
                                            tableRow.remove();
                                        }
                                    } else {
                                        Notiflix.Notify.Failure("Could not find video");
                                    }
                                })
                                .catch(error => {
                                    console.log(error);
                                    Notiflix.Notify.Failure(
                                        "Error Occurred while trying to delete video.");
                                })
                        }
                    );
                }
            },
            computed: {
                reversedMessages() {
                    return this.messages.slice().reverse();
                }
            }
        })

        const offcanvasPlayVideo = new bootstrap.Offcanvas(document.getElementById('offcanvasPlayVideo'));

        const previewMediaModal = new bootstrap.Modal(document.getElementById('previewImage'), {
            keyboard: false
        })
    </script>
@endpush
