import { CircularProgress, Stack } from '@mui/material'
import React from 'react'

export default function LoadingCycleFullwitdh({size}) {
  return (
    <Stack sx={{height : '100%' ,width : '100%'}} justifyContent='center' alignItems='center'>
        <CircularProgress sx={{height : `${size}!important`,width : `${size}!important`}}/>
        </Stack>
  )
}
