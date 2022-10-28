import { Button } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import '../StyleComponent/EmptyList.css'
import MyTypography from './MyTypography';
export default function ErrorNoItem({src,width,inSearch}) {
  return (
  <Stack className='animationErr' alignItems='center' margin='0 auto' width={width ? width : '50%'} >
      <img 
      src={src || "https://i.pinimg.com/originals/6f/fd/64/6ffd64c5366898c59bbc91d9aec935c3.png"}
      alt="error"
    />
   {inSearch &&  <MyTypography textAlign='center'>Not Found , please check Your keyword or filter</MyTypography>}
   <Link to='/'>
   <Button endIcon={<ShoppingCartIcon/>} variant='contained'>Go shopping</Button>
   </Link>
   </Stack>
  )
}
