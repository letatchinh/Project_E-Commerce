import React, { useEffect, useState } from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import axios from 'axios'
import { URL_BASE } from '../../constant/UrlConstant'
export default function ItemListPaymentUser({data}) {
  const [item,setItem] = useState({})
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    axios.get(`${URL_BASE}listProduct?id=${data}`).then(res => setItem(res.data[0])).catch(err => console.log(err)).finally(() => setLoading(false))
  },[])
  return (
    <Card sx={{width : '100%'}}>
    <CardActionArea >
      <CardMedia
        component="img"
        height="140"
        image={item.image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {item.name}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
  )
}
