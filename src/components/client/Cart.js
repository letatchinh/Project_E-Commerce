import { Button, List } from "@mui/material";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import ItemCart from "./ItemCart";
function Cart() {
  const listCarts = useSelector(state => state.cart.listCarts)
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
       listCarts?.map((value,i) => <ItemCart  key={v4()}  value={value} />)
      }
      {listCarts.length === 0 && (
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
        style={{ pointerEvents: listCarts && listCarts.length === 0 ? "none" : "auto" }}
        to="/cart"
      >
        <Button
          disabled={listCarts && listCarts.length === 0}
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
