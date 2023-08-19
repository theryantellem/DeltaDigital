import {createSlice, PayloadAction} from '@reduxjs/toolkit'


interface TaskInterface {
    index: number;
    id: string;
    type: 'error' | 'success' | 'info';
    body: string;
}

export interface DataState {
    amountToWithdrawBank: string | number
    amountToDeposit: string | number
    amountToSend: string | number
    saveAmountToWithdraw: string | number,
    hideBalance: boolean,
    hideSaveBalance: boolean,
    hideMissionBalance: boolean,
    featureBotAuto: {},
    tradeSetting: {
        firstbuy_amount: string,
        double_position: string,
        margin_limit: string
        profit_ratio: string,
        whole_ratio: string
        whole_stop: string,
        price_drop: string
        first_ratio: string,
        cycle: string,
        profit_callback: string
        one_shot: string,
        trade_type: string,
        exchange: string,
        market: string,
        direction: 'Long' | 'Short'
    },
    tradeSettingFutures: {
        firstbuy_amount: string,
        double_position: string,
        margin_limit: string
        profit_ratio: string,
        whole_ratio: string
        whole_stop: string,
        price_drop: string
        first_ratio: string,
        cycle: string,
        profit_callback: string
        one_shot: string,
        trade_type: string,
        exchange: string,
        market: string,
        direction: 'Long' | 'Short'
    }

    featureBotManualConfig: {
        amount: string,
        strategyPeriod: string,
        initialEntryAmount: string,
        numberOfEntry: string,

        riskPreference: 'Conservative' | 'Relaxed',
        leverage: string,
        tradeExitStrategy: string,
        tradeEntry: string,
        leastPrice: string,
        stopLoss: string


    },
    featuresBotData: {
        assetName: string,
        assetSymbol: string,
        direction: string,
        configType: string
    },
    notificationData: [TaskInterface]

}

const initialState: DataState = {

    hideMissionBalance: false,

    amountToWithdrawBank: '',
    amountToDeposit: '',
    amountToSend: '',
    saveAmountToWithdraw: '',
    hideBalance: false,
    hideSaveBalance: false,
    tradeSetting: {

        firstbuy_amount: '',
        double_position: '',
        margin_limit: '',
        profit_ratio: '',
        whole_ratio: '',
        whole_stop: '',
        price_drop: '',
        first_ratio: '',
        cycle: '',
        profit_callback: '',
        one_shot: '',
        trade_type: '0',
        exchange: '',
        market: '',
        direction: 'Long'
    },
    tradeSettingFutures: {
        firstbuy_amount: '',
        double_position: '',
        margin_limit: '',
        profit_ratio: '',
        whole_ratio: '',
        whole_stop: '',
        price_drop: '',
        first_ratio: '',
        cycle: '',
        profit_callback: '',
        one_shot: '',
        trade_type: '1',
        exchange: '',
        market:'',
        direction: 'Long'
    },

    featureBotAuto: {},
    featureBotManualConfig: {
        amount: '',
        strategyPeriod: '',
        initialEntryAmount: '',
        numberOfEntry: '',
        riskPreference: 'Conservative',
        leverage: '',
        tradeExitStrategy: '',
        tradeEntry: '',
        leastPrice: '',
        stopLoss: ''

    },
    featuresBotData: {
        assetName: '',
        assetSymbol: '',
        direction: '',
        configType: '',
    },
    notificationData: [].reverse()

}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {


        setAmountToWithdraw: (state, action) => {

            state.amountToWithdrawBank = action.payload.amountToWithdrawBank
        },

        setSaveAmountToWithdraw: (state, action) => {

            state.saveAmountToWithdraw = action.payload.saveAmountToWithdraw
        },
        setHideBalance: (state) => {
            state.hideBalance = !state.hideBalance
        },
        setHideMissionBalance: (state) => {
            state.hideMissionBalance = !state.hideMissionBalance
        },
        setHideSaveBalance: (state,) => {
            state.hideSaveBalance = !state.hideSaveBalance
        },

        setAmountToSend: (state, action) => {

            state.amountToSend = action.payload.amountToSend
        },
        setAmountToDeposit: (state, action) => {

            state.amountToDeposit = action.payload.amountToDeposit
        },
        decrement: (state) => {
            //  state.value -= 1
        },
        addNotificationItem: (state, action) => {
            state.notificationData = [action.payload, ...state.notificationData,]
        },
        clearNotification: (state) => {
            state.notificationData = []

        },

        removeSingleNotification: (state, action) => {
            state.notificationData = state.notificationData.filter((item: {
                index: any;
            }) => item.index !== action.payload.index)
        },

        removeNotificationItem: (state, action) => {
            //  const { index,id } = action.payload.notification;
            const newData = state.notificationData.filter((item, index) => index !== action.payload.notification.index);

            state.notificationData = newData

        },
        updateFeatureBotData: (state, action) => {


            state.featuresBotData = {...state.featuresBotData, ...action.payload}
        },

        clearFeatureBotData: (state) => {


            state.featuresBotData = {
                assetName: '',
                assetSymbol: '',
                direction: '',
                configType: '',
            }
        },

        updateBotManualConfig: (state, action) => {
            state.featureBotManualConfig = {...state.featureBotManualConfig, ...action.payload}
        },

        updateBot: (state, action) => {
            state.tradeSetting = {...state.tradeSetting, ...action.payload}
        },
        updateFuturesBot: (state, action) => {
            state.tradeSettingFutures = {...state.tradeSettingFutures, ...action.payload}
        },

        cleanData: () => initialState

    },
})

// Action creators are generated for each case reducer function
export const {
    updateBotManualConfig,
    cleanData,
    clearFeatureBotData,
    setHideBalance,
    updateFeatureBotData,
    setHideMissionBalance,
    setSaveAmountToWithdraw,
    setAmountToWithdraw,
    setAmountToSend,
    updateBot,
    updateFuturesBot,
    setAmountToDeposit,
    addNotificationItem,
    removeSingleNotification,
    removeNotificationItem,
    clearNotification
} = dataSlice.actions

export default dataSlice.reducer
