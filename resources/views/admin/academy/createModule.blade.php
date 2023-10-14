<div class="offcanvas offcanvas-end customeoff" tabindex="-1" id="offcanvasSignal">
    <div class="offcanvas-header">
        <h5 class="modal-title" id="#gridSystemModal">
            <span v-if="!edit">Create</span><span v-else>Update</span> Module
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" @click="handleCloseModal">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
    <div class="offcanvas-body">
        <form>
            <div class="row">
                <div class="col-xl-12 mb-3">
                    <label for="exampleFormControlInput3" class="form-label">Name<span
                            class="text-danger">*</span></label>
                    <input type="text" v-model="name" class="form-control" id="exampleFormControlInput3"
                        placeholder="Name">
                    <span v-if="errors?.name" class="text-danger">@{{ errors?.name[0] }}</span>
                </div>
            </div>
            <div class="row">
                <div class="col-xl-12 mb-3">
                    <label class="form-label">Description<span class="text-danger">*</span></label>
                    <textarea rows="2" v-model="description" class="form-control"></textarea>
                    <span v-if="errors.description" class="text-danger">@{{ errors.description[0] }}</span>
                </div>
            </div>
            <div v-if="edit">
                <button :disabled="loading" @click.prevent="update(moduleId)" class="btn btn-primary me-1">
                    <span v-if="loading" class="spinner-border spinner-border-sm" role="status"
                        aria-hidden="true"></span>
                    <span v-else>Update</span>
                </button>
            </div>
            <div v-else>
                <button :disabled="loading" @click.prevent="create" class="btn btn-primary me-1">
                    <span v-if="loading" class="spinner-border spinner-border-sm" role="status"
                        aria-hidden="true"></span>
                    <span v-else>Submit</span>
                </button>
            </div>
        </form>
    </div>
</div>
</div>
