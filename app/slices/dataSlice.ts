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

    notificationData: [

    ].reverse()

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
            state.notificationData = state.notificationData.filter((item: { index: any; }) => item.index !== action.payload.index)
        },

        removeNotificationItem: (state, action) => {
          //  const { index,id } = action.payload.notification;
            const newData=  state.notificationData.filter((item,index) => index !== action.payload.notification.index);

          state.notificationData = newData

        },
        cleanData: () => initialState

    },
})

// Action creators are generated for each case reducer function
export const {

    cleanData,

    setHideBalance,

    setHideMissionBalance,
    setSaveAmountToWithdraw,
    setAmountToWithdraw,
    setAmountToSend,
    setAmountToDeposit,
    addNotificationItem,
    removeSingleNotification,
    removeNotificationItem,
    clearNotification
} = dataSlice.actions

export default dataSlice.reducer