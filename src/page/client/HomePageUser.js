import React, { useCallback, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "../../layout/client/Footer";
import Header from "../../layout/client/Header/Index";
import "react-toastify/dist/ReactToastify.css";
import productApi from "../../apis/testProductApi";
import axios from "axios";
import { KEY_USER } from "../../constant/LocalStored";
import AxiosUser from "../../apis/client/AxiosUser";
import { useDispatch } from "react-redux";
import { fetchCart } from "../../redux/client/cart/Actions";

export default function HomePageUser() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem(KEY_USER)) {
      const idUser = JSON.parse(localStorage.getItem(KEY_USER))._id;
      AxiosUser.get(`/api/carts/filterCarts/${idUser}`)
        .then( async(res) => {
          const newAr = await res.data.map(e => (
            {...e.product,quanlity : 1})
            )
          dispatch(fetchCart(newAr))
        })
        .catch((err) => console.log(err));
    }
  }, [localStorage.getItem(KEY_USER)]);
  return (
    <div style={{ minWidth: "435px" }}>
      <Header />
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
