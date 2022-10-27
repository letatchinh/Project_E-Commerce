import { Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

export default function ContentTop({value}) {
  const mainColorText = useSelector(state => state.colorCommon.mainColorText)

  return (
    <div style={{borderBottom : '2px solid #F4F4F4',padding : '10px 0 0 10px'}}>
        <Typography textAlign='center' color={mainColorText} variant='h6' fontWeight='bold'>{value}</Typography>
    </div>
  )
}
