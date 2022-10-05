import { Skeleton } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'

export default function SkeletonPruductUser() {
  return (
    <div>  <Skeleton variant="rounded" width={210} height={300} />
    <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
    <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
    <Skeleton variant="rectangular" width={100} height={60} />
    <Stack direction='row'>
    <Skeleton variant="circular" width={40} height={40} />
    <Skeleton variant="circular" width={40} height={40} />
    <Skeleton variant="circular" width={40} height={40} />
    <Skeleton variant="circular" width={40} height={40} />
    </Stack></div>
  )
}
