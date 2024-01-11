<div v-if="(videos).length === 0" class="d-flex flex-column justify-content-center align-items-center">
    <img src="{{ asset('images/empty-folder.png') }}" width="250px" height="250px" alt="">
    <h3 class="text-center">No Data Available</h3>
</div>
<draggable class="row" v-model="videos" group="fragenblatt" group="fragenblatt" :options="{animation:200, handle:'.my-handle'}" @start="drag=true" @change="endDrag" handle=".handle">
    <div v-for="(video,index) in videos" :key="index" class="col-lg-4" :id="'video_' + video?.id">
        <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-end">
                    <i class="fa fa-arrows my-handle fx-2" aria-hidden="true"></i>
                </div>
                <div class="post-img">
                    <video width="330px" height="200px" :src="video?.file" autoplay loop muted></video>
                </div>
                <div class="post-see d-flex align-items-center mt-3">
                    <div class="d-flex justify-content-between">
                        <h6 class="mb-0">@{{ video?.title }}</h6>
                    </div>
                </div>
                {{-- <div class="mt-3">
                    <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                </div> --}}
                <ul class="post-comment d-flex mt-3">
                    <li>
                        <label class="me-3">
                            <a href="javascript:void(0)" @click.prevent="toggleFavorite(video)">
                                <i v-if="video?.is_favourite" class="fa-solid fa-heart me-2 text-success"></i>
                                <i v-else="video?.is_favourite" class="fa-regular fa-heart me-2"></i>
                                <span>Favourite</span>
                            </a>
                        </label>
                    </li>
                    <li>
                        <label class="me-3">
                            <a href="javascript:void(0)" @click.prevent="playVideo(video)">
                                <i class="fa fa-play me-2 text-primary"></i>Play
                            </a>
                        </label>
                    </li>
                    <li>
                        <label class="me-3">
                            <a href="javascript:void(0)" @click.prevent="deleteVideo(video)">
                                <i class="fa fa-trash me-2 text-danger"></i>Delete
                            </a>
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</draggable>

