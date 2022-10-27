import { Button } from '@mui/material'
import React from 'react'
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
export default function BackToTop() {
  return (
    <Button onClick={() => window.scroll(0,0)}  variant='contained' sx={{borderRadius : '50%', width : '60px',height : '60px'}} >
   <VerticalAlignTopIcon sx={{color : 'white'}} fontSize='large'/>

    </Button>

  )
}
