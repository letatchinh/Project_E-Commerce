import { Button, Paper, TextField, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoginRequest,
  fetchRegisterRequest,
} from "../../../redux/login/Actions";
import {
  CAM_LE,
  HAI_CHAU,
  HOA_VANG,
  THANH_KHE,
  NGU_HANH_SON,
  SON_TRA,
  LIEN_CHIEU,
  QUAN,
} from "../../../constant/Key";
import { v4 } from "uuid";
import axios from "axios";
import * as regex from "../../../constant/YupGlobal.js";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import brcypt from "bcryptjs";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import ToastSuccess from "../../../components/client/ToastSuccess";
import ToastError from "../../../components/client/ToastError";
import { KEY_USER } from "../../../constant/LocalStored";
import HideShowPassword from "../../../components/client/HideShowPassword";

export default function Register() {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    name: yup.string().required("Required").min(2).max(20),
    // username: yup.string().required("Required").min(2).max(20),
    password: yup.string().required("Required").min(2).max(20),
    email: yup.string().required("Required").email(),
    // quan: yup.string().required("Required"),
    // phuong: yup.string().required("Required"),
    // numberHouse: yup.string().required("Required").min(2).max(30),
    // phone: yup
    //   .string()
    //   .required("Required")
    //   .matches(regex.REGEX_ONLY_NUMBER, "Không đúng định dạng"),
  });
  const [isCheckDistrit, setisCheckDistrit] = useState(false);
  const [addressSelect, setAddressSelect] = useState("");
  const [SubDistrict, setSubDistrict] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    // const newAddress =
    // data.numberHouse + "," + data.phuong + "," + data.quan + ",Đà nẵng";
    const newUser = {
      name: data.name,
      password: brcypt.hashSync(data.password, 10),
      email: data.email,
    };
    axios
      .post(`/api/users/,newUser`)
      .then((res) => {
        ToastSuccess("Resgister Success!");
        dispatch(
          fetchLoginRequest({ email: res.data.email, password: data.password })
        );
        navigate("/");
      })
      .catch((error) => {
        ToastError(error.response.data.message);
      });
  };
  return (
    <>
      <div style={{ background: "#F8F9FD" }}>
        <Container
          sx={{ width: { md: "60%", xs: "100%" }, padding: "100px 0" }}
        >
          <Paper
            elevation={3}
            sx={{ display: "flex", flexDirection: { md: "row", xs: "column" } }}
          >
            <form
              style={{ flex: 1, padding: "50px" }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Stack alignItems={"center"} spacing={2}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%"
                >
                  <Typography variant="h6" color="#888">
                    Sign Up
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
                  {...register("name")}
                  fullWidth
                  label="Name"
                  variant="outlined"
                  error={errors.name !== undefined}
                  helperText={errors.name && errors?.name.message}
                />
                <TextField
                  size="small"
                  {...register("email")}
                  fullWidth
                  label="Email"
                  variant="outlined"
                  autoComplete="username"
                  error={errors.email !== undefined}
                  helperText={errors.email && errors?.email.message}
                />
                <HideShowPassword
                  error={errors.password !== undefined}
                  message={errors.password && errors.password.message}
                  {...register("password")}
                />
                <Button
                  sx={{
                    backgroundImage: "linear-gradient(45deg, #E26560, #E36183)",
                    borderRadius: "50px",
                  }}
                  fullWidth
                  type="submit"
                  variant="contained"
                >
                  Register
                </Button>

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
            <Stack
              spacing={2}
              color="white"
              justifyContent="center"
              alignItems="center"
              sx={{
                width: { md: "50%", sm: "100%" },
                backgroundImage: "linear-gradient(45deg, #E26560, #E36183)",
                padding: "20px 0",
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                Welcome to Sign Up
              </Typography>
              <Typography fontWeight="300">You have an account</Typography>
              <Link to="/login">
                {" "}
                <Button
                  sx={{
                    color: "white",
                    borderColor: "white",
                    borderRadius: "40px",
                  }}
                  variant="outlined"
                >
                  Login
                </Button>
              </Link>
            </Stack>
          </Paper>
        </Container>
      </div>
      {/* <form onSubmit={handleSubmit(onSubmit)} style={{padding : '50px 0'}}>
    <Stack spacing={3} sx={{width : "30%" , margin : "0 auto"}}>
    <TextField  {...register("username",{ required: true })} label="UserName" variant="outlined" />
    {errors.username && (
            <Alert severity="error">{errors.username?.message}</Alert>
          )}
          <TextField  {...register("name")} label="Name" variant="outlined" />
    {errors.name && (
            <Alert severity="error">{errors.name?.message}</Alert>
          )}
   
   
    <TextField  {...register("phone",{ required: true })}  label="Phone" variant="outlined" />
    {errors.phone && (
            <Alert severity="error">{errors.phone?.message}</Alert>
          )}
    <TextField  {...register("email",{ required: true })}  label="Email" variant="outlined" />
    {errors.email && (
            <Alert severity="error">{errors.email?.message}</Alert>
          )}
          <TextField  {...register("password",{ required: true })} type='password' label="PassWord" variant="outlined" />
    {errors.password && (
            <Alert severity="error">{errors.password?.message}</Alert>
          )}
    <InputLabel id="demo-simple-select-label">
            Vui lòng chọn đúng địa chỉ , nếu không bạn sẽ mất quyền lợi
          </InputLabel>
         
          <InputLabel id="demo-simple-select-label">Quận Huyện</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={addressSelect}
            {...register("quan", {
              onChange: (e) => {
                setAddressSelect(e.target.value);
                setValue('phuong', '');
                setSubDistrict('')
              },
            })}
            label="Quận"
          >
          
            {QUAN.map(e => <MenuItem key={v4()} value={e}>{e}</MenuItem>) }
          </Select>
          {errors.quan && (
            <Alert severity="error">{errors.quan?.message}</Alert>
          )}
          <InputLabel id="demo-simple-select-label">Phường</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            {...register("phuong", {
              onChange: (e) => {
                setisCheckDistrit(true);
                setSubDistrict(e.target.value);
              },
            })}
            label="Phường"
            value={SubDistrict}
          >
          
            {CAM_LE.map((e) => (
              <MenuItem
                sx={{ display: addressSelect === "Cẩm Lệ" ? "block" : "none" }}
                value={e} key={v4()}
              >
                {e}
              </MenuItem>
            ))}
            
            {
              THANH_KHE.map(e => <MenuItem
                sx={{ display: addressSelect === "Thanh Khê" ? "block" : "none" }}
                value={e} key={v4()}
              >
                {e}
              </MenuItem>)
            }
            {
              HAI_CHAU.map(e => <MenuItem
                sx={{ display: addressSelect === "Hải Châu" ? "block" : "none" }}
                value={e} key={v4()}
              >
                {e}
              </MenuItem>)
            }
            {
              HOA_VANG.map(e => <MenuItem
                sx={{ display: addressSelect === "Hoà Vang" ? "block" : "none" }}
                value={e} key={v4()}
              >
                {e}
              </MenuItem>)
            }
            {
              SON_TRA.map(e => <MenuItem
                sx={{ display: addressSelect === "Sơn Trà" ? "block" : "none" }}
                value={e} key={v4()}
              >
                {e}
              </MenuItem>)
            }
            {
              NGU_HANH_SON.map(e => <MenuItem
                sx={{ display: addressSelect === "Ngũ Hành Sơn" ? "block" : "none" }}
                value={e} key={v4()}
              >
                {e}
              </MenuItem>)
            }
            {
              LIEN_CHIEU.map(e => <MenuItem
                sx={{ display: addressSelect === "Liên Chiểu" ? "block" : "none" }}
                value={e} key={v4()}
              >
                {e}
              </MenuItem>)
            }
            
          </Select>
          {errors.phuong && (
            <Alert severity="error">{errors.phuong?.message}</Alert>
          )}
          <TextField
            fullWidth
            sx={{ display: isCheckDistrit ? "block" : "none" }}
            {...register("numberHouse")}
            label="apartment number : Vui lòng viết tiếng việt có dấu"
            variant="outlined"
          />
           {errors.numberHouse && (
            <Alert severity="error">{errors.numberHouse?.message}</Alert>
          )}
    <Button type='submit' variant="contained">Register</Button>
    </Stack>

  </form> */}
    </>
  );
}
