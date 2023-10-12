<div class="offcanvas offcanvas-end customeoff" tabindex="-1" id="offcanvasSignal">
    <div class="offcanvas-header">
        <h5 class="modal-title" id="#gridSystemModal">
            <span v-if="!edit">Create</span><span v-else>Update</span> Schedule
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" @click="handleCloseModal">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
    <div class="offcanvas-body">
        <form>
            <div class="row">
                <div class="col-xl-12 mb-3">
                    <label for="exampleFormControlInput3" class="form-label">Educator<span
                            class="text-danger">*</span></label>
                    <select v-model="educator" class="form-control" :readonly="edit">
                        <option value="">--selecet--</option>
                        <option v-for="educator in educators" :key="educator?.id" :value="educator?.id">
                            @{{ educator?.first_name }} @{{ educator?.last_name }}
                        </option>
                    </select>
                    <span v-if="errors?.educator" class="text-danger">@{{ errors.educator[0] }}</span>
                </div>
                <div class="col-xl-12 mb-3">
                    <label for="exampleFormControlInput3" class="form-label">Category<span
                            class="text-danger">*</span></label>
                    <select v-model="category" class="form-control">
                        <option value="">--selecet--</option>
                        <option v-for="category in educatorCategories" :key="category?.category?.id"
                            :value="category?.category?.id">
                            @{{ category?.category?.name }}
                        </option>
                    </select>
                    <span v-if="errors?.category" class="text-danger">@{{ errors?.category[0] }}</span>
                </div>
                <div class="col-xl-12 mb-3">
                    <label for="exampleFormControlInput3" class="form-label">Schedule Name<span
                            class="text-danger">*</span></label>
                    <input type="text" v-model="schedule_name" class="form-control" id="exampleFormControlInput3"
                        placeholder="Name of Schedule">
                    <span v-if="errors?.schedule_name" class="text-danger">@{{ errors?.schedule_name[0] }}</span>
                </div>
                <div class="col-xl-12 mb-3">
                    <label for="exampleFormControlInput3" class="form-label">Day<span
                            class="text-danger">*</span></label>
                    <select v-model="schedule_day" id="" class="form-control">
                        <option value="">--selecet--</option>
                        <option v-for="day in WeekDays" :key="day" :value="day">
                            @{{ day }}
                        </option>
                    </select>
                    <span v-if="errors?.schedule_day" class="text-danger">@{{ errors?.schedule_day[0] }}</span>
                </div>
                <div class="col-xl-12 mb-3">
                    <label for="exampleFormControlInput3" class="form-label">Schedule Time<span
                            class="text-danger">*</span></label>
                    <input type="time" v-model="schedule_time" class="form-control" id="exampleFormControlInput3"
                        placeholder="Name of Schedule">
                    <span v-if="errors?.schedule_time" class="text-danger">@{{ errors?.schedule_time[0] }}</span>
                </div>
            </div>
            <div v-if="edit">
                <button :disabled="loading" @click.prevent="update(scheduleId)" class="btn btn-primary me-1">
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
