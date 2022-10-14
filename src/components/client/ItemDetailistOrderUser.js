import { Stack, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import '../StyleComponent/ItemListPayment.css'

export default function ItemDetailistOrderUser({value}) {
  const {images,name,quanlity,price,_id} = value
  console.log(value);
  const mainColorText = useSelector(state => state.colorCommon.mainColorText)
  return (
    <Link  to={`/products/${_id}`}> 
    <Stack className='itemListPayment' direction='row' spacing={3} borderBottom='1px solid #CACACA' padding='10px'>
    <img style={{width : '120px',height : '120px',objectFit : 'cover'}} src={`/images/${images[0]}`} alt='22'/>
    <Stack>
        <Typography variant='body1' fontWeight='bold' color={mainColorText}>{name}</Typography>
        <Typography variant='body1' color={mainColorText}>x{quanlity}</Typography>
    </Stack>
    <Typography sx={{marginLeft : 'auto!important'}} alignSelf='center' variant='h6'>
    {/* <PriceSell isSell={isSell} price={price} discount={discount}/> */}
    <Typography>{price}</Typography>
    </Typography>
</Stack>
</Link>
  )
}
