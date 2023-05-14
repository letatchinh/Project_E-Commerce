import { Box, Button } from '@mui/material'
import React from 'react'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { useDispatch } from 'react-redux';
import { reSetFilter } from '../../redux/filterProduct/Actions';
import Dialo from './Dialo';
export default function ButtonRemoveAllFilter() {
    const dispatch = useDispatch()
  return (
      <Box   sx={{position : 'absolute ' , right : '5px',top : {md : '-50px' , sm : '0' , xs : '-25px'}}}>
         <Dialo messenger="Xác nhận gỡ bộ lọc ?" click={() => dispatch(reSetFilter())}>
         <Button color='error' sx={{display : {md : 'block' , sm : 'none' , xs : 'none'}}} variant='outlined'>Gỡ bộ lọc</Button>
         </Dialo>
         <Dialo messenger="Xác nhận gỡ bộ lọc ?" click={() => dispatch(reSetFilter())}>
         <Button color='error' sx={{display : {md : 'none' , sm : 'block', xs : 'block'}}} variant='outlined'><FilterAltOffIcon/></Button>
         </Dialo>
   </Box>
  )
}
