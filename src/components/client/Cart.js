import { Button, List, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import ItemCart from "./ItemCart";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
function Cart({handleClose}) {
  const listCarts = useSelector(state => state.cart.listCarts)
  const count = useSelector(state => state.cart.count)
  return (
    <List
      sx={{
        maxWidth: "450px",
        minWidth  : '25rem',
        borderRadius: "20px",
        padding: "10px",
       
      }}
    >
    <Typography textAlign='center' borderBottom='1px solid #999' variant="h6">My Cart<ShoppingBasketIcon/></Typography>
    <Typography  color='#777' variant="body2">New products added</Typography>
      <Stack sx={{maxHeight : '60vh',overflowY : 'scroll'}}>
      {
       listCarts?.map((value,i) => <ItemCart  key={v4()}  value={value} />)
      }
      </Stack>
      {listCarts && listCarts.length === 0 && (
        <img
        style={{width : '24rem'}}
          src="https://rtworkspace.com/wp-content/plugins/rtworkspace-ecommerce-wp-plugin/assets/img/empty-cart.png"
          alt="empty"
        />
      )}
      <Typography  color='#777' variant="body2" padding ='5px 0'>{listCarts.length} in {count} product in your cart</Typography>

      <Link
        style={{ pointerEvents: listCarts && listCarts.length === 0 ? "none" : "auto" }}
        to="/cart"
      >
        <Button onClick={handleClose}
          disabled={listCarts && listCarts.length === 0}
          fullWidth
          color="warning"
          variant="contained"
        >
          Go to cart
        </Button>
      </Link>
    </List>
  );
}
export default Cart;
