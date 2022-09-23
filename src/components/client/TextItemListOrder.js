import React from 'react'
import { Typography } from '@mui/material';

export default function TextItemListOrder({title,value}) {
  return (
    <Typography variant='body2'>{title} : <Typography component='span' variant='body2' color='blue'>{value}</Typography></Typography>

  )
}
