<div class="modal fade" id="createStrategy">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Create Strategy</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal">
                </button>
            </div>
            <div class="modal-body">
                <form action="">
                    <div class="mb-3">
                        <label for="">Strategy Name</label>
                        <input type="text" class="form-control" v-model="strategy_name" placeholder="Strategy Name">
                        <span v-if="errors.strategy_name" class="text-danger">@{{ errors.strategy_name[0] }}</span>
                    </div>
                    <div class="mb-3">
                        <label for="">Exchange</label>
                        <select v-model="exchange" class="form-control" @change="handleExchangeChange($event)">
                            <option value="">--select--exchange--</option>
                            <option v-for="exchange in exchanges" :key="exchange.id" :value="exchange.id">
                                @{{ exchange.name }}</option>
                        </select>
                        <span v-if="errors.exchange" class="text-danger">@{{ errors.exchange[0] }}</span>
                    </div>
                    <div class="mb-3">
                        <label for="">Minimum Amount</label>
                        <div class="input-group mb-3">
                            <span class="input-group-text">USDT</span>
                            <input type="number" step="any" v-model="minimum_amount" class="form-control">
                        </div>
                        <span v-if="errors.minimum_amount" class="text-danger">@{{ errors.minimum_amount[0] }}</span>
                    </div>
                    <div class="mb-3">
                        <label for="">Description</label>
                        <textarea v-model="description" id="" class="form-control" cols="10" rows="3"></textarea>
                        <span v-if="errors.description" class="text-danger">@{{ errors.description[0] }}</span>
                    </div>
                    <div class="mb-3">
                        <label for="formFile" class="form-label">Photo</label>
                        <input class="form-control" type="file" @change="handleFileUpload($event)" id="formFile">
                        <span v-if="errors.photo" class="text-danger">@{{ errors.photo[0] }}</span>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger light" data-bs-dismiss="modal">Close</button>
                <button type="button" :disabled="loading" @click.prevent="createStrategy" class="btn btn-primary">
                    <span v-if="loading" class="spinner-border spinner-border-sm" role="status"
                        aria-hidden="true"></span>
                    <span v-else>Submit</span>
                </button>
            </div>
        </div>
    </div>
</div>
