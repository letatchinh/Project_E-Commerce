import { Stack } from '@mui/system'
import React from 'react'
import { v4 } from 'uuid'
import '../../../components/StyleComponent/DetailProduct.css'
export default function ItemMyCarousel({item,hover,indexItem}) {
  return (
    <Stack direction='row' width='100%' spacing={1}>
   { item && item.map((e,i) =>  <img className='imgSmallHover'
    onMouseEnter={() => hover(indexItem + i + indexItem * 3)}  
    style={{width : '23.5%'}} key={v4()} src={`/images/${e}`} alt='s'/>)}
    </Stack>
  )
}
