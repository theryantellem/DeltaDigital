@extends('layouts.admin.app')

@section('title', 'Course')

@section('content')
    <div id="module">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="heading mb-0">Course Details</h2>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="card card-body">
                    <div class="d-flex">
                        <div>
                            <h4 class="text-primary mb-0">
                                {{ $academy->name }}
                            </h4>
                            <p>
                                {{ $academy->description }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <template>
            <div class="card">
                <div class="card-body p-0">
                    <div class="active-projects task-table">
                        <div class="tbl-caption">
                            <div class="d-flex justify-content-between">
                                <h4 class="heading mb-0">Modules</h4>
                                @if (auth()->user()->hasRole('educator'))
                                    <a class="btn btn-primary btn-sm me-2" data-bs-toggle="offcanvas"
                                        href="#offcanvasSignal" role="button" aria-controls="offcanvasSignal"> + Create
                                        Module</a>
                                @endif
                            </div>
                        </div>
                        <div id="empoloyees-tbl3_wrapper" class="dataTables_wrapper no-footer">
                            <table class="table dataTable no-footer" role="grid" aria-describedby="empoloyees-tbl3_info">
                                <thead>
                                    <tr role="row">
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th class="text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody v-if="modules.length > 0">
                                    <tr role="row" class="odd" v-for="(module,index) in modules"
                                        :key="index" :id="'scheduleRow_' + module?.id">
                                        <td>
                                            @{{ module?.name }}
                                        </td>
                                        <td>
                                            @{{ module?.caption }}
                                        </td>
                                        <td class="edit-action text-center">
                                            <a href="#" class="btn btn-sm btn-primary me-1"
                                                @click.prevent="details(module?.id)">
                                                Details
                                            </a>
                                            @if (auth()->user()->hasRole('module'))
                                                <a href="#" class="btn btn-sm btn-primary me-1"
                                                    @click.prevent="show(module)">
                                                    Edit
                                                </a>
                                                <a href="#" class="btn btn-sm btn-danger me-1"
                                                    @click.prevent="deleteModule(module?.id)">
                                                    Delete
                                                </a>
                                            @endif
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="1">
                                            <span class="text-warning">No Module Created</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </template>
        @include('admin.academy.createModule')
    </div>
@endsection
@push('scripts')
    <script>
        const educator = new Vue({
            el: '#module',
            data() {
                return {
                    name: "",
                    courseId: "{{ $academy->uuid }}",
                    modules: [],
                    loading: false,
                    errors: {},
                    edit: false,
                    description: "",
                    moduleId: ""
                }
            },
            created() {
                this.getModules();
            },
            methods: {
                async getModules() {
                    await axios.get(`/admin/academy/modules/${this.courseId}`).then(response => {
                        const data = response.data.data

                        this.modules = data[0]?.modules

                    }).catch(error => {
                        console.log(error);
                    });
                },
                details(id) {
                    location.href = `/admin/academy/modules/details/${id}`
                },
                show(data) {
                    console.log(data);
                    this.name = data?.name

                    this.description = data?.description

                    this.edit = true;

                    this.moduleId = data?.id

                    offcanvasSignal.show();
                },
                async create() {
                    this.errors = {}

                    this.loading = true

                    const formData = {
                        name: this.name,
                        description: this.description,
                        academy_uuid: this.courseId
                    }

                    await axios.post("{{ route('admin.academy.modules.store') }}", formData).then(response => {
                        const data = response.data
                        this.modules.push(data.module)

                        this.clearForm();

                        offcanvasSignal.hide();

                        Notiflix.Notify.Success(data.message);

                    }).catch(error => {
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
                async update() {
                    this.errors = {}

                    this.loading = true

                    const formData = {
                        name: this.name,
                        description: this.description,
                        academy_uuid: this.courseId,
                        _method: "put"
                    }

                    await axios.post(`/admin/academy/modules/update/${this.moduleId}`, formData).then(
                        response => {
                            const data = response.data
                            this.getModules()

                            this.clearForm();

                            offcanvasSignal.hide();

                            Notiflix.Notify.Success(data.message);

                        }).catch(error => {
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
                handleCloseModal() {
                    this.clearForm()
                },
                clearForm() {
                    this.name = "";
                    this.description = "";
                    this.errors = {}
                },
                deleteModule(moduleId) {
                    Notiflix.Confirm.Show(
                        'Are you sure?',
                        'you want Delete Module.',
                        'Delete',
                        'Cancle',
                        function okCb() {
                            axios.delete(`/admin/academy/modules/delete/${moduleId}`)
                                .then(function(response) {
                                    if (response.data.success) {
                                        Notiflix.Notify.Success(response.data.message);

                                        // Remove the deleted schedule row from the table
                                        const tableRow = document.getElementById(
                                            `scheduleRow_${moduleId}`);
                                        if (tableRow) {
                                            tableRow.remove();
                                        }
                                    } else {
                                        Notiflix.Notify.Failure("Could not find Module");
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
    </script>
@endpush
