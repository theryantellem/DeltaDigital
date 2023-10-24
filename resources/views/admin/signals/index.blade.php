@extends('layouts.admin.app')

@section('title', 'Signal Management')

@section('content')
    <div id="signal">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="heading mb-0">Signals Management</h2>
            @if (auth()->user()->can('create_signal'))
                <div class="d-flex align-items-center">
                    <a class="btn btn-primary btn-sm me-2" data-bs-toggle="offcanvas" href="#offcanvasSignal" role="button"
                        aria-controls="offcanvasSignal">+ Create Signal</a>
                </div>
            @endif
        </div>

        <div class="card">
            <div class="card-body p-0">
                <div class="active-projects task-table">
                    <div class="tbl-caption">
                        <h4 class="heading mb-0">Signals</h4>
                    </div>
                    <div id="empoloyees-tbl3_wrapper" class="dataTables_wrapper no-footer table-responsive">
                        <table class="table dataTable no-footer" role="grid" aria-describedby="empoloyees-tbl3_info">
                            <thead>
                                <tr role="row">
                                    <th>Asset</th>
                                    <th>Category</th>
                                    <th>Order Type</th>
                                    <th>Entry Price</th>
                                    <th>Stop Loss</th>
                                    <th>Target Price</th>
                                    <th>Comment</th>
                                    <th>Market Status</th>
                                    @if (Auth::user()->hasRole('educator'))
                                        <th>
                                            Action
                                        </th>
                                    @endif
                                </tr>
                            </thead>
                            <tbody v-if="signals.length > 0">
                                <tr role="row" class="odd" v-for="(signal,index) in signals" :key="index">
                                    <td>
                                        <div class="products" v-if="signal?.asset">
                                            <img :src="signal?.asset?.image" class="avatar avatar-md" alt="">
                                            <div>
                                                <h6><a href="#">@{{ signal?.asset?.name }}</a></h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span class="d-flex">@{{ signal?.category?.name }}</span></td>
                                    <td><span class="d-flex ">@{{ signal?.order_type }}</span></td>
                                    <td><span class="d-flex justify-content-center">@{{ signal?.entry_price }}</span></td>
                                    <td>
                                        <span class="d-flex justify-content-center">@{{ signal?.stop_loss }}</span>
                                    </td>
                                    <td>
                                        <span class="d-flex justify-content-center">@{{ signal?.target_price }}</span>
                                    </td>
                                    <td>
                                        @{{ signal?.caption }}
                                    </td>
                                    @if (Auth::user()->hasRole('educator'))
                                        <td>
                                            <select class="default-select status-select"
                                                @change="updateMarketStatus($event,signal.id)">
                                                <option v-for="(status,index) in marketStatus" :value="index"
                                                    :selected="index === signal?.status">
                                                    @{{ status }}</option>
                                            </select>
                                        </td>
                                        <td class="edit-action">
                                            <a href="#" @click.prevent="viewSignal(signal)"
                                                class="icon-box icon-box-xs bg-primary me-1">
                                                <i class="fa-solid fa-pencil text-white"></i>
                                            </a>
                                            <a href="#" @click.prevent="deleteSignal(signal)"
                                                class="icon-box icon-box-xs bg-danger  ms-1">
                                                <i class="fa-solid fa-trash text-white"></i>
                                            </a>
                                        </td>
                                    @else
                                        <td>
                                            <select class="default-select status-select" disabled>
                                                <option v-for="(status,index) in marketStatus" :value="index"
                                                    :selected="index === signal?.status">
                                                    @{{ status }}</option>
                                            </select>
                                        </td>
                                    @endif
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="5">
                                        <span class="text-center text-warning">No Signals Created</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
        @include('admin.signals.createSignalModal')
    </div>
