<div class="offcanvas offcanvas-end customeoff" tabindex="-1" id="offcanvasPlayVideo" data-bs-backdrop="static">
    <div class="offcanvas-header">
        <h5 class="modal-title" id="#gridSystemModal">@{{ video?.title }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"
            @click.prevent="handleCloseModal">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
    <div class="offcanvas-body">
        <div class="container-fluid">
            <video width="700px" :src="video?.file" height="400px" controls controlsList="nodownload"></video>
        </div>
    </div>
</div>
