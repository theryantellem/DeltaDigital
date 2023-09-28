@extends('layouts.admin.app')

@section('title', 'Assets Management')

@section('content')
    <div id="signal">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="heading mb-0">Assets Management</h2>
            <div class="d-flex align-items-center">
                <a class="btn btn-primary btn-sm me-2" data-bs-toggle="offcanvas" href="#offcanvasSignal" role="button"
                    aria-controls="offcanvasSignal">+ Create Asset</a>
            </div>
        </div>

        <div class="card">
            <div class="card-body p-0">
                <div class="active-projects task-table">
                    <div class="tbl-caption">
                        <h4 class="heading mb-0">Assets</h4>
                    </div>
                    <div id="empoloyees-tbl3_wrapper" class="dataTables_wrapper no-footer">
                        <table class="table dataTable no-footer" role="grid" aria-describedby="empoloyees-tbl3_info">
                            <thead>
                                <tr role="row">
                                    <th>Asset</th>
                                    <th>Symbol</th>
                                    <th>Category</th>
                                    <th>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody v-if="assets.length > 0">
                                <tr role="row" class="odd" v-for="(asset,index) in assets" :key="index">
                                    <td>
                                        <div class="products">
                                            <img :src="asset?.image" class="avatar avatar-md" alt="">
                                            <div>
                                                <h6><a href="#">@{{ asset?.name }}</a></h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span class="">@{{ asset?.symbol }}</span></td>
                                    <td><span class="">@{{ asset?.category?.name }}</span></td>
                                    <td class="edit-action">
                                        <a href="#" @click.prevent="view(asset)"
                                            class="icon-box icon-box-xs bg-primary me-1">
                                            <i class="fa-solid fa-pencil text-white"></i>
                                        </a>
                                        {{-- <a href="#" @click.prevent="deleteSignal(signal)"
                                            class="icon-box icon-box-xs bg-danger  ms-1">
                                            <i class="fa-solid fa-trash text-white"></i>
                                        </a> --}}
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="4">
                                        <span class="text-center text-warning">No Asset Created</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
        @include('admin.asset.createAssetModal')
    </div>
@endsection
@push('scripts')
    <script>
        const strategy = new Vue({
            el: '#signal',
            data() {
                return {
                    assets: [],
                    loading: false,
                    errors: {},
                    photo: "",
                    asset_name: "",
                    symbol: "",
                    category: "",
                    categories: [],
                    edit: false,
                    assetId: "",
                    photo_preview: null
                }
            },
            mounted() {
                this.getAssets()
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
                view(data) {
                    this.photo_preview = data?.image
                    this.category = data?.category?.id
                    this.asset_name = data?.name
                    this.symbol = data?.symbol

                    this.edit = true

                    this.assetId = data?.id

                    offcanvasSignal.show()
                },
                handleCloseModal() {
                    this.clearForm();
                },
                async getAssets() {
                    await axios.get("{{ route('admin.assets.all') }}").then(response => {
                        this.assets = response.data.assets
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
                    formData.append('asset_name', this.asset_name);
                    formData.append('symbol', this.symbol);
                    formData.append('category', this.category);
                    formData.append('photo', this.photo);

                    await axios.post("{{ route('admin.assets.store') }}", formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(response => {

                            this.assets.push(response.data.asset);

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
                    formData.append('asset_name', this.asset_name);
                    formData.append('symbol', this.symbol);
                    formData.append('category', this.category);
                    formData.append('photo', this.photo);

                    await axios.post(`/admin/assets/update/${id}`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(response => {

                            this.getAssets()

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
                                Notiflix.Notify.Failure("Service unavailable.")
                                // Handle other types of errors, if needed
                            }

                        }).finally(() => {
                            this.loading = false;
                        })
                },
                clearForm() {
                    this.errors = {};
                    this.asset_name = "";
                    this.symbol = "";
                    this.photo = "";
                    this.category = "";
                    this.photo_preview = ""

                    this.edit = false

                    this.$refs.fileInput.value = null;
                },
                delete(data) {
                    const strat = this.assets
                    Notiflix.Confirm.Show(
                        'Are you sure?',
                        'you want Delete Signal.',
                        'Delete',
                        'Cancle',
                        function okCb() {
                            axios.delete(`/admin/assets/${data.id}`)
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
