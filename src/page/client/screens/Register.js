import {
  Alert,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchRegisterRequest } from "../../../redux/login/Actions";
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
import { URL_BASE } from "../../../constant/UrlConstant";
import * as regex from "../../../constant/YupGlobal.js";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import brcypt from "bcryptjs";
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
      // username : data.username,
      name: data.name,
      password: brcypt.hashSync(data.password, 10),
      email: data.email,
    };

    axios
      .post(`/api/users/`, newUser)
      .then((res) => {
        toast("Resgister Success!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        })();
        navigate("/login");
      })
      .catch((error) => {
        toast.warn(error.response.data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });

    console.log(newUser);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: "50px 0" }}>
      <Stack spacing={3} sx={{ width: "30%", margin: "0 auto" }}>
        {/* <TextField  {...register("username",{ required: true })} label="UserName" variant="outlined" />
    {errors.username && (
            <Alert severity="error">{errors.username?.message}</Alert>
          )} */}
        <TextField {...register("name")} label="Name" variant="outlined" />
        {errors.name && <Alert severity="error">{errors.name?.message}</Alert>}

        {/* <TextField  {...register("phone",{ required: true })}  label="Phone" variant="outlined" />
    {errors.phone && (
            <Alert severity="error">{errors.phone?.message}</Alert>
          )} */}
        <TextField
          {...register("email", { required: true })}
          label="Email"
          variant="outlined"
        />
        {errors.email && (
          <Alert severity="error">{errors.email?.message}</Alert>
        )}
        <TextField
          {...register("password", { required: true })}
          type="password"
          label="PassWord"
          variant="outlined"
        />
        {errors.password && (
          <Alert severity="error">{errors.password?.message}</Alert>
        )}
        {/* <InputLabel id="demo-simple-select-label">
            Vui lòng chọn đúng địa chỉ , nếu không bạn sẽ mất quyền lợi
          </InputLabel> */}

        {/* <InputLabel id="demo-simple-select-label">Quận Huyện</InputLabel>
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
          )} */}
        <Button type="submit" variant="contained">
          Register
        </Button>
      </Stack>
    </form>
  );
}
