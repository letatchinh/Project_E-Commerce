import axios from "axios"

const productApi = {
    async get(){
        const res = axios.get(`/api/products`)
        return res.data
    }
}
export default productApi