import * as SecureStore from 'expo-secure-store';
import {BASE_ULR_AUTH, LIVE_PROD_URL} from "@env";


export const loginUser = async (userdata: any) => {
    const myHeaders = {
        "Content-Type": 'multipart/form-data'
    }
    let timeoutId: NodeJS.Timeout

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: userdata,
    };

    return Promise.race([
        fetch(`${LIVE_PROD_URL}/login`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}
export const getUser = async (userId: string) => {
    let Token = await SecureStore.getItemAsync('delta-signal-token');
    const myHeaders = {
        'Content-Type': 'application/json',
        "TOKEN": Token,
        "ID": userId
    }
    //  "TOKEN", "2|KOg6Xv9IHSqMTPoZyyXKyTd7R99QAwKcthWTf5pl"
    let timeoutId: NodeJS.Timeout

    const requestOptions = {
        method: 'POST',
        headers: myHeaders

    };

    return Promise.race([
        fetch(`${LIVE_PROD_URL}/profile?userId=${userId}`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}
export const getRewardDetails = async (userId: string) => {
    let Token = await SecureStore.getItemAsync('delta-signal-token');
    const myHeaders = {
        "TOKEN": Token,
        "ID": userId
    }
    let timeoutId: NodeJS.Timeout

    const requestOptions = {
        method: 'POST',
        headers: myHeaders

    };

    return Promise.race([
        fetch(`${LIVE_PROD_URL}/Rewarddetails`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}
export const getUserNews = async (userId: string) => {

    let timeoutId: NodeJS.Timeout

    const requestOptions = {
        method: 'GET',


    };

    return Promise.race([
        fetch(`${LIVE_PROD_URL}/news?userId=${userId}`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}


export const getRevenues = async (userId: string) => {


    let Token = await SecureStore.getItemAsync('delta-signal-token');
    const myHeaders = {
        "TOKEN": Token,
        "ID": userId
    }
    let timeoutId: NodeJS.Timeout

    const requestOptions = {
        method: 'GET',
        headers: myHeaders

    };

    return Promise.race([
        fetch(`${LIVE_PROD_URL}/team`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}
export const getDepositAddress = async (userId: string) => {

    let timeoutId: NodeJS.Timeout

    const requestOptions = {
        method: 'GET',


    };

    return Promise.race([
        fetch(`${LIVE_PROD_URL}/depositaddress?userId=${userId}`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}
export const getCircleleaderboard = async (userId: string) => {

    let timeoutId: NodeJS.Timeout

    const requestOptions = {
        method: 'GET',


    };

    return Promise.race([
        fetch(`${LIVE_PROD_URL}/circleleaderboard`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}
export const getLeaderboard = async (userId: string) => {
    let Token = await SecureStore.getItemAsync('delta-signal-token');

    const myHeaders = {
        "TOKEN": Token,
        "ID": userId
    }
    let timeoutId: NodeJS.Timeout

    const requestOptions = {
        method: 'POST',
        headers: myHeaders

    };

    return Promise.race([
        fetch(`${LIVE_PROD_URL}/leaderboard`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}






export const transferAsset = async ({body,userId}:{body: any, userId: string}) => {

    let Token = await SecureStore.getItemAsync('delta-signal-token');
    const myHeaders = {
        "Content-Type": 'multipart/form-data',
        "TOKEN": Token,
        "ID": userId
    }
    let timeoutId: NodeJS.Timeout

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body
    };

    return Promise.race([
        fetch(`${LIVE_PROD_URL}/transfer`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}