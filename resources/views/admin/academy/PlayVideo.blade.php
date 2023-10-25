<div class="offcanvas offcanvas-end customeoff" tabindex="-1" id="offcanvasPlayVideo" data-bs-backdrop="static">
    <div class="offcanvas-header">
        <h5 class="modal-title" id="#gridSystemModal">@{{ video?.name }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"
            @click.prevent="handleClose">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
    <div class="offcanvas-body">
        <div class="container-fluid">
            <div class="mb-3">
                <video width="700px" height="400px" :src="video?.video_file" ref="videoPlayer" controls controlsList="nodownload"></video>
            </div>
            <div class="mb-3">
                <h6>
                    @{{ video?.description }}
                </h6>
            </div>
        </div>
    </div>
</div>
