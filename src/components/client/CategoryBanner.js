import { Stack } from '@mui/system'
import React, { memo } from 'react'
import { v4 } from 'uuid'
import { listCategory } from '../../constant/Key'
import ItemCategoryBanner from './ItemCategoryBanner'
 function CategoryBanner({onHoverSetActive}) {
  return (
    <Stack sx={{display : {md : 'flex' , xs : 'none'}}}  direction='row' spacing={3}  justifyContent='center'>
    {listCategory.map((e,i) => <ItemCategoryBanner onHoverSetActive={() => onHoverSetActive(i)} key={v4()} delay={i} value={e.name} linkTo={`/product/${e.name}`}/>)}
    </Stack>
  )
}
export default memo(CategoryBanner)