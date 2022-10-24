import { FormControl, MenuItem, Select } from '@mui/material'
import React, { forwardRef } from 'react'
import {  styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';

function MySelection({...props},ref) {
    const status = useSelector(state => state.colorCommon.status)
    const CssSelect = styled(Select)({
        '& .MuiSelect-outlined':{
            color : !status && 'white'
          },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: !status && '#999',
        },
        '& .MuiSvgIcon-root' : {
            color : !status && '#999'
        }
      });
  return (
    <FormControl fullWidth  variant="outlined">
   <CssSelect inputRef={ref} {...props}>
   {props.data.map(e => <MenuItem key={v4()} value={e}>{e}</MenuItem>) }
   </CssSelect>
   </FormControl>
  )
}
export default forwardRef(MySelection)