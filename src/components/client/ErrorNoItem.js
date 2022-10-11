import { Button } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
export default function ErrorNoItem({src,width}) {
  return (
  <Stack alignItems='center' margin='0 auto' width={width ? width : '40%'} >
      <img 
      src={src}
      alt="error"
    />
   <Link to='/'>
   <Button endIcon={<ShoppingCartIcon/>} variant='contained'>Go Shopping</Button>
   </Link>
   </Stack>
  )
}
