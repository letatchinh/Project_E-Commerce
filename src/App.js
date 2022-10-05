import "./App.css";
import { Route, Routes } from "react-router-dom";
import ListProducts from "./page/client/screens/ListProducts"
import Register from "./page/client/screens/Register"
import {  useDispatch } from "react-redux";
import { fecthProductRequest } from "./redux/shopping/Shopping-actions";
import DetailProduct from "./page/client/screens/DetailProduct";
import ProfileUser from "./page/client/screens/ProfileUser";
import InfoUser from "./page/client/screens/InfoUser";
import ListPaymentUser from "./page/client/screens/ListPaymentUser";
import Payment from "./page/client/screens/Payment";
import React, { useEffect } from "react";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import HomeScreen from "./page/admin/screens/HomeScreen";
import ProductScreen from "./page/admin/screens/productScreen";
import CategoriesScreen from "./page/admin/screens/CategoriesScreen";
import OrderScreen from "./page/admin/screens/OrderScreen";
import OrderDetailScreen from "./page/admin/screens/OrderDetailScreen";
import AddProducts from "./page/admin/screens/AddProducts";
import AdminLogin from "./page/admin/screens/LoginScreen";
import UsersScreen from "./page/admin/screens/UsersScreen";
import ProductEditScreen from "./page/admin/screens/ProductEditScreen";
import NotFound from "./page/admin/screens/NotFound";
import ListOrder from "./page/client/screens/ListOrder";
import PrivateRouter from "./Auth/PrivateRouter";
import HomePageUser from "./page/client/HomePageUser";
import HomePage from "./page/admin/HomePage/HomePage";
import LoginUser from "./page/client/screens/LoginUser";
import Login from "./page/admin/screens/LoginScreen";
import ComponentHomePage from "./page/client/screens/ComponentHomePage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fecthProductRequest());
  }, []);
  return (
    <>
      <Routes>
        <Route element={<HomePageUser />}>
          <Route path="/" element={<ComponentHomePage />} />
          {/* <Route path="/search" element={<Search />} /> */}
          {/* <Route path="/new" element={<CreateProduct />} /> */}
          <Route path="/login" element={<LoginUser />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products/:productId" element={<DetailProduct />} />
          <Route
            path="/profile_Info"
            element={<ProfileUser children={<InfoUser />} />}
          />
          <Route
            path="/profile_ListPayment"
            element={<ProfileUser children={<ListPaymentUser />} />}
          />
          <Route
            path="/profile_ListOrder"
            element={<ProfileUser children={<ListOrder />} />}
          />

          <Route path="/payment" element={<Payment />} />
          <Route path="/*" element={<NotFound />} />
        </Route>

        {/* User */}

        {/* Admin */}

        <Route path="/admin/login" element={<Login />} />
        <Route element={<HomePage />}>
          <Route element={<PrivateRouter />}>
            <Route path="/admin/" element={<HomeScreen />} />
          </Route>
          <Route path="/admin/addproduct" element={<AddProducts />} />
          <Route path="/admin/" element={<HomeScreen />} />
          <Route path="/admin/products" element={<ProductScreen />} />
          <Route path="/admin/category" element={<CategoriesScreen />} />
          <Route path="/admin/orders" element={<OrderScreen />} />
          <Route path="/admin/order" element={<OrderDetailScreen />} />
          <Route path="/admin/users" element={<UsersScreen />} />
          <Route
            path="/admin/product/:id/edit"
            element={<ProductEditScreen />}
          />
          <Route path="/admin/*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
