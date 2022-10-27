import { Navigate, Outlet } from "react-router-dom";
import CheckAuth from "./Auth";

export default function PrivateRouter() {
  const auth = CheckAuth();
  return auth && Object.keys(auth).length > 0 ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/login" />
  );
}
