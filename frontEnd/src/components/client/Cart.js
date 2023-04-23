import { Button, List, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import ItemCart from "./ItemCart";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Dialo from './Dialo'
import { fetchDeleteAllCartRequest } from "../../redux/sagas/Mysaga";
function Cart({handleClose}) {
  const listCarts = useSelector(state => state.cart.listCarts)
  const count = useSelector(state => state.cart.count)
  const dispatch = useDispatch()
  const handleDeleteAllCart = () => {
    dispatch(fetchDeleteAllCartRequest())
  }
  return (
    <List
      sx={{
        maxWidth: "450px",
        minWidth  : '25rem',
        borderRadius: "20px",
        padding: "10px",
       
      }}
    >
   
    <Typography textAlign='center' borderBottom='1px solid #999' variant="h6">Giỏ hàng <ShoppingBasketIcon/></Typography>
   <Stack display={listCarts && listCarts.length === 0 ? "none" : 'flex'} direction='row' justifyContent='space-between' alignItems='center' padding ='5px 0'>
   <Typography  color='#777' variant="body2">Sản phâm vừa thêm</Typography>
   <Dialo click={handleDeleteAllCart} messenger="Are you want to delele All?">

    <Button  sx={{textTransform : 'capitalize'}} variant='outlined' size="small"  color='error'>Xoá tất cả</Button>
   </Dialo>
   </Stack>
      <Stack sx={{maxHeight : '60vh',overflowY : 'scroll'}}>
      {
       listCarts?.map((value,i) => <ItemCart  key={v4()} handleClose={handleClose}  value={value} />)
      }
      </Stack>
      {listCarts && listCarts.length === 0 && (
        <img
        style={{width : '24rem'}}
          src="https://rtworkspace.com/wp-content/plugins/rtworkspace-ecommerce-wp-plugin/assets/img/empty-cart.png"
          alt="empty"
        />
      )}
      <Typography  color='#777' variant="body2" padding ='5px 0'>{listCarts.length} trong {count} sản phẩm trong giỏ hàng của bạn</Typography>

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
          Đến giỏ hàng
        </Button>
      </Link>
    </List>
  );
}
export default Cart;
