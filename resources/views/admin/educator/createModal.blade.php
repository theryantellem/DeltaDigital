<div class="offcanvas offcanvas-end customeoff" tabindex="-1" id="offcanvasSignal">
    <div class="offcanvas-header">
        <h5 class="modal-title" id="#gridSystemModal">Create Educator</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" @click="handleCloseModal">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
    <div class="offcanvas-body">
        <div class="container-fluid">
            <form>
                <div class="row">
                    <div class="col-xl-6 mb-3">
                        <label for="exampleFormControlInput1" class="form-label">First Name<span
                                class="text-danger">*</span></label>
                        <input type="text" class="form-control" v-model="first_name" id="exampleFormControlInput1"
                            placeholder="">
                        <span v-if="errors.first_name" class="text-danger">@{{ errors.first_name[0] }}</span>
                    </div>
                    <div class="col-xl-6 mb-3">
                        <label for="exampleFormControlInput3" class="form-label">Last Name<span
                                class="text-danger">*</span></label>
                        <input type="text" v-model="last_name" class="form-control" id="exampleFormControlInput3"
                            placeholder="">
                        <span v-if="errors.last_name" class="text-danger">@{{ errors.last_name[0] }}</span>
                    </div>
                    <div class="col-xl-12 mb-3">
                        <label for="exampleFormControlInput3" class="form-label">Email<span
                                class="text-danger">*</span></label>
                        <input type="email" v-model="email" class="form-control" id="exampleFormControlInput3"
                            placeholder="">
                        <span v-if="errors.email" class="text-danger">@{{ errors.email[0] }}</span>
                    </div>
                    <div class="col-lg-12 mb-3">
                        <label>Photo</label>
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
                        <input class="form-control form-control-sm" @change="handlePhotoUpload($event)" id="formFileSm"
                            type="file">
                        <span v-if="errors.photo" class="text-danger">@{{ errors.photo[0] }}</span>
                    </div>
                </div>

                <div>
                    <button :disabled="loading" @click.prevent="createEducator" class="btn btn-primary me-1">
                        <span v-if="loading" class="spinner-border spinner-border-sm" role="status"
                            aria-hidden="true"></span>
                        <span v-else>Submit</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
