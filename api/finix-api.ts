import * as SecureStore from 'expo-secure-store';
import {BASE_ULR_NEW, LIVE_PROD_URL} from "@env";


//


export const getSignals = async () => {


    let Token = await SecureStore.getItemAsync('delta-signal-token');
    const myHeaders = {
        "Authorization": `Bearer ${Token}`,

    }
    let timeoutId: NodeJS.Timeout

    const requestOptions = {
        method: 'GET',
        headers: myHeaders

    };

    return Promise.race([
        fetch(`${BASE_ULR_NEW}/signals`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}
export const viewSignal = async (id:string) => {


    let Token = await SecureStore.getItemAsync('delta-signal-token');
    const myHeaders = {
        "Authorization": `Bearer ${Token}`,

    }
    let timeoutId: NodeJS.Timeout

    const requestOptions = {
        method: 'GET',
        headers: myHeaders

    };

    return Promise.race([
        fetch(`${BASE_ULR_NEW}/signals/show/${id}`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}


export const getEducator = async (userId: string) => {


    let Token = await SecureStore.getItemAsync('delta-signal-token');
    const myHeaders = {
        "Authorization": `Bearer ${Token}`,

    }
    let timeoutId: NodeJS.Timeout

    const requestOptions = {
        method: 'GET',
        headers: myHeaders

    };

    return Promise.race([
        fetch(`${BASE_ULR_NEW}/educators/show/${userId}`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}



export const getEducatorSignals = async (userId: string) => {


    let Token = await SecureStore.getItemAsync('delta-signal-token');
    const myHeaders = {
        "Authorization": `Bearer ${Token}`,

    }
    let timeoutId: NodeJS.Timeout

    const requestOptions = {
        method: 'GET',
        headers: myHeaders

    };

    return Promise.race([
        fetch(`${BASE_ULR_NEW}/educators/signals/${userId}`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}

export const getEducators = async () => {


    let Token = await SecureStore.getItemAsync('delta-signal-token');
    const myHeaders = {
        "Authorization": `Bearer ${Token}`,

    }
    let timeoutId: NodeJS.Timeout

    const requestOptions = {
        method: 'GET',
        headers: myHeaders

    };

    return Promise.race([
        fetch(`${BASE_ULR_NEW}/educators`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}
export const getEducatorsFollowing = async () => {


    let Token = await SecureStore.getItemAsync('delta-signal-token');
    const myHeaders = {
        "Authorization": `Bearer ${Token}`,

    }
    let timeoutId: NodeJS.Timeout

    const requestOptions = {
        method: 'GET',
        headers: myHeaders

    };

    return Promise.race([
        fetch(`${BASE_ULR_NEW}/educators/following`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}


export const sendMessage = async ({body,id} :{body:any, id:string}) => {


    let Token = await SecureStore.getItemAsync('delta-signal-token');
    const myHeaders = {
        "Authorization": `Bearer ${Token}`,
        "Content-Type": "application/json",
    }
    let timeoutId: NodeJS.Timeout

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body
    };

    return Promise.race([
        fetch(`${BASE_ULR_NEW}/chat/send/${id}`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}


export const getAlMessage ={

    messages: async ( {pageParam = 1,id}: { pageParam?: number,id:string}) => {


        let Token = await SecureStore.getItemAsync('delta-signal-token');
        const myHeaders = {
            "Authorization": `Bearer ${Token}`,
        }
        let timeoutId: NodeJS.Timeout

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,

        };

        return Promise.race([
            fetch(`${BASE_ULR_NEW}/chat/messages/${id}`, requestOptions)
                .then(response => response.json()),
            new Promise((resolve, reject) => {
                timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

                //  clearTimeout(timeoutId)
            }).then(() => {
                clearTimeout(timeoutId)
            })

        ])

    }
}



export const followEducator = async (body: {}) => {


    let Token = await SecureStore.getItemAsync('delta-signal-token');
    const myHeaders = {
        "Authorization": `Bearer ${Token}`,
        "Content-Type": "application/json",
    }
    let timeoutId: NodeJS.Timeout

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body
    };

    return Promise.race([
        fetch(`${BASE_ULR_NEW}/educators/follow`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}
export const unFollowEducator = async (body: {}) => {


    let Token = await SecureStore.getItemAsync('delta-signal-token');

    const myHeaders = {
        "Authorization": `Bearer ${Token}`,
        "Content-Type": "application/json",

    }
    let timeoutId: NodeJS.Timeout

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body
    };

    return Promise.race([
        fetch(`${BASE_ULR_NEW}/educators/unfollow`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}
