<div class="offcanvas offcanvas-end customeoff" tabindex="-1" id="offcanvasSignal">
    <div class="offcanvas-header">
        <h5 class="modal-title" id="#gridSystemModal">Create Signal</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" @click.prevent="handleCloseModal">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
    <div class="offcanvas-body">
        <div class="container-fluid">
            <form>
                <div class="row">
                    <div class="col-xl-12 mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Category<span
                                class="text-danger">*</span></label>
                        <select v-model="category" class="form-control">
                            <option value="">--select--category--</option>
                            <option v-for="(category,index) in categories" :key="index"
                                :value="category?.category?.id">
                                <span class="text-capitalize"> @{{ category?.category?.name }}</span>
                            </option>
                        </select>
                        <span v-if="errors?.category" class="text-danger">@{{ errors?.category[0] }}</span>
                    </div>
                    <div class="col-xl-12 mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Asset<span
                                class="text-danger">*</span></label>
                        <select v-model="asset_type" class="form-control">
                            <option value="">--select--asset--</option>
                            <option v-for="(asset,index) in assets" :key="index" :value="asset.id">
                                @{{ asset.name }} - <span class="text-uppercase">@{{ asset.symbol }}</span>
                            </option>
                        </select>
                        <span v-if="errors.asset_type" class="text-danger">@{{ errors.asset_type[0] }}</span>
                    </div>
                    <div class="col-xl-6 mb-3">
                        <label for="exampleFormControlInput2" class="form-label">Order Type<span
                                class="text-danger">*</span></label>
                        <select v-model="order_type" class="form-control" @change="handleOrderType($event)">
                            <option value="">--select--order--type--</option>
                            <option v-for="(orderType,index) in orderTypes" :key="index"
                                :value="index">
                                @{{ orderType }}</option>
                        </select>
                        <span v-if="errors.order_type" class="text-danger">@{{ errors.order_type[0] }}</span>
                    </div>
                    <div class="col-xl-6 mb-3">
                        <label for="exampleFormControlInput3" class="form-label">Entry Price<span
                                class="text-danger">*</span></label>
                        <input type="number" step="any" v-model="entry_price" class="form-control"
                            id="exampleFormControlInput3" placeholder="">
                        <span v-if="errors.entry_price" class="text-danger">@{{ errors.entry_price[0] }}</span>
                    </div>
                    <div class="col-xl-6 mb-3">
                        <label for="exampleFormControlInput3" class="form-label">Stop Loss<span
                                class="text-danger">*</span></label>
                        <input type="number" step="any" v-model="stop_loss" class="form-control"
                            id="exampleFormControlInput3" placeholder="">
                        <span v-if="errors.stop_loss" class="text-danger">@{{ errors.stop_loss[0] }}</span>
                    </div>
                    <div class="col-xl-6 mb-3">
                        <label for="exampleFormControlInput3" class="form-label">Target Price<span
                                class="text-danger">*</span></label>
                        <input type="number" step="any" v-model="target_price" class="form-control"
                            id="exampleFormControlInput3" placeholder="">
                        <span v-if="errors?.target_price" class="text-danger">@{{ errors?.target_price[0] }}</span>
                    </div>
                    <div class="col-xl-12 mb-3">
                        <label for="exampleFormControlInput3" class="form-label">Percentage (%)<span
                                class="text-danger"></span></label>
                        <input type="number" step="any" v-model="percentage" class="form-control"
                            id="exampleFormControlInput3" placeholder="">
                        <span v-if="errors?.percentage" class="text-danger">@{{ errors?.percentage[0] }}</span>
                    </div>
                    <div class="col-xl-12 mb-3">
                        <label class="form-label">Comment<span class="text-danger">*</span></label>
                        <textarea rows="2" v-model="comment" class="form-control"></textarea>
                        <span v-if="errors.comment" class="text-danger">@{{ errors.comment[0] }}</span>
                    </div>
                    {{-- <div class="col-lg-6 mb-3">
                        <label>Photo</label>
                        <div class="d-flex justify-content-center mb-3">
                            <svg v-if="!photo_preview" width="41" height="200" viewbox="0 0 41 40" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M27.1666 26.6667L20.4999 20L13.8333 26.6667" stroke="#DADADA"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M20.5 20V35" stroke="#DADADA" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                                <path
                                    d="M34.4833 30.6501C36.1088 29.7638 37.393 28.3615 38.1331 26.6644C38.8731 24.9673 39.027 23.0721 38.5703 21.2779C38.1136 19.4836 37.0724 17.8926 35.6111 16.7558C34.1497 15.619 32.3514 15.0013 30.4999 15.0001H28.3999C27.8955 13.0488 26.9552 11.2373 25.6498 9.70171C24.3445 8.16614 22.708 6.94647 20.8634 6.1344C19.0189 5.32233 17.0142 4.93899 15.0001 5.01319C12.9861 5.0874 11.015 5.61722 9.23523 6.56283C7.45541 7.50844 5.91312 8.84523 4.7243 10.4727C3.53549 12.1002 2.73108 13.9759 2.37157 15.959C2.01205 17.9421 2.10678 19.9809 2.64862 21.9222C3.19047 23.8634 4.16534 25.6565 5.49994 27.1667"
                                    stroke="#DADADA" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                </path>
                                <path d="M27.1666 26.6667L20.4999 20L13.8333 26.6667" stroke="#DADADA"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                            <img v-else :src="photo_preview" alt="Chart Preview"
                                style="max-width: 100%; max-height: 200px; height: 200px">
                        </div>
                        <input class="form-control form-control-sm" @change="handlePhotoUpload($event)"
                            id="formFileSm" type="file">
                        <span v-if="errors.photo" class="text-danger">@{{ errors.photo[0] }}</span>
                    </div> --}}
                    <div class="col-lg-12 mb-3">
                        <label>Chart Photo</label>
                        <div class="d-flex justify-content-center mb-3">
                            <svg v-if="!chart_photo_preview" width="41" height="200" viewbox="0 0 41 40"
                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M27.1666 26.6667L20.4999 20L13.8333 26.6667" stroke="#DADADA"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M20.5 20V35" stroke="#DADADA" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                                <path
                                    d="M34.4833 30.6501C36.1088 29.7638 37.393 28.3615 38.1331 26.6644C38.8731 24.9673 39.027 23.0721 38.5703 21.2779C38.1136 19.4836 37.0724 17.8926 35.6111 16.7558C34.1497 15.619 32.3514 15.0013 30.4999 15.0001H28.3999C27.8955 13.0488 26.9552 11.2373 25.6498 9.70171C24.3445 8.16614 22.708 6.94647 20.8634 6.1344C19.0189 5.32233 17.0142 4.93899 15.0001 5.01319C12.9861 5.0874 11.015 5.61722 9.23523 6.56283C7.45541 7.50844 5.91312 8.84523 4.7243 10.4727C3.53549 12.1002 2.73108 13.9759 2.37157 15.959C2.01205 17.9421 2.10678 19.9809 2.64862 21.9222C3.19047 23.8634 4.16534 25.6565 5.49994 27.1667"
                                    stroke="#DADADA" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                </path>
                                <path d="M27.1666 26.6667L20.4999 20L13.8333 26.6667" stroke="#DADADA"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                            <img v-else :src="chart_photo_preview" alt="Chart Preview"
                                style="max-width: 100%; max-height: 200px; height: 200px">
                        </div>
                        <input class="form-control form-control-sm" @change="handleChartPhotoUpload($event)"
                            id="formFileSm" type="file">
                        <span v-if="errors.chart_photo" class="text-danger">@{{ errors.chart_photo[0] }}</span>
                    </div>
                </div>

                <div v-if="edit">
                    <button :disabled="loading" @click.prevent="updateSignal(signalId)"
                        class="btn btn-primary me-1">
                        <span v-if="loading" class="spinner-border spinner-border-sm" role="status"
                            aria-hidden="true"></span>
                        <span v-else>Update</span>
                    </button>
                </div>
                <div v-else>
                    <button :disabled="loading" @click.prevent="createSignal" class="btn btn-primary me-1">
                        <span v-if="loading" class="spinner-border spinner-border-sm" role="status"
                            aria-hidden="true"></span>
                        <span v-else>Submit</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
