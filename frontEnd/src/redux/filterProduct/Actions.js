import {  RECEIVE_LIST, SET_CATEGORY_SEARCH, SET_SEARCH_KEYWORD, SET_SORT_NEW, SET_SORT_PRICE, SET_SORT_RATING, SET_SORT_SOLD, SORT_PRICE_HIGH_TO_LOW, SORT_PRICE_LOW_TO_HIGH, SORT_RATING_HIGH_TO_LOW, SORT_RATING_LOW_TO_HIGH } from "./Types"

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
export const setKeywordSearch = (action) => {
    return {
        type : SET_SEARCH_KEYWORD,
        payload : action
    }
}
export const setCategorySearch = (action) => {
    return {
        type : SET_CATEGORY_SEARCH,
        payload : action
    }
}
export const setSortPrice = (action) => {
    return {
        type : SET_SORT_PRICE,
        payload : action
    }
}
export const setSortRating = (action) => {
    return {
        type : SET_SORT_RATING,
        payload : action
    }
}
export const setSortNew = (action) => {
    return {
        type : SET_SORT_NEW,
        payload : action
    }
}
export const setSortSold = (action) => {
    return {
        type : SET_SORT_SOLD,
        payload : action
    }
}
export const setFilter = (action) => {
    return {
        type : action.type,
        payload : action.filter
    }
}
export const setReFetchReview = (action) => {
    return {
        type : "REFETCH_REVIEW",
        payload : action
    }
}
export const reSetFilter = () => {
    return {
        type : "RESET_FILTER",
        payload : ""
    }
}
export const fetchFilter = (action) => {
    return {
        type : "FETCH_URL_GET_PARAM",
        payload : action
    }
}