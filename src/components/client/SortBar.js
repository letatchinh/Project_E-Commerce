import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSortPrice, setSortRating, sortHighToLow, sortLowToHigh, sortRatingHighToLow, sortRatingLowtoHigh } from '../../redux/filterProduct/Actions'
import '../StyleComponent/SideBarFilter.css'

export default function SortBar() {
  const mainColorText = useSelector(state => state.colorCommon.mainColorText)
  const dispatch = useDispatch()
  const [price, setPrice] = useState('');
  const handleChangePrice = (event) => {
    setPrice(event.target.value);
    setRating('');
    if(event.target.value){
      dispatch(setSortPrice(-1))
    }
    else{
      dispatch(setSortPrice(1))
    }
  };
  const [rating, setRating] = useState('');
  const handleChangeRating = (event) => {
    setRating(event.target.value);
    setPrice('');
    if(event.target.value){
      dispatch(setSortRating(-1))
    }
    else{
      dispatch(setSortRating(1))
    }
  };
  return (
   <Stack className='SortBar' spacing={5} direction='row' padding='10px' alignItems='center' >
    <Typography sx={{display : {md : 'block' , sm : 'none' , xs : 'none'} }} color={mainColorText}>Sort Follow</Typography>
    <FormControl sx={{width : {md : '200px' , sm : '100px' , xs : '100px'}  , background : 'white'}}>
        <InputLabel id="demo-simple-select-label">Price</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Price"
          value={price}
          onChange={handleChangePrice}
        >
          <MenuItem value={true}>High to low</MenuItem>
          <MenuItem value={false}>Low to High</MenuItem>
        </Select>
      </FormControl>
    <FormControl sx={{width : {md : '200px' , sm : '100px' , xs : '100px'}  , background : 'white'}}>
        <InputLabel id="demo-simple-select-label">Rating</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Price"
          value={rating}
          onChange={handleChangeRating}
        >
          <MenuItem value={true}>High to low</MenuItem>
          <MenuItem value={false}>Low to High</MenuItem>
        </Select>
      </FormControl>
   </Stack>
  )
}
