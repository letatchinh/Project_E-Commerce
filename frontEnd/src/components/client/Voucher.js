import { Button } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { useDispatch } from 'react-redux';
import {  fetchVoucher } from '../../redux/client/cart/Actions';
import { fetchApplyVoucherRequest } from '../../redux/sagas/Mysaga';

export default function Voucher({item,active,handleSetActive,handleUnSetActive}) {
    const dispatch = useDispatch()
    const {name,discount,_id} = item
    const handleSetVoucher = () => {
      if(active){
        return
      }
      else{
        dispatch(fetchApplyVoucherRequest({discount,_id,handleSetActive}))
      }
    
    }
    const handleCancelVoucher = () => {
      if(active){
        dispatch(fetchVoucher({discount : 0,_id : null}))
        handleUnSetActive()
        
      }
      else{
        return
      }
        
    }
  return (
    <Stack direction='row'>
    <Button  onClick={handleSetVoucher} sx={{borderRightStyle : 'dashed',borderLeftWidth : '5px' , flex : 1,textTransform : 'capitalize',backgroundColor : active ? "#1976d238" : 'white'}} variant='outlined'>{`discount -${discount}$`}</Button>
    <Button onClick={handleCancelVoucher} sx={{borderLeftStyle : 'dashed',textTransform : 'capitalize',backgroundColor : active ? "#1976d238" : 'white'}} variant='outlined'>cancel</Button>
    </Stack>
  )
}
