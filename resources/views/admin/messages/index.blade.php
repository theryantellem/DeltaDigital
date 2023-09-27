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
                            <div class="chat-p shaprate">
                                <div class="d-flex">
                                    {{-- <img src="images/contacts/d1.jpg" class="avatar avatar-lg  rounded-circle" alt=""> --}}
                                    <div class="ms-2 pb-5">
                                        {{-- <h6 class="mb-0">K kumar Gaur</h6> --}}
                                        {{-- <span>
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="7" cy="7" r="6" fill="#3AC977" stroke="white" stroke-width="2"></circle>
                                            </svg>
                                        online</span> --}}
                                    </div>
                                </div>
                                <div class="chat-admin">
                                    <div class="icon-box bg-info mx-1 chat-toggle">
                                        <i class="fa-solid fa-list-ul text-white"></i>
                                    </div>
                                    {{-- <div class="icon-box bg-success mx-1">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_505_3755)">
                                            <path d="M18.3333 14.0999V16.5999C18.3343 16.832 18.2867 17.0617 18.1937 17.2744C18.1008 17.487 17.9644 17.6779 17.7934 17.8348C17.6224 17.9917 17.4205 18.1112 17.2006 18.1855C16.9808 18.2599 16.7478 18.2875 16.5167 18.2666C13.9523 17.988 11.4892 17.1117 9.32498 15.7083C7.31151 14.4288 5.60443 12.7217 4.32499 10.7083C2.91663 8.53426 2.04019 6.05908 1.76665 3.48325C1.74583 3.25281 1.77321 3.02055 1.84707 2.80127C1.92092 2.58199 2.03963 2.38049 2.19562 2.2096C2.35162 2.03871 2.54149 1.90218 2.75314 1.80869C2.9648 1.7152 3.1936 1.6668 3.42499 1.66658H5.92499C6.32941 1.6626 6.72148 1.80582 7.02812 2.06953C7.33476 2.33324 7.53505 2.69946 7.59165 3.09992C7.69717 3.89997 7.89286 4.68552 8.17499 5.44158C8.2871 5.73985 8.31137 6.06401 8.24491 6.37565C8.17844 6.68729 8.02404 6.97334 7.79998 7.19992L6.74165 8.25825C7.92795 10.3445 9.65536 12.072 11.7417 13.2583L12.8 12.1999C13.0266 11.9759 13.3126 11.8215 13.6243 11.755C13.9359 11.6885 14.26 11.7128 14.5583 11.8249C15.3144 12.107 16.0999 12.3027 16.9 12.4083C17.3048 12.4654 17.6745 12.6693 17.9388 12.9812C18.203 13.2931 18.3435 13.6912 18.3333 14.0999Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                            </g>
                                            <defs>
                                            <clipPath id="clip0_505_3755">
                                            <rect width="20" height="20" fill="white"></rect>
                                            </clipPath>
                                            </defs>
                                        </svg>
                                    </div> --}}
                                    {{-- <div class="icon-box bg-primary mx-1">
                                        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19.561 1.172C19.4256 1.08045 19.2699 1.02347 19.1074 1.00604C18.945 0.988603 18.7807 1.01125 18.629 1.072L14.954 2.542C14.8449 1.83596 14.4875 1.19201 13.946 0.726018C13.4045 0.260026 12.7144 0.00258053 12 0H3C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V11C0 11.7956 0.316071 12.5587 0.87868 13.1213C1.44129 13.6839 2.20435 14 3 14H12C12.7143 13.9975 13.4042 13.7402 13.9457 13.2744C14.4872 12.8086 14.8447 12.1649 14.954 11.459L18.629 12.929C18.7807 12.9896 18.945 13.0121 19.1075 12.9946C19.27 12.977 19.4257 12.9199 19.561 12.8282C19.6962 12.7365 19.807 12.6131 19.8835 12.4687C19.9601 12.3244 20.0001 12.1634 20 12V2C20 1.83663 19.96 1.67573 19.8835 1.53139C19.807 1.38705 19.6962 1.26365 19.561 1.172ZM12 12H3C2.73478 12 2.48043 11.8946 2.29289 11.7071C2.10536 11.5196 2 11.2652 2 11V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H12C12.2652 2 12.5196 2.10536 12.7071 2.29289C12.8946 2.48043 13 2.73478 13 3V11C13 11.2652 12.8946 11.5196 12.7071 11.7071C12.5196 11.8946 12.2652 12 12 12ZM18 10.523L15 9.323V4.677L18 3.477V10.523Z" fill="white"></path>
                                        </svg>
                                    </div> --}}
                                    {{-- <div class="dropdown custom-dropdown mx-1">
                                        <div class="btn sharp btn-primary light" data-bs-toggle="dropdown" aria-expanded="false">
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="12" cy="5" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="19" r="2"></circle></g></svg>
                                        </div>
                                        <div class="dropdown-menu dropdown-menu-end" style="">
                                            <a class="dropdown-item" href="javascript:void(0);">Option 1</a>
                                            <a class="dropdown-item" href="javascript:void(0);">Option 2</a>
                                            <a class="dropdown-item" href="javascript:void(0);">Option 3</a>
                                        </div>
                                    </div> --}}
                                    <div class="mx-1">
                                        {{-- <a href="#" class="btn sharp btn-danger light" data-bs-toggle="dropdown" aria-expanded="false">
                                            Lock Chat
                                        </a>
                                        <a href="#" class="btn sharp btn-primary light" data-bs-toggle="dropdown" aria-expanded="false">
                                            UnLock Chat
                                        </a> --}}
                                        {{-- <div class="dropdown-menu dropdown-menu-end" style="">
                                            <a class="dropdown-item" href="javascript:void(0);">Option 1</a>
                                            <a class="dropdown-item" href="javascript:void(0);">Option 2</a>
                                            <a class="dropdown-item" href="javascript:void(0);">Option 3</a>
                                        </div> --}}
                                    </div>
                                </div>
                            </div>
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
