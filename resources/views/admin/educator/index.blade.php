@extends('layouts.admin.app')

@section('title', 'Educators Management')

@section('content')
    <div id="educator">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="heading mb-0">Educators Management</h2>
            <div class="d-flex align-items-center">
                <a class="btn btn-primary btn-sm me-2" data-bs-toggle="offcanvas" href="#offcanvasSignal" role="button"
                    aria-controls="offcanvasSignal">+Add Educator</a>
            </div>
        </div>
        <template>
            <div class="card">
                <div class="card-body p-0">
                    <div class="active-projects task-table">
                        <div class="tbl-caption">
                            <h4 class="heading mb-0">Educators</h4>
                        </div>
                        <div id="empoloyees-tbl3_wrapper" class="dataTables_wrapper no-footer">
                            <table class="table dataTable no-footer" role="grid" aria-describedby="empoloyees-tbl3_info">
                                <thead>
                                    <tr role="row">
                                        <th>User</th>
                                        <th>Email</th>
                                        <th>
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody v-if="educators.length > 0">
                                    <tr role="row" class="odd" v-for="(educator,index) in educators"
                                        :key="index">
                                        <td>
                                            <div class="products">
                                                <img :src="educator.photo" class="avatar avatar-md" alt="">
                                                <div>
                                                    <h6><a href="#">@{{ educator.first_name }} @{{ educator.last_name }}</a>
                                                    </h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td><span class="text-center">@{{ educator.email }}</span></td>
                                        <td class="edit-action">
                                            <a href="#" class="icon-box icon-box-xs bg-primary me-1"
                                                @click.prevent="show(educator)">
                                                <i class="fa-solid fa-pencil text-white"></i>
                                            </a>
                                            <a href="#" @click.prevent="deleteSignal(educator)"
                                                class="icon-box icon-box-xs bg-danger  ms-1">
                                                <i class="fa-solid fa-trash text-white"></i>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="1">
                                            <span class="text-center text-warning">No educator Created</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
            @include('admin.educator.createModal')
        </template>

    </div>
@endsection
@push('scripts')
    <script>
        const educator = new Vue({
            el: '#educator',
            data() {
                return {
                    educators: [],
                    loading: false,
                    errors: {},
                    first_name: "",
                    last_name: "",
                    email: "",
                    password: "",
                    photo: "",
                    status: [],
                    photo_preview: null,
                    categories: [],
                    categoryList: [],
                    edit: false,
                    educatorId: ""
                }
            },
            mounted() {
                this.getEducators()
            },
            methods: {
                handlePhotoUpload(event) {
                    this.photo = event.target.files[0];

                    if (this.photo) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            this.photo_preview = e.target.result; // Set the preview URL
                        };
                        reader.readAsDataURL(this.photo);
                    }
                },
                clearForm() {
                    this.errors = {}
                    this.first_name = "";
                    this.last_name = "";
                    this.email = "";
                    this.photo = "";
                    this.password = "";
                    this.categories = []
                    this.edit = false
                    this.educatorId = ""

                    this.photo_preview = null

                    this.$refs.fileInput.value = null;

                },
                handleCloseModal() {
                    this.clearForm()
                },
                async getEducators() {
                    await axios.get("{{ route('admin.educators.all') }}").then(response => {
                        this.educators = response.data.educators
                        this.categoryList = response.data.categories
                    }).catch(error => {
                        console.log(error);
                    })
                },
                show(educator) {
                    this.first_name = educator?.first_name
                    this.educatorId = educator?.id
                    this.last_name = educator?.last_name
                    this.email = educator?.email
                    this.photo_preview = educator?.photo
                    this.categories = educator?.categories.map(item => item.category.id);

                    this.edit = true

                    offcanvasSignal.show()
                },
                async createEducator() {
                    this.errors = {};

                    this.loading = true

                    let formData = new FormData();
                    formData.append('_token', '{{ csrf_token() }}');
                    formData.append('first_name', this.first_name);
                    formData.append('last_name', this.last_name);
                    formData.append('email', this.email);
                    formData.append('password', this.password);
                    formData.append('photo', this.photo);
                    formData.append('categories', this.categories);

                    await axios.post("{{ route('admin.educators.store') }}", formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(response => {

                            this.educators.push(response.data.educator);

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
                    formData.append('first_name', this.first_name);
                    formData.append('last_name', this.last_name);
                    formData.append('email', this.email);
                    // formData.append('password', this.password);
                    formData.append('photo', this.photo);
                    formData.append('categories', this.categories);
                    formData.append('_method', 'put')

                    await axios.post(`/admin/educators/${id}`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(response => {

                            this.getEducators();

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
                deleteSignal(signal) {
                    const strat = this.signals
                    Notiflix.Confirm.Show(
                        'Are you sure?',
                        'you want Delete Educator.',
                        'Delete',
                        'Cancle',
                        function okCb() {
                            axios.delete(`/admin/educators/${signal.id}`)
                                .then(function(response) {
                                    if (response.data.success) {
                                        Notiflix.Notify.Success(response.data.message);
                                        // Remove the deleted strategy from the table

                                        location.reload();
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

        $("#categoriesSelect").select2();
    </script>
@endpush
