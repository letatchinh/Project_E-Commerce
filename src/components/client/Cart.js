import { Button, List } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import ItemCart from "./ItemCart";
import AxiosUser from "../../apis/client/AxiosUser";
import { KEY_USER } from "../../constant/LocalStored";
function Cart() {
  const cartUser = useSelector((state) => state.user.loginSuccess.listCarts);
  const totalBill = useSelector((state) => state.user.totalBill);
  const [listCarts, setListCarts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (localStorage.getItem(KEY_USER)) {
      const idUser = JSON.parse(localStorage.getItem(KEY_USER))._id;
      setLoading(true);
      let list = [];
      AxiosUser.get(`/api/carts/filterCarts/${idUser}`)
        .then(async(res) => {
         await res.data.map((e) =>
            AxiosUser.get(`/api/products/${e.product}`).then((res) => {
              setListCarts([...listCarts,res.data])
            })
          )
          // console.log(list);
          // setListCarts(list);

        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, []);
  console.log(listCarts);
  return (
    
    <List
      sx={{
        maxWidth: "450px",
        borderRadius: "20px",
        padding: "10px",
      }}
    >
      {listCarts?.length === 0 && (
        <img
          src="https://rtworkspace.com/wp-content/plugins/rtworkspace-ecommerce-wp-plugin/assets/img/empty-cart.png"
          alt="empty"
        />
      )}
     {loading ? <p>...loading</p> : listCarts?.map((value) => (
        <ItemCart key={v4()} value={value} />
      ))}
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
        <span style={{ fontWeight: 700 }}>{totalBill} Đ</span>
      </Stack>
      <Link
        style={{ pointerEvents: cartUser.length === 0 ? "none" : "auto" }}
        to="/payment"
      >
        <Button
          disabled={cartUser.length === 0}
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
