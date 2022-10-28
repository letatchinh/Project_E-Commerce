import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter, setSortPrice, setSortRating} from '../../redux/filterProduct/Actions'
import '../StyleComponent/SideBarFilter.css'

export default function SortBar() {
  const mainColorText = useSelector(state => state.colorCommon.mainColorText)
  const sortPrice = useSelector((state) => state.filterProduct.sortPrice);
  const sortRating = useSelector((state) => state.filterProduct.sortRating);
  const dispatch = useDispatch()
  const [price, setPrice] = useState('All');
  const [rating, setRating] = useState('All');
  useEffect(() => {
    setPrice(sortPrice || '')
    setRating(sortRating || '')
  },[sortPrice,sortRating])
  const handleChangePrice = (event) => {
    setPrice(event.target.value);
    if(event.target.value === -1){
      dispatch(setSortPrice(-1))
      dispatch(setFilter({type : "SET_PAGE",filter : 1}))
    }
    else if(event.target.value === 1){
      dispatch(setSortPrice(1))
      dispatch(setFilter({type : "SET_PAGE",filter : 1}))
    }
    else if(event.target.value === 'All'){
      dispatch(setSortPrice(null))
      dispatch(setFilter({type : "SET_PAGE",filter : 1}))
    }
  };

  const handleChangeRating = (event) => {
    setRating(event.target.value);
    if(event.target.value === -1){
      dispatch(setSortRating(-1))
      dispatch(setFilter({type : "SET_PAGE",filter : 1}))
    }
    else if(event.target.value === 1){
      dispatch(setSortRating(1))
      dispatch(setFilter({type : "SET_PAGE",filter : 1}))
    }else if(event.target.value === 'All'){
      dispatch(setSortRating(null))
      dispatch(setFilter({type : "SET_PAGE",filter : 1}))

    }
  };
  return (
   <Stack className='SortBar' spacing={5} direction='row' padding='10px' alignItems='center' >
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
          <MenuItem value={1}>Low to high</MenuItem>
          <MenuItem value={"All"}>Default</MenuItem>
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
          <MenuItem value={1}>Low to high</MenuItem>
          <MenuItem value={'All'}>Default</MenuItem>
        </Select>
      </FormControl>
   </Stack>
  )
}
