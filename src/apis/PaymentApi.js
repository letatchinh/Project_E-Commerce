import axiosClient from "./axiosClient"

const PaymentApi = {
async getAll(){
    const res = await axiosClient.get('listPayment/')
    return res
},
async add(item){
    const res = await axiosClient.post('listPayment/',item)
    return res
}
}
export default PaymentApi