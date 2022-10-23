import { Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'

export default function MyCheckBox({checkedAll,handleChange,label}) {
  return (
    <FormControlLabel control={<Checkbox  checked={checkedAll} onChange={handleChange}  />} label={label} />
  )
}
