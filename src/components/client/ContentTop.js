import { Typography } from '@mui/material'
import React from 'react'

export default function ContentTop({value}) {
  return (
    <div style={{borderBottom : '2px solid #F4F4F4',padding : '10px 0 0 10px'}}>
        <Typography textAlign='center' color='rgba(0, 0, 0, 0.54)' variant='h6' fontWeight='bold'>{value}</Typography>
    </div>
  )
}
