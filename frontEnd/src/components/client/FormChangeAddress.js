import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, Dialog, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Container, Stack } from '@mui/system';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';
import * as yup from "yup";
import {
    CAM_LE,
    HAI_CHAU,
    HOA_VANG,
    THANH_KHE,
    NGU_HANH_SON,
    SON_TRA,
    LIEN_CHIEU,
    QUAN,
  } from "../../constant/Key"
  import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from 'react-redux';
import { fetchSubAddress } from '../../redux/client/cart/Actions';
import { KEY_USER } from '../../constant/LocalStored';
export default function FormChangeAddress() {
  const user = JSON.parse(localStorage.getItem(KEY_USER)) || ""
  const [open, setOpen] = useState(false);
    const schema = yup.object().shape({
     
        quan: yup.string().required("Required"),
        phuong: yup.string().required("Required"),
        numberHouse: yup.string().required("Required").min(2).max(30),
        
      });
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });
    const [isCheckDistrit, setisCheckDistrit] = useState(false);
    const [addressSelect, setAddressSelect] = useState("");
    const [SubDistrict, setSubDistrict] = useState("");
    const dispatch = useDispatch()
    const onSubmit = async(data) => {
        const newAddress = `${data.numberHouse},${data.phuong},${data.quan},Đà Nẵng`
    await dispatch(fetchSubAddress(newAddress))
    handleClose()
}
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{margin : '0 auto'}}>
    <Button variant='outlined'  onClick={handleClickOpen}>
       Thay đổi địa chỉ
    </Button>
    <Dialog fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Container sx={{background : 'white' }}>
        <form
    style={{ flex: 1, padding: "20px" }}
    onSubmit={handleSubmit(onSubmit)}
  >
        <Stack spacing={2}>
        <InputLabel id="demo-simple-select-label">
        Thành phố : Da Nang
          </InputLabel>
         
          <InputLabel id="demo-simple-select-label">Đường</InputLabel>
          <Select fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="District"
            value={addressSelect}
            {...register("quan", {
              onChange: (e) => {
                setAddressSelect(e.target.value);
                setValue('phuong', '');
                setSubDistrict('')
              },
            })}
          >
          
            {QUAN.map(e => <MenuItem key={v4()} value={e}>{e}</MenuItem>) }
          </Select>
          {errors.quan && (
            <Alert severity="error">{errors.quan?.message}</Alert>
          )}
          <InputLabel id="demo-simple-select-label">Quận</InputLabel>
          <Select fullWidth
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
            label="apartment number"
            variant="outlined"
          />
           {errors.numberHouse && (
            <Alert severity="error">{errors.numberHouse?.message}</Alert>
          )}
          <Button type='submit' variant="contained">Save</Button>
        </Stack>
    </form>
    </Container>
    </Dialog>
  </div>
   
  )
}
