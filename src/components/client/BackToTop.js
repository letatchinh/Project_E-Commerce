import { Button } from '@mui/material'
import React from 'react'
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
export default function BackToTop() {
  return (
    <Button  variant='contained' sx={{borderRadius : '50%', width : '60px',height : '60px'}} ><a href='#top'><VerticalAlignTopIcon sx={{color : 'white'}} fontSize='large'/></a></Button>

  )
}
