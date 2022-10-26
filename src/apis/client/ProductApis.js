import AxiosUser from "./AxiosUser";

export const fetchListCategory = async(action) => {
    try {
        const {queryKey} = action
        const res = await AxiosUser.get(`/api/products/search?${queryKey[0]}=${queryKey[1]}`)
        return res.data
    } catch (error) {
        console.log(error);
    }
}
export const fetchSortProductByDate = async(action) => {
    try {
        const {queryKey} = action
        const res = await AxiosUser.get(`/api/products/sortCreatedAt/sort?limit=${queryKey[0]}&page=${queryKey[1]}`)
        console.log(queryKey);
        return res.data
    } catch (error) {
        console.log(error);
    }
}
export const fetchSearch = async(action) => {
    try {
        // const {queryKey} = action
        const query = action.queryKey[0]
        const res =   await AxiosUser.get(`/api/products/search?name=${query.keywordSearch}&category=${query.type ? query.type : ""}&page=${query.page}&sortPrice=${query.sortPrice}&sortRating=${query.sortRating}&rangeFilterGte=${query.more}&rangeFilterLte=${query.low}&limit=${query.limit}`)
        return res.data
    } catch (error) {
        return []
    }
}
export const fetchListSale = async(action) => {
    try{
        const {queryKey} = action
        const res =   await AxiosUser.get(`/api/products/filterSaleProduct?page=${queryKey[0]}&?limit=${queryKey[1]}`)
        return res.data
    } catch (error) {
        console.log(error);
    }
}
export const fetchListNew = async(action) => {
    try{
        const {queryKey} = action
        const res =   await AxiosUser.get(`/api/products/filterNewProduct?page=${queryKey[0]}&limit=${queryKey[1]}`)
        return res.data
    } catch (error) {
        console.log(error);
    }
}
export const fetchListHot = async(action) => {
    try{
        const {queryKey} = action
        const res = await AxiosUser.get(`/api/products/filterHotProduct?page=${queryKey[0]}&limit=${queryKey[1]}`)
        return res.data
    } catch (error) {
        console.log(error);
    }
}
export const fetchListReview = async(action) => {
    try{
        const res = await AxiosUser.get(`/api/reviews/getReviewByIdProduct/${action._id}?page=${action.pageParam}`)
        return res.data
    } catch (error) {
        console.log(error);
    }
}
export const fetchListVoucherScreen = async(action) => {
    try{
        const res = await AxiosUser.get(`/api/vouchers/all`)
        return res.data
    } catch (error) {
        console.log(error);
    }
}
