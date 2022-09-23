import React from 'react'
import { Button } from '@mui/material';
import TextItemListOrder from './TextItemListOrder';
import { Stack } from '@mui/system';

export default function ItemListOrder({id,timeOrder,totalBill}) {
  return (
    <Stack alignItems='center' justifyContent='space-between'  width='100%' padding='5px'  border='2px solid #C3C4C4' borderRadius='10px' direction='row' spacing={3}>
    <Stack>
    <TextItemListOrder title='Đơn hàng ' value={id}/>
    <TextItemListOrder title='Được tạo ngày ' value={timeOrder}/>
    <TextItemListOrder title='Thành tiền ' value={totalBill}/>
    </Stack>
    <Button sx={{textTransform :'capitalize'}} variant='outlined'>Xem Thêm</Button>
    </Stack>
  )
}
