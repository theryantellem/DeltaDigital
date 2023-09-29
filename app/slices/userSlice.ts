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

    "User_Details":
        {
            id: string,
            image: string,
            username: string,
            Email: string,
            Subscribed: string,
            plan: string,
            "phone no": string,
            role: string,
            country: string,
            expires: string,
            "referred by": string,
            "referral left link": string,
            "referral right link": string,
            binancebind: string,
            kucoinbind: string,
            coinbaseprobind: string,
            krakenbind: string,
            binanceapi: string,
            kucoinapi: string,
            coinbaseproapi: string,
            krakenapi: string,
            binancescret: string,
            kucoinsecret: string,
            coinbaseprosecret: string,
            krakensecret: string,
            "api group": string
        }


    userData: {
        "id": string,
        name: string,
        email: string,
        user_id: string,
        username: string,
        profile_picture: string,
        plan: string,
        expiry_time: number,
        referallinks: {
            left_link: string,
            right_link: string
        },
        role: string,
        iseligible: number,
        cyborg: boolean,
        signal: boolean,
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
        user_id: "",
        profile_picture: "",
        plan: "",
        expiry_time: 0,
        referallinks: {
            left_link: "",
            right_link: ""
        },
        role: "",
        iseligible: 1,
        cyborg: false,
        signal: false,
    },
    User_Details:
        {
            "id": "",
            "image": "",
            "username": "",
            "Email": "",
            "Subscribed": "1",
            "plan": "",
            "phone no": "",
            "role": "",
            "country": "",
            "expires": "",
            "referred by": "",
            "referral left link": "",
            "referral right link": "",
            "binancebind": "",
            "kucoinbind": "",
            "coinbaseprobind": "",
            "krakenbind": "",
            "binanceapi": "",
            "kucoinapi": "",
            "coinbaseproapi": "",
            "krakenapi": "",
            "binancescret": "",
            "kucoinsecret": "",
            "coinbaseprosecret": "",
            "krakensecret": "",
            "api group": ""
        }


}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {


        updateUserInfo: (state, action: PayloadAction<UserState['userData']>) => {
            state.userData = action.payload

        },
        updateUserDetails: (state, action: PayloadAction<UserState['User_Details']>) => {
            state.User_Details = action.payload

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
    setAuthenticated,
    updateUserDetails,
} = userSlice.actions

export default userSlice.reducer
