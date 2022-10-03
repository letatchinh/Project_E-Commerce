import React, { useEffect, useState } from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import axios from 'axios'
import { URL_BASE } from '../../constant/UrlConstant'
import PriceSell from './PriceSell'
import { useSelector } from 'react-redux'
export default function ItemListPaymentUser({data}) {
  const [item,setItem] = useState({})
  const [loading,setLoading] = useState(false)
  const mainColorText = useSelector(state => state.common.mainColorText)

  useEffect(() => {
    setLoading(true)
    axios.get(`${URL_BASE}listProduct?id=${data}`).then(res => setItem(res.data[0])).catch(err => console.log(err)).finally(() => setLoading(false))
  },[])
  const {image,name,price,isSell,discount} = item

  return (
    <Stack direction='row' spacing={3} borderBottom='1px solid #CACACA' padding='10px'>
    <img style={{width : '100px',height : '100px',objectFit : 'cover'}} src={image} alt='22'/>
    <Stack>
        <Typography variant='body1' fontWeight='bold' color={mainColorText}>{name}</Typography>
    </Stack>
    <Typography sx={{marginLeft : 'auto!important'}} alignSelf='center' variant='h6'><PriceSell isSell={isSell} price={price} discount={discount}/></Typography>
</Stack>
  )
}
