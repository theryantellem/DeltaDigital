import 'intl';
import 'intl/locale-data/jsonp/en';
import {useFocusEffect} from "@react-navigation/native";
import {useCallback, useRef} from "react";


export function isWhatPercentOf(x: number, y: number) {
    return (x / y) * 100;
}



export const calculatePercentage = (percentage: number, amount: number) => {

    return (percentage / 100) * amount;


}






export function getMultipleRandom(arr: any, num: number | undefined) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, num);
}











export const numberWithCommas = (number: number | string) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


//function to check if a string value is less than 1
export function isStringLessThanOne(value: string, amount:number) {
    const numberValue = Number(value);
    return isNaN(numberValue) || numberValue < amount;
}
export function isStringGreaterThan(value: string, amount:number) {
    const numberValue = Number(value);
    return isNaN(numberValue) || numberValue > amount;
}

export function titleCase(str: string) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
}
export const isLessThanTheMB = (fileSize: number, smallerThanSizeMB: number) => {
    const isOk = fileSize / 1024 / 1024 < smallerThanSizeMB
    return isOk
}

let options = {
    notation: "compact",
    compactDisplay: "short",

};
export function formatCompactNumber(number: number | bigint) {
    const usformatter = Intl.NumberFormat("en-US", options);
    return usformatter.format(number);
}

export function filterRange(arr: [], low: string, high: string) {
    // added brackets around the expression for better readability
    return arr.filter((item: { amount: string; }) => (low <= item.amount || item.amount == high));
}
export const currencyFormatter = (locals: 'en-US' | 'en-NG', currency: 'USD' | 'NGN') => {
    return new Intl.NumberFormat(locals, {
        style: 'currency',
        currency,

        minimumFractionDigits:1,
        maximumFractionDigits:2,
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    })
}


export function truncate(str: any, n: number) {
    return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
}

export function truncateString(str: string, max: number, sep?: string | any[] | undefined) {

    // Default to 10 characters
    max = max || 10;

    var len = str.length;
    if (len > max) {

        // Default to elipsis
        sep = sep || "......";

        var seplen = sep.length;

        // If seperator is larger than character limit,
        // well then we don't want to just show the seperator,
        // so just show right hand side of the string.
        if (seplen > max) {
            return str.substr(len - max);
        }

        // Half the difference between max and string length.
        // Multiply negative because small minus big.
        // Must account for length of separator too.
        var n = -0.5 * (max - len - seplen);

        // This gives us the centerline.
        var center = len / 2;

        var front = str.substr(0, center - n);
        var back = str.substr(len - center + n); // without second arg, will automatically go to end of line.

        return front + sep + back;

    }

    return str;
}

function getDifference(array1: any[], array2: any[]) {
    return array1.filter(object1 => {
        return array2.some(object2 => {
            return object1.id === object2.id;
        });
    });
}


export const toKobo = (amount: string) => {
    const str = amount.replace(',', '.')
    return str.length < 3 || str[str.length - 3] == '.' ? Number(str.replace('.', '')) : Number(str.replace('.', ''))*100
}

//In the below code, refetch is skipped the first time because useFocusEffect calls our callback on mount in addition to screen focus.
export function useRefreshOnFocus<T>(refetch: () => Promise<T>) {
    const firstTimeRef = useRef(true)

    useFocusEffect(
        useCallback(() => {
            if (firstTimeRef.current) {
                firstTimeRef.current = false;
                return;
            }

            refetch()
        }, [refetch])
    )
}


export function timeDifference(date1: number, date2: number) {
    var difference = date1 - date2;

    var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= daysDifference * 1000 * 60 * 60 * 24

    var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    difference -= hoursDifference * 1000 * 60 * 60

    var minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60


    var secondsDifference = Math.floor(difference / 1000);

    return minutesDifference
}

const countDownFromDate = (countdownTime:Date) => {
// Set the countdown time to 30 minutes from now
    // var countdownTime = new Date();

    countdownTime.setMinutes(countdownTime.getMinutes() + 30);

// Update the countdown every second
    let countdownInterval = setInterval(function () {
        // Calculate the time remaining until the countdown time
        var now = new Date();
        var timeRemaining = countdownTime.getTime() - now.getTime();

        // Check if the countdown has reached zero
        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            // console.log("Countdown complete!");
        } else {
            // Calculate the minutes and seconds remaining
            var minutes = Math.floor(timeRemaining / 60000);
            var seconds = Math.floor((timeRemaining % 60000) / 1000);

            // Display the time remaining
            console.log("Time remaining: " + minutes + " minutes, " + seconds + " seconds");
        }

    }, 1000);
}

export const wait = (timeout: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
};




export const removeHTMLTags = (htmlString, removeWhiteSpace = false) => {
    // Regular expression to match HTML tags
    const regex = /(<([^>]+)>)/gi;

    // Replace HTML tags with an empty string
    let result = htmlString.replace(regex, '');

    if (removeWhiteSpace) {
        // Remove contiguous white spaces longer than 1 character from the resulting string
        result = result.replace(/\s{2,}/g, ' ');
    }

    return result;
};
