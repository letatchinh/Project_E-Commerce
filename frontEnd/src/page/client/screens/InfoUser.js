import { Button, List,  Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ItemInfoUser from "../../../components/client/ItemInfoUser";
import PeopleIcon from "@mui/icons-material/People";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { Stack } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import ContentTop from "../../../components/client/ContentTop";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useForm } from "react-hook-form";
import "@fontsource/roboto/700.css";
import DoneIcon from "@mui/icons-material/Done";
import { fecthLogginSuccess } from "../../../redux/login/Actions";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Alert from "@mui/material/Alert";
import "../../../components/StyleComponent/StyleCommomUser.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { v4 } from "uuid";
import { CAM_LE , HAI_CHAU , HOA_VANG ,THANH_KHE ,NGU_HANH_SON ,SON_TRA , LIEN_CHIEU,QUAN } from "../../../constant/Key";
import { KEY_USER } from "../../../constant/LocalStored";
import { useNavigate } from "react-router-dom";
import AxiosUser from "../../../apis/client/AxiosUser";
import ToastSuccess from "../../../components/client/ToastSuccess";
import MyTextField from "../../../components/client/MyTextField";
import MyTypography from "../../../components/client/MyTypography";
import MySelection from "../../../components/client/MySelection";
import {  styled } from '@mui/material/styles';
import { REGEX_ONLY_NUMBER, REGEX_ONLY_NUMBER_v2 } from "../../../constant/YupGlobal";

export default function InfoUser() {
  const statusColor = useSelector(state => state.colorCommon.status)
  const CssSelect = styled(Select)({
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: !statusColor && '#999',
    },
    '& .MuiSvgIcon-root' : {
        color : !statusColor && '#999'
    }
  });
  const userLogin = JSON.parse(localStorage.getItem(KEY_USER)) || ""
  const navigate = useNavigate()
  useEffect(() => {
    if(userLogin === null){
      navigate('/login')
    }
  },[userLogin])
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mainAddress,setMainAddress] = useState({})
  const [isCheckDistrit, setisCheckDistrit] = useState(false);
  const [addressSelect, setAddressSelect] = useState("");
  const [SubDistrict, setSubDistrict] = useState("");
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    name: yup.string().required("Required").min(2).max(20),
    // email: yup.string().required("Required").email(),
    quan: yup.string().required("Required"),
    phuong: yup.string().required("Required"),
    numberHouse: yup.string().required("Required"),
    phone: yup
      .string()
      .required("Required")
      .matches(REGEX_ONLY_NUMBER_v2, "Number phone is wrong"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues : {
      quan : mainAddress.quan || "" ,
      phuong : mainAddress.phuong || "",
      numberHouse : mainAddress.sonha || "",
    }
  });
  const onSubmit = async (data) => {
    const newAddress =
    data.numberHouse + "," + data.phuong + "," + data.quan + ",Đà nẵng";
    const user = {...userLogin,email : data.email,name : data.name,address : newAddress,phone : data.phone}
        setLoading(true);
  await AxiosUser.put(`/api/users/profileUser/${userLogin._id}`,user).then(res => {
    localStorage.setItem(KEY_USER,JSON.stringify(res.data))
    dispatch(fecthLogginSuccess(res.data))
    ToastSuccess("Cập nhật thành công")
    setStatus(!status);
  }).catch(err => console.log(err)).finally(() =>  setLoading(false))  
  };
  useEffect(() => {
    let indexSlice = 0
    let address2 = []
   for(let i = 0 ; i < userLogin.address.length ; i++){
     let chr = userLogin.address[i]
     if(chr === ','){
       let news = userLogin.address.slice(indexSlice,i)
       address2.push(news)
       indexSlice = i + 1
     }
   }
   setMainAddress({quan : address2[2], phuong : address2[1], sonha : address2[0]})
   reset({quan : address2[2], phuong : address2[1], sonha : address2[0]})
  },[userLogin.address])
  return (
    <>
      <ContentTop value={"Thông tin cá nhân"} />
      <form
        style={{ padding: "10px", display: status ? "block" : "none" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={2}>
          <MyTextField  
            defaultValue={userLogin.name}
            fullWidth
            {...register("name")}
            label="Name"
            variant="outlined"/>
          {errors.name && (
            <Alert severity="error">{errors.name?.message}</Alert>
          )}
          <MyTextField  
            defaultValue={userLogin.phone}
            fullWidth
            {...register("phone")}
            label="Number Phone"
            variant="outlined"/>
          {errors.phone && (
            <Alert severity="error">{errors.phone?.message}</Alert>
          )}
          <MyTextField
            defaultValue={userLogin.email}
            fullWidth
            disabled
            {...register("email")}
            label="Email"
            variant="outlined"
            
          />
          {/* {errors.email && (
            <Alert severity="error">{errors.email?.message}</Alert>
          )} */}
          
    

          <MyTypography >Đường</MyTypography>
          <MySelection   labelId="demo-simple-select-label"
            id="demo-simple-select"
            data={QUAN}
            value={addressSelect === "" ? mainAddress.quan ? mainAddress.quan : addressSelect : addressSelect}
            {...register("quan", {
              onChange: (e) => {
                setAddressSelect(e.target.value);
                setSubDistrict('')
              },
            })}/>
          {errors.quan && (
            <Alert severity="error">{errors.quan?.message}</Alert>
          )}
          <MyTypography>Phường</MyTypography>
          <CssSelect sx={{color :!statusColor && "white"}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            {...register("phuong", {
              onChange: (e) => {
                setisCheckDistrit(true);
                setSubDistrict(e.target.value);
              },
            })}
            label="Phường"
            value={SubDistrict === "" ? mainAddress.phuong ? mainAddress.phuong : SubDistrict : SubDistrict}
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
            
          </CssSelect>
          {errors.phuong && (
            <Alert severity="error">{errors.phuong?.message}</Alert>
          )}
          <MyTypography>Number house</MyTypography>
          <MyTextField
            fullWidth
            // sx={{ display: isCheckDistrit ? "block" : "none" }}
            {...register("numberHouse")}
            label="apartment number"
            variant="outlined"
            // defaultValue={address}
            defaultValue={mainAddress.sonha}
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
                Huỷ
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
                Lưu
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </form>
      <List style={{ display: !status ? "block" : "none" }}>
        <ItemInfoUser icon={<PeopleIcon color="primary" />} value={userLogin.name} />
        <ItemInfoUser icon={<EmailIcon color="primary" />} value={userLogin.email} />
        <ItemInfoUser icon={<PhoneIcon color="primary" />} value={`+84 ${userLogin.phone}`} />
        <ItemInfoUser icon={<LocationOnIcon  color="primary"/>} value={userLogin.address || "(Chưa có địa chỉ vui lòng thêm mới)"} />
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
          Thay đổi
        </Typography>
      </Button>
    </>
  );
}
