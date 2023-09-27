@extends('layouts.admin.app')

@section('title', 'Strategy')

@section('content')
    <div id="strategy">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="heading mb-0">Strategy Details</h2>

        </div>
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-xl-3 col-lg-6 col-md-6">
                        <!-- Tab panes -->
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel"
                                aria-labelledby="home-tab" tabindex="0">
                                <img class="img-fluid rounded  " src="{{ $strategy->image }}" alt="">
                            </div>
                        </div>
                    </div>
                    <!--Tab slider End-->
                    <div class="col-xl-9 col-lg-6 col-md-6 col-sm-12">
                        <div class="product-detail-content">
                            <!--Product details-->
                            <div class="new-arrival-content pr">
                                <h4 class="text-capitalize">{{ $strategy->strategy_name }}</h4>
                                <div class="d-table mb-2">
                                    <p>Miminum Amount</p>
                                    <p class="price float-start d-block">USDT
                                        {{ number_format($strategy->minimum_amount, 2, '.', ',') }}</p>
                                </div>
                                <p class="text-content">

                                    {{ $strategy->description }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">Trade Settings</h4>
                <a class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createTradeSettings">Create Trade
                    Settings</a>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-responsive-md">
                        <thead>
                            <tr>
                                <th><strong>Market</strong></th>
                                <th><strong>First Buy</strong></th>
                                <th><strong>Double Position</strong></th>
                                <th><strong>Profit Ratio</strong></th>
                                <th><strong>Profit Callback</strong></th>
                                <th><strong>Whole Ratio</strong></th>
                                <th><strong>Whole Stop</strong></th>
                                <th><strong>Margin Limit</strong></th>
                                <th><strong>Price Drop</strong></th>
                                <th><strong>M Ratio</strong></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody v-if="trade_settings.length > 0">
                            <tr v-for="settings in trade_settings" :key="settings.id">
                                <td>
                                    <div class="d-flex align-items-center">
                                        <img :src="settings.market.image" class="avatar rounded-circle" alt="">
                                        <p class="mb-0 ms-2">@{{ settings.market.name }}</p>
                                    </div>
                                </td>
                                <td><span class="d-flex justify-content-center">@{{ settings.first_buy_amount }}</span></td>
                                <td>
                                    <span class="d-flex justify-content-center">
                                        @{{ settings.double_position }}
                                    </span>
                                </td>
                                <td>
                                    <span class="d-flex justify-content-center">
                                        @{{ settings.profit_ratio }}
                                    </span>
                                </td>
                                <td>
                                    <span class="d-flex justify-content-center">
                                        @{{ settings.profit_callback }}
                                    </span>
                                </td>
                                <td>
                                    <span class="d-flex justify-content-center">
                                        @{{ settings.whole_ratio }}
                                    </span>
                                </td>
                                <td>
                                    <span class="d-flex justify-content-center">
                                        @{{ settings.whole_stop }}
                                    </span>
                                </td>
                                <td>
                                    <span class="d-flex justify-content-center">
                                        @{{ settings.margin_limit }}
                                    </span>
                                </td>
                                <td>
                                    <span class="d-flex justify-content-center">
                                        @{{ settings.price_drop }}
                                    </span>
                                </td>
                                <td>
                                    <span class="d-flex justify-content-center">
                                        @{{ settings.m_ratio }}
                                    </span>
                                </td>
                                <td>
                                    <div class="d-flex">
                                        <a href="#" class="btn btn-danger shadow btn-xs sharp"
                                            @click.prevent="deleteSettings(settings)"><i class="fa fa-trash"></i></a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="10" class="text-center">No Settings</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        @include('admin.strategy.modal._tradeSettingsModal')
    </div>
@endsection
@push('scripts')
    <script>
        const createSettingsModal = new bootstrap.Modal(document.getElementById('createTradeSettings'), {
            keyboard: false
        })

        const strategyDetails = new Vue({
            el: '#strategy',
            data: {
                markets: [],
                trade_settings: [],
                strategy_periods:[
                    {
                        value: "cycle",
                        name: 'Cycle'
                    },
                    {
                        value: "one short",
                        name: 'One Short'
                    }
                ]
                strategy: "{{ $strategy->uuid }}",
                market: "",
                first_buy: "",
                open_position_doubled: false,
                profit_ratio: "",
                whole_ratio: "",
                whole_stop: "",
                profit_callback: "",
                strategy_period:"",
                margin_limit: 1,
                price_drop: [],
                m_ratio: [],
                loading: false,
                errors: {}
            },
            computed: {
                fields() {
                    return Array.from({
                        length: this.margin_limit
                    }, (_, index) => {
                        return {
                            id: index + 1
                        };
                    });
                },
            },
            mounted() {
                this.getMarkets();
                this.getTradeSettings();
            },
            methods: {
                handleMarketChange(event) {
                    this.market = event.target.value;
                },
                getMarkets() {
                    axios.get("{{ route('admin.cyborg.markets.index') }}", {
                        params: {
                            exchange: "{{ $strategy->exchange->tag }}"
                        }
                    }).then(response => {
                        this.markets = response.data.markets;
                        // console.log(this.markets)
                    }).catch(error => {
                        console.log(error)
                    })
                },
                getTradeSettings() {
                    axios.get("{{ route('admin.cyborg.trade-settings.index') }}").then(response => {
                        this.trade_settings = response.data.trade_settings;
                    }).catch(error => {
                        console.log(error)
                    })
                },
                deleteSettings(settings) {

                    Notiflix.Confirm.Show(
                        'Are you sure?',
                        'you want Delete Trade Settings.',
                        'Delete',
                        'Cancle',
                        function okCb(){
                            axios.delete(`/admin/cyborg/trade-settings/${settings.id}`)
                                .then(function(response) {

                                    if (response.data.success) {
                                        Notiflix.Notify.Success(response.data.message);
                                        // Remove the deleted strategy from the table

                                        location.reload()

                                        // const index = this.strategies.findIndex(item => item.id === strategy
                                        //     .id);
                                        // if (index > -1) {
                                        //     this.strategies.splice(index, 1);
                                        // }
                                    } else {
                                        Notiflix.Notify.Failure("Could not find trade settings.");
                                    }
                                })
                                .catch(error => {
                                    console.log(error);
                                    Notiflix.Notify.Failure(
                                        "Error Occurred while trying to delete trade settings.");
                                })
                        }
                    );
                },
                createSettings() {

                    // Reset errors
                    this.errors = {};

                    this.loading = true

                    axios.post("{{ route('admin.cyborg.trade-settings.store') }}", {
                        market: this.market,
                        strategy: this.strategy,
                        first_buy: this.first_buy,
                        double_position: this.double_position,
                        profit_ratio: this.profit_ratio,
                        whole_ratio: this.whole_ratio,
                        whole_stop: this.whole_stop,
                        profit_callback: this.profit_callback,
                        margin_limit: this.margin_limit,
                        price_drop: this.price_drop,
                        m_ratio: this.m_ratio,
                    }).then(response => {

                        this.trade_settings.push(response.data.trade_settings)

                        this.market = "";
                        this.first_buy = ""
                        this.double_position = ""
                        this.profit_ratio = ""
                        this.price_ratio = ""
                        this.whole_ration = ""
                        this.whole_stop = ""
                        this.profit_callback = ""
                        this.margin_limit = ""
                        this.price_drop = ""
                        this.m_ration = ""

                        createSettingsModal.hide()

                        Notiflix.Notify.Success(response.data.message);

                    }).catch(error => {

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
                }
            }
        })
    </script>
@endpush
