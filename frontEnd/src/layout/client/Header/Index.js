import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
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
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fectchLogout, fecthLogginSuccess } from "../../../redux/login/Actions";
import { IS_STATUS_LOGIN } from "../../../redux/login/Types";
import LogoutIcon from "@mui/icons-material/Logout";
import { KEY_USER } from "../../../constant/LocalStored";
import { useForm } from "react-hook-form";
import IconCart from "../../../components/client/IconCart";
import "../../../components/StyleComponent/Icons.css";
import MyTypography from "../../../components/client/MyTypography";
import '../../../components/StyleComponent/Header.css'
import { fetchCartRequest, fetchSearchOnkeyUpRequest } from "../../../redux/sagas/Mysaga";
import { reSetFilter, setCategorySearch, setKeywordSearch } from "../../../redux/filterProduct/Actions";
import ToastError from "../../../components/client/ToastError";
import CategoryBannerMobile from "../../../components/client/CategoryBannerMobile";
import ListItemSearchOnKey from "../../../components/client/ListItemSearchOnKey";
import LoadingHomePage from "../../../components/client/LoadingHomePage";

export default function Index({aboutActive,contactActive}) {
const location = useLocation();
const statusLogin = useSelector((state) => state.user.statusLogin);
const loginSuccess = useSelector((state) => state.user.loginSuccess);
const statusThemme = useSelector((state) => state.colorCommon.status);
const [statusOpenSearch,setStatusOpenSearch] = useState(false)
const [listSuggestSearch,setListSuggestSearch] = useState([])
const [loadingSearch,setLoadingSearch] = useState(false)
let [searchParams, setSearchParams] = useSearchParams()
const [anchorEl, setAnchorEl] = useState(null);
const open = Boolean(anchorEl);
const navigate = useNavigate();
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
 const path_lo_out=["/login" , "/register"]
 const isCategory = "/product/"
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCartRequest())
  }, [localStorage.getItem(KEY_USER)]);
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async(data) => {
    if(data.searchKeyword.trim() === " ") {
      ToastError("Vui lòng viết sản phẩm bạn muốn")
    }
   else{
   await dispatch(setKeywordSearch(data.searchKeyword.trim()));

   await navigate("/search");
    handleCloseSearch()
   }
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
    padding: "0px 5px 5px 5px",
   
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
  const handleOnKeyUp = async(e) => {
    setLoadingSearch(true)
   await dispatch(fetchSearchOnkeyUpRequest({value : e.target.value , func : setListSuggestSearch,funcLoading :  setLoadingSearch}))  
  }
  const handleOpenSearch = () => {
    setStatusOpenSearch(true)
  }
  const handleCloseSearch = () => {
    setStatusOpenSearch(false)
  }
  return (
    <>
   
      <div
        style={ !isHomePage ? styHeadHomePage : styHeadNotHomePage }
      >
       <CategoryBannerMobile />
        <Container sx={{ flexGrow: 1 }}>
          <Stack direction="row" padding="0px" alignItems="center" justifyContent='space-between'>
          <Stack direction='row' spacing={1} alignItems='center'>
          <Link to='/'>
       <Button  sx={{textTransform : 'capitalize',color : 'white', display : {md : 'block' , xs : 'none'}}}>
       Trang chủ
       </Button>
        </Link>
        <Link to='/products'>
       <Button onClick={() => dispatch(reSetFilter())} sx={{textTransform : 'capitalize',color : 'white', display : {md : 'block' , xs : 'none'}, fontSize : contactActive ? '1rem' : '0.875rem' , textShadow : contactActive ? '0 0 20px white' : 'none'}}>
       Danh sách sản phẩm
       </Button>
       </Link>
          <Link to='/about'>
       <Button   sx={{textTransform : 'capitalize',color : 'white', display : {md : 'block' , xs : 'none'} , fontSize : aboutActive ? '1rem' : '0.875rem' , textShadow : aboutActive ? '0 0 20px white' : 'none'}}>
       Về chúng tôi
       </Button>
        </Link>
       <Link to='/contact'>
       <Button sx={{textTransform : 'capitalize',color : 'white', display : {md : 'block' , xs : 'none'}, fontSize : contactActive ? '1rem' : '0.875rem' , textShadow : contactActive ? '0 0 20px white' : 'none'}}>
       Liên hệ
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
              <div style={{width : '35px' , height : '35px'}}><img style={{height : '100%',objectFit : 'cover' , borderRadius : '50%'}} src={loginSuccess.avatar === "" ? "/images/img02.png" : `/images/${loginSuccess.avatar}` } alt="avatart"/></div>
               <MyTypography fontSize="12px" color="white">
                {loginSuccess.name}
              </MyTypography>
               </Button>
              
           </Stack>
              <Stack paddingTop='5px'  direction='row' spacing={2} display={path_lo_out.includes(location.pathname) ? "none" : 'flex' && !statusLogin ? "block" : 'none'  } >
              <Link to='/login'>
              <Button
            sx={{
              color: "white",
              borderColor: "white",
              background: "transparent",
            }}
            variant="outlined"
          >
            Đăng nhập
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
            Đăng ký
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
                  dispatch(setKeywordSearch(""));
                  dispatch(setCategorySearch(null))
                  setSearchParams({'name' : ""})
                  reset();
                }}
                to="/"
              >
                <Typography onClick={() => dispatch(reSetFilter())} sx={{textShadow : !statusThemme ? "0 0 10px #f3f3f3" : "none"}} className="myLogo" fontSize='3rem' color='white'>UT</Typography>
                
              </Link>
            </Grid>
            <Grid item xs={8} sm={8}>
              <Paper onFocus={handleOpenSearch}
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
                  position : 'relative',
                  borderRadius: "25px",
                  zIndex : listSuggestSearch.length !== 0 ? 9999999 : 1
                }}
              >
                <InputBase onKeyUp={handleOnKeyUp}
                  {...register("searchKeyword",{ required: true })}
                  sx={{ ml: 1, flex: 1}}
                  placeholder={(location.pathname.includes(isCategory)) ? `Search in ${location.pathname.slice(9)}` : "Search"}
                  inputProps={{ "aria-label": "search" }}
                  error
                />
                {  loadingSearch ? <Stack sx={{position : 'absolute' , top : '100%', width : '100%' ,left : 0,right : 0 ,background : 'white' ,borderRadius : '20px', padding : '20px 10px' , zIndex : 10, border : "1px solid #1976d2"}}>
                <LoadingHomePage/>
                </Stack> : statusOpenSearch && listSuggestSearch.length !== 0 && <ListItemSearchOnKey clickClose={handleCloseSearch}  data={listSuggestSearch}/>}
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
              {listSuggestSearch.length !== 0 && <div onClick={handleCloseSearch} style={{position : 'fixed' , inset : 0,background : "#00000069" , zIndex : 10011 , display : statusOpenSearch ? "block" : 'none'}}></div>}
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
