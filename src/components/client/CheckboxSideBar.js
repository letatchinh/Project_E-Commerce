import { Checkbox, FormControlLabel } from '@mui/material'
import React, { useState } from 'react'

export default function CheckboxSideBar({label,filter,unSetFilter}) {
    const [checked, setChecked] = useState(false);
    const handleChange = (event) => {
      setChecked(event.target.checked);
      if(!checked){
        filter()
      }
      else{
        unSetFilter()
      }
    };
  
  return (
    <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange} />} label={label}/>
    )
}
