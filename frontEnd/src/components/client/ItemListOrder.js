import React from 'react'
import { Button, Typography } from '@mui/material';
import TextItemListOrder from './TextItemListOrder';
import { Stack } from '@mui/system';
import moment from 'moment';
import { useSelector } from 'react-redux';

export default function ItemListOrder({click,item}) {
  const {_id , createdAt,totalPrice} = item
  const mainColorText = useSelector(state => state.colorCommon.mainColorText)
  return (
    
      <Stack alignItems='center' justifyContent='space-between'  width='100%' padding='5px'  border='2px solid #C3C4C4' borderRadius='10px' direction='row' spacing={3}>
    <Stack>
    <TextItemListOrder title='Mã đơn hàng' value={_id}/>
    <Typography color={mainColorText} variant='body2'>Tạo ngày : <Typography component='span'  variant='body1' color='primary'>{moment(createdAt).format("llll")}</Typography></Typography>
    <TextItemListOrder title='Tổng tiền' value={`${totalPrice} $`}/>
    </Stack>
    <Button onClick={click} sx={{textTransform :'capitalize'}} variant='outlined'>Xem thêm</Button>
    </Stack>
   
  )
}
