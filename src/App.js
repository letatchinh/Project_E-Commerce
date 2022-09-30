import "./App.css";
import { Route, Routes } from "react-router-dom";
import ListProducts from "./components/client/ListProducts";
import Search from "./components/client/Search";
import Register from "./components/client/Register";
import { Provider, useDispatch } from "react-redux";
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
import ListOrder from "./components/client/ListOrder";
import PrivateRouter from "./Auth/PrivateRouter";
import store from "./redux/store";
import stores from "./redux/admin/store";
import { BrowserRouter } from "react-router-dom";
import HomePageUser from "./page/client/HomePageUser";
import HomePage from "./page/admin/HomePage/HomePage";
import LoginUser from "./components/client/LoginUser";
import Login from "./page/admin/screens/LoginScreen";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fecthProductRequest());
  }, []);
  return (
    <>
      <Routes>
        <Route element={<HomePageUser />}>
          <Route path="/" element={<ListProducts />} />
          <Route path="/search" element={<Search />} />
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
