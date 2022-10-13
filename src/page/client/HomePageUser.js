import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../../layout/client/Header/Index";
import "react-toastify/dist/ReactToastify.css";
import SwitchBackGround from "../../components/client/SwitchBackGround";
import LoadingHomePage from "../../components/client/LoadingHomePage";
import LoadingHomePageFull from "../../components/client/LoadingHomePageFull";
const Footer = React.lazy(() => import("../../layout/client/Footer"));
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
        draggable
      />
      <Outlet />
      <Footer />
    
    </div>
  );
}
