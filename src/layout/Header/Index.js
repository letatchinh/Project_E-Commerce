import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';import { Container, Stack } from "@mui/system";
import {  Grid, IconButton, InputBase, Menu, MenuItem, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fectchLogout } from "../../redux/login/Actions";
import { IS_STATUS_LOGIN } from "../../redux/login/Types";
import LogoutIcon from "@mui/icons-material/Logout";
import { setSearch } from "../../redux/shopping/Shopping-actions";
import { KEY_USER } from "../../constant/LocalStored";
import { useForm } from "react-hook-form";
import IconCart from "../../components/client/IconCart";
import '../../components/StyleComponent/Icons.css'
import LogoDevIcon from '@mui/icons-material/LogoDev';
import SwitchBackGround from "../../components/client/SwitchBackGround";
export default function Index() {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    dispatch(setSearch(data.searchKeyword));
    navigate("/");
  };
  const [user, setUser] = useState({});
  const statusLogin = useSelector((state) => state.user.statusLogin);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    if (localStorage.getItem(KEY_USER)) {
      const item = JSON.parse(localStorage.getItem(KEY_USER));
      setUser(item);
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
  return (
    <>
     <div style={{background: "linear-gradient(#ee4d2d,#ff7337)" , padding : '5px'}}> <Container sx={{ flexGrow: 1 }}>
    <Stack direction='row' padding='0 20px' alignItems='center' justifyContent='flex-end'>
    <SwitchBackGround />
    <Button sx={{textTransform : 'capitalize'}}
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <AccountCircleOutlinedIcon className="IconsWhite" fontSize="medium" />
            <Typography fontSize='12px' color='white'>{user.name}</Typography>
            </Button>
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
        <Grid flexWrap='nowrap' container justifyContent={"space-around"} alignItems={"center"}>
          <Grid item xs={2}>
            <Link
              onClick={() => {
                dispatch(setSearch(""));
                reset();
              }}
              to="/"
            >
              <LogoDevIcon   className="IconsWhite IconLarge"/>
              
            </Link>
          </Grid>
          <Grid item xs={8} sm={8}>
              <Paper onSubmit={handleSubmit(onSubmit)}
      component="form"
      sx={{ p: '2px 4px', display: (window.location.href).includes('http://localhost:3000/profile_')? 'none' : "flex", alignItems: 'center', width: '100%' }}
    >
      <InputBase  {...register("searchKeyword")}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
          </Grid>
          <Grid sx={{ display: "flex", alignItems: "center" }} item>
           
              <IconCart />
          </Grid>
        </Grid>
      </Container></div>
    </>
  );
}
