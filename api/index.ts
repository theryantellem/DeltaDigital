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
        fetch(`${LIVE_PROD_URL}/profile`, requestOptions)
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
export const getDepositAddress = async (userId: string,) => {

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
    };

    return Promise.race([
        fetch(`${LIVE_PROD_URL}/depositaddress`, requestOptions)
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


export const transferAsset = async ({body, userId}: { body: any, userId: string }) => {

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


export const getAsset = async (userId: string) => {
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
        fetch(`${LIVE_PROD_URL}/asset`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}




export const doWithdraw = async ({userId,body}:{userId: string,body:any}) => {
    let Token = await SecureStore.getItemAsync('delta-signal-token');

    const myHeaders = {
        "TOKEN": Token,
        "ID": userId
    }
    let timeoutId: NodeJS.Timeout

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body,
    };

    return Promise.race([
        fetch(`${LIVE_PROD_URL}/doWithdraw`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}



export const checkUserPlan = async (userId: string) => {
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
        fetch(`${LIVE_PROD_URL}/CheckUserPlan`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}
export const userCounselor = async (userId: string) => {
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
        fetch(`${LIVE_PROD_URL}/Mycounselor`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}

export const bindAPI = async ({userId,body}:{userId: string,body:any}) => {
    let Token = await SecureStore.getItemAsync('delta-signal-token');

    const myHeaders = {
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
        fetch(`${LIVE_PROD_URL}/Apibind`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}




/*GET RUNNING BOT STRATEGY*/





export const activeStrategy = async (userId:string) => {
    let Token = await SecureStore.getItemAsync('delta-signal-token');

    const myHeaders = {
        "TOKEN": Token,
        "ID": userId
    }
    let timeoutId: NodeJS.Timeout

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,

    };

    return Promise.race([
        fetch(`${LIVE_PROD_URL}/strategy`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}
export const getNewstrategy = async ({body,userId}:{userId: string,body:any}) => {
    let Token = await SecureStore.getItemAsync('delta-signal-token');

    const myHeaders = {
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
        fetch(`${LIVE_PROD_URL}/newstrategyget`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}
export const quantitativeStrategies = async (userId:string) => {
    let Token = await SecureStore.getItemAsync('delta-signal-token');

    const myHeaders = {
        "TOKEN": Token,
        "ID": userId
    }
    let timeoutId: NodeJS.Timeout

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,

    };

    return Promise.race([
        fetch(`${LIVE_PROD_URL}/ostrategy`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}
export const botTradeSetting = async ({userId,body}:{userId: string,body:any}) => {
    let Token = await SecureStore.getItemAsync('delta-signal-token');

    const myHeaders = {
        "TOKEN": Token,
        "ID": userId,
        "Content-Type": 'multipart/form-data'
    }
    let timeoutId: NodeJS.Timeout

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body

    };

    return Promise.race([
        fetch(`${LIVE_PROD_URL}/tradesetting`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}



export const getBanner = async (userId:string) => {
    let Token = await SecureStore.getItemAsync('delta-signal-token');

    const myHeaders = {
        "TOKEN": Token,
        "ID": userId
    }
    let timeoutId: NodeJS.Timeout

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,

    };

    return Promise.race([
        fetch(`${LIVE_PROD_URL}/Banner`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}


export const getFeedback = async (userId:string) => {
    let Token = await SecureStore.getItemAsync('delta-signal-token');

    const myHeaders = {
        "TOKEN": Token,
        "ID": userId
    }
    let timeoutId: NodeJS.Timeout

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,

    };

    return Promise.race([
        fetch(`${LIVE_PROD_URL}/Feedback`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}


export const binanceTicker = async () => {
    let Token = await SecureStore.getItemAsync('delta-signal-token');


    let timeoutId: NodeJS.Timeout

    const requestOptions = {
        method: 'GET',
    };

    return Promise.race([
        fetch(`https://api.binance.com/api/v3/ticker/24hr`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}


export const allAssets = {

    tickers: async ({pageParam = 1}: {  pageParam: number }) => {

        const myHeaders = {
            'Content-Type': 'application/json',
        }
        let timeoutId: NodeJS.Timeout


        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        //https://dev.brace.com.ng/notifications?status=pending
        return Promise.race([
            fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${pageParam}&sparkline=false&locale=en`, requestOptions)
                .then(response => response.json()),
            new Promise((resolve, reject) => {
                timeoutId = setTimeout(() => reject(new Error('Timeout')), 20000)

                //  clearTimeout(timeoutId)
            }).then(() => {
                clearTimeout(timeoutId)
            })

        ])

    }
}
