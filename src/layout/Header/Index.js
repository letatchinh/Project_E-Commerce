import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Container } from "@mui/system";
import {   Badge, Grid, Menu, MenuItem, Typography } from "@mui/material";
import { Link,  useNavigate } from "react-router-dom";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useDispatch, useSelector } from "react-redux";
import { fectchLogout } from "../../redux/login/Actions";
import { IS_STATUS_LOGIN } from "../../redux/login/Types";
import LogoutIcon from '@mui/icons-material/Logout';
import Cart from "../../components/client/Cart";
import { search, setSearch } from "../../redux/shopping/Shopping-actions";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { KEY_USER } from "../../constant/LocalStored";
export default function Index() {
  const [user,setUser] = useState({})
  const [displayCart,setDisplayCart] = useState(false)
  const statusLogin = useSelector(state => state.user.statusLogin);
  const loginSuccess = useSelector(state => state.user.loginSuccess)
  const searchKeyword = useSelector(state => state.shop.searchKeyword)
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    if(localStorage.getItem(KEY_USER))
  {
    const item = JSON.parse(localStorage.getItem(KEY_USER));
    setUser(item)
    dispatch({type : IS_STATUS_LOGIN ,dispatch : ""})
  }
  },[localStorage.getItem(KEY_USER)])
  const handleClose = () => {
    setAnchorEl(null);

  };
  const handleLogout = () => {
    dispatch(fectchLogout())
    localStorage.removeItem(KEY_USER)
    navigate('/')
    
  }
  const changeInputSearch = (e) => {
    dispatch(search(e.target.value))
  }
  const setInputSearch = () => {
    dispatch(setSearch(searchKeyword))
  }
  return (
    <>
 <Grid alignItems={"center"} justifyContent={"space-around"} container sx={{background : "#F6F415", height : "50px" , display : {xs : 'none', sm : 'flex'}}}>
 
 <Grid  item xs={4}>
 <span>0905970965</span>
 </Grid>
 <Grid item xs={4} md={4}>
   <Grid justifyContent='flex-end' container spacing={5}>
   <Grid item>
   <FacebookIcon/>
   </Grid>
   <Grid item>
   <InstagramIcon/>
   </Grid>
   <Grid item>
   <YouTubeIcon/>
   </Grid>
   <Grid item>
   <PinterestIcon/>
   </Grid>
   </Grid>
 </Grid>
 </Grid>
    <Container sx={{ flexGrow: 1 }}>
      <Grid container justifyContent={"space-around"} alignItems={"center"}>
        <Grid item xs={2} sx={{display : {xs : 'none' ,sm : 'block'}}}>
         <Link to='/'><img
            style={{ borderRadius: "50%", width: "100%" }}
            src="https://img.freepik.com/free-vector/fashion-logo-editorial-template_23-2148701249.jpg?w=2000"            alt="logo"
          /></Link>
        </Grid>
        <Grid item xs={8} sm={8}>
          {" "}
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField onChange={changeInputSearch} value={searchKeyword} fullWidth label="Search" variant="outlined" />
            <Link to='/search'><Button onClick={setInputSearch} variant="outlined" startIcon={<SearchIcon />}> <Typography sx={{display : {xs : 'none' , sm : 'inline'}}} variant="body1" >
        Search
      </Typography></Button></Link>
          </div>
        </Grid>
        <Grid sx={{display : "flex" , alignItems : "center"}} item >
          <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
          <AccountCircleIcon color="primary" fontSize="large"/>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
       <div style={{display : (statusLogin) ? "block" : "none"}}> 
        <MenuItem onClick={handleClose}>{user.username}</MenuItem>
       <Link to='/profile_Info'>
       <MenuItem onClick={handleClose}>My account</MenuItem>
       </Link>
        <MenuItem  onClick={() => {handleLogout() ; handleClose()}}><LogoutIcon/>Logout</MenuItem>
        </div>
       <div style={{display : (!statusLogin) ? "block" : "none"}}> 
       <Link to='/login'> <MenuItem onClick={handleClose}>Login</MenuItem></Link>
        
        </div>
      </Menu>
      <Badge sx={{position : "relative"}} color="secondary" badgeContent={loginSuccess.listCarts.length}>
        <ShoppingBagOutlinedIcon onClick={() => setDisplayCart(!displayCart)} fontSize="large" sx={{ cursor :"pointer"}}/>
        <Cart offCart={() => setDisplayCart(!displayCart)} display={displayCart}/>
      </Badge>
      {/* <Badge sx={{position : "relative"}} color="secondary" badgeContent={2}>
        <NotificationsIcon onClick={() => setDisplayCart(!displayCart)} fontSize="large" sx={{ cursor :"pointer"}}/>
        <Cart display={displayCart}/>
      </Badge> */}
      
        </Grid>
      </Grid>
    </Container>
    </>
  );
}
