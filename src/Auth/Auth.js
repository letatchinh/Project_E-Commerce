const CheckAuth = () => {
  const getUser = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : [];
  const auth = getUser;
  return auth;
};

export default CheckAuth;
