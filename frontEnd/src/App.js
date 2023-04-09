import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./page/client/screens/Register";
import DetailProduct from "./page/client/screens/DetailProduct";
import ProfileUser from "./page/client/screens/ProfileUser";
import InfoUser from "./page/client/screens/InfoUser";
import ListPaymentUser from "./page/client/screens/ListPaymentUser";
import Payment from "./page/client/screens/Payment";
import React from "react";
import "./responsive.css";
import 'antd/dist/reset.css';
import "react-toastify/dist/ReactToastify.css";
import HomeScreen from "./page/admin/screens/HomeScreen";
import ProductScreen from "./page/admin/screens/productScreen";
import CategoriesScreen from "./page/admin/screens/CategoriesScreen";
import OrderScreen from "./page/admin/screens/OrderScreen";
import OrderDetailScreen from "./page/admin/screens/OrderDetailScreen";
import AddProducts from "./page/admin/screens/AddProducts";
import UsersScreen from "./page/admin/screens/UsersScreen";
import ProductEditScreen from "./page/admin/screens/ProductEditScreen";
import NotFound from "./page/admin/screens/NotFound";
import ListOrder from "./page/client/screens/ListOrder";
import PrivateRouter from "./Auth/PrivateRouter";
import HomePageUser from "./page/client/HomePageUser";
import HomePage from "./page/admin/HomePage/HomePage";
import LoginUser from "./page/client/screens/LoginUser";
import Login from "./page/admin/screens/LoginScreen";
import CategoryFlashSale from "./page/client/screens/CategoryFlashSale";
import CategoryNew from "./page/client/screens/CategoryNew";
import CategoryTrending from "./page/client/screens/CategoryTrending";
import CategoryCommon from "./components/client/CategoryCommon";
import LoadingHomePage from "./components/client/LoadingHomePage";
import CurrencyScreen from "./page/admin/screens/CurrencyScreen";
import ListCart from "./page/client/screens/ListCart";
import { ContactUs } from "./components/admin/users/contactEmail/ContactUs";
import Search from "./components/client/Search";
import ForgotPassword from "./page/client/screens/ForgotPassword";
import AboutUs from "./page/client/AboutUs";
import Products from "./page/client/screens/Products";
import ProductSellerScreen from "./page/admin/screens/ProductSellerScreen";
import ContactUsUser from "./page/client/ContactUsUser";
import EditCategory from "./components/admin/Categories/EditCategory";
import ProductComments from "./page/admin/screens/ProductComments";

const ComponentHomePage = React.lazy(() =>
  import("./page/client/screens/ComponentHomePage")
);

