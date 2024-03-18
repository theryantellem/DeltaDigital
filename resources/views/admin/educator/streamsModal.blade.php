<div class="offcanvas offcanvas-end customeoff" tabindex="-1" id="offstreamCanvas" data-backdrop="static"
    data-keyboard="false">
    <div class="offcanvas-header">
        <h5 class="modal-title" id="#gridSystemModal">Stream Sessions</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" @click="handleCloseModal">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
    <div class="offcanvas-body">
        <div class="container-fluid">
            <div id="empoloyees-tbl3_wrapper" class="dataTables_wrapper no-footer">
                <div class="mb-3">
                    <h3>Streamer</h3>
                    <h6><b>Name</b> : <span>@{{ first_name }} @{{ last_name }}</span></h6>
                    <h6><b>Email</b> : <span>@{{ email }}</span></h6>
                </div>
                <table class="table dataTable no-footer" role="grid" aria-describedby="empoloyees-tbl3_info">
                    <thead>
                        <tr role="row">
                            <th>Date</th>
                            <th>Schedule</th>
                            <th>Attendance</th>
                        </tr>
                    </thead>
                    <tbody v-if="streams?.length > 0">
                        <tr role="row" class="odd" v-for="(stream,index) in streams" :key="index">
                            <td>
                                <span class="text-center">@{{ stream?.date }}</span>
                            </td>
                            <td><span class="text-center">@{{ stream?.schedule?.name }}</span></td>
                            <td>@{{ stream?.viewers }}</td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="2">
                                <span class="text-center text-warning">No streams sessions</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
