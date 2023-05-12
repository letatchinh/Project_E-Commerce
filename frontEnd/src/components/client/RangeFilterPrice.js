import { Box, Button, Slider } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/filterProduct/Actions';
import MyTypography from './MyTypography';
import {Col, Input, InputNumber, Row} from 'antd'
export default function RangeFilterPrice() {
    const max = useSelector((state) => state.filterProduct.max);
    const min = useSelector((state) => state.filterProduct.min);
    const [value, setValue] = useState([0, 0]);
    console.log(min,"min");
    useEffect(() => {
        if(min && max){

            setValue([Math.trunc(min),Math.trunc(max)])
        }
        else if(!min && !max){
          setValue([0,0])
        }
    },[min,max])
    const dispatch = useDispatch()
    // const handleChange = (event, newValue) => {
    //   setValue(newValue);
    // };
    const handleChangeMin = (values) => {
      console.log(value,'value');
      setValue([values,value[1]]);
    };
    const handleChangeMax = (values) => {
      setValue([value[0],values]);
    };
    const handleSetPrice = () => {
        dispatch(setFilter({ type: "SET_MIN_PRICE", filter: (value[0]) }));
        dispatch(setFilter({ type: "SET_MAX_PRICE", filter: (value[1]) }));
        dispatch(setFilter({type : "SET_PAGE",filter : 1}))
    }
  return (
    <Box sx={{ width: '100%' }}>
    {/* <MyTypography>{`Giá từ ${value[0] * 10000}VND đến : ${value[1] * 10000}VND `}</MyTypography>
    <Slider
      getAriaLabel={() => 'Temperature range'}
      value={value}
      onChange={handleChange}
      valueLabelDisplay="auto"
    /> */}
    <Row justify='space-between'>
      <Col span={10}>
      <InputNumber formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} value={value[0]} onChange={handleChangeMin} placeholder='Giá từ'/>
      </Col>
      <Col>
        -
      </Col>
      <Col span={10}>
      <InputNumber formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} value={value[1]} onChange={handleChangeMax} placeholder='Đến'/>
      </Col>
      
    </Row>
    <Button onClick={handleSetPrice} fullWidth variant='outlined'>Áp dụng</Button>
  </Box>
  )
}
