@extends('layouts.admin.app')

@section('title', 'Adminitrators')

@section('content')
    <div id="educator">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="heading mb-0">Adminitrators Management</h2>
            <div class="d-flex align-items-center">
                <a class="btn btn-primary btn-sm me-2" data-bs-toggle="offcanvas" href="#offcanvasSignal" role="button"
                    aria-controls="offcanvasSignal">+Add Administrator</a>
            </div>
        </div>
        <template>
            <div class="card">
                <div class="card-body p-0">
                    <div class="active-projects task-table">
                        <div class="tbl-caption">
                            <h4 class="heading mb-0">Administrators</h4>
                        </div>
                        <div id="empoloyees-tbl3_wrapper" class="dataTables_wrapper no-footer">
                            <table class="table dataTable no-footer" role="grid" aria-describedby="empoloyees-tbl3_info">
                                <thead>
                                    <tr role="row">
                                        <th>User</th>
                                        <th>Email</th>
                                        <th>Roles</th>
                                        <th>
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody v-if="admins.length > 0">
                                    <tr role="row" class="odd" v-for="(admin,index) in admins"
                                        :key="index">
                                        <td>
                                            <div class="products">
                                                <img :src="admin.photo" class="avatar avatar-md" alt="">
                                                <div>
                                                    <h6><a href="#">@{{ admin.first_name }} @{{ admin.last_name }}</a>
                                                    </h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td><span class="text-center">@{{ admin.email }}</span></td>
                                        <td>
                                            <span v-for="(role, key) in admin.roles" :key="key"
                                                class="badge badge-info text-capitalize rounded">
                                                @{{ role?.name }}
                                            </span>
                                        </td>
                                        <td class="edit-action">
                                            <a href="#" class="icon-box icon-box-xs bg-primary me-1"
                                                @click.prevent="show(admin)">
                                                <i class="fa-solid fa-pencil text-white"></i>
                                            </a>
                                            <a href="#" @click.prevent="deleteSignal(admin)"
                                                class="icon-box icon-box-xs bg-danger  ms-1">
                                                <i class="fa-solid fa-trash text-white"></i>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="2">
                                            <span class="text-center text-warning">No administrator data</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
            @include('admin.administrators.createModal')
        </template>

    </div>
@endsection
@push('scripts')
    <script>
        const educator = new Vue({
            el: '#educator',
            data() {
                return {
                    admins: [],
                    loading: false,
                    errors: {},
                    first_name: "",
                    last_name: "",
                    email: "",
                    password: "",
                    photo: "",
                    status: [],
                    photo_preview: null,
                    roles: [],
                    roleList: [],
                    edit: false,
                    adminId: ""
                }
            },
            mounted() {
                this.getAdmins()
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
                    this.roles = []
                    this.edit = false
                    this.adminId = ""

                    this.photo_preview = null

                    this.$refs.fileInput.value = null;

                },
                handleCloseModal() {
                    this.clearForm()
                },
                async getAdmins() {
                    await axios.get("{{ route('admin.admins.all') }}").then(response => {
                        this.admins = response.data.admins
                        this.roleList = response.data.roles
                    }).catch(error => {
                        console.log(error);
                    })
                },
                show(admin) {
                    this.first_name = admin?.first_name
                    this.adminId = admin?.id
                    this.last_name = admin?.last_name
                    this.email = admin?.email
                    this.photo_preview = admin?.photo
                    this.roles = admin?.roles.map(item => item.id);

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
                    formData.append('roles', this.roles);

                    await axios.post("{{ route('admin.administrative.store') }}", formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(response => {

                            this.admins.push(response.data.admin);

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
                    formData.append('photo', this.photo);
                    formData.append('roles', this.roles);
                    formData.append('_method', 'put')

                    await axios.post(`/admin/administrative/${id}`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(response => {

                            this.getAdmins();

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
                deleteSignal(admin) {
                    const strat = this.admins
                    Notiflix.Confirm.Show(
                        'Are you sure?',
                        'you want Delete Administrator.',
                        'Delete',
                        'Cancle',
                        function okCb() {
                            axios.delete(`/admin/administrative/${admin.id}`)
                                .then(function(response) {
                                    if (response.data.success) {
                                        Notiflix.Notify.Success(response.data.message);
                                        // Remove the deleted strategy from the table

                                        location.reload();
                                    } else {
                                        Notiflix.Notify.Failure("Could not find Admin");
                                    }
                                })
                                .catch(error => {
                                    console.log(error);
                                    Notiflix.Notify.Failure(
                                        "Error Occurred while trying to delete admin.");
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
