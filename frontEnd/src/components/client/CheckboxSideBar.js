import { Checkbox, FormControlLabel } from '@mui/material'
import React, {   useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function CheckboxSideBar({filter,label,unFilter,isCheck}) {
  const mainColorText = useSelector((state) => state.colorCommon.mainColorText);
    const [checked, setChecked] = useState(false);
    useEffect(() => {
   setChecked(isCheck);
    },[isCheck])
    const handleChange = (event) => {
      setChecked(event.target.checked);
      if(event.target.checked){
        filter()
      }
      else{
        unFilter()
      }
    };
  
  return (
    <FormControlLabel sx={{color : mainColorText}}  control={<Checkbox sx={{color : mainColorText}}  checked={checked} onChange={handleChange} />} label={label}/>
    )
}
