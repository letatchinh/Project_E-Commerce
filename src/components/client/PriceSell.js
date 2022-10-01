import { Stack } from '@mui/system'
import React from 'react'

export default function PriceSell(props) {
    const {isSell,price,discount,fontSize} = props
  return (
    <Stack direction='row'>
    <span style={{display : (isSell === 'true') ? "block" : "none" ,  color : (isSell) ?  "#ee4d2d" : "#C4C4C4" , fontSize : (fontSize) ? fontSize : '20px'}}>
    {price - (price * discount / 100)}Đ
    </span>
    <span style={{textDecoration : (isSell === 'true') ? "line-through" : "none" , color : (isSell === 'false') ?  "#ee4d2d" : "#C4C4C4" , fontSize : (isSell === 'false') ? (fontSize) ? fontSize : '20px' : '12px'} }>
      {price}Đ
    </span></Stack>
  )
}
