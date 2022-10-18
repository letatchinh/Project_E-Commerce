import { Checkbox, FormControlLabel } from '@mui/material'
import React, { useState } from 'react'

export default function CheckboxSideBar({filter,label,unFilter,isCheck}) {
    const [checked, setChecked] = useState(!isCheck);
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
    <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange} />} label={label}/>
    )
}
