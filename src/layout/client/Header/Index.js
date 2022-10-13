import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Container, Stack } from "@mui/system";
import {
  Grid,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fectchLogout, fecthLogginSuccess } from "../../../redux/login/Actions";
import { IS_STATUS_LOGIN } from "../../../redux/login/Types";
import LogoutIcon from "@mui/icons-material/Logout";
import { setSearch } from "../../../redux/shopping/Shopping-actions";
import { KEY_USER } from "../../../constant/LocalStored";
import { useForm } from "react-hook-form";
import IconCart from "../../../components/client/IconCart";
import "../../../components/StyleComponent/Icons.css";
import MyTypography from "../../../components/client/MyTypography";

import '../../../components/StyleComponent/Header.css'
import { fetchCartRequest } from "../../../redux/sagas/Mysaga";

export default function Index() {
const location = useLocation();
 const path_lo_out=["/login" , "/register"]
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCartRequest())
  }, [localStorage.getItem(KEY_USER)]);
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    dispatch(setSearch(data.searchKeyword));
    navigate("/");
  };
  const statusLogin = useSelector((state) => state.user.statusLogin);
  const loginSuccess = useSelector((state) => state.user.loginSuccess);
  const statusThemme = useSelector((state) => state.colorCommon.status);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    if (localStorage.getItem(KEY_USER)) {
      dispatch(fecthLogginSuccess(JSON.parse(localStorage.getItem(KEY_USER))));
      dispatch({ type: IS_STATUS_LOGIN, dispatch: "" });
      
    }
  }, [localStorage.getItem(KEY_USER)]);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(fectchLogout());
    localStorage.removeItem(KEY_USER);
    navigate("/");
  };
  const styHeadHomePage = {
    background: statusThemme
    ? "linear-gradient(rgb(238, 77, 45), rgb(255, 115, 55))"
    : "#00255E" ,
    padding: "5px"
  }
  const styHeadNotHomePage = {
    background: "transparent",
    padding: "5px",
    position : "absolute",
    zIndex : 10,
    top : 0,
    left : 0,
    right : 0,
  }
  const isHomePage = (window.location.href === "http://localhost:3000/");
  return (
    <>
      <div
        id="top"
        style={ window.location.href !== "http://localhost:3000/" ? styHeadHomePage : styHeadNotHomePage }
      >
        <Container sx={{ flexGrow: 1 }}>
          <Stack direction="row" padding="5px 20px" alignItems="center" justifyContent='space-between'>
          <Stack direction='row' spacing={1}>
          <Link to=''>
       <Button sx={{textTransform : 'capitalize',color : 'white'}}>
       About us
       </Button>
        </Link>
       <Link to=''>
       <Button sx={{textTransform : 'capitalize',color : 'white'}}>
       Contact
       </Button>
       </Link>
          </Stack>
           <Stack direction='row'  alignItems='center'>
              <Button 
              sx={{ textTransform: "capitalize" , display : statusLogin ? "flex" : "none" , gap : '8px' }}
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <AccountCircleOutlinedIcon
              
                className="IconsWhite"
                fontSize="medium"
              />
               <MyTypography fontSize="12px" color="white">
                {loginSuccess.name}
              </MyTypography>
               </Button>
              
           </Stack>
              <Stack  direction='row' spacing={2} display={path_lo_out.includes(location.pathname) ? "none" : 'flex' && !statusLogin ? "block" : 'none'  } >
              <Link to='/login'>
              <Button
            sx={{
              color: "white",
              borderColor: "white",
              background: "transparent",
            }}
            variant="outlined"
          >
            Login
          </Button>
              </Link>
              <Link to='/register'>
              <Button
            sx={{
              color: "white",
              borderColor: "white",
              background: "transparent",
            }}
            variant="outlined"
          >
            Sign Up
          </Button>
              </Link>
              </Stack>
              
           
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <div style={{ display: statusLogin ? "block" : "none" }}>
                <Link to="/profile_Info">
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Link>
                <MenuItem
                  onClick={() => {
                    handleLogout();
                    handleClose();
                  }}
                >
                  <LogoutIcon />
                  Logout
                </MenuItem>
              </div>
              <div style={{ display: !statusLogin ? "block" : "none" }}>
                <Link to="/login">
                  {" "}
                  <MenuItem onClick={handleClose}>Login</MenuItem>
                </Link>
              </div>
            </Menu>
          </Stack>
          <Grid
            flexWrap="nowrap"
            container
            justifyContent={"space-around"}
            alignItems={"center"}
          >
            <Grid item xs={2}>
              <Link
                onClick={() => {
                  dispatch(setSearch(""));
                  reset();
                }}
                to="/"
              >
                <Typography sx={{textShadow : !statusThemme ? "0 0 10px #f3f3f3" : "none"}} className="myLogo" fontSize='3rem' color='white'>UT</Typography>
                
              </Link>
            </Grid>
            <Grid item xs={8} sm={8}>
              <Paper
                onSubmit={handleSubmit(onSubmit)}
                component="form"
                sx={{
                  p: "2px 4px",
                  display: window.location.href.includes(
                    "http://localhost:3000/profile_"
                  )
                    ? "none"
                    : "flex",
                  alignItems: "center",
                  width: "82%",
                  background: isHomePage ? "rgba(255,255,255,0.2)" : "white",
                  borderRadius: "25px",
                }}
              >
                <InputBase
                  {...register("searchKeyword")}
                  sx={{ ml: 1, flex: 1 , color : 'black' }}
                  placeholder="Search"
                  inputProps={{ "aria-label": "search" }}
                />
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>
            <Grid sx={{ display: "flex", alignItems: "center" }} item>
              <IconCart />
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}
