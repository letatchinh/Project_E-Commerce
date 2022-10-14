import React, { useEffect, useState } from "react";
import { Button, Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField } from "@mui/material";
import { Container, Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import "@fontsource/roboto/300.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fectchLogin,
  fetchCheckLogin,
  fetchLoginRequest,
  fetchRegisterRequest,
} from "../../../redux/login/Actions";
import * as TYPES from "../../../redux/login/Types";
import { Link, useNavigate } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import axios from "axios";
import { URL_BASE } from "../../../constant/UrlConstant";
import { v4 } from "uuid";
import { KEY_USER } from "../../../constant/LocalStored";
import { useForm } from "react-hook-form";
import HideShowPassword from "../../../components/client/HideShowPassword";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function LoginUser() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showPassword,setShowPassword] = useState(false)
  const [reRender, setReRender] = useState(false);
  const loginSuccess = useSelector((state) => state.user.loginSuccess);
  const statusLogin = useSelector((state) => state.user.statusLogin);
  const dispatch = useDispatch();
  const onSubmit = data => {
    dispatch(fetchLoginRequest(data))
  };
  useEffect(() => {
    if(localStorage.getItem(KEY_USER)){
      navigate("/")
    }
  },[localStorage.getItem(KEY_USER)])
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "102456725904-0gb4rrpp4337idg21co7gar7a72mk5ll.apps.googleusercontent.com",
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);
  useEffect(() => {
    if (statusLogin) {
      navigate("/");
      localStorage.setItem(KEY_USER, JSON.stringify(loginSuccess));
    }
  }, [reRender]);
  const navigate = useNavigate();
  const responseFacebook = async (response) => {
    const newUser = {
      username: response.id,
      password: response.id,
      listCarts: [],
      listOrder: [],
      email: response.email,
      phone: "",
      address: "",
      id: v4(),
    };
    const flag = await axios.get(`${URL_BASE}users?username=${response.id}`);
    if (flag.data.length === 0) {
      loginWithRegister(newUser);
    } else {
      loginWithoutRegister(newUser);
    }
  };
  const responseGoogle = async (response) => {
    const newUser = {
      username: response.profileObj.email,
      password: response.profileObj.googleId,
      email: response.profileObj.email,
      listCarts: [],
      listOrder: [],
      phone: "",
      name:
        response.profileObj.givenName + " " + response.profileObj.familyName,
      address: "",
      id: v4(),
    };
    const flag = await axios.get(
      `${URL_BASE}users?username=${response.profileObj.email}`
    );
    if (flag.data.length === 0) {
      loginWithRegister(newUser);
    } else {
      loginWithoutRegister(newUser);
    }
  };

  const loginWithRegister = async (data) => {
    await dispatch(fetchRegisterRequest(data));
    dispatch(fetchCheckLogin(data));
    dispatch(fectchLogin(data));
    setReRender(!reRender);
  };
  const loginWithoutRegister = (data) => {
    dispatch(fetchCheckLogin(data));
    dispatch(fectchLogin(data));
    setReRender(!reRender);
  };
  return (
    <div style={{background : '#F8F9FD', padding : '100px 0'}}>
    <Container sx={{ width: "60%" }}>
       <Paper elevation={3} sx={{  display : 'flex'}}>
       <form style={{width : '50%', padding : '50px'}} onSubmit={handleSubmit(onSubmit)}>
        <Stack alignItems={"center"} spacing={2}>
          <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'>
          <Typography variant="h6" color='#888' >
            LOGIN
          </Typography>
          <Stack direction='row' spacing={1}>
            <FacebookOutlinedIcon color='primary' sx={{cursor : 'pointer' ,fontSize : '30px'}}/>
            <img style={{width : '28px' , height : '28px' , marginTop : '1px' ,cursor : 'pointer'}} src="https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK" alt="google"/>
          </Stack>
          </Stack>
          <TextField size="small" 
            {...register("email")}
            fullWidth
            label="Email"
            variant="outlined"
          />
        <HideShowPassword  {...register("password")}/>
          <Button sx={{backgroundImage: "linear-gradient(45deg, #E26560, #E36183)" ,borderRadius : '50px'}} fullWidth type="submit" variant="contained">
            Login
          </Button>
        <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'>
        <FormControlLabel sx={{margin : 0}} control={<Checkbox defaultChecked />} label="Remember Me" />
        <Typography variant="body2" color='#888'>Forgot password</Typography>
        </Stack>
          {/* <FacebookLogin
            appId="3267114616941933"
            fields="name,email,picture"
            callback={responseFacebook}
            icon={<FacebookIcon />}
          />
          <GoogleLogin
            clientId="102456725904-0gb4rrpp4337idg21co7gar7a72mk5ll.apps.googleusercontent.com"
            buttonText="Login With Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          /> */}
        </Stack>
      </form>
      <Stack spacing={2} color='white' justifyContent='center' alignItems='center' style={{width : '50%',backgroundImage: "linear-gradient(45deg, #E26560, #E36183)"}}>
            <Typography variant="h5"  fontWeight='bold'>Welcome to login</Typography>
            <Typography fontWeight='300'>Don't have an account</Typography>
           <Link to='/register'> <Button sx={{color : 'white' , borderColor : 'white' , borderRadius : '40px'}} variant="outlined">Sign Up</Button></Link>
      </Stack>
       </Paper>
      
    </Container>
    </div>
  );
}
