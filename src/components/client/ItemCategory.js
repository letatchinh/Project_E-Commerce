import { Button } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'

export default function ItemCategory({value}) {
  return (
        <Button sx={{textTransform : 'capitalize'}} variant="outlined" >
          {value}
        </Button>
  )
}
