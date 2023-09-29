@extends('layouts.admin.app')

@section('title', 'Signal Management')

@section('content')
    <div id="category">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="heading mb-0">Category Management</h2>
            <div class="d-flex align-items-center">
                <a class="btn btn-primary btn-sm me-2" data-bs-toggle="offcanvas" href="#offcanvasSignal" role="button"
                    aria-controls="offcanvasSignal">+ Create Category</a>
            </div>
        </div>

        <div class="card">
            <div class="card-body p-0">
                <div class="active-projects task-table">
                    <div class="tbl-caption">
                        <h4 class="heading mb-0">Categories</h4>
                    </div>
                    <div id="empoloyees-tbl3_wrapper" class="dataTables_wrapper no-footer">
                        <table class="table dataTable no-footer" role="grid" aria-describedby="empoloyees-tbl3_info">
                            <thead>
                                <tr role="row">
                                    <th>Category</th>
                                    <th>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody v-if="categories.length > 0">
                                <tr role="row" class="odd" v-for="(category,index) in categories"
                                    :key="index">
                                    <td>
                                        <div class="products">
                                            <img v-if="category?.photo" :src="category?.photo" class="avatar avatar-md"
                                                alt="">
                                            <div>
                                                <h6><a href="#">@{{ category?.name }}</a></h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="edit-action">
                                        <a href="#" @click.prevent="view(category)"
                                            class="icon-box icon-box-xs bg-primary me-1">
                                            <i class="fa-solid fa-pencil text-white"></i>
                                        </a>
                                        {{-- <a href="#" @click.prevent="delete(category)"
                                            class="icon-box icon-box-xs bg-danger  ms-1">
                                            <i class="fa-solid fa-trash text-white"></i>
                                        </a> --}}
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="4">
                                        <span class="text-center text-warning">No Categories Created</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
        @include('admin.category.categoryModal')
    </div>
@endsection
@push('scripts')
    <script>
        const strategy = new Vue({
            el: '#category',
            data() {
                return {
                    loading: false,
                    errors: {},
                    photo: "",
                    name: "",
                    catgoryId: "",
                    type: "",
                    categories: [],
                    edit: false,
                    photo_preview: null,
                    types: [
                        "news",
                        "trade"
                    ]
                }
            },
            mounted() {
                this.getCategories()
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
                view(category) {
                    this.photo_preview = category?.photo
                    this.name = category?.name

                    this.type = category?.type

                    this.edit = true

                    this.catgoryId = category?.id

                    offcanvasSignal.show()
                },
                handleCloseModal() {
                    this.clearForm();
                },
                async getCategories() {
                    await axios.get("{{ route('admin.category.all') }}").then(response => {
                        this.categories = response.data.categories

                        // console.log(response.data.categories)
                    }).catch(error => {
                        console.log(error);
                    })
                },
                async create() {
                    this.errors = {};

                    this.loading = true

                    let formData = new FormData();
                    formData.append('_token', '{{ csrf_token() }}');
                    formData.append('name', this.name);
                    formData.append('photo', this.photo);
                    formData.append('type', this.type);

                    await axios.post("{{ route('admin.category.store') }}", formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(response => {

                            this.categories.push(response.data.category);

                            this.clearForm();

                            offcanvasSignal.hide();

                            Notiflix.Notify.Success(response.data.message);
                        })
                        .catch(error => {

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
                async update(id) {
                    this.errors = {};

                    this.loading = true

                    let formData = new FormData();
                    formData.append('_token', '{{ csrf_token() }}');
                    formData.append('name', this.name);
                    formData.append('photo', this.photo);
                    formData.append('type', this.type);

                    await axios.post(`/admin/category/update/${id}`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(response => {

                            this.getCategories();

                            this.clearForm()
                            offcanvasSignal.hide();

                            Notiflix.Notify.Success(response.data.message);
                        })
                        .catch(error => {

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
                async removeImage(id) {
                    await axios.post(`/admin/category/remove-image/${id}`).then(response => {
                        this.photo_preview = null

                        this.$refs.fileInput.value = null;

                        this.getCategories();

                        Notiflix.Notify.Success(response.data.message);
                    }).catch(error => {
                        Notiflix.Notify.Failure(error.response.data.message)
                    })
                },
                clearForm() {
                    this.errors = {};
                    this.photo = "";
                    this.name = ""
                    this.photo_preview = ""
                    this.catgoryId = ""
                    this.edit = false
                    this.type = ""

                    this.$refs.fileInput.value = null;
                },
                delete(category) {
                    const strat = this.categories
                    Notiflix.Confirm.Show(
                        'Are you sure?',
                        'you want Delete Category.',
                        'Delete',
                        'Cancle',
                        function okCb() {
                            axios.delete(`/admin/category/${signal.id}`)
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
