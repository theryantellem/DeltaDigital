<div class="offcanvas offcanvas-end customeoff" tabindex="-1" id="offcanvasEditVideo" data-bs-backdrop="static">
    <div class="offcanvas-header">
        <h5 class="modal-title" id="#gridSystemModal">Update @{{ video?.name }} Details</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"
            @click.prevent="handleClose">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
    <div class="offcanvas-body">
        <div class="container-fluid">
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
            <div>
                <button :disabled="loading" @click.prevent="updateVideo" class="btn btn-primary me-1">
                    <span v-if="loading" class="spinner-border spinner-border-sm" role="status"
                        aria-hidden="true"></span>
                    <span v-else>Submit</span>
                </button>
            </div>
        </div>
    </div>
</div>
