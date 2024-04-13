<div class="offcanvas offcanvas-end customeoff" tabindex="-1" id="offcanvasUploadDocument" data-bs-backdrop="static">
    <div class="offcanvas-header">
        <h5 class="modal-title" id="#gridSystemModal">Upload Document</h5>
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
                <div class="mb-3">
                    <label>Document File</label>
                    <input class="form-control form-control-sm" ref="fileDocInput" @change="handleDocumentFileChange($event)"
                        id="formFileSm" type="file">
                    <span v-if="errors?.doc_file" class="text-danger">@{{ errors?.doc_file }}</span>
                </div>
                <div>
                    <button :disabled="loading" @click.prevent="uploadDocs" class="btn btn-primary me-1">
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
