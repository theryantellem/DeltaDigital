import * as SecureStore from 'expo-secure-store';
import {BASE_ULR_NEW, LIVE_PROD_URL} from "@env";


export const loginUser = async (userdata: any) => {



    let timeoutId: NodeJS.Timeout

    const requestOptions = {
        method: 'POST',

        body: userdata,
    };

    return Promise.race([
        fetch(`https://sumotrust.com/api/v1/php/login.php?apiKey=0ac82ab0e2804272d4d237e9c230c0e1185d0a5f67c9afbfb25d6335e33a71e6eb426040df40399bccfb6317d28e16a1b8c2cf996beba82668e53516446c4cb2`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}
export const signInUser = async (userdata: any) => {
    const myHeaders = {
        "Content-Type": 'application/json'
    }
    let timeoutId: NodeJS.Timeout

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: userdata,
    };


       return  fetch(`http://deltafinix.pro/api/login`, requestOptions)
            .then(response => response.json())


            //  clearTimeout(timeoutId)


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
        fetch(`${LIVE_PROD_URL}/Rewarddetails?userId=${userId}`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}
export const getRevenueDetails = async (userId: string) => {
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
        fetch(`${LIVE_PROD_URL}/revenue?userId=${userId}`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}


export const twoFactorAuth = async ({userId, body}: { userId: string, body: any }) => {
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
        fetch(`${LIVE_PROD_URL}/GetSet2FA?userId=${userId}`, requestOptions)
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
        fetch(`${LIVE_PROD_URL}/team?userId=${userId}`, requestOptions)
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
        fetch(`${LIVE_PROD_URL}/circleleaderboard?userId=${userId}`, requestOptions)
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
        fetch(`${LIVE_PROD_URL}/leaderboard?userId=${userId}`, requestOptions)
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
        fetch(`${LIVE_PROD_URL}/transfer?userId=${userId}`, requestOptions)
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
        fetch(`${LIVE_PROD_URL}/asset?userId=${userId}`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}


export const doWithdraw = async ({userId, body}: { userId: string, body: any }) => {
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
        fetch(`${LIVE_PROD_URL}/doWithdraw?userId=${userId}`, requestOptions)
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
        fetch(`${LIVE_PROD_URL}/CheckUserPlan?userId=${userId}`, requestOptions)
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
        fetch(`${LIVE_PROD_URL}/Mycounselor?userId=${userId}`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}

export const bindAPI = async ({userId,  api_passphrase,api_key,api_secret,bind,exchange}: { userId: string,
    api_passphrase:string,api_key:string,api_secret:string,bind:string,exchange:string
}) => {
    let Token = await SecureStore.getItemAsync('delta-signal-token');

    const myHeaders = {
        "TOKEN": Token,
        "ID": userId,
       // "Content-Type": 'multipart/form-data'
    }
    let timeoutId: NodeJS.Timeout


    const requestOptions = {
        method: 'GET',
        headers: myHeaders,

    };


    return fetch(`https://backend.deltacyborg.pro/Api/Mobile/Apibind?userId=${userId}&exchange=${exchange}&api_key=${api_key}&api_secret=${api_secret}&api_passphrase=${api_passphrase}&bind=${bind}`, requestOptions)
        .then(response => response.json())

}



/*GET RUNNING BOT STRATEGY*/


export const activeStrategy = async (userId: string) => {
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
        fetch(`${LIVE_PROD_URL}/strategy?userId=${userId}`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}
export const getNewstrategy = async ({body, userId}: { userId: string, body: any }) => {
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

    return fetch(`${LIVE_PROD_URL}/newstrategyget?userId=${userId}`, requestOptions)
        .then(response => response.json())

    /*return Promise.race([
        fetch(`${LIVE_PROD_URL}/newstrategyget?userId=${userId}`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])*/

}

export const quantitativeStrategies = async (userId: string) => {
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
        fetch(`${LIVE_PROD_URL}/ostrategy?userId=${userId}`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}


export const getBanner = async (userId: string) => {
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
        fetch(`${LIVE_PROD_URL}/Banner?userId=${userId}`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}


export const getFeedback = async (userId: string) => {
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
        fetch(`${LIVE_PROD_URL}/Feedback?userId=${userId}`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}
export const getStrategies = async (userId: string) => {
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
        fetch(`https://backend.deltacyborg.pro/Api/Mobile/getCopyList?userId=${userId}`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}


export const copyTrade = async ({body, userId}: { userId: string, body: any }) => {
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
        fetch(`https://backend.deltacyborg.pro/Api/Mobile/Copytrade?userId=${userId}`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}


export const botTradeSetting = async ({userId, body}: { userId: string, body: any }) => {
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

    /*   return Promise.race([
           fetch(`https://backend.deltacyborg.pro/Api/Mobile/tradesetting`, requestOptions)
               .then(response => response.json()),
           new Promise((resolve, reject) => {
               timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

               //  clearTimeout(timeoutId)
           }).then(() => {
               clearTimeout(timeoutId)
           })

       ])*/


    return fetch(`https://backend.deltacyborg.pro/Api/Mobile/tradesetting?userId=${userId}`, requestOptions)
        .then(response => response.json())
    // .then(result => console.log(result))

}

export const startTradingBotFuture = async ({body, userId}: { userId: string, body: any }) => {
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

    /* return Promise.race([
         fetch(`https://backend.deltacyborg.pro/Api/Mobile/tradesetting`, requestOptions)
             .then(response => response.json()),
         new Promise((resolve, reject) => {
             timeoutId = setTimeout(() => reject(new Error('Timeout')), 50000)

             //  clearTimeout(timeoutId)
         }).then(() => {
             clearTimeout(timeoutId)
         })

     ])*/


    return fetch(`https://backend.deltacyborg.pro/Api/Mobile/tradesetting?userId=${userId}`, requestOptions)
        .then(response => response.json())
    //  .catch(error => console.log('error', error));

}

export const startStopBot = async ({body, userId}: { userId: string, body: any }) => {
    let Token = await SecureStore.getItemAsync('delta-signal-token');

//.set('id', ID_OF_THE_STRATEGY_PAIR_SELECTED)
    //  .set('startbot', STATUS) // 1 ON, 0 off

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
        fetch(`${LIVE_PROD_URL}/start?userId=${userId}`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}


export const activateCopyStrategy = async ({id, status, userId}: { userId: string, status: string, id: any }) => {
    let Token = await SecureStore.getItemAsync('delta-signal-token');

//.set('id', ID_OF_THE_STRATEGY_PAIR_SELECTED)
    //  .set('startbot', STATUS) // 1 ON, 0 off

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
        fetch(`${LIVE_PROD_URL}/activateCopy?id=${id}&status=${status}`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}
export const sendTicketFeedback = async ({body, userId}: { userId: string, body: any }) => {
    let Token = await SecureStore.getItemAsync('delta-signal-token');

//.set('id', ID_OF_THE_STRATEGY_PAIR_SELECTED)
    //  .set('startbot', STATUS) // 1 ON, 0 off

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
        fetch(`${LIVE_PROD_URL}/SendFeedback?userId=${userId}`, requestOptions)
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

    tickers: async ({pageParam = 1}: { pageParam: number }) => {

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
export const getExchangeBal = async ({userId}: { userId: string }) => {

    let Token = await SecureStore.getItemAsync('delta-signal-token');

    let timeoutId: NodeJS.Timeout
    const myHeaders = {
        "TOKEN": Token,
        "ID": userId
    }

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return Promise.race([
        fetch(`${LIVE_PROD_URL}/ExchangeBalance?userId=${userId}`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 20000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])


}
