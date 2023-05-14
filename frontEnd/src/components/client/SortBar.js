import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter, setSortNew, setSortPrice, setSortRating, setSortSold} from '../../redux/filterProduct/Actions'
import '../StyleComponent/SideBarFilter.css'

export default function SortBar() {
  const mainColorText = useSelector(state => state.colorCommon.mainColorText)
  const sortPrice = useSelector((state) => state.filterProduct.sortPrice);
  const sortRating = useSelector((state) => state.filterProduct.sortRating);
  const sortSold = useSelector((state) => state.filterProduct.sortSold);
  const sortNew = useSelector((state) => state.filterProduct.sortNew);
  const dispatch = useDispatch()
  const [price, setPrice] = useState('All');
  const [rating, setRating] = useState('All');
  const [news,setnews] = useState(null);
  const [sold, setSold] = useState(null);
  useEffect(() => {
    setPrice(sortPrice || '')
    setRating(sortRating || '')
    setnews(sortSold || null)
    setSold(sortNew || null)
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
  const handleSortSold = () => {
      dispatch(setSortSold(1))
      setSold(true)
      setnews(false)
      dispatch(setFilter({type : "SET_PAGE",filter : 1}))
  
  };
  const handleSortNew = () => {
      dispatch(setSortNew(1))
      setnews(true)
      setSold(false)
      dispatch(setFilter({type : "SET_PAGE",filter : 1}))
  
  };

  return (
   <Stack className='SortBar' spacing={5} direction='row' padding='10px' alignItems='center' >
    <FormControl sx={{width : {md : '200px' , sm : '100px' , xs : '100px'}  , background : 'white'}}>
        <InputLabel id="demo-simple-select-label">Giá</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Price"
          value={price}
          onChange={handleChangePrice}
        >
          <MenuItem value={-1}>Giảm dần</MenuItem>
          <MenuItem value={1}>Tăng dần</MenuItem>
          <MenuItem value={"All"}>Mặc định</MenuItem>
        </Select>
      </FormControl>
    <FormControl sx={{width : {md : '200px' , sm : '100px' , xs : '100px'}  , background : 'white'}}>
        <InputLabel id="demo-simple-select-label">Đánh giá</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Price"
          value={rating}
          onChange={handleChangeRating}
        >
          <MenuItem value={-1}>Giảm dần</MenuItem>
          <MenuItem value={1}>Tăng dần</MenuItem>
          <MenuItem value={"All"}>Mặc định</MenuItem>
        </Select>
      </FormControl>
    <FormControl sx={{width : {md : '200px' , sm : '100px' , xs : '100px'}  , background : 'white'}}>
    <Button onClick={handleSortNew} variant={news ? 'contained' : 'outlined'}>
         Mới nhất
        </Button>
      </FormControl>
    <FormControl sx={{width : {md : '200px' , sm : '100px' , xs : '100px'}  , background : 'white'}}>
        <Button onClick={handleSortSold} variant={sold ? 'contained' : 'outlined'}>
         Bán chạy nhất
        </Button>
      </FormControl>
   </Stack>
  )
}
