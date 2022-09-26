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
import "../StyleComponent/StyleCommomUser.css";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { v4 } from "uuid";
import { CAM_LE , HAI_CHAU , HOA_VANG ,THANH_KHE ,NGU_HANH_SON ,SON_TRA , LIEN_CHIEU,QUAN } from "../../constant/Key";
import { KEY_USER } from "../../constant/LocalStored";
import { useNavigate } from "react-router-dom";

export default function InfoUser() {
  const users = JSON.parse(localStorage.getItem(KEY_USER))
  const navigate = useNavigate()
  useEffect(() => {
    if(users === null){
      navigate('/login')
    }
  },[users])
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCheckDistrit, setisCheckDistrit] = useState(false);
  const [addressSelect, setAddressSelect] = useState("");
  const [SubDistrict, setSubDistrict] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.loginSuccess);
  const schema = yup.object().shape({
    name: yup.string().required("Required").min(2).max(20),
    email: yup.string().required("Required").email(),
    quan: yup.string().required("Required"),
    phuong: yup.string().required("Required"),
    numberHouse: yup.string().required("Required"),
    phone: yup
      .string()
      .required("Required")
      .matches(regex.REGEX_ONLY_NUMBER, "Không đúng định dạng"),
    // address: yup.string().required("Required"),
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
    console.log(data);
    setLoading(true);
    const newAddress =
      data.numberHouse + "," + data.phuong + "," + data.quan + ",Đà nẵng";
    const userEdit = {
      ...user,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: newAddress,
    };
    console.log(data);
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
          <TextField
            fullWidth
            sx={{ display: isCheckDistrit ? "block" : "none" }}
            {...register("numberHouse")}
            label="apartment number : Vui lòng viết tiếng việt có dấu"
            variant="outlined"
          />{" "}
          {errors.numberHouse && (
            <Alert severity="error">{errors.numberHouse?.message}</Alert>
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
