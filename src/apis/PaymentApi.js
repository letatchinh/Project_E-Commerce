import axiosClient from "./axiosClient"

const PaymentApi = {
async getAll(){
    const res = await axiosClient.get('listPayment/')
    return res.data
}
}
export default PaymentApi