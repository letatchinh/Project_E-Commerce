import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../../layout/client/Header/Index";
import "react-toastify/dist/ReactToastify.css";
import SwitchBackGround from "../../components/client/SwitchBackGround";
import LoadingHomePageFull from "../../components/client/LoadingHomePageFull";
import Footer from "../../layout/client/Footer";
import MessengerCustomerChat from 'react-messenger-customer-chat';

export default function HomePageUser() {

  return (
    <div style={{ minWidth: "320px", position: "relative" }}>
      <LoadingHomePageFull/>
      <Header />
      {/* <MessengerCustomerChat
    pageId="108803887529479"
    appId="3267114616941933"
    // htmlRef="<REF_STRING>"
  /> */}
  
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
