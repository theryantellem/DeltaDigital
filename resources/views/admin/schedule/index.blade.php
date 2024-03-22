@extends('layouts.admin.app')

@section('title', 'Schedule Management')

@section('content')
    <div id="schedules">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="heading mb-0">Schedules Management</h2>
            {{-- @if (auth()->user()->can('create_schedule')) --}}
            <div class="d-flex align-items-center">
                <a class="btn btn-primary btn-sm me-2" data-bs-toggle="offcanvas" href="#offcanvasSignal" role="button"
                    aria-controls="offcanvasSignal">+Create Schedule</a>
            </div>
            {{-- @endif --}}
        </div>
        <template>
            <div class="card">
                <div class="card-body p-0">
                    <div class="active-projects task-table">
                        <div class="tbl-caption">
                            <h4 class="heading mb-0">Schedules</h4>
                        </div>
                        <div id="empoloyees-tbl3_wrapper" class="dataTables_wrapper no-footer">
                            <table class="table dataTable no-footer" role="grid" aria-describedby="empoloyees-tbl3_info">
                                <thead>
                                    <tr role="row">
                                        @if (!auth()->user()->hasRole('educator'))
                                            <th>Educator</th>
                                        @endif
                                        <th>Category</th>
                                        <th>Name</th>
                                        <th>Day</th>
                                        <th>Time</th>
                                        @if (auth()->user()->hasRole('educator') || auth()->user()->can('edit_schedules'))
                                            <th class="text-center">
                                                Action
                                            </th>
                                        @endif
                                    </tr>
                                </thead>
                                <tbody v-if="schedules.length > 0">
                                    <tr role="row" class="odd" v-for="(schedule,index) in schedules"
                                        :key="index" :id="'scheduleRow_' + schedule?.id">
                                        @if (!auth()->user()->hasRole('educator'))
                                            <td>
                                                <div class="products">
                                                    <img :src="schedule?.educator.photo" class="avatar avatar-md"
                                                        alt="">
                                                    <div>
                                                        <h6><a href="#">@{{ schedule?.educator.first_name }}
                                                                @{{ schedule?.educator.last_name }}</a>
                                                        </h6>
                                                    </div>
                                                </div>
                                            </td>
                                        @endif
                                        <td>
                                            <div class="products">
                                                <img :src="schedule?.category?.photo" class="avatar avatar-md"
                                                    alt="">
                                                <div>
                                                    <h6><a href="#">@{{ schedule?.category?.name }}</a>
                                                    </h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            @{{ schedule?.name }}
                                        </td>
                                        <td>
                                            @{{ schedule?.day }}
                                        </td>
                                        <td>
                                            @{{ schedule?.time }}
                                        </td>
                                        <td class="edit-action">
                                            @if (auth()->user()->hasRole('educator'))
                                                <a href="#" class="btn btn-sm btn-primary me-1"
                                                    @click.prevent="details(schedule?.id)">
                                                    Details
                                                </a>
                                            @endif
                                            @if (auth()->user()->can('edit_schedules'))
                                                <a href="#" class="btn btn-sm btn-primary me-1"
                                                    @click.prevent="show(schedule)">
                                                    <i class="fa-solid fa-pencil text-white"></i> Edit
                                                </a>
                                                <a href="#" @click.prevent="deleteSchedule(schedule)"
                                                    class="btn btn-sm btn-danger me-1">
                                                    <i class="fa-solid fa-trash text-white"></i> Delete
                                                </a>
                                            @endif
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="3">
                                            <span class="text-center text-warning">No schedules Created</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
            @include('admin.schedule.modal')
        </template>

    </div>
