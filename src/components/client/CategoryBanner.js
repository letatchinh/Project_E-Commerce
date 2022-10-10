import { Stack } from '@mui/system'
import React from 'react'
import { v4 } from 'uuid'
import { listCategory } from '../../constant/Key'
import ItemCategoryBanner from './ItemCategoryBanner'
export default function CategoryBanner() {
  return (
    <Stack sx={{display : {md : 'flex' , xs : 'none'}}}  direction='row' spacing={3}  justifyContent='center'>
    {listCategory.map((e,i) => <ItemCategoryBanner key={v4()} delay={i} value={e.name} linkTo={`/${e.name}`}/>)}

    </Stack>
  )
}
