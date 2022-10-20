import AxiosUser from "./AxiosUser"

export const fetchCheckUser = async(action) => {
    try {
        const res = await AxiosUser.put("/api/users/resetPassword",{email : action})
        return res
    } catch (error) {
        console.log(error);
    }
}

export const fetchListVoucher = async(action) => {
    try {
        const {queryKey} = action
        const res =   await AxiosUser.get(`/api/users/getVoucherUser/${queryKey[0]}`)
        return res.data
    } catch (error) {
        return []
    }
}