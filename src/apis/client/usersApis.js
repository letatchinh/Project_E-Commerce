import AxiosUser from "./AxiosUser"

const userApis = {
    async post(user){
        const res = await AxiosUser.post(`/api/users/`,user)
        return res.data
    }
}
export default userApis