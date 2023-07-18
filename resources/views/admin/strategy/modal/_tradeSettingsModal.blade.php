<div class="modal fade come-from-modal right" id="createTradeSettings" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-right modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Create Trade Settings</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal">
                </button>
            </div>
            <div class="modal-body">
                <form action="">
                    <div class="mb-3">
                        <label for="">Market</label>
                        <select v-model="market" class="form-control" @change="handleMarketChange($event)">
                            <option value="">--select--market--</option>
                            <option v-for="market in markets" :key="market.id" :value="market.id">
                                @{{ market.name }}</option>
                        </select>
                        <span v-if="errors.market" class="text-danger">@{{ errors.market[0] }}</span>
                    </div>
                    <div class="mb-3">
                        <label for="">First Buy</label>
                        <input type="number" step="any" class="form-control" v-model="first_buy"
                            placeholder="First Buy">
                        <span v-if="errors.first_buy" class="text-danger">@{{ errors.first_buy[0] }}</span>
                    </div>
                    <div class="mb-3">
                        <label for="">Double Position</label>
                        <input type="number" step="any" class="form-control" v-model="double_position"
                            placeholder="Double Position">
                        <span v-if="errors.double_position" class="text-danger">@{{ errors.double_position[0] }}</span>
                    </div>
                    <div class="row">
                        <div class="mb-3 col-lg-6">
                            <label for="">Profit Ratio</label>
                            <input type="number" step="any" class="form-control" v-model="profit_ratio"
                                placeholder="Profit Ratio">
                            <span v-if="errors.profit_ratio" class="text-danger">@{{ errors.profit_ratio[0] }}</span>
                        </div>
                        <div class="mb-3 col-lg-6">
                            <label for="">Profit Callback</label>
                            <input type="number" step="any" class="form-control" v-model="profit_callback"
                                placeholder="Profit Callback">
                            <span v-if="errors.profit_callback" class="text-danger">@{{ errors.profit_callback[0] }}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="mb-3 col-lg-6">
                            <label for="">Whole Ratio</label>
                            <input type="number" step="any" class="form-control" v-model="whole_ratio"
                                placeholder="Whole Ratio">
                            <span v-if="errors.whole_ratio" class="text-danger">@{{ errors.whole_ratio[0] }}</span>
                        </div>
                        <div class="mb-3 col-lg-6">
                            <label for="">Whole Stop</label>
                            <input type="number" step="any" class="form-control" v-model="whole_stop"
                                placeholder="Whole Stop">
                            <span v-if="errors.whole_stop" class="text-danger">@{{ errors.whole_stop[0] }}</span>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="">Margin Limit</label>
                        <input type="number" class="form-control" min="1" v-model="margin_limit"
                            placeholder="Margin Limit">
                        <span v-if="errors.margin_limit" class="text-danger">@{{ errors.margin_limit[0] }}</span>
                    </div>
                    <div class="mb-3">
                        <div class="row" v-for="(field, index) in fields" :key="field.id">
                            <div class="col-lg-6">
                                <label :for="field.id">Call @{{ field.id }}:</label>
                                <input :id="field.id" class="form-control" type="number" step="any"
                                    v-model="price_drop[index]">
                            </div>
                            <div class="col-lg-6">
                                <label :for="field.id">Ratio @{{ field.id }}:</label>
                                <input :id="field.id" class="form-control" type="number" step="any"
                                    v-model="m_ration[index]">
                            </div>
                        </div>
                    </div>
                    <button type="button" :disabled="loading" @click.prevent="createSettings"
                        class="btn btn-primary">
                        <span v-if="loading" class="spinner-border spinner-border-sm" role="status"
                            aria-hidden="true"></span>
                        <span v-else>Submit</span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
