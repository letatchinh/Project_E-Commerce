import { Typography } from '@mui/material'
import { Stack } from '@mui/system'
import moment from 'moment';
import React from 'react'
import { useSelector } from 'react-redux';
import StyledRating from './StyledRating';
export default function Review({item}) {
    const {comment,rating,name,createdAt} = item
    const mainColorText = useSelector(state =>state.colorCommon.mainColorText)
  return (
    <Stack sx={{border : '2px solid #f3f3f3', padding : '10px' , borderRadius : '10px' , width : '100%' , margin : '10px 0'}}>
    <Typography variant="h6" color={mainColorText}>{name}</Typography>
    <StyledRating readOnly={true} defaultValue={rating} precision={0.5} />
    <Typography color={mainColorText}>{moment(createdAt).format("llll")}</Typography>
     <Typography sx={{padding : '10px' ,background : 'skyblue', borderRadius : '10px' ,fontSize : '16px', wordBreak : "break-word"}} variant="h6">{comment}</Typography>
    </Stack>
  )
}
