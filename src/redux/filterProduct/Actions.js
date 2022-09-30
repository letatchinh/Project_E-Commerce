import { FILTER_LIST, RECEIVE_LIST, SORT_PRICE_HIGH_TO_LOW, SORT_PRICE_LOW_TO_HIGH, SORT_RATING_HIGH_TO_LOW, SORT_RATING_LOW_TO_HIGH } from "./Types"

export const fetchReceiveListShow = (data) => {
    return {
        type : RECEIVE_LIST,
        payload : data
    }
}
export const sortHighToLow = () => {
    return {
        type : SORT_PRICE_HIGH_TO_LOW,
        payload : ''
    }
}
export const sortLowToHigh = () => {
    return {
        type : SORT_PRICE_LOW_TO_HIGH,
        payload : ''
    }
}
export const sortRatingHighToLow = () => {
    return {
        type : SORT_RATING_HIGH_TO_LOW,
        payload : ''
    }
}
export const sortRatingLowtoHigh = () => {
    return {
        type : SORT_RATING_LOW_TO_HIGH,
        payload : ''
    }
}