@endsection
@push('scripts')
    <script>
        const educator = new Vue({
            el: '#schedules',
            data() {
                return {
                    educators: [],
                    schedules: [],
                    loading: false,
                    errors: {},
                    category: "",
                    educator: "",
                    categories: [],
                    schedule_day: "",
                    schedule_time: "",
                    schedule_name: "",
                    description: "",
                    WeekDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    edit: false,
                    scheduleId: "",
                }
            },
            mounted() {
                this.getSchedules();
                this.getEducators();
            },
            computed: {
                educatorCategories() {
                    let categories = []
                    if (this.educator) {
                        const educator = this.educators.filter(educator => educator?.id === this.educator)
                        if (educator) {
                            categories = educator[0]?.categories
                        }
                    }

                    return categories;
                }
            },
            methods: {
                clearForm() {
                    this.errors = {}
                    this.category = ""
                    this.edit = false
                    this.educator = ""
                    this.schedule_time = ""
                    this.schedule_day = ""
                    this.schedule_name = ""
                    // this.description = ""
                },
                details(id) {
                    location.href = `/admin/schedule/show/${id}`
                },
                handleCloseModal() {
                    this.clearForm()
                },
                async getSchedules() {
                    await axios.get("{{ route('admin.schedule.all') }}").then(response => {
                        this.schedules = response.data.schedules
                    }).catch(error => {
                        console.log(error);
                    })
                },
                async getEducators() {
                    await axios.get("{{ route('admin.educators.all') }}").then(response => {
                        this.educators = response.data.educators

                        // check if the logged in user has role educator
                        // if true set the educator to the logged in user
                        if ("{{ auth()->user()->hasRole('educator') }}") {
                            this.educator = "{{ auth()->user()->uuid }}"
                        }

                    }).catch(error => {
                        console.log(error);
                    })
                },
                show(schedule) {
                    this.schedule_name = schedule?.name
                    this.schedule_day = schedule?.day
                    this.schedule_time = schedule?.time
                    this.category = schedule?.category?.id
                    this.educator = schedule?.educator?.id
                    // this.description = schedule?.description
                    this.edit = true

                    console.log(schedule?.time)

                    this.scheduleId = schedule?.id

                    offcanvasSignal.show()
                },
                async create() {
                    this.errors = {};

                    this.loading = true

                    const formData = {
                        'educator': this.educator,
                        // 'description': this.description,
                        'category': this.category,
                        'schedule_name': this.schedule_name,
                        'schedule_time': this.schedule_time,
                        'schedule_day': this.schedule_day
                    }

                    await axios.post("{{ route('admin.schedule.store') }}", formData)
                        .then(response => {

                            this.schedules.push(response.data.schedule);

                            this.clearForm();

                            offcanvasSignal.hide();

                            Notiflix.Notify.Success(response.data.message);
                        })
                        .catch(error => {
                            console.log(error)
                            if (error.response && error.response.data && error.response.data.errors) {
                                // Set validation errors from the backend response
                                this.errors = error.response.data.errors;

                            } else {
                                // console.log(error.response)
                                Notiflix.Notify.Failure("Service unavailable");
                                // Handle other types of errors, if needed
                            }

                        }).finally(() => {
                            this.loading = false;
                        })
                },
                async update(id) {
                    this.errors = {};

                    this.loading = true

                    const formData = {
                        // 'educator': this.educator,
                        // 'description': this.description,
                        'category': this.category,
                        'schedule_name': this.schedule_name,
                        'schedule_time': this.schedule_time,
                        'schedule_day': this.schedule_day,
                        '_method': 'put'
                    }

                    await axios.post(`/admin/schedule/update/${id}`, formData)
                        .then(response => {

                            this.getSchedules()

                            this.clearForm();
                            offcanvasSignal.hide();

                            Notiflix.Notify.Success(response.data.message);
                        })
                        .catch(error => {
                            console.log(error)
                            if (error.response && error.response.data && error.response.data.errors) {
                                // Set validation errors from the backend response
                                this.errors = error.response.data.errors;

                            } else {
                                // console.log(error.response)
                                Notiflix.Notify.Failure("Service unavailable");
                                // Handle other types of errors, if needed
                            }

                        }).finally(() => {
                            this.loading = false;
                        })
                },
                deleteSchedule(schedule) {
                    Notiflix.Confirm.Show(
                        'Are you sure?',
                        'you want Delete Schedule.',
                        'Delete',
                        'Cancle',
                        function okCb() {
                            axios.delete(`/admin/schedule/delete/${schedule?.id}`)
                                .then(function(response) {
                                    if (response.data.success) {
                                        Notiflix.Notify.Success(response.data.message);

                                        // Remove the deleted schedule row from the table
                                        const tableRow = document.getElementById(
                                            `scheduleRow_${schedule.id}`);
                                        if (tableRow) {
                                            tableRow.remove();
                                        }
                                    } else {
                                        Notiflix.Notify.Failure("Could not find strategy");
                                    }
                                })
                                .catch(error => {
                                    console.log(error);
                                    Notiflix.Notify.Failure(
                                        "Error Occurred while trying to delete strategy.");
                                })
                        }
                    );
                }
            }
        })

        const offcanvasSignal = new bootstrap.Offcanvas(document.getElementById('offcanvasSignal'));

        $(".select2").select2();
    </script>
@endpush
