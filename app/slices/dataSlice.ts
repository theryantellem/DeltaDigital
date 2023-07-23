import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {UserState} from "./userSlice";

export interface DataState {
    amountToWithdrawBank: string | number
    amountToDeposit: string | number
    amountToSend: string | number
    saveAmountToWithdraw: string | number,
    hideBalance: boolean,
    hideSaveBalance: boolean,
    hideMissionBalance: boolean,





}

const initialState: DataState = {

    hideMissionBalance:false,

    amountToWithdrawBank: '',
    amountToDeposit: '',
    amountToSend: '',
    saveAmountToWithdraw: '',
    hideBalance: false,
    hideSaveBalance: false,


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

} = dataSlice.actions

export default dataSlice.reducer
