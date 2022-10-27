import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../../layout/client/Header/Index";
import "react-toastify/dist/ReactToastify.css";
import SwitchBackGround from "../../components/client/SwitchBackGround";
import LoadingHomePageFull from "../../components/client/LoadingHomePageFull";
import Footer from "../../layout/client/Footer";
import { useDispatch } from "react-redux";
import { reSetFilter } from "../../redux/filterProduct/Actions";

export default function HomePageUser() {
  const dispatch = useDispatch()
  const location = useLocation().pathname
  const pathActiveSearch = ['/search','/product/shirt','/product/coat','/product/trousers','/product/dress','/product/bikini','/product/shorts']
 useEffect(() => {
  !pathActiveSearch.includes(location) && dispatch(reSetFilter())
 },[location])
  return (
    
    <div style={{ minWidth: "320px", position: "relative" }}>
      <LoadingHomePageFull/>
      <Header />
      <SwitchBackGround />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        limit={3}
        draggable
      />
      <Outlet />
      <Footer />
    
    </div>
  );
}
