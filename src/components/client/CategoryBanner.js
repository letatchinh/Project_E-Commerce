import { Stack } from '@mui/system'
import React from 'react'
import { listCategory } from '../../constant/Key'
import ItemCategoryBanner from './ItemCategoryBanner'
export default function CategoryBanner() {
  return (
    <Stack sx={{display : {md : 'flex' , xs : 'none'}}}  direction='row' spacing={3}  justifyContent='center'>
    {listCategory.map((e,i) => <ItemCategoryBanner delay={i} value={e.name} linkTo={`/${e.name}`}/>)}

    </Stack>
  )
}
