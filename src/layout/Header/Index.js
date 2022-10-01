import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Container } from "@mui/system";
import {  Grid, IconButton, InputBase, Menu, MenuItem, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fectchLogout } from "../../redux/login/Actions";
import { IS_STATUS_LOGIN } from "../../redux/login/Types";
import LogoutIcon from "@mui/icons-material/Logout";
import { setSearch } from "../../redux/shopping/Shopping-actions";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { KEY_USER } from "../../constant/LocalStored";
import { useForm } from "react-hook-form";
import IconCart from "../../components/client/IconCart";
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
      <Grid
        alignItems={"center"}
        justifyContent={"space-around"}
        container
        sx={{
          background: "linear-gradient(#ee4d2d,#ff7337)",
          height: "50px",
          display: { xs: "none", sm: "flex" },
          color : 'white'
        }}
      >
        <Grid item xs={4}>
          <span>0905970965</span>
        </Grid>
        <Grid item xs={4} md={4}>
          <Grid justifyContent="flex-end" container spacing={5}>
            <Grid item>
              <FacebookIcon />
            </Grid>
            <Grid item>
              <InstagramIcon />
            </Grid>
            <Grid item>
              <YouTubeIcon />
            </Grid>
            <Grid item>
              <PinterestIcon />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Container sx={{ flexGrow: 1 }}>
        <Grid container justifyContent={"space-around"} alignItems={"center"}>
          <Grid item xs={2} sx={{ display: { xs: "none", sm: "block" } }}>
            <Link
              onClick={() => {
                dispatch(setSearch(""));
                reset();
              }}
              to="/"
            >
              <img
                style={{ borderRadius: "50%", width: "100%" }}
                src="https://img.freepik.com/premium-vector/orange-shop-letter-initial-logo_599932-269.jpg"
                alt="logo"
              />
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
            <Button
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <AccountCircleIcon color="primary" fontSize="large" />
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
                <MenuItem onClick={handleClose}>{user.name}</MenuItem>
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
         
              <IconCart />
        
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
