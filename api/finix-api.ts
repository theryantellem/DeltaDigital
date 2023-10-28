import * as SecureStore from 'expo-secure-store';
import {BASE_ULR_NEW, LIVE_PROD_URL} from "@env";


//


export const getSignals = async () => {

    let Token = await SecureStore.getItemAsync('delta-signal-token');
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BASE_ULR_NEW}/signals`, requestOptions)
        .then(response => response.json())


}


export const listAcademy = async () => {

    let Token = await SecureStore.getItemAsync('delta-signal-token');
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BASE_ULR_NEW}/academy`, requestOptions)
        .then(response => response.json())


}


export const educatorsLive = async () => {

    let Token = await SecureStore.getItemAsync('delta-signal-token');

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

   return  fetch(`${BASE_ULR_NEW}/schedules/live/educators`, requestOptions)
        .then(response => response.json())


}

export const userJoinLive = async (streamId:string) => {

    let Token = await SecureStore.getItemAsync('delta-signal-token');

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

   return  fetch(`${BASE_ULR_NEW}/schedules/join-live/${streamId}`, requestOptions)
        .then(response => response.json())


}


export const listAcademyDetails = async (id: string) => {

    let Token = await SecureStore.getItemAsync('delta-signal-token');
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BASE_ULR_NEW}/academy/${id}`, requestOptions)
        .then(response => response.json())


}


export const pastStreamerVideos = async (id: string) => {

    let Token = await SecureStore.getItemAsync('delta-signal-token');
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BASE_ULR_NEW}/educators/videos/${id}`, requestOptions)
        .then(response => response.json())


}


export const listAcademyModules = async (id: string) => {

    let Token = await SecureStore.getItemAsync('delta-signal-token');
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BASE_ULR_NEW}/modules/show/${id}`, requestOptions)
        .then(response => response.json())


}


export const listAcademyRating = async (id: string) => {

    let Token = await SecureStore.getItemAsync('delta-signal-token');
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BASE_ULR_NEW}/academy/rating/${id}`, requestOptions)
        .then(response => response.json())


}

export const getSignalsTest = {

    signals: async ({page}: { page: number }) => {
        let Token = await SecureStore.getItemAsync('delta-signal-token');
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${Token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        return fetch(`${BASE_ULR_NEW}/signals?page=${page}`, requestOptions)
            .then(response => response.json())


        /* return Promise.race([
             fetch(`${BASE_ULR_NEW}/signals`, requestOptions)
                 .then(response => response.json()),
             new Promise((resolve, reject) => {
                 timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

                 //  clearTimeout(timeoutId)
             }).then(() => {
                 clearTimeout(timeoutId)
             })

         ])*/

    }
}


export const viewSignal = async (id: string) => {


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


export const updateWatchTime = async ({body, id}: { body: any, id: string }) => {


    let Token = await SecureStore.getItemAsync('delta-signal-token');
    const myHeaders = {
        "Authorization": `Bearer ${Token}`,
        "Content-Type": "application/json",
    }
    let timeoutId: NodeJS.Timeout

    const requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body
    };

    return Promise.race([
        fetch(`${BASE_ULR_NEW}/academy/watch-time/${id}`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}

export const enrollModule = async ( body: any) => {


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
        fetch(`${BASE_ULR_NEW}/academy/enrolments`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}



export const sendMessage = async ({body, id}: { body: any, id: string }) => {


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
export const sendMessageLive = async ({body, id}: { body: any, id: string }) => {


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
        fetch(`${BASE_ULR_NEW}/live/send/${id}`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}


export const getAlMessage = {

    messages: async ({pageParam = 1, id}: { pageParam?: number, id: string }) => {


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


export const getLiveMessage = {

    messages: async ({pageParam = 1, id}: { pageParam?: number, id: string }) => {


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
            fetch(`${BASE_ULR_NEW}/live/messages/${id}`, requestOptions)
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
export const getUserInfo = async () => {

    let Token = await SecureStore.getItemAsync('delta-signal-token');
    const myHeaders = {
        "Authorization": `Bearer ${Token}`,
    }
    let timeoutId: NodeJS.Timeout
    //  "TOKEN", "2|KOg6Xv9IHSqMTPoZyyXKyTd7R99QAwKcthWTf5pl"


    const requestOptions = {
        method: 'GET',
        headers: myHeaders

    };


    return fetch(`${BASE_ULR_NEW}/profile`, requestOptions)
        .then(response => response.json())


}

export const postAReview = async (body: {}) => {


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
        fetch(`${BASE_ULR_NEW}/academy/rating`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 25000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

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
