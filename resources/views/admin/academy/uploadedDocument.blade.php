<div class="offcanvas offcanvas-end customeoff" tabindex="-1" id="offcanvasUploadedDocument" data-bs-backdrop="static">
    <div class="offcanvas-header">
        <h5 class="modal-title" id="#gridSystemModal">Uploaded Document</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"
            @click.prevent="handleCloseModal">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
    <div class="offcanvas-body">
        <div class="container-fluid">
            <table class="table table-bordered">
                <thead>
                    <th>Title</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    <tr v-for="(doc,index) in documents" :key="index">
                        <td>
                            @{{ doc?.name }}
                        </td>
                        <td width="30%">
                            <a :href="doc?.file_url" target="_blank" class="btn btn-primary">Open</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