function App() {
  return (
    <>
      <Routes>
        <Route element={<HomePageUser />}>
          <Route
            path="/"
            element={
              <React.Suspense fallback={<LoadingHomePage />}>
                <ComponentHomePage />
              </React.Suspense>
            }
          />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
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
          <Route path="/cart" element={<ListCart />} />
          <Route path="/flash-sale" element={<CategoryFlashSale />} />
          <Route path="/new-product" element={<CategoryNew />} />
          <Route path="/trending-product" element={<CategoryTrending />} />

          <Route path="/product">
            <Route
              path="shirt"
              element={
                <Search  typeCategory="shirt" />
              }
            />
            <Route
              path="coat"
              element={<Search  typeCategory="coat" />}
            />
            <Route
              path="trousers"
              element={
                <Search  typeCategory="trousers" />
              }
            />
            <Route
              path="dress"
              element={
                <Search  typeCategory="dress" />
              }
            />
            <Route
              path="bikini"
              element={
                <Search  typeCategory="bikini" />
              }
            />
            <Route
              path="shorts"
              element={
                <Search  typeCategory="shorts" />
              }
            />
          </Route>
          <Route path="/products" element={<Search />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUsUser />} />
        {/* User */}

        {/* Admin */}

        <Route path="/admin/login" element={<Login />} />
        <Route element={<HomePage />}>
          <Route element={<PrivateRouter />}>
            <Route path="/admin" element={<HomeScreen />} />
          </Route>
          <Route path="/admin/addproduct" element={<AddProducts />} />
          <Route path="/admin/productcomments" element={<ProductComments />} />
          <Route
            path="/admin/productcomments/:id/disabled"
            element={<ProductComments />}
          />
          <Route
            path="/admin/productcomments/:id/active"
            element={<ProductComments />}
          />
          <Route
            path="/admin/productcomments/page/:pagenumber"
            element={<ProductComments />}
          />
          <Route
            path="/admin/productcomments/search/:keyword"
            element={<ProductComments />}
            exact
          />
          <Route
            path="/admin/productcomments/search/:keyword/page/:pagenumber"
            element={<ProductComments />}
            exact
          />
          <Route
            path="/admin/productcomments/page/:pagenumber/:sortRating"
            element={<ProductComments />}
            exact
          />
          <Route
            path="/admin/productcomments/active/:active"
            element={<ProductComments />}
            exact
          />
          <Route path="/admin" element={<HomeScreen />} />
          <Route
            path="/admin/product/:id/edit"
            element={<ProductEditScreen />}
          />
          <Route path="/admin/products" element={<ProductScreen />} />
          <Route
            path="/admin/products/search/:keyword"
            element={<ProductScreen />}
            exact
          />
          <Route
            path="/admin/products/search/:keyword/page/:pagenumber"
            element={<ProductScreen />}
            exact
          />
          <Route
            path="/admin/products/page/:pagenumber/:sortPrice"
            element={<ProductScreen />}
            exact
          />
          <Route
            path="/admin/products/page/:pagenumber/category/:keywordCategory"
            element={<ProductScreen />}
            exact
          />

          <Route
            path="/admin/products/page/:pagenumber"
            element={<ProductScreen />}
          />
          <Route
            path="/admin/products/page/:pagenumber/quantitySold/:quantitySold"
            element={<ProductScreen />}
          />

          <Route path="/admin/categorys" element={<CategoriesScreen />} />
          <Route path="/admin/category/:id/edit" element={<EditCategory />} />
          <Route path="/admin/currency" element={<CurrencyScreen />} />
          <Route path="/admin/seller" element={<ProductSellerScreen />} />
          <Route
            path="/admin/seller/page/:pageNumber"
            element={<ProductSellerScreen />}
          />
          <Route path="/admin/orders" element={<OrderScreen />} />
          <Route
            path="/admin/orders/search/:paymentMethod"
            element={<OrderScreen />}
            exact
          />
          <Route
            path="/admin/orders/search/:paymentMethod/page/:pagenumber"
            element={<OrderScreen />}
            exact
          />
          <Route
            path="/admin/orders/search/:name"
            element={<OrderScreen />}
            exact
          />
          <Route
            path="/admin/orders/search/:name/page/:pageFiterNumber"
            element={<OrderScreen />}
            exact
          />
          <Route
            path="/admin/orders/page/:pagenumber"
            element={<OrderScreen />}
          />
          <Route path="/admin/orders/search/:paid" element={<OrderScreen />} />
          <Route path="/admin/order/:id" element={<OrderDetailScreen />} />
          <Route path="/admin/users" element={<UsersScreen />} />
          <Route
            path="/admin/orders/search/:active"
            element={<UsersScreen />}
          />
          <Route path="/admin/users/:id/disabled" element={<UsersScreen />} />
          <Route path="/admin/users/:id/active" element={<UsersScreen />} />
          <Route path="/admin/users/:id/sendMail" element={<ContactUs />} />
          <Route
            path="/admin/users/search/:keyword"
            element={<UsersScreen />}
            exact
          />
          <Route
            path="/admin/users/search/:keyword/page/:pagenumber"
            element={<UsersScreen />}
            exact
          />
          <Route
            path="/admin/users/page/:pagenumber"
            element={<UsersScreen />}
          />

          <Route path="/admin/*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
