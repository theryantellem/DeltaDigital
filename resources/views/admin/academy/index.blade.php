@extends('layouts.admin.app')

@section('title', 'Schedule Management')

@section('content')
    <div id="academy">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="heading mb-0">Academy</h2>
            @if (auth()->user()->hasRole('educator'))
                <div class="d-flex align-items-center">
                    <a class="btn btn-primary btn-sm me-2" data-bs-toggle="offcanvas" href="#offcanvasSignal" role="button"
                        aria-controls="offcanvasSignal"> + Create Course</a>
                </div>
            @endif
        </div>
        <template>
            <div class="card">
                <div class="card-body p-0">
                    <div class="active-projects task-table">
                        <div class="tbl-caption">
                            <h4 class="heading mb-0">Courses</h4>
                        </div>
                        <div id="empoloyees-tbl3_wrapper" class="dataTables_wrapper no-footer">
                            <table class="table dataTable no-footer" role="grid" aria-describedby="empoloyees-tbl3_info">
                                <thead>
                                    <tr role="row">
                                        @if (!auth()->user()->hasRole('educator'))
                                            <th>Educator</th>
                                        @endif
                                        <th>Course</th>
                                        <th>Description</th>
                                        @if (auth()->user()->hasRole('educator'))
                                            <th class="text-center">
                                                Action
                                            </th>
                                        @endif
                                    </tr>
                                </thead>
                                <tbody v-if="courses.length > 0">
                                    <tr role="row" class="odd" v-for="(course,index) in courses"
                                        :key="index" :id="'scheduleRow_' + course?.id">
                                        @if (!auth()->user()->hasRole('educator'))
                                            <td>
                                                <div class="products">
                                                    <img :src="course?.educator?.photo" class="avatar avatar-md"
                                                        alt="">
                                                    <div>
                                                        <h6><a href="#">@{{ course?.educator?.first_name }}
                                                                @{{ course?.educator?.last_name }}</a>
                                                        </h6>
                                                    </div>
                                                </div>
                                            </td>
                                        @endif
                                        <td>
                                            <div class="products">
                                                <img :src="course?.thumbnail" class="avatar avatar-md" alt="">
                                                <div>
                                                    <h6><a href="#"> @{{ course?.name }}</a>
                                                    </h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            @{{ course?.caption }}
                                        </td>
                                        <td class="edit-action text-center">
                                            <a href="#" class="btn btn-sm btn-primary me-1"
                                                @click.prevent="details(course?.id)">
                                                Details
                                            </a>
                                            @if (auth()->user()->hasRole('educator'))
                                                <a href="#" class="btn btn-sm btn-primary me-1"
                                                    @click.prevent="show(course)">
                                                    Edit
                                                </a>
                                                <a href="#" class="btn btn-sm btn-danger me-1"
                                                    @click.prevent="deleteCourse(course)">
                                                    Delete
                                                </a>
                                            @endif
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="2">
                                            <span class="text-warning">No courses Created</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
            @include('admin.academy.createCourse')
        </template>
    </div>
@endsection
@push('scripts')
    <script>
        const educator = new Vue({
            el: '#academy',
            data() {
                return {
                    loading: false,
                    errors: {},
                    photo_preview: null,
                    name: "",
                    description: "",
                    edit: false,
                    academyId: "",
                    courses: [],
                    thumbnail: ""
                }
            },
            mounted() {
                this.getCourses();
            },
            methods: {
                clearForm() {
                    this.errors = {}
                    this.edit = false
                    this.name = ""
                    this.description = ""
                    this.thumbnail = null

                    this.$refs.fileInput.value = null;
                },
                details(id) {
                    location.href = `/admin/academy/details/${id}`
                },
                handlePhotoUpload(event) {
                    this.thumbnail = event.target.files[0];

                    if (this.thumbnail) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            this.photo_preview = e.target.result; // Set the preview URL
                        };
                        reader.readAsDataURL(this.thumbnail);
                    }
                },
                handleCloseModal() {
                    this.clearForm()
                },
                async getCourses() {
                    await axios.get("{{ route('admin.academy.all') }}").then(response => {
                        this.courses = response.data.data;
                    }).catch(error => {
                        console.log(error);
                    })
                },
                show(academy) {
                    this.name = academy?.name
                    this.description = academy?.description
                    this.photo_preview = academy?.thumbnail
                    this.edit = true

                    this.academyId = academy?.id

                    offcanvasSignal.show()
                },
                async create() {
                    this.errors = {};

                    this.loading = true

                    let formData = new FormData();
                    formData.append('_token', '{{ csrf_token() }}');
                    formData.append('description', this.description);
                    formData.append('name', this.name);
                    formData.append('thumbnail', this.thumbnail);

                    await axios.post("{{ route('admin.academy.store') }}", formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(response => {

                            this.courses.push(response.data.course);

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

                    let formData = new FormData();
                    formData.append('_token', '{{ csrf_token() }}');
                    formData.append('description', this.description);
                    formData.append('name', this.name);
                    formData.append('thumbnail', this.thumbnail);
                    formData.append('_method', 'put')

                    await axios.post(`/admin/academy/update/${id}`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(response => {

                            this.getCourses()

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
                deleteCourse(course) {
                    Notiflix.Confirm.Show(
                        'Are you sure?',
                        'you want Delete Courses.',
                        'Delete',
                        'Cancle',
                        function okCb() {
                            axios.delete(`/admin/academy/delete/${course?.id}`)
                                .then(function(response) {
                                    if (response.data.success) {
                                        Notiflix.Notify.Success(response.data.message);

                                        // Remove the deleted schedule row from the table
                                        const tableRow = document.getElementById(
                                            `scheduleRow_${course.id}`);
                                        if (tableRow) {
                                            tableRow.remove();
                                        }
                                    } else {
                                        Notiflix.Notify.Failure("Could not find Academy");
                                    }
                                })
                                .catch(error => {
                                    console.log(error);
                                    Notiflix.Notify.Failure(
                                        "Error Occurred while trying to delete item.");
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
