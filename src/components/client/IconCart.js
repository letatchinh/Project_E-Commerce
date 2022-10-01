import { Badge, Button, List, Menu, MenuItem } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Stack } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { KEY_USER } from '../../constant/LocalStored';
import { calTotalBill, fetchLogginSuccessRequest } from '../../redux/login/Actions';
import ItemCart from './ItemCart';
import { v4 } from 'uuid';
import { Link } from 'react-router-dom';

export default function IconCart() {
    const dispatch = useDispatch();
  const cartUser = useSelector((state) => state.user.loginSuccess.listCarts);
  const totalBill = useSelector((state) => state.user.totalBill);
  const fetch = useCallback(() => {
    if (localStorage.getItem(KEY_USER)) {
      dispatch(fetchLogginSuccessRequest());
    }
    dispatch(calTotalBill(cartUser))
  }, [localStorage.getItem(KEY_USER)]);
  useEffect(() => {
    fetch();
  }, [fetch]);
    const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>      
    <Button
    id="basic-button"
    aria-controls={open ? 'basic-menu' : undefined}
    aria-haspopup="true"
    aria-expanded={open ? 'true' : undefined}
    onClick={handleClick}
  >
     <Badge
              sx={{ position: "relative" }}
              color="warning"
              badgeContent={2}
            >
              <ShoppingBagOutlinedIcon
                // onClick={() => setDisplayCart(!displayCart)}
                fontSize="large"
                sx={{ cursor: "pointer" }}
              />
              </Badge>
  </Button>
  <Menu
    id="basic-menu"
    anchorEl={anchorEl}
    open={open}
    onClose={handleClose}
    MenuListProps={{
      'aria-labelledby': 'basic-button',
    }}
  >
   
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
        <span style={{fontWeight : 700}}>asd Đ</span>
      </Stack>
     <Link style={{pointerEvents :(cartUser.length === 0) ?  'none' : 'auto'}} to='/payment'>
     <Button disabled={cartUser.length === 0} fullWidth color="success" variant="outlined">Thanh Toán</Button>
     </Link>

    </List>
  </Menu>
</div>
  )
}
