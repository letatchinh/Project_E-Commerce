import { Stack } from '@mui/system'
import React from 'react'

export default function PriceSell(props) {
    const {isSell,price} = props
  return (
    <Stack direction='row'>
    <span style={{opacity : (isSell === 'true') ? "1" : "0" ,  color : (isSell) ?  "orange" : "#C4C4C4" , fontSize : '20px'}}>
    {price * 9 / 10} Đ
    </span>
    <span style={{textDecoration : (isSell === 'true') ? "line-through" : "none" , color : (isSell === 'false') ?  "orange" : "#C4C4C4" , fontSize : (isSell === 'false') ? '20px' : '12px'} }>
      {price} Đ
    </span></Stack>
  )
}
