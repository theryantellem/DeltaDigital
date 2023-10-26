<div class="offcanvas offcanvas-end customeoff" tabindex="-1" id="offcanvasSignal" data-bs-backdrop="static">
    <div class="offcanvas-header">
        <h5 class="modal-title" id="#gridSystemModal">Streamer Thumbnail</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"
            @click.prevent="handleCloseModal">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
    <div class="offcanvas-body">
        <div class="container-fluid">
            <form>
                <div class="col-lg-12 mb-3">
                    <label>Thumbnail</label>
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
                        <img v-else :src="photo_preview" alt="Chart Preview"
                            style="max-width: 100%; max-height: 200px; height: 200px">
                    </div>
                    <input class="form-control form-control-sm" ref="fileInput" @change="handlePhotoUpload($event)"
                        id="formFileSm" type="file">
                    <span v-if="errors.photo" class="text-danger">@{{ errors.photo[0] }}</span>
                </div>
                <div>
                    <button :disabled="loading" @click.prevent="uploadThumbnail" class="btn btn-primary me-1">
                        <span v-if="loading" class="spinner-border spinner-border-sm" role="status"
                            aria-hidden="true"></span>
                        <span v-else>Submit</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
@push('scripts')
    <script>
        const thumbnail = new Vue({
            el: '#offcanvasSignal',
            data() {
                return {
                    photo_preview: "{{ auth()->user()->thumbnail }}",
                    loading: false,
                    errors: {},
                    photo: "",
                }
            },
            methods: {
                handlePhotoUpload(event) {
                    this.photo = event.target.files[0];

                    if (this.photo) {
                        // Read the selected image and create a preview URL
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            this.photo_preview = e.target.result; // Set the preview URL
                        };
                        reader.readAsDataURL(this.photo);
                    }
                },
                handleCloseModal() {
                    this.errors = {};
                    this.photo = "";
                    this.photo_preview = "{{ auth()->user()->thumbnail }}"
                    this.$refs.fileInput.value = null;
                },
                async uploadThumbnail() {
                    this.errors = {};

                    this.loading = true

                    let formData = new FormData();
                    formData.append('_token', '{{ csrf_token() }}');
                    formData.append('photo', this.photo);

                    await axios.post("{{ route('admin.profile.update.thumbnail') }}", formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(response => {

                            Notiflix.Notify.Success(response.data.message);

                            location.reload();
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
                },
            }
        })
    </script>
@endpush
