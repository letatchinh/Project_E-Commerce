import axiosClient from "./axiosClient"

const productApi = {
    async getAll() {
        const res = await axiosClient.get("listProduct/")
        return res
    },
    async getItem(item) {
        const res = await axiosClient.get(`listProduct/${item}`)
        return res
    },
    async searchItem(keyword) {
        const res = await axiosClient.get(`listProduct?name_like=${keyword}`)
        return res
    },
    async addItem(item) {
        const res = await axiosClient.post(`listProduct/`,item)
        return res
    },
    async editItem(item,id) {
        const res = await axiosClient.put(`listProduct/${id}`,item)
        return res
    },
}
export default productApi