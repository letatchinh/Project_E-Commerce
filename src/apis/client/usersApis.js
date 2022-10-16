import AxiosUser from "./AxiosUser"

export const fetchCheckUser = async(action) => {
    try {
        const res = await AxiosUser.put("/api/users/resetPassword",{email : action})
        return res
    } catch (error) {
        console.log(error);
    }
}