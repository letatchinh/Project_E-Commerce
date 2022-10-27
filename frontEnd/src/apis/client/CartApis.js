import AxiosUser from "./AxiosUser"

const CartApi = {
    async addCart(data){
      await AxiosUser.post("/api/carts/add",data)
    }
}
export default CartApi