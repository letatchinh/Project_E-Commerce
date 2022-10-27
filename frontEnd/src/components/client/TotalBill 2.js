import { Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'

export default function TotalBill({title,value}) {
  return (
    <Stack direction='row' justifyContent='space-between'>
        <Typography alignSelf='flex-end' variant='body1'>{title}  :  </Typography>
    <Typography component='span' variant='h5' fontWeight='bold' color='#FF5622'>{value}</Typography>
    </Stack>
    )
}
