import { Grid } from '@mui/material'
import React from 'react'
import { v4 } from 'uuid'
import SkeletonPruductUser from './SkeletonPruductUser'

export default function LoadingListProduct({limit}) {
  return (
 <Grid container spacing={1}>
{  Array.from(new Array(limit)).map((e) => (
     <Grid key={v4()} item xs={3}>
     <SkeletonPruductUser />
     </Grid>
   ))}
 </Grid>

  )
}
