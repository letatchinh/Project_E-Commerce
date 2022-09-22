
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { Container, Stack } from '@mui/system'
import React, { useEffect, useMemo, useState } from 'react'
import {  useSelector } from 'react-redux'
import { v4 } from 'uuid'
import ItemPayment from './ItemPayment'
import ErrorNoItem from './ErrorNoItem'
export default function Payment() {
  const [value, setValue] = useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const [listChecked,setListChecked] = useState([])
  const listCheckedPayment = useSelector(state => state.user.loginSuccess.listCarts)
  useEffect(() => {
   const newList = listCheckedPayment.filter(e => e.isCheckedPayment === true)
   setListChecked(newList)
  },[listCheckedPayment])
  const CalTotal = () => {
    const total = listChecked.reduce((sum,arr) => sum + parseInt(arr.price),0)
    return total
  }
  const totalPrice = useMemo(() => CalTotal(),[listChecked])
  return (
    <>
    {listChecked.length === 0 ? <ErrorNoItem src="https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png"/> 
    : <div style={{background : 'rgb(240, 242, 245)' , padding : '20px'}}>
    <Container sx={{background : 'white' , borderRadius : '10px'}}>
   <Stack>
   {listChecked?.map(value =>  <ItemPayment key={v4()} value={value}/>)}
   </Stack>
  <Stack direction='row' justifyContent='flex-end' spacing={5} sx={{padding : '40px', borderBottom : '2px solid #C4C4C4'}}>
    <Typography variant='h5' fontWeight='bold'>Total</Typography>
    <Typography variant='h5' fontWeight='bold'>{totalPrice} $</Typography>
  </Stack>
  <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{padding : '20px', borderBottom : '2px solid #C4C4C4'}}> 
    <Stack>
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label"><Typography variant='h5' fontWeight='bold'>Payment Method</Typography></FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
      >
        <FormControlLabel onChange={handleChange} value="visa" control={<Radio />} label={<img style={{width : '50px'}} src='https://vietjet.asia/assets/uploads/2017/06/L%E1%BB%A3i-%C3%ADch-t%E1%BB%AB-vi%E1%BB%87c-s%E1%BB%AD-d%E1%BB%A5ng-visa-card.png' alt='visa'/>} />
        <FormControlLabel onChange={handleChange} value="shipCod" control={<Radio />} label="ShipCod" />
        <FormControlLabel
          value="disabled"
          disabled
          control={<Radio />}
          label={<img style={{width : '50px'}} src='https://play-lh.googleusercontent.com/dQbjuW6Jrwzavx7UCwvGzA_sleZe3-Km1KISpMLGVf1Be5N6hN6-tdKxE5RDQvOiGRg' alt='visa'/>}
        />
      </RadioGroup>
    </FormControl>
    </Stack>
    <Button disabled={value === ''} variant="contained" >
    <Typography variant='h6' sx={{textTransform : 'capitalize'}} >Payment</Typography>
        </Button>
  </Stack>
    </Container>

    </div>}
     
    </>
  )
}
