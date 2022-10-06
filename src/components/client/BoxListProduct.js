import { Stack } from '@mui/system'
import React from 'react'
import ListProductCommon from './ListProductCommon'

export default function BoxListProduct({children,data,limit}) {
  return (
    <Stack>
        {children}
        <ListProductCommon />
    </Stack>
  )
}
