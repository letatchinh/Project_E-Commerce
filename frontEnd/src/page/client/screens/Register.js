import { Button, Paper, TextField, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch} from "react-redux";
import {
  fetchLoginRequest,
} from "../../../redux/login/Actions";

import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import brcypt from "bcryptjs";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import ToastSuccess from "../../../components/client/ToastSuccess";
import ToastError from "../../../components/client/ToastError";
import HideShowPassword from "../../../components/client/HideShowPassword";
import { REGEX_ONLY_NUMBER } from "../../../constant/YupGlobal";
import LoadingButton from "@mui/lab/LoadingButton";

export default function Register() {
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate();
  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên").min(2).max(20),
    password: yup.string().required("Vui lòng nhập mật khẩu").min(2).max(20),
    email: yup.string().required("Vui lòng nhập email").email(),
    phone : yup.string().required("Vui lòng nhập số điện thoại").min(2).max(11).matches(REGEX_ONLY_NUMBER,"Phone is not wrong")
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    const newUser = {
      name: data.name,
      password: brcypt.hashSync(data.password, 10),
      email: data.email,
      address : "",
      avatar : "",
      phone : data.phone
    };
    setLoading(true)
    axios
      .post(`/api/users/`, newUser)
      .then((res) => {
        ToastSuccess("Đăng ký thành công!");
        setLoading(false)
        dispatch(
          fetchLoginRequest({ email: res.data.email, password: data.password })
        );
        navigate("/");
      })
      .catch((error) => {
        setLoading(false)
        ToastError(error.response.data.message);
      }).finally(() => setLoading);
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
                    Đăng ký
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
                  label="Tên"
                  variant="outlined"
                  error={errors.name !== undefined}
                  helperText={errors.name && errors?.name.message}
                />
                <TextField
                  size="small"
                  {...register("phone")}
                  fullWidth
                  label="Số điện thoại"
                  variant="outlined"
                  error={errors.phone !== undefined}
                  helperText={errors.phone && errors?.phone.message}
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
                <LoadingButton loading={loading} sx={{
                  backgroundImage: "linear-gradient(45deg, #E26560, #E36183)",
                  borderRadius: "50px",
                }}
                fullWidth
                type="submit"
                variant="contained">
        Đăng ký
      </LoadingButton>
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
                Chào mừng đến với đăng ký
              </Typography>
              <Typography fontWeight="300">Bạn đã có tài khoản</Typography>
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
                  Đăng nhập ngay
                </Button>
              </Link>
            </Stack>
          </Paper>
        </Container>
      </div>
    </>
  );
}
