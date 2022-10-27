import { FormControl, TextField } from '@mui/material'
import React, { forwardRef } from 'react'
import {  styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';

function MyTextField({...props},ref) {
    const status = useSelector(state => state.colorCommon.status)
    const CssTextField = styled(TextField)({
        '& label':{
            color : !status && 'white'
        },
        '& input':{
            color : !status && 'white'
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: !status && '#999',
          },
        },
      });
  return (
    <FormControl fullWidth  variant="outlined">
   <CssTextField inputRef={ref} {...props}></CssTextField>
   </FormControl>
  )
}
export default forwardRef(MyTextField)