@endsection
@push('scripts')
    <script>
        const strategy = new Vue({
            el: '#signal',
            data() {
                return {
                    signals: [],
                    loading: false,
                    errors: {},
                    photo: "",
                    chart_photo: "",
                    order_type: "",
                    entry_price: 0,
                    asset_type: 0,
                    stop_loss: 0,
                    target_price: 0,
                    comment: "",
                    assetsList: [],
                    category: "",
                    orderTypes: [],
                    marketStatus: [],
                    status: [],
                    assets: [],
                    categories: [],
                    edit: false,
                    signalId: "",
                    percentage: 0,
                    type: "",
                    chart_photo_preview: null,
                    photo_preview: null,
                    description: ""
                }
            },
            mounted() {
                this.getSignals()
            },
            methods: {
                filterAsset() {
                    this.assets = this.assetsList.filter(item => item.category.id === this.category)

                    const selectedOption = this.$el.querySelector('option[value="' + this.category + '"]');
                    this.type = selectedOption ? selectedOption.getAttribute('data-type') : '';
                },
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
                handleChartPhotoUpload(event) {
                    this.chart_photo = event.target.files[0];

                    if (this.chart_photo) {
                        // Read the selected image and create a preview URL
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            this.chart_photo_preview = e.target.result; // Set the preview URL
                        };
                        reader.readAsDataURL(this.chart_photo);
                    }
                },
                handleOrderType(event) {
                    this.order_type = event.target.value;
                },
                viewSignal(signal) {
                    this.chart_photo_preview = signal?.chart_photo
                    this.category = signal?.category?.id
                    this.type = signal?.category?.type
                    this.asset_type = signal?.asset?.id
                    this.order_type = signal?.order_type
                    this.entry_price = signal?.entry_price
                    this.stop_loss = signal?.stop_loss
                    this.target_price = signal?.target_price
                    this.comment = signal?.comment
                    this.description = signal?.comment
                    this.percentage = signal?.percentage

                    this.edit = true

                    this.signalId = signal?.id

                    this.filterAsset()

                    offcanvasSignal.show()
                },
                handleCloseModal() {
                    this.clearForm();
                },
                updateMarketStatus(event, signal) {
                    this.order_type = event.target.value;

                    axios.post("{{ route('admin.signals.market.status') }}", {
                        _token: '{{ csrf_token() }}',
                        market_status: event.target.value,
                        signal: signal
                    }).then(response => {
                        if (response.data.success) {
                            this.getSignals()
                            Notiflix.Notify.Success(response.data.message);
                        } else {
                            Notiflix.Notify.Failure(response.data.message);
                        }

                    }).catch(error => {
                        console.log(error);
                    })
                },
                updateStatus(event, signal) {

                    axios.post("{{ route('admin.signals.status') }}", {
                        _token: '{{ csrf_token() }}',
                        status: event.target.value,
                        signal: signal
                    }).then(response => {
                        if (response.data.success) {
                            this.getSignals()
                            Notiflix.Notify.Success(response.data.message);
                        } else {
                            Notiflix.Notify.Failure(response.data.message);
                        }

                    }).catch(error => {
                        console.log(error);
                    })
                },
                async getSignals() {
                    await axios.get("{{ route('admin.signals.all') }}").then(response => {
                        this.signals = response.data.signals;
                        this.orderTypes = response.data.order_type
                        this.marketStatus = response.data.market_status
                        this.status = response.data.status
                        this.assetsList = response.data.assets
                        this.categories = response.data.categories

                        // console.log(response.data.categories)
                    }).catch(error => {
                        console.log(error);
                    })
                },
                async createSignal() {
                    this.errors = {};

                    this.loading = true

                    let formData = new FormData();
                    formData.append('_token', '{{ csrf_token() }}');
                    formData.append('asset_type', this.asset_type);
                    formData.append('entry_price', this.entry_price);
                    formData.append('order_type', this.order_type);
                    formData.append('stop_loss', this.stop_loss);
                    formData.append('target_price', this.target_price);
                    formData.append('comment', this.comment);
                    formData.append('category', this.category);
                    formData.append('percentage', this.percentage);
                    // formData.append('photo', this.photo);
                    formData.append('photo', this.chart_photo);
                    formData.append('type', this.type);
                    formData.append('description', this.description);

                    await axios.post("{{ route('admin.signals.store') }}", formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(response => {

                            this.signals.push(response.data.signal);

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
                async updateSignal(signalId) {
                    this.errors = {};

                    this.loading = true

                    let formData = new FormData();
                    formData.append('_token', '{{ csrf_token() }}');
                    formData.append('asset_type', this.asset_type);
                    formData.append('entry_price', this.entry_price);
                    formData.append('order_type', this.order_type);
                    formData.append('stop_loss', this.stop_loss);
                    formData.append('target_price', this.target_price);
                    formData.append('comment', this.comment);
                    formData.append('category', this.category);
                    formData.append('percentage', this.percentage);
                    formData.append('photo', this.chart_photo);
                    formData.append('description', this.description);
                    formData.append('_method', 'put')

                    await axios.post(`/admin/signals/${signalId}`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(response => {

                            this.getSignals()

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
                clearForm() {
                    this.errors = {};
                    this.order_type = "";
                    this.asset_type = "";
                    this.entry_price = "";
                    this.stop_loss = "";
                    this.target_price = "";
                    this.comment = "";
                    this.photo = "";
                    this.chart_photo = ""
                    this.category = "";
                    this.percentage = "";
                    this.chart_photo_preview = ""
                    this.photo_preview = ""
                    this.signalId = ""
                    this.assets = []
                    this.type = ""
                    this.edit = false

                    this.$refs.fileInput.value = null;
                },
                deleteSignal(signal) {
                    const strat = this.signals
                    Notiflix.Confirm.Show(
                        'Are you sure?',
                        'you want Delete Signal.',
                        'Delete',
                        'Cancle',
                        function okCb() {
                            axios.delete(`/admin/signals/${signal.id}`)
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
