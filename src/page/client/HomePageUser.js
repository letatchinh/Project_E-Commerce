import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../../layout/client/Header/Index";
import "react-toastify/dist/ReactToastify.css";
import SwitchBackGround from "../../components/client/SwitchBackGround";
import LoadingHomePageFull from "../../components/client/LoadingHomePageFull";
import Footer from "../../layout/client/Footer";
export default function HomePageUser() {

  return (
    <div style={{ minWidth: "435px", position: "relative" }}>
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
