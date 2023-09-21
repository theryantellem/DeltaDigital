@extends('layouts.admin.app')

@section('title', 'Inbox')

@section('content')
    {{-- <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="heading mb-0">Inbox</h2>
    </div> --}}
    <div class="row gx-0" id="chatBox">
        <div class="col-xl-12">
            <div class="card overflow-hidden">
                <div class="card-body p-0">
                    <div class="row gx-0">
                        <!-- column -->
                        <div class="col-xl-3 col-lg-4 col-sm-5 chat-border mobile-chat chat-left-area">
                            <div class="people-list dz-scroll">
                                <div class="chat-p style-1" v-for="(follower, index) in followers" :key="index">
                                    <div class="d-flex">
                                        <img :src="follower?.user?.profile_picture" class="avatar avatar-lg  rounded-circle"
                                            alt="">
                                        <div class="ms-2">
                                            <h6 class="mb-0">@{{ follower?.user?.name }}</h6>
                                            <span>@{{ follower?.user?.email }}</span>
                                        </div>
                                    </div>
                                    {{-- <span>1 mIn</span> --}}
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-9 col-lg-8 col-sm-7 chat-border">
                            <div class="chat-box-area style-2 dz-scroll" id="chartBox2" ref="chatBox">
                                <template v-for="(message, index) in reversedMessages" :key="message.id">
                                    <span v-if="shouldDisplayDate(message, index)" class="text-center d-block mb-4">
                                        <span v-if="currentDate === message?.formatedDate">
                                            Today
                                        </span>
                                        <span v-else>
                                            @{{ message?.formatedDate }}
                                        </span>
                                    </span>
                                    <div :class="getMessageClasses(message)">
                                        <div v-if="message.sender.id === educator" class="message-sent w-auto">
                                            <a :href="message?.message" data-lightbox="profile" class="chat-meadia"
                                                v-if="message?.type === 'media'">
                                                <img :src="message?.message" height="200px" width="200px" alt="">
                                            </a>
                                            <p v-else>@{{ message?.message }}</p>
                                            <span class="fs-12">@{{ message?.formatedTime }} </span>
                                        </div>
                                        <div v-else class="message-received w-auto">
                                            <div class="d-flex">
                                                <div class="ms-1 text">
                                                    <a :href="message?.message" data-lightbox="profile" class="chat-meadia"
                                                        v-if="message?.type === 'media'">
                                                        <img :src="message?.message" height="200px" width="200px"
                                                            alt="">
                                                    </a>
                                                    <p v-else class="mb-1">@{{ message?.message }}</p>
                                                    <span>@{{ message?.formatedTime }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <div class="message-send style-2">
                                <div class="type-massage style-1">
                                    <div class="input-group">
                                        <textarea rows="1" v-model="message" @keyup.enter="sendMessage" class="form-control"
                                            placeholder="Hello Hanuman..."></textarea>
                                    </div>
                                </div>
                                <div>
                                    <button type="button" class="btn btn-primary p-2" @click.prevent="sendMessage">
                                        <svg width="16" height="16" viewbox="0 0 16 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M10.555 5.44976L6.73936 9.30612L2.39962 6.59178C1.77783 6.20276 1.90718 5.25829 2.61048 5.05262L12.9142 2.03518C13.5582 1.84642 14.155 2.44855 13.9637 3.09466L10.9154 13.3912C10.7066 14.0955 9.76747 14.2213 9.38214 13.5968L6.73734 9.3068"
                                                stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                        Send
                                    </button>
                                    <button type="button" class="btn btn-primary p-2" @click="openFileInput">
                                        <i class="fa fa-paperclip me-2"></i>
                                        Attach
                                    </button>
                                    <input type="file" ref="fileInput" style="display: none" accept="image/*"
                                        @change="handleFileUpload">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="previewImage" data-bs-backdrop="static">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        {{-- <h5 class="modal-title">Modal title</h5> --}}
                        <button type="button" class="btn-close" data-bs-dismiss="modal">
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
                            <a  v-else :href="photo_preview" data-lightbox="profile">
                                <img  :src="photo_preview" alt="Media Preview"
                                style="max-width: 100%; max-height: 200px; height: 200px">
                            </a>
                        </div>

                        <div v-if="errors?.media" class="text-danger">@{{ errors?.media[0] }}</div>
                    </div>
                    <div class="modal-footer">
                        {{-- <button type="button" class="btn btn-danger light" data-bs-dismiss="modal">Close</button> --}}
                        <button :disabled="loading" @click="sendMessage" class="btn btn-primary me-1">
                            <span v-if="loading" class="spinner-border spinner-border-sm" role="status"
                                aria-hidden="true"></span>
                            <span v-else>Send</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@push('scripts')
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
        const ChatBox = new Vue({
            el: '#chatBox',
            data() {
                return {
                    messages: [],
                    message: "",
                    followers: [],
                    educator: "{{ Auth::guard('admin')->user()->uuid }}",
                    currentDate: "",
                    media: "",
                    photo_preview: null,
                    loading: false,
                    errors: {}
                }
            },
            mounted() {
                this.getFollowers()
                this.getMessages()
                this.getCurrentDate()
            },
            methods: {
                getMessageClasses(message) {
                    return {
                        'justify-content-end align-items-end ms-auto': message.sender.id === this.educator
                    };
                },
                closeModal() {
                    this.errors = {}
                    this.photo_preview = null,
                        this.media = ""
                    this.message = ""
                    previewMediaModal.hide()
                },
                openFileInput() {
                    this.$refs.fileInput.click();
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
                        const chatBox = this.$refs.chatBox;
                        chatBox.scrollTop = chatBox.scrollHeight;
                    });
                },
                async getMessages() {
                    await axios.get('{{ route('admin.inbox.messages') }}').then(
                        response => {
                            const data = response.data
                            // console.log(data)
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
                    formData.append('media', this.media)
                    formData.append('message', this.message)

                    this.loading = true

                    await axios.post('{{ route('admin.inbox.messages.send') }}', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(
                        response => {
                            const data = response.data
                            // console.log(data)
                            if (data.success) {
                                this.messages.unshift(data.message)
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
                        this.message = ""
                        this.loading = false
                    })
                },

            },
            computed: {
                reversedMessages() {
                    return this.messages.slice().reverse();
                }
            }
        })

        var previewMediaModal = new bootstrap.Modal(document.getElementById('previewImage'), {
            keyboard: false
        })
    </script>
@endpush
