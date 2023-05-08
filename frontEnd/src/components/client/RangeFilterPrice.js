import { Box, Button, Slider } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/filterProduct/Actions';
import MyTypography from './MyTypography';

export default function RangeFilterPrice() {
    const max = useSelector((state) => state.filterProduct.max);
    const min = useSelector((state) => state.filterProduct.min);
    const [value, setValue] = useState([0, 100]);
    useEffect(() => {
        if(min && max){

            setValue([Math.trunc(min/4),Math.trunc(max/4)])
        }
        else if(!min && !max){
          setValue([0,100])
        }
    },[min,max])
    const dispatch = useDispatch()
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const handleSetPrice = () => {
        dispatch(setFilter({ type: "SET_MIN_PRICE", filter: (value[0]*10000) }));
        dispatch(setFilter({ type: "SET_MAX_PRICE", filter: (value[1]*10000) }));
        dispatch(setFilter({type : "SET_PAGE",filter : 1}))
    }
  return (
    <Box sx={{ width: '100%' }}>
    <MyTypography>{`Giá từ ${value[0] * 10000}VND đến : ${value[1] * 10000}VND `}</MyTypography>
    <Slider
      getAriaLabel={() => 'Temperature range'}
      value={value}
      onChange={handleChange}
      valueLabelDisplay="auto"
    />
    <Button onClick={handleSetPrice} fullWidth variant='outlined'>Áp dụng</Button>
  </Box>
  )
}
