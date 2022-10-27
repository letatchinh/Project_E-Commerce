import { Button } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { useState } from 'react'
import ButtonSelectSize from './ButtonSelectSize'
import MyTypography from './MyTypography'

export default function SelectDetailSize() {
    const [active,setActive] = useState('S')
    const handleSetActive = (value) => {
        setActive(value)
    }
  return (
    <Box>
        <MyTypography fontSize='1rem'>Size : {active}</MyTypography>
        <Stack direction='row' spacing={2}>
          <ButtonSelectSize set={handleSetActive} isActive={active === 'S'} value='S'/>
          <ButtonSelectSize set={handleSetActive} isActive={active === 'M'} value='M'/>
          <ButtonSelectSize set={handleSetActive} isActive={active === 'L'} value='L'/>
        </Stack>
    </Box>
  )
}
