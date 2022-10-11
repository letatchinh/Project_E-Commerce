import { Button, Checkbox, FormControlLabel, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import { Container, padding, Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AxiosUser from '../../../apis/client/AxiosUser'
import ItemListCart from '../../../components/client/ItemListCart'
import PlaceIcon from '@mui/icons-material/Place';
import { v4 } from 'uuid'
export default function ListCart() {
    const background2 = useSelector(state => state.colorCommon.mainBackGround2)
    const backgroundWhite = useSelector(state => state.colorCommon.mainBackGround)
    const listCarts = useSelector(state => state.cart.listCarts)
    const totalBill = useSelector(state => state.cart.totalBill)
    const steps = [
      "Add to Cart",
      "Choose Payment Method",
      "Wait admin Check Order",
    ];
    const [activeStep, setActiveStep] = useState(0);
  return (
    <div style={{background : background2 , padding : '2rem 0' }}>
    <Container  >
    <Stepper sx={{padding : '20px'}} activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel color='primary'>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
        <Stack direction='row' spacing={1} >
        <Stack width='70%' spacing={1} sx={{background : backgroundWhite, padding:'10px',borderRadius:'20px'}}>
        <Stack width = '100%' direction='row' alignItems='center' >
     <div style={{flex : 1 , height : '2px' , background : 'gray', width : '100%'}}></div>
     <Typography sx={{border : "2px solid gray" , padding : '2px' , borderRadius : '10px'}} color='black' fontSize='1.5rem'>My Cart</Typography>
     <div style={{flex : 1 , height : '2px' , background : 'gray', width : '100%'}}></div>
   </Stack> 
   <FormControlLabel control={<Checkbox  />} label="Check All" />
                    {listCarts && listCarts.map(e =>  <ItemListCart key={v4()} item={e}/>)}
           
          
        </Stack>
        <Stack spacing={3} sx={{background : backgroundWhite, padding:'10px',borderRadius:'20px'}}>
        <Stack spacing={1} borderBottom='1px solid #999' padding='10px 0'>
          <Typography color='#9e9e9e' fontSize='14px'>Address</Typography>
          <Stack direction='row' sx={{color : '#9e9e9e'}} alignItems='center' spacing={1} >
          <PlaceIcon/>
          <Typography color='black' fontSize='13px' fontWeight='medium'>224 tran hung dao thi xa quang tri</Typography>
           </Stack>
        </Stack>
        <Stack spacing={1}>
          <Typography fontSize='1.2rem'>Infomation Order</Typography>
          <Stack direction='row' justifyContent='space-between'>
            <Typography fontSize='14px' color='#757575'>Total Price</Typography>
            <Typography>{totalBill}VND</Typography>
          </Stack>
          <Stack direction='row' justifyContent='space-between'>
          <Typography fontSize='14px' color='#757575'>Tax Price</Typography>
            <Typography>10000 VND</Typography>
          </Stack>
        </Stack>
        <Stack direction='row' padding='20px 0' justifyContent='space-between'>
        <TextField sx={{width : '70%'}} size='small' color='primary' variant='outlined' placeholder='Voucher...'/>
        <Button variant='contained'>apply</Button>
        </Stack>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography fontSize='14px' color='#757575'>Total</Typography>
            <Typography color='#f57224' fontSize='1.3rem'>{totalBill} VND</Typography>
        </Stack>
        <Button color='warning' variant='contained'>Confirm Order</Button>
        </Stack>
        </Stack>
    </Container>
    </div>
  )
}
