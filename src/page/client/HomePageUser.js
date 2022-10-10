import React, { useCallback, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "../../layout/client/Footer";
import Header from "../../layout/client/Header/Index";
import "react-toastify/dist/ReactToastify.css";
import SwitchBackGround from "../../components/client/SwitchBackGround";

export default function HomePageUser() {
 
  return (
    <div style={{ minWidth: "435px" , position : 'relative' }}>
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
