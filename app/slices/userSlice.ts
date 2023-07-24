import {createSlice, PayloadAction} from '@reduxjs/toolkit'


export interface UserState {
    isAuthenticated: boolean;
    userIsIn: boolean;
    responseState: boolean,
    responseMessage: string,
    responseType: 'error' | 'success' | 'none' | 'info',
    userToken: string,
    lockUser: boolean,
    lastUserActive: number | string,


    userData: {
        "id": string,
        name: string,
        email: string,
        username: string,
        profile_picture: string,
        plan: string,
        expiry_time: number,
        referallinks: {
            left_link: string,
            right_link: string
        },
        role: string,
        iseligible: number
    }
}

const initialState: UserState = {
    isAuthenticated: false,
    userIsIn: false,
    responseState: false,
    responseMessage: '',
    responseType: 'none',
    userToken: '',
    lockUser: false,
    lastUserActive: 0,



    userData: {
        id: "",
        name: "",
        email: "",
        username: "",
        profile_picture: "",
        plan: "",
        expiry_time: 0,
        referallinks: {
            left_link: "",
            right_link: ""
        },
        role: "",
        iseligible: 1
    },

}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {


        updateUserInfo: (state, action: PayloadAction<UserState['userData']>) => {
            state.userData = action.payload

        },

        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated

        },
        letUserIn: (state, action) => {
            state.userIsIn = action.payload.userIsIn
        },
        setUserLastSession: (state, action) => {
            state.lastUserActive = action.payload.lastUserActive
        },
        setLockUser: (state, action) => {
            state.lockUser = action.payload.lockUser
        },

        setResponse: (state, action) => {
            state.responseState = action.payload.responseState
            state.responseType = action.payload.responseType
            state.responseMessage = action.payload.responseMessage
        },
        unSetResponse: (state) => {
            state.responseState = false
            state.responseType = 'none'
            state.responseMessage = ''
        },
        logoutUser: () => {

            return initialState


        }

    },
})

// Action creators are generated for each case reducer function
export const {
    logoutUser,
    setLockUser,
    setUserLastSession,
    letUserIn,
    unSetResponse,
    updateUserInfo,
    setResponse,
    setAuthenticated
} = userSlice.actions

export default userSlice.reducer
