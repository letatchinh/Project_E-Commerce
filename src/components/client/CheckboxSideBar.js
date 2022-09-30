import { Checkbox, FormControlLabel } from '@mui/material'
import React, { useState } from 'react'

export default function CheckboxSideBar({filter,label}) {
    const [checked, setChecked] = useState(false);
    const handleChange = (event) => {
      setChecked(event.target.checked);
      filter()
    };
  
  return (
    <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange} />} label={label}/>
    )
}
