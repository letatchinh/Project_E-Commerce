import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
} from "@mui/material";
import { Container, Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import "@fontsource/roboto/300.css";
import { useDispatch, useSelector } from "react-redux";
import { fecthLogginSuccess } from "../../../redux/login/Actions";
import { Link, useNavigate } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useForm } from "react-hook-form";
import HideShowPassword from "../../../components/client/HideShowPassword";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { fetchLoginWithGoogleAndFbRequest } from "../../../redux/sagas/Mysaga";
import '../../../components/StyleComponent/MyLink.css'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ToastError from "../../../components/client/ToastError";
import AxiosUser from "../../../apis/client/AxiosUser";
import { KEY_USER } from "../../../constant/LocalStored";
import ToastSuccess from "../../../components/client/ToastSuccess";
import LoadingButton from '@mui/lab/LoadingButton';

export default function LoginUser() {
  const [loading,setLoading] = useState(false)
  const schema = yup.object().shape({
    password: yup.string().required("Vui lòng nhập").min(2).max(20),
    email: yup.string().required("Vui lòng nhập").email(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const statusLogin = useSelector((state) => state.user.statusLogin);
  const onSubmit = async(data) => {
    setLoading(true)
  //  await dispatch(fetchLoginRequest(data));
    await AxiosUser.post('/api/users/loginUser',data).then(res => {
    localStorage.setItem(KEY_USER,JSON.stringify(res.data));
    dispatch(fecthLogginSuccess(res.data))
    ToastSuccess("Đăng nhập thành công")
    setLoading(false)
   }).catch(err => {
    console.log(err.response.data.message);
    setLoading(false)
    ToastError(err.response.data.message)
   }).finally(() => setLoading(false))
               
   
  };
  useEffect(() => {
    window.scroll(0, 0);
    if (statusLogin) {
      navigate(-1);
    }
  }, [statusLogin]);
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

  const responseFacebook = async (response) => {
    if(response.status !== "unknown"){
      const newUser = {
        password: response.id,
        email: response.email,
        name : response.name,
        phone : 0
      };
      dispatch(fetchLoginWithGoogleAndFbRequest(newUser))
    }
    else{
      ToastError("Đăng nhập FB thất bại")
    }
    
  };
  const responseGoogle = async (response) => {
    if(response.error === "popup_closed_by_user"){
      ToastError("Đăng nhập google thất bại")
    }
    else{
      const newUser = {
        email: response.profileObj.email,
        password: response.profileObj.googleId,
        name:response.profileObj.givenName + " " + response.profileObj.familyName,
        phone : 0
      };
      dispatch(fetchLoginWithGoogleAndFbRequest(newUser));
    }
   
  };
  return (
    <div style={{ background: "#F8F9FD", padding: "100px 0" }}>
      <Container sx={{ width: { md: "60%", xs: "100%" } }}>
        <Paper
          elevation={3}
          sx={{ display: "flex", flexDirection: { md: "row", xs: "column" } }}
        >
          <form
            style={{ flex: 1, padding: "50px" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack alignItems={"center"} spacing={2}>
              <Typography
                sx={{
                  backgroundImage: "linear-gradient(to right , orange, red)",
                  backgroundClip: "text",
                  color: "transparent",
                  width: "fit-content",
                }}
              >
                <CardGiftcardIcon sx={{ color: "orange" }} />
                Đăng nhập để nhận nhiều ưu đãi hơn
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <Typography variant="h6" color="#888">
                  ĐĂNG NHẬP
                </Typography>
                <Stack direction="row" spacing={1}>
                  <FacebookOutlinedIcon
                    color="primary"
                    sx={{ cursor: "pointer", fontSize: "30px" }}
                  />
                  <img
                    style={{
                      width: "28px",
                      height: "28px",
                      marginTop: "1px",
                      cursor: "pointer",
                    }}
                    src="https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK"
                    alt="google"
                  />
                </Stack>
              </Stack>
              <TextField
                size="small"
                {...register("email")}
                fullWidth
                label="Email"
                variant="outlined"
                error={errors.email !== undefined}
                helperText={errors.email && errors?.email.message}
              />
              <HideShowPassword
                error={errors.password !== undefined}
                message={errors.password && errors.password.message}
                {...register("password")}
              />
           
              <LoadingButton loading={loading} sx={{
                  backgroundImage: "linear-gradient(45deg, #E26560, #E36183)",
                  borderRadius: "50px",
                }}
                fullWidth
                type="submit"
                variant="contained">
        Đăng nhập
      </LoadingButton>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <FormControlLabel
                  sx={{ margin: 0 }}
                  control={<Checkbox defaultChecked />}
                  label="Nhớ mật khẩu"
                />
                <Link to="/forgotPassword">
                  <Typography className="Mylink" variant="body2" color="#888">
                    Quên mật khẩu
                  </Typography>
                </Link>
              </Stack>
              <FacebookLogin
              textButton="Đăng nhập với FB"
                appId="3267114616941933"
                fields="name,email,picture"
                callback={responseFacebook}
                icon={<FacebookIcon />}
              />
              <Typography>Hoặc</Typography>
              <GoogleLogin
                clientId="102456725904-0gb4rrpp4337idg21co7gar7a72mk5ll.apps.googleusercontent.com"
                buttonText="Đăng nhập với Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </Stack>
          </form>
          <Stack
            padding="20px 0"
            spacing={2}
            color="white"
            justifyContent="center"
            alignItems="center"
            sx={{
              width: { md: "50%", sm: "100%" },
              backgroundImage: "linear-gradient(45deg, #E26560, #E36183)",
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              Chào mừng bạn đến với đăng nhập
            </Typography>
            <Typography fontWeight="300">Bạn không có tài khoản ?</Typography>
            <Link to="/register">
              {" "}
              <Button
                sx={{
                  color: "white",
                  borderColor: "white",
                  borderRadius: "40px",
                }}
                variant="outlined"
              >
                Đăng ký
              </Button>
            </Link>
          </Stack>
        </Paper>
      </Container>
    </div>
  );
}
