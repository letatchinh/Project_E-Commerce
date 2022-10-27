import { Avatar, Skeleton } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'

export default function LoadingItemCart() {
  return (
        <Stack direction='row' style={{height : '87px'}} alignItems='center'>
             <Skeleton variant="circular" width={80} height={80}>
              <Avatar />
            </Skeleton>
            <Skeleton variant="rounded" height={100} width='50%' />
            <Skeleton variant="circular" width={60} height={60}/>

        </Stack>
  )
}
