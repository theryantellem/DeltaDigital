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
                                            {{-- <a href="#" class="icon-box icon-box-xs bg-primary me-1">
                                                <i class="fa-solid fa-pencil text-white"></i>
                                            </a> --}}
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
                    photo: "",
                    status: [],
                    photo_preview: null
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
                handleCloseModal() {
                    this.first_name = "";
                    this.last_name = "";
                    this.email = "";
                    this.photo = "";
                },
                getEducators() {
                    axios.get("{{ route('admin.educators.all') }}").then(response => {
                        this.educators = response.data.educators
                    }).catch(error => {
                        console.log(error);
                    })
                },
                createEducator() {
                    this.errors = {};

                    this.loading = true

                    let formData = new FormData();
                    formData.append('_token', '{{ csrf_token() }}');
                    formData.append('first_name', this.first_name);
                    formData.append('last_name', this.last_name);
                    formData.append('email', this.email);
                    formData.append('photo', this.photo);

                    axios.post("{{ route('admin.educators.store') }}", formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(response => {

                            this.educators.push(response.data.educator);

                            this.email = "";
                            this.first_name = "";
                            this.last_name = "";
                            this.photo = "";

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
                                Notiflix.Notify.Failure(error.response.data.message)
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
    </script>
@endpush
