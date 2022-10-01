import {
  Button,
  List,
} from "@mui/material";
import React from "react";
import {  useSelector } from "react-redux";
import { v4 } from "uuid";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import ItemCart from "./ItemCart";
 function Cart() {
  const cartUser = useSelector((state) => state.user.loginSuccess.listCarts);
  const totalBill = useSelector((state) => state.user.totalBill);
  return (
    <List
      sx={{
        width: "450px",
        borderRadius: "20px",
        padding: "10px",
      }}
    >
      {cartUser?.length === 0 && <img src="https://rtworkspace.com/wp-content/plugins/rtworkspace-ecommerce-wp-plugin/assets/img/empty-cart.png" alt="empty"/>}
      {cartUser?.map((value) => (
        <ItemCart key={v4()} value={value}/>
      ))}
      <Stack direction="row" justifyContent="space-between" sx={{ fontFamily: "Montserrat, sans-serif", fontWeight: 500 , margin : "20px 0" }}>
        <span>Tổng Hoá Đơn</span>
        <span style={{fontWeight : 700}}>{totalBill} Đ</span>
      </Stack>
     <Link style={{pointerEvents :(cartUser.length === 0) ?  'none' : 'auto'}} to='/payment'>
     <Button disabled={cartUser.length === 0} fullWidth color="warning" variant="contained">Thanh Toán</Button>
     </Link>
</List>
  );
}
export default Cart