import {
  Avatar,
  ListItemIcon,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { Container, Stack } from "@mui/system";
import React, {  useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import ListAltIcon from '@mui/icons-material/ListAlt';
export default function ProfileUser({children}) {
  const [active, setActive] = useState(1);
  const handleCLickList = (active) => {
    setActive(active)
  }
  return (
   <>
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
          <Link to='/profile_ListOrder'>
          <MenuItem onClick={() => handleCLickList(3)} sx={{background : (active === 3) ? "#a5d5ff8a" : 'none',borderRadius : '10px'}}>
                <ListItemIcon>
                  <ListAltIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">List Order</Typography>
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
