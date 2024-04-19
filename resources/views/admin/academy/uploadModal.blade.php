<div class="offcanvas offcanvas-end customeoff" tabindex="-1" id="offcanvasUpload" data-bs-backdrop="static">
    <div class="offcanvas-header">
        <h5 class="modal-title" id="#gridSystemModal">Upload Video</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"
            @click.prevent="handleCloseModal">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
    <div class="offcanvas-body">
        <div class="container-fluid">
            <form>
                <div class="mb-3">
                    <label>Name</label>
                    <input class="form-control form-control-sm" v-model="name" type="text">
                    <span v-if="errors?.name" class="text-danger">@{{ errors?.name }}</span>
                </div>
                <div class="row">
                    <div class="col-xl-12 mb-3">
                        <label class="form-label">Description<span class="text-danger">*</span></label>
                        <textarea rows="2" v-model="description" class="form-control"></textarea>
                        <span v-if="errors.description" class="text-danger">@{{ errors.description }}</span>
                    </div>
                </div>
                <div class="mb-3">
                    <label>Video File</label>
                    <input class="form-control form-control-sm" ref="fileInput" @change="handleFileChange($event)"
                        id="formFileSm" type="file">
                    <span v-if="errors?.file" class="text-danger">@{{ errors?.file }}</span>
                </div>
                <div v-if="processing">
                    <button class="btn btn-primary" type="button" disabled>
                        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                        procesamiento de vídeo...
                    </button>
                </div>
                <div v-if="video_length && !processing && progress == 0">
                    <button :disabled="loading" @click.prevent="uploadFile" class="btn btn-primary me-1">
                        {{-- <span v-if="loading" class="spinner-border spinner-border-sm" role="status"
                            aria-hidden="true"></span> --}}
                        <span>Submit</span>
                    </button>
                </div>
                <div v-if="progress > 0">
                    <progress :value="progress" class="custom-progress" max="100"></progress>
                    @{{ progress }}%
                </div>
            </form>
        </div>
    </div>
</div>
