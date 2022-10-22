import { Button, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import MyTypography from './MyTypography'

export default function ItemListVoucherScreen({item}) {
    const {name,discount,_id} = item
  const  handleGetVoucher = () => {
      
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
            Code:    
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
    <Button onClick={handleGetVoucher}
      sx={{ borderLeftStyle: "dashed", textTransform: "capitalize" }}
      variant="outlined"
    >
      Get
    </Button>
  </Stack>
  )
}
