import axiosClient from "./axiosClient"
import requester from "./client/requester"

const statics = {
    async getAll(params) {
        // let link = 
        const res = await requester.get("api/orders/all/statics",params)
        return res
    },
}
export default statics