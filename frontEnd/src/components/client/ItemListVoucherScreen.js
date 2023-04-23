import LoadingButton from '@mui/lab/LoadingButton'
import { Button, Paper, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { KEY_USER } from '../../constant/LocalStored'
import { fetchAddVoucherRequest } from '../../redux/sagas/Mysaga'
import MyTypography from './MyTypography'

export default function ItemListVoucherScreen({item}) {
    const {discount,_id} = item
    const [loading,setLoading] = useState(false)
    const mainBackGround = useSelector(
      (state) => state.colorCommon.mainBackGround
    );
    const dispatch = useDispatch()
    const navigate = useNavigate()
  const  handleGetVoucher = async() => {
    setLoading(true)
   await dispatch(fetchAddVoucherRequest({voucher :{IdnewVoucher : _id},setLoading : () => setLoading(false)}))
  }
  return (
    <Stack direction="row">
    <Paper
      sx={{
        border: "1px solid rgba(25, 118, 210, 0.5)",
        borderRightStyle: "dashed",
        borderLeftWidth: "5px",
        flex: 1,
        textTransform: "capitalize",
        padding: "20px",
        background :mainBackGround
      }}
      variant="outlined"
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <div style={{ width: "50px", height: "50px" }}>
          <img
            style={{ borderRadius: "50%" }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBaleheMwoudXJIQXdcvutQD_8kHmkrUD9vg&usqp=CAU"
            alt="s"
          />
        </div>
        <Stack>
          <Stack direction='row' alignItems='center' sx={{ alignSelf: "center"}}>
            <MyTypography>
              -{" "}
            </MyTypography>
            <MyTypography fontSize="2rem">
                {discount}
              </MyTypography>
              <MyTypography >
              $ off
              </MyTypography>
          </Stack>
          <Stack direction='row' alignItems='center'>
          <MyTypography textAlign='center'>
            Mã:    
          </MyTypography>
          <Typography sx={{ borderRadius: "30px",
                background: "#FFEBE8",
                padding: "7px",
                display: "inline",}}>
                    {_id}
                </Typography>
          </Stack>
        
        </Stack>
      </Stack>
    </Paper>

    <LoadingButton  sx={{ borderLeftStyle: "dashed", textTransform: "capitalize" }} onClick={() => {
      if(localStorage.getItem(KEY_USER)){
        handleGetVoucher()
      }
      else{
        navigate("/login")
      }
      }} loading={loading} variant="outlined">
  Lấy
</LoadingButton>
  </Stack>
  )
}
