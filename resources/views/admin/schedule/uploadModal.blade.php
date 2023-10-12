<div class="offcanvas offcanvas-end customeoff" tabindex="-1" id="offcanvasSignal">
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
                    <label>Title</label>
                    <input class="form-control form-control-sm" type="text">
                    <span v-if="errors?.title" class="text-danger">@{{ errors?.title[0] }}</span>
                </div>
                <div class="mb-3">
                    <label>Video File</label>
                    <input class="form-control form-control-sm" ref="fileInput" @change="handleFileChange($event)"
                        id="formFileSm" type="file">
                    <span v-if="errors?.file" class="text-danger">@{{ errors?.file[0] }}</span>
                </div>
                <div>
                    <button :disabled="loading" @click.prevent="uploadFile" class="btn btn-primary me-1">
                        {{-- <span v-if="loading" class="spinner-border spinner-border-sm" role="status"
                            aria-hidden="true"></span> --}}
                        <span>Submit</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
