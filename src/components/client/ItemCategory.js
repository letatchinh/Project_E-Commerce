import { Button, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'

export default function ItemCategory({value,image}) {
  return (
        <Button  sx={{textTransform : 'capitalize' , width : '100px', height :' 100px' , margin : '5px 0'}} variant="outlined" >
       <Stack width='70%' alignItems='center'>
       <img src={image} alt='2'/>
          <Typography>{value}</Typography>
       </Stack>
        </Button>
  )
}
