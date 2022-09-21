import {
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
} from "@mui/material";
import React, { useCallback, useEffect,useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import {
  calTotalBill,
  featchDecreaseItemRequest,
  featchIncreaseItemRequest,
  featchRemoveItemCartRequest,
  fetchLogginSuccessRequest,
} from "../redux/login/Actions";
import { Stack } from "@mui/system";
import styled from "styled-components";
import { KEY_USER } from "../constant/LocalStored";
import { Link } from "react-router-dom";
import ItemCart from "./ItemCart";

const SpanStylePrice = styled.span`
margin : 0 10px;
font-family: Montserrat, sans-serif;
font-weight : 500;
font-size : 18px
`
 function Cart({ display,offCart }) {
  const dispatch = useDispatch();
  const cartUser = useSelector((state) => state.user.loginSuccess.listCarts);
  const totalBill = useSelector((state) => state.user.totalBill);
  const [listChecked,setListChecked] = useState([])
  const fetch = useCallback(() => {
    if (localStorage.getItem(KEY_USER)) {
      dispatch(fetchLogginSuccessRequest());
    }
    dispatch(calTotalBill(cartUser))
  }, [localStorage.getItem(KEY_USER)]);
  useEffect(() => {
    fetch();
  }, [fetch]);
  const handleDeleteCart = (item) => {
    dispatch(featchRemoveItemCartRequest(item));
  };
  const handleIncrease = (item) => {
    dispatch(featchIncreaseItemRequest(item));
  };
  const handleDecrease = (item) => {
    dispatch(featchDecreaseItemRequest(item));
  };
  return (
    <List
      sx={{
        display: display ? "block" : "none",
        bgcolor: "background.paper",
        position: "absolute",
        zIndex: 1,
        width: "450px",
        background: "aliceblue",
        top: "100%",
        right: "100%",
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
     <Link style={{pointerEvents :(cartUser.length === 0) ?  'none' : 'auto'}} to='payment'>
     <Button disabled={cartUser.length === 0} onClick={offCart} fullWidth color="success" variant="outlined">Thanh Toán</Button>
     </Link>

    </List>
  );
}
export default Cart