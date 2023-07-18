@extends('layouts.admin.app')

@section('title', 'Strategy')

@section('content')
    <div id="strategy">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="heading mb-0">Strategies</h2>
            <div class="d-flex align-items-center">
                <a href="#" data-bs-toggle="modal" data-bs-target="#createStrategy"
                    class="btn btn-primary btn-sm ms-2">Create Strategy</a>
            </div>
        </div>
        <div class="card dz-card">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-responsive-md">
                        <thead>
                            <tr>
                                <th><strong>Name</strong></th>
                                <th><strong>Exchange</strong></th>
                                <th><strong>Minimum Amount</strong></th>
                                <th><strong>Description</strong></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody v-if="strategies.length > 0">
                            <tr v-for="strategy in strategies" :key="strategy.id">
                                <td>
                                    <div class="d-flex align-items-center">
                                        <img :src="strategy.image" class="avatar rounded-circle" alt="">
                                        <p class="mb-0 ms-2">@{{ strategy.strategy_name }}</p>
                                    </div>
                                </td>
                                <td>@{{ strategy.exchange.name }}</td>
                                <td>@{{ strategy.formated_amount }}</td>
                                <td>@{{ strategy.description }}</td>
                                <td>
                                    <div class="d-flex">
                                        <a href="#" @click="show(strategy.id)"
                                            class="btn btn-primary shadow btn-xs sharp me-1"><i
                                                class="fa fa-pencil"></i></a>
                                        <a href="#" class="btn btn-danger shadow btn-xs sharp"
                                            @click.prevent="deleteStrategy(strategy)"><i class="fa fa-trash"></i></a>
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="5" class="text-center">No Strategies</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        @include('admin.strategy.modal._createStrategyModal')
    </div>
@endsection
@push('scripts')
    <script>
        const strategy = new Vue({
            el: '#strategy',
            data() {
                return {
                    strategies: [],
                    exchanges: [],
                    strategy_name: "",
                    exchange: "",
                    minimum_amount: "",
                    description: "",
                    photo: "",
                    loading: false,
                    errors: {},
                }
            },
            mounted() {
                this.getStrategies();
                this.getExchanges();
            },
            methods: {
                handleExchangeChange(event) {
                    this.exchange = event.target.value;
                },
                handleFileUpload(event) {
                    this.photo = event.target.files[0];
                },
                getStrategies() {
                    axios.get("{{ route('admin.cyborg.strategies.all') }}")
                        .then(response => {
                            this.strategies = response.data.data;
                        })
                        .catch(error => {
                            console.log(error);
                        })
                },
                getExchanges() {
                    axios.get("{{ route('admin.cyborg.exchange.all') }}")
                        .then(response => {
                            this.exchanges = response.data.data;
                        })
                        .catch(error => {
                            console.log(error);
                        })
                },
                createStrategy() {
                    // Reset errors
                    this.errors = {};

                    this.loading = true

                    let formData = new FormData();
                    formData.append('_token', '{{ csrf_token() }}');
                    formData.append('strategy_name', this.strategy_name);
                    formData.append('exchange', this.exchange);
                    formData.append('minimum_amount', this.minimum_amount);
                    formData.append('description', this.description);
                    formData.append('photo', this.photo);

                    axios.post("{{ route('admin.cyborg.strategy.store') }}", formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(response => {

                            this.strategies.push(response.data.strategy);

                            this.strategy_name = "";
                            this.exchange = "";
                            this.minimum_amount = "";
                            this.description = "";
                            this.photo = "";

                            createStrategyModal.hide()

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
                show(strategy) {
                    let $url = "{{ route('admin.cyborg.strategy.show', [':strategy']) }}"
                    $url = $url.replace(':strategy', strategy)

                    window.location.href = $url
                },
                deleteStrategy(strategy) {
                    const strat = this.strategies
                    Notiflix.Confirm.Show(
                        'Are you sure?',
                        'you want Delete Strategy.',
                        'Delete',
                        'Cancle',
                        function okCb() {
                            axios.delete(`/admin/cyborg/strategy/${strategy.id}`)
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

        var createStrategyModal = new bootstrap.Modal(document.getElementById('createStrategy'), {
            keyboard: false
        })
    </script>
@endpush
