import { Stack, Typography } from '@mui/material'
import React from 'react'
import PriceSell from './PriceSell'
import { useSelector } from "react-redux";
export default function ItemDetailistOrderUser({value}) {
  const {image,name,quanlity,price,isSell,discount} = value
  const mainColorText = useSelector(state => state.common.mainColorText)
  return (
    <Stack direction='row' spacing={3} borderBottom='1px solid #CACACA' padding='10px'>
    <img style={{width : '120px',height : '120px',objectFit : 'cover'}} src={image} alt='22'/>
    <Stack>
        <Typography variant='body1' fontWeight='bold' color={mainColorText}>{name}</Typography>
        <Typography variant='body1' color={mainColorText}>x{quanlity}</Typography>
    </Stack>
    <Typography sx={{marginLeft : 'auto!important'}} alignSelf='center' variant='h6'><PriceSell isSell={isSell} price={price} discount={discount}/></Typography>
</Stack>
  )
}
