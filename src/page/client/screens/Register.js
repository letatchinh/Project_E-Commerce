import { Button, Paper, TextField, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import React from "react";
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

export default function Register() {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    name: yup.string().required("Required").min(2).max(20),
    password: yup.string().required("Required").min(2).max(20),
    email: yup.string().required("Required").email(),
  });
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
    const newUser = {
      name: data.name,
      password: brcypt.hashSync(data.password, 10),
      email: data.email,
      address : "",
      avatar : ""
    };
    axios
      .post(`/api/users/`, newUser)
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
    </>
  );
}
