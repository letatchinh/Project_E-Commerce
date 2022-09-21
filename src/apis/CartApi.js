import axiosClient from "./axiosClient";

const CartApi = {
  async getAll() {
    const res = await axiosClient.get("listCarts/");
    return res;
  },
  async addCart(item) {
    const res = await axiosClient.post("/listCarts/", item);
    return res;
  },
  async deleteCart(item) {
    const res = await axiosClient.delete(`/listCarts/${item}`);
    return res;
  },
  async editCart(item,id) {
    const res = await axiosClient.put(`/listCarts/${id}`,item);
    return res;
  },
};
export default CartApi;
