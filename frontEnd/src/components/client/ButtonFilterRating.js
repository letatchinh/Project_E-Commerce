import { Button, Typography } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/filterProduct/Actions';
import { SET_GTE_RATING } from '../../redux/filterProduct/Types';
import StyledRating from './StyledRating';
export default function ButtonFilterRating({setPage,value,active}) {
    const dispatch = useDispatch()
    
  return (
    <Button endIcon={<Typography fontSize='14px!important'>{value}+</Typography>}  variant={active ? "contained" : "text"} onClick={() => {
       
        if(active){
          dispatch(setFilter({ type: SET_GTE_RATING, filter: null }));
          dispatch(setFilter({type : "SET_PAGE",filter : 1}))
        }
        else{
          dispatch(setFilter({ type: SET_GTE_RATING, filter: value }));
          dispatch(setFilter({type : "SET_PAGE",filter : 1}))
        }
      }} style={{marginBottom : '-3px'}}><StyledRating  value={value} readOnly/>    
      
      </Button>
  )
}
