<div v-if="(videos).length === 0" class="d-flex flex-column justify-content-center align-items-center">
    <img src="{{ asset('images/empty-folder.png') }}" width="250px" height="250px" alt="">
    <h3 class="text-center">No Data Available</h3>
</div>
<div v-for="(video,index) in videos" class="col-lg-4">
    <div class="card">
        <div class="card-body">
            <div class="post-img">
                <video></video>
            </div>
            <div class="post-see d-flex align-items-center mt-3">
                <div class="d-flex justify-content-between">
                    <h6 class="mb-0">@{{ video?.title }}/h6>
                </div>
            </div>
            {{-- <div class="mt-3">
                <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
            </div> --}}
            <ul class="post-comment d-flex mt-3">
                <li>
                    <label class="me-3">
                        <a href="javascript:void(0)"><i class="fa-regular fa-heart me-2"></i>Favourite</a>
                    </label>
                </li>
                <li>
                    <label class="me-3"><a href="javascript:void(0)">
                            <i class="fa fa-pencil me-2 text-primary"></i>Edit</a>
                    </label>
                </li>
                <li>
                    <label class="me-3">
                        <a href="javascript:void(0)">
                            <i class="fa fa-trash me-2 text-danger"></i>Delete
                        </a>
                    </label>
                </li>
            </ul>
        </div>
    </div>
</div>
