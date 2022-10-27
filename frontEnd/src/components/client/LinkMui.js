import { Link } from '@mui/material'
import React from 'react'

export default function LinkMui({value}) {
  return (
    <Link href="#"  underline="hover">
  {value}
</Link>
  )
}
