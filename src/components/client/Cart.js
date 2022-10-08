import { Button, List } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import ItemCart from "./ItemCart";
import AxiosUser from "../../apis/client/AxiosUser";
import { KEY_USER } from "../../constant/LocalStored";
import { didMoutfetchCart, fetchCart } from "../../redux/client/cart/Actions";
function Cart() {
  // const cartUser = useSelector((state) => state.user.loginSuccess.listCarts);
  // const totalBill = useSelector((state) => state.user.totalBill);
  const [data,setData] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem(KEY_USER)) {
      const idUser = JSON.parse(localStorage.getItem(KEY_USER))._id;
      AxiosUser.get(`/api/carts/filterCarts/${idUser}`)
        .then( (res) => {
          setData(res.data)
        })
        .catch((err) => console.log(err))
        .finally(() => {
        });
    }
  }, [dispatch]);
  return (
    <List
      sx={{
        maxWidth: "450px",
        minWidth  : '25rem',
        borderRadius: "20px",
        padding: "10px",
      }}
    >
      {
       data?.map((value) => <ItemCart  key={v4()} item={value} />)
      }
      {data.length === 0 && (
        <img
        style={{width : '24rem'}}
          src="https://rtworkspace.com/wp-content/plugins/rtworkspace-ecommerce-wp-plugin/assets/img/empty-cart.png"
          alt="empty"
        />
      )}
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 500,
          margin: "20px 0",
        }}
      >
        <span>Tổng Hoá Đơn</span>
        <span style={{ fontWeight: 700 }}>{200} Đ</span>
      </Stack>
      <Link
        style={{ pointerEvents: data.length === 0 ? "none" : "auto" }}
        to="/payment"
      >
        <Button
          disabled={data.length === 0}
          fullWidth
          color="warning"
          variant="contained"
        >
          Thanh Toán
        </Button>
      </Link>
    </List>
  );
}
export default Cart;
