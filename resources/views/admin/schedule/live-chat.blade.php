<div class="card overflow-hidden" style="height: 400px">
    <div class="card-body p-0">
        <div class="row gx-0">
            <div class="col-xl-12 col-lg-8 col-sm-7 chat-border">
                <div class="chat-p shaprate">
                    <div class="d-flex justify-content-center align-items-center text-center">
                        <img src="{{ asset('images/live.png') }}" class="avatar avatar-lg  rounded-circle" alt="">
                        <div class="ms-2">
                            <h6 class="text-uppercase mb-0">You are live</h6>
                        </div>
                    </div>
                </div>
                <div class="chat-box-area style-2 dz-scroll" id="chartBox2" ref="chatBox"
                    style="height: 400px; padding-bottom: 100px">
                    <template v-for="(message, index) in reversedMessages" :key="message.id">
                        <span v-if="shouldDisplayDate(message, index)" class="text-center d-block mb-4">
                            <span v-if="currentDate === message?.formatedDate">
                                Today
                            </span>
                            <span v-else>
                                @{{ message?.formatedDate }}
                            </span>
                        </span>
                        <div :class="getMessageClasses(message)">
                            <div v-if="message.sender.id === educator" class="message-sent w-auto">
                                <a :href="message?.message" data-lightbox="profile" class="chat-meadia"
                                    v-if="message?.type === 'media'">
                                    <img :src="message?.message" height="200px" width="200px" alt="">
                                </a>
                                <p v-else>@{{ message?.message }}</p>
                                <span class="fs-12">@{{ message?.formatedTime }} </span>
                            </div>
                            <div v-else class="message-received w-auto">
                                <div class="d-flex">
                                    <div class="ms-1 text">
                                        <a :href="message?.message" data-lightbox="profile" class="chat-meadia"
                                            v-if="message?.type === 'media'">
                                            <img :src="message?.message" height="200px" width="200px" alt="">
                                        </a>
                                        <p v-else class="mb-1">@{{ message?.message }}</p>
                                        <span>@{{ message?.formatedTime }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</div>
