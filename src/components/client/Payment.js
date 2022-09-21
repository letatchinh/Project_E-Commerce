
import { Typography } from '@mui/material'
import { Container, Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'
import { v4 } from 'uuid'
import ItemPayment from './ItemPayment'
export default function Payment() {
  const [listChecked,setListChecked] = useState([])
  const listCheckedPayment = useSelector(state => state.user.loginSuccess.listCarts)
  useEffect(() => {
   const newList = listCheckedPayment.filter(e => e.isCheckedPayment === true)
   setListChecked(newList)
  },[listCheckedPayment])
  return (
    <div style={{background : 'rgb(240, 242, 245)' , padding : '20px'}}>
    <Container sx={{background : 'white' , borderRadius : '10px'}}>
   <Stack>
   {listChecked?.map(value =>  <ItemPayment key={v4()} value={value}/>)}
   </Stack>
  <Stack direction='row' justifyContent='flex-end' spacing={5} sx={{padding : '50px'}}>
    <Typography variant='h5' fontWeight='bold'>Total</Typography>
    <Typography variant='h5' fontWeight='bold'>500 $</Typography>
  </Stack>
    </Container>
    </div>
  )
}
