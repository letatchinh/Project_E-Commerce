import { Stack } from '@mui/system'
import React from 'react'
import MyTypography from './MyTypography'

export default function TotalBill({title,value}) {
  return (
    <Stack direction='row' justifyContent='space-between'>
        <MyTypography alignSelf='flex-end' variant='body1'>{title}  :  </MyTypography>
    <MyTypography component='span' variant='h5' fontWeight='bold' color='#FF5622'>{value}</MyTypography>
    </Stack>
    )
}
