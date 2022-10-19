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
        const {queryKey} = action
        const res =   await AxiosUser.get(`/api/products/search?name=${queryKey[0]}&category=${queryKey[1] ? queryKey[1] : ""}&page=${queryKey[2]}&sortPrice=${queryKey[3]}&sortRating=${queryKey[4]}&rangeFilterGte=${queryKey[6]}&rangeFilterLte=${queryKey[5]}&limit=${queryKey[7]}`)
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