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
import { Link, useNavigate } from "react-router-dom";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { KEY_USER } from "../../constant/LocalStored";
import { useSelector } from "react-redux";
export default function ProfileUser({children}) {
  const users = JSON.parse(localStorage.getItem(KEY_USER))
  const mainBackGround2 = useSelector((state) => state.common.mainBackGround2);
  const mainBackGround = useSelector((state) => state.common.mainBackGround);
  const mainColorText = useSelector(state => state.common.mainColorText)

  const navigate = useNavigate()
  useEffect(() => {
    if(users === null){
      navigate('/login')
    }
  },[users])
  const [active, setActive] = useState(1);
  const handleCLickList = (active) => {
    setActive(active)
  }
  return (
   <>
   <div style={{ background: mainBackGround2, padding: "10px" }}>
      <Container sx={{ background: mainBackGround, borderRadius: "20px" }}>
        <Stack direction={{sm : 'row' , xs : 'column'}}>
          <Stack direction={{sm : 'column' , xs : 'row'}} width="30%" borderRight="1px solid #F0F2F5">
            <Avatar
              sx={{ height: "170px", width: "170px" }}
              alt="Remy Sharp"
              src="https://laz-img-sg.alicdn.com/p/06df75c72185d9d20a426d932b7326a2.jpg"
            />
            <MenuList>
              <Link to='/profile_Info'> 
              <MenuItem onClick={() => handleCLickList(1)} sx={{background : (active === 1) ? "#a5d5ff8a" : 'none' , borderRadius : '10px'}}>
                <ListItemIcon>
                  <InfoIcon color='primary' fontSize="small" />
                </ListItemIcon>
                <Typography variant="body1" color={mainColorText}>Infomation</Typography>
              </MenuItem>
              </Link>
             <Link to='/profile_ListPayment'>
             <MenuItem onClick={() => handleCLickList(2)} sx={{background : (active === 2) ? "#a5d5ff8a" : 'none',borderRadius : '10px'}}>
                <ListItemIcon>
                  <ShoppingBasketIcon color='primary' fontSize="small" />
                </ListItemIcon>
                <Typography variant="body1" color={mainColorText}>purchased product</Typography>
              </MenuItem>
              </Link>
          <Link to='/profile_ListOrder'>
          <MenuItem onClick={() => handleCLickList(3)} sx={{background : (active === 3) ? "#a5d5ff8a" : 'none',borderRadius : '10px'}}>
                <ListItemIcon>
                  <ListAltIcon color='primary' fontSize="small" />
                </ListItemIcon>
                <Typography variant="body1" color={mainColorText}>List Order</Typography>
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
