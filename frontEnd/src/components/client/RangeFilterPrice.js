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
    },[min,max])
    const dispatch = useDispatch()
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const handleSetPrice = () => {
        dispatch(setFilter({ type: "SET_MIN_PRICE", filter: (value[0]*4) }));
        dispatch(setFilter({ type: "SET_MAX_PRICE", filter: (value[1]*4) }));
        dispatch(setFilter({type : "SET_PAGE",filter : 1}))
    }
  return (
    <Box sx={{ width: '100%' }}>
    <MyTypography>{`Price from ${value[0] * 4}$ to : ${value[1] * 4}$ `}</MyTypography>
    <Slider
      getAriaLabel={() => 'Temperature range'}
      value={value}
      onChange={handleChange}
      valueLabelDisplay="auto"
    />
    <Button onClick={handleSetPrice} fullWidth variant='outlined'>Apply</Button>
  </Box>
  )
}
