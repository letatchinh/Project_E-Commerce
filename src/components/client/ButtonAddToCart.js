import { Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { fetchAddToCartRequest } from '../../redux/login/Actions';
import '../StyleComponent/Product.css'
export default function ButtonAddToCart({onClick,item,sx,children}) {
    const dispatch = useDispatch();

  return (
    <Button 
    color='warning'
    onClick={() =>
      dispatch(
        fetchAddToCartRequest({
          ...item,
          isCheckedPayment: true,
        })
      )
    }
    variant="outlined"
    sx={{background : 'rgba(255,87,34,0.1)',borderColor : '#ee4d2d',color : '#ee4d2d',...sx}}
  >
  {children}
  </Button>
  )
}
