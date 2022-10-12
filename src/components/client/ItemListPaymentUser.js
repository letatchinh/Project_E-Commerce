import React, { useEffect, useState } from 'react'
import { Button, Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import axios from 'axios'
import { URL_BASE } from '../../constant/UrlConstant'
import PriceSell from './PriceSell'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../StyleComponent/ItemListPayment.css'
export default function ItemListPaymentUser({data}) {
  const mainColorText = useSelector(state => state.colorCommon.mainColorText)
const {images,name , price,_id}  = data
const handleBuyAgain = () => {
  console.log("ok");
}
  return (
    <Link to={`/products/${_id}`}>
    <Stack className='itemListPayment' direction='row' spacing={3} borderBottom='1px solid #CACACA' padding='10px'>
    
    <img style={{width : '100px',height : '100px',objectFit : 'cover'}} src={`/images/${images[0]}`} alt='22'/>
   
    <Stack alignItems='center'>
        <Typography variant='body1' fontWeight='bold' color={mainColorText}>{name}</Typography>
        <Button onClick={handleBuyAgain} variant='outlined'>Buy Again</Button>
    </Stack>
    <Typography sx={{marginLeft : 'auto!important'}} alignSelf='center' variant='h6'>
    {/* <PriceSell isSell={isSell} price={price} discount={discount}/> */}
    <Typography color='rgb(238, 77, 45)'>{price} VND</Typography>
    </Typography>
</Stack>
 </Link>
  )
}
