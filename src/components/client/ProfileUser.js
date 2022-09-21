import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { Container, Stack } from "@mui/system";
import axios from "axios";
import React, { Children, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { URL_BASE } from "../../constant/UrlConstant";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import Header from "../../layout/Header/Index"

export default function ProfileUser({children}) {
  const [active, setActive] = useState(1);
  const handleCLickList = (active) => {
    setActive(active)
  }
  return (
   <>
   <Header />
   <div style={{ background: "#F0F2F5", padding: "10px" }}>
      <Container sx={{ background: "white", borderRadius: "20px" }}>
        <Stack direction="row">
          <Stack width="30%" borderRight="1px solid #F0F2F5">
            <Avatar
              sx={{ height: "170px", width: "170px" }}
              alt="Remy Sharp"
              src="https://laz-img-sg.alicdn.com/p/06df75c72185d9d20a426d932b7326a2.jpg"
            />
            <MenuList>
              <Link to='/profile_Info'> 
              <MenuItem onClick={() => handleCLickList(1)} sx={{background : (active === 1) ? "#a5d5ff8a" : 'none' , borderRadius : '10px'}}>
                <ListItemIcon>
                  <InfoIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">Infomation</Typography>
              </MenuItem>
              </Link>
             <Link to='/profile_ListPayment'>
             <MenuItem onClick={() => handleCLickList(2)} sx={{background : (active === 2) ? "#a5d5ff8a" : 'none',borderRadius : '10px'}}>
                <ListItemIcon>
                  <ShoppingBasketIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">Payment</Typography>
              </MenuItem>
             </Link>
            </MenuList>
          </Stack>
         {/* <InfoUser/> */}
        <Container width='100%'>
          {children}
        </Container>
        </Stack>
      </Container>
    </div>
   </> 
  )
}
