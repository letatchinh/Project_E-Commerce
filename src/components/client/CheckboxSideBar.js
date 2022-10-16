import { Checkbox, FormControlLabel } from '@mui/material'
import React, { useState } from 'react'

export default function CheckboxSideBar({filter,label,unFilter}) {
    const [checked, setChecked] = useState(false);
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
