import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import React, { forwardRef, useState } from 'react'

 const HideShowPassword =({...props},ref)  => {
    const [showPassword,setShowPassword] = useState(false)
  return (
    <FormControl fullWidth  variant="outlined">
    <InputLabel sx={{top : '-6px' }} htmlFor="outlined-adornment-password">Password</InputLabel>
    <OutlinedInput size="small"
      id="outlined-adornment-password"
      type={showPassword ? 'text' : 'password'}
     {...props}
     ref={ref}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => setShowPassword(!showPassword)}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
      label="Password"
    />
  </FormControl>
  )
}
export default forwardRef(HideShowPassword)
