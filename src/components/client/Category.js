import { Stack } from '@mui/system'
import React from 'react'
import { v4 } from 'uuid'
import ContentTop from './ContentTop'
import ItemCategory from './ItemCategory'
export default function Category() {
    const listCategory = ['Shirt' , 'Coat' ,'Trousers' , 'Dress' ,"Bikini" ,'Shorts']
  return (
    <Stack sx={{background : 'white'}}>
    <ContentTop value='CATEGORY'/>
    <Stack direction='row' flexWrap='wrap' padding='10px' spacing={1} justifyContent='center'>
    {listCategory.map(e => <ItemCategory key={v4()} value={e}/>)}
    </Stack>
    </Stack>
  )
}
