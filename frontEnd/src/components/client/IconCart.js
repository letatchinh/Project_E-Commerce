import { Badge, Button,  Menu } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useDispatch, useSelector } from 'react-redux';
import { KEY_USER } from '../../constant/LocalStored';
import { fetchLogginSuccessRequest } from '../../redux/login/Actions';
import '../StyleComponent/Icons.css'
import Cart from './Cart';
export default function IconCart() {
    const dispatch = useDispatch();
    const countCart = useSelector(state => state.cart.count)
    const fetch = useCallback(async() => {
    if (localStorage.getItem(KEY_USER)) {
    await  dispatch(fetchLogginSuccessRequest());
    }
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
              badgeContent={countCart}
              className='badgeCustom'
            >
              <ShoppingBagOutlinedIcon className='IconsWhite'
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
    anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
  >
    <Cart handleClose={handleClose}/>
  </Menu>
</div>
  )
}
