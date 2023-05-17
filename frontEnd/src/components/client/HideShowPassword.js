import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import React, { forwardRef, useState } from 'react'

 const HideShowPassword =({...props},ref)  => {
    const [showPassword,setShowPassword] = useState(false)
  return (
    <FormControl fullWidth  variant="outlined">
    <InputLabel sx={{top : '-6px' }} htmlFor="outlined-adornment-password">{props.placeholder || "Mật khẩu"}</InputLabel>
    <OutlinedInput size="small"
      id="outlined-adornment-password"
      type={showPassword ? 'text' : 'password'}
     {...props}
     inputRef={ref}
     
     autoComplete="current-password"
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
      label="Mật khẩu"
    />
    <FormHelperText error id="accountId-error">
     {props.error && props.message}
    </FormHelperText>
  </FormControl>
  )
}
export default forwardRef(HideShowPassword)
