import {BASE_URL_DEFAULT,BASE_ULR_AUTH} from "@env";


export const loginUser = async (userdata:any) => {
    const myHeaders = {
        'Content-Type': 'application/json',
    }
    let timeoutId: NodeJS.Timeout

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: userdata,
    };

    return Promise.race([
        fetch(`${BASE_ULR_AUTH}/login`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}
