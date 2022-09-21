import { Button, List, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ItemInfoUser from "./ItemInfoUser";
import PeopleIcon from "@mui/icons-material/People";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { Stack } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import ContentTop from "./ContentTop";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useForm } from "react-hook-form";
import "@fontsource/roboto/700.css";
import DoneIcon from "@mui/icons-material/Done";
import { fetchEditUserRequest } from "../../redux/login/Actions";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as regex from "../../constant/YupGlobal.js";
import Alert from "@mui/material/Alert";

export default function InfoUser() {
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.loginSuccess);
  const schema = yup.object().shape({
    name: yup.string().required("Required").min(2).max(20),
    email: yup.string().required("Required").email(),
    phone: yup
      .string()
      .required("Required")
      .matches(regex.REGEX_ONLY_NUMBER, "Không đúng định dạng"),
    address: yup.string().required("Required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    setLoading(true);
    const userEdit = {
      ...user,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
    };
    await dispatch(fetchEditUserRequest(userEdit));
    setStatus(!status);
    reset();
    setLoading(false);
  };
  return (
    <>
      <ContentTop value={"Infomation"} />
      <form
        style={{ padding: "10px", display: status ? "block" : "none" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={2}>
          <TextField
            defaultValue={user.name}
            fullWidth
            {...register("name")}
            label="Name"
            variant="outlined"
          />{" "}
          {errors.name && (
            <Alert severity="error">{errors.name?.message}</Alert>
          )}
          <TextField
            defaultValue={user.email}
            fullWidth
            {...register("email")}
            label="Email"
            variant="outlined"
          />
          {errors.email && (
            <Alert severity="error">{errors.email?.message}</Alert>
          )}
          <TextField
            defaultValue={user.phone}
            fullWidth
            {...register("phone")}
            label="Phone"
            variant="outlined"
          />{" "}
          {errors.phone && (
            <Alert severity="error">{errors.phone?.message}</Alert>
          )}
          <TextField
            defaultValue={user.address}
            fullWidth
            {...register("address")}
            label="Address"
            variant="outlined"
          />{" "}
          {errors.address && (
            <Alert severity="error">{errors.address?.message}</Alert>
          )}
          <Stack
            sx={{ marginLeft: "auto!important" }}
            direction="row"
            spacing={2}
          >
            <Button
              onClick={() => setStatus(!status)}
              sx={{
                width: "80px",
                display: status ? "flex" : "none",
                textTransform: "capitalize",
              }}
              variant="contained"
            >
              <Typography variant="body1" fontWeight="600">
                Cancel
              </Typography>
            </Button>
            <Button
              disabled={loading}
              type="submit"
              sx={{
                width: "80px",
                display: status ? "flex" : "none",
                textTransform: "capitalize",
              }}
              variant="contained"
              endIcon={<DoneIcon />}
            >
              <Typography variant="body1" fontWeight="600">
                Save
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </form>
      <List style={{ display: !status ? "block" : "none" }}>
        <ItemInfoUser icon={<PeopleIcon />} value={user.name} />
        <ItemInfoUser icon={<EmailIcon />} value={user.email} />
        <ItemInfoUser icon={<PhoneIcon />} value={user.phone} />
        <ItemInfoUser icon={<LocationOnIcon />} value={user.address} />
      </List>
      <Button
        onClick={() => setStatus(!status)}
        sx={{
          marginLeft: "auto",
          display: !status ? "flex" : "none",
          textTransform: "capitalize",
        }}
        variant="contained"
      >
        <Typography variant="body1" fontWeight="600">
          Edit
        </Typography>
      </Button>
    </>
  );
}
