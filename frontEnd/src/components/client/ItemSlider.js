import {  Paper } from '@mui/material'
import React from 'react'

export default function ItemSlider({image}) {
  return (
    <Paper>
    <img style={{height : '100%'}} src={image} alt='banner'/>
           
        </Paper>
  )
}
