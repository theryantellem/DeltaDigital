<div class="modal fade" id="createBanner">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Create Banner</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal">
                </button>
            </div>
            <div class="modal-body">
                <div v-if="imagePreviewUrl">
                    <img :src="imagePreviewUrl" alt="" class="img-fluid w-100 rounded" width="250px" height="250px">
                </div>
                <form action="">
                    <div class="mb-3">
                        <label for="formFile" class="form-label">Photo</label>
                        <input class="form-control" type="file" @change="handleFileUpload($event)" id="formFile">
                        <span v-if="errors.photo" class="text-danger">@{{ errors.photo[0] }}</span>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger light" data-bs-dismiss="modal">Close</button>
                <button type="button" :disabled="loading" @click.prevent="createBanner" class="btn btn-primary">
                    <span v-if="loading" class="spinner-border spinner-border-sm" role="status"
                        aria-hidden="true"></span>
                    <span v-else>Save</span>
                </button>
            </div>
        </div>
    </div>
</div>
