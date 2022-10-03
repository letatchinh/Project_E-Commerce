import { Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux';
import StyledRating from './StyledRating';
export default function Review(props) {
    const {comment,rating,time,username} = props
    const mainColorText = useSelector(state =>state.common.mainColorText)
  return (
    <Stack sx={{border : '2px solid #f3f3f3', padding : '10px' , borderRadius : '10px' , width : {sm : '50%' , sx : '90%'} , margin : '10px 0'}}>
    <Typography variant="h6" color={mainColorText}>{username}</Typography>
    <StyledRating  defaultValue={rating} precision={0.5} />
    <Typography color={mainColorText}>{time}</Typography>
     <Typography sx={{padding : '10px' ,background : 'skyblue', borderRadius : '10px' ,fontSize : '16px', wordBreak : "break-word"}} variant="h6">{comment}</Typography>
    </Stack>
  )
}
