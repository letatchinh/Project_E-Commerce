import axiosClient from "./axiosClient";

export const userApi = {
  async getAllUser() {
    const res = await axiosClient.get("users/");
    return res;
  },
  async addUser(user) {
    const res = await axiosClient.post("users/", user);
    return res;
  },
  async getUser(id) {
    const res = await axiosClient.get(`users/${id}`);
    return res;
  },
  async editUser(user, id) {
  const res =  await axiosClient.put(`users/${id}`, user);
    return  res
  },
};
