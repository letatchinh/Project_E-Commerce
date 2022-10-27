import React from 'react'
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

export default function TextItemListOrder({title,value}) {
  const mainColorText = useSelector(state => state.colorCommon.mainColorText)
  return (
    <Typography color={mainColorText} variant='body2'>{title} : <Typography component='span'  variant='body1' color='primary'>{value}</Typography></Typography>

  )
}
