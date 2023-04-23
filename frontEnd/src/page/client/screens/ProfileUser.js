import {
  Avatar,
  ListItemIcon,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { Container, Stack } from "@mui/system";
import React, {  useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { KEY_USER } from "../../../constant/LocalStored";
import { useSelector } from "react-redux";
import AvatarProfileUser from "../../../components/client/AvatarProfileUser";
export default function ProfileUser({children}) {
  const users = JSON.parse(localStorage.getItem(KEY_USER)) || ""
  const mainBackGround2 = useSelector((state) => state.colorCommon.mainBackGround2);
  const mainBackGround = useSelector((state) => state.colorCommon.mainBackGround);
  const mainColorText = useSelector(state => state.colorCommon.mainColorText)
  const navigate = useNavigate()
  const location = useLocation()
  const [active, setActive] = useState(1);
  useEffect(() => {
    switch (location.pathname) {
      case "/profile_Info":
        setActive(1)
        break;
      case "/profile_ListPayment":
        setActive(2)
        break;
      case "/profile_ListOrder":
        setActive(3)
        break;
    
      default: setActive(1)
        break;
    }
    
  },[location])
  useEffect(() => {
    if(users === null){
      navigate('/login')
    }
  },[users])

  return (
   <>
   <div style={{ background: mainBackGround2, padding: "50px 0" }}>
      <Container sx={{ background: mainBackGround, borderRadius: "20px",padding : '20px 0' }}>
        <Stack direction={{md : 'row',sm : 'column' , xs : 'column'}}>
          <Stack direction={{sm : 'column' , xs : 'row'}} width={{md : '30%' , sm : '100%'}} borderRight="1px solid #F0F2F5">
            <AvatarProfileUser />
            <MenuList>
              <Link to='/profile_Info'> 
              <MenuItem  sx={{background : (active === 1) ? "#a5d5ff8a" : 'none' , borderRadius : '10px'}}>
                <ListItemIcon>
                  <InfoIcon color='primary' fontSize="small" />
                </ListItemIcon>
                <Typography variant="body1" color={mainColorText}>Thông tin cá nhân</Typography>
              </MenuItem>
              </Link>
             <Link to='/profile_ListPayment'>
             <MenuItem sx={{background : (active === 2) ? "#a5d5ff8a" : 'none',borderRadius : '10px'}}>
                <ListItemIcon>
                  <ShoppingBasketIcon color='primary' fontSize="small" />
                </ListItemIcon>
                <Typography variant="body1" color={mainColorText}>Sản phâm đã mua</Typography>
              </MenuItem>
              </Link>
          <Link to='/profile_ListOrder'>
          <MenuItem sx={{background : (active === 3) ? "#a5d5ff8a" : 'none',borderRadius : '10px'}}>
                <ListItemIcon>
                  <ListAltIcon color='primary' fontSize="small" />
                </ListItemIcon>
                <Typography variant="body1" color={mainColorText}>Danh sách đơn hàng</Typography>
              </MenuItem>
          </Link>
            </MenuList>
          </Stack>
        <Container width='100%'>
          {children}
        </Container>
        </Stack>
      </Container>
    </div>
   </> 
  )
}
