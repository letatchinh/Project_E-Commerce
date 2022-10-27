import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSortPrice, setSortRating} from '../../redux/filterProduct/Actions'
import '../StyleComponent/SideBarFilter.css'

export default function SortBar({setPage}) {
  const mainColorText = useSelector(state => state.colorCommon.mainColorText)
  const sortPrice = useSelector((state) => state.filterProduct.sortPrice);
  const sortRating = useSelector((state) => state.filterProduct.sortRating);
  const dispatch = useDispatch()
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  useEffect(() => {
    setPrice(sortPrice || '')
    setRating(sortRating || '')
  },[sortPrice,sortRating])
  console.log(price,'price');
  console.log(rating,'rating');
  const handleChangePrice = (event) => {
    setPrice(event.target.value);
    if(event.target.value === -1){
      dispatch(setSortPrice(-1))
      setPage()
    }
    else if(event.target.value === 1){
      dispatch(setSortPrice(1))
      setPage()
    }
    else if(event.target.value === ''){
      dispatch(setSortPrice(null))
      setPage()
    }
  };

  const handleChangeRating = (event) => {
    setRating(event.target.value);
    if(event.target.value === -1){
      dispatch(setSortRating(-1))
      setPage()
    }
    else if(event.target.value === 1){
      dispatch(setSortRating(1))
      setPage()
    }else if(event.target.value === ''){
      dispatch(setSortRating(null))
      setPage()

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
          <MenuItem value={-1}>High to low</MenuItem>
          <MenuItem value={1}>Low to High</MenuItem>
          <MenuItem value={''}>None</MenuItem>
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
          <MenuItem value={-1}>High to low</MenuItem>
          <MenuItem value={1}>Low to High</MenuItem>
          <MenuItem value={''}>None</MenuItem>
        </Select>
      </FormControl>
   </Stack>
  )
}
