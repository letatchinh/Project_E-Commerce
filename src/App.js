import "./App.css";
import { Route, Routes } from "react-router-dom";
import ListProducts from "./components/client/ListProducts";
import Login from "./components/client/Login";
import Search from "./components/client/Search";
import Register from "./components/client/Register";
import { useDispatch } from "react-redux";
import { fecthProductRequest } from "./redux/shopping/Shopping-actions";
import DetailProduct from "./components/client/DetailProduct";
import ProfileUser from "./components/client/ProfileUser";
import InfoUser from "./components/client/InfoUser";
import ListPaymentUser from "./components/client/ListPaymentUser";
import Payment from "./components/client/Payment";
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
import HomePage from "./page/client/HomePage";
import ListOrder from "./components/client/ListOrder";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fecthProductRequest())
  }, []);
  return (
    <>
      <Routes>
        {/* User */}
        <Route element={<HomePage />}>
          <Route path="/" element={<ListProducts />} />
          <Route path="/search" element={<Search />} />
          {/* <Route path="/new" element={<CreateProduct />} /> */}
          <Route path="/login" element={<Login />} />
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
          <Route path="/*" element={<NotFound />  }/>
        </Route>
        {/* Admin */}

        <Route path="/admin/" element={<HomeScreen />} exact />
        <Route path="/admin/products" element={<ProductScreen />} />
        <Route path="/admin/category" element={<CategoriesScreen />} />
        <Route path="/admin/orders" element={<OrderScreen />} />
        <Route path="/admin/order" element={<OrderDetailScreen />} />
        <Route path="/admin/addproduct" element={<AddProducts />} />
        <Route path="/admin/users" element={<UsersScreen />} />
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
