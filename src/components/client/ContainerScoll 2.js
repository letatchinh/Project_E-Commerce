import { Container } from '@mui/material'
import React from 'react'

export default function ContainerScoll({children}) {
  return (
    <Container sx={{ padding: "10px", color: "black" ,maxHeight : '22rem' , overflow : 'scroll' }}>
   {children}
    </Container>
  )
}
