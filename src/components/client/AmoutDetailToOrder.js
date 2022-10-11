import { Button } from '@mui/material'
import { Box, Stack, styled } from '@mui/system'
import React from 'react'
import MyTypography from './MyTypography'

export default function AmoutDetailToOrder() {
  return (
    <Stack spacing={1}>
                {/* <MyTypography fontSize='1rem'>Chosse Amout :</MyTypography> */}

        <Stack direction='row' alignItems='center'   width='130px' borderRadius='30px'>
        <Button variant='outlined' sx={{minWidth : 0,borderRadius :'30px 0 0 30px'}}>-</Button>
    <MyTypography fontWeight='bold' sx={{borderTop:'1px solid rgba(25, 118, 210, 0.5)',height : '100%',padding : '5px 10px',borderBottom:'1px solid rgba(25, 118, 210, 0.5)' }}>16</MyTypography>
    <Button variant='outlined' sx={{minWidth : 0,borderRadius : '0 30px 30px 0'}}>+</Button>
    </Stack>
   
    </Stack>
  )
}
