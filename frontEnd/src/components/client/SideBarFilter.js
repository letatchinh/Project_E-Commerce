import {Box} from '@mui/material'
import React from 'react'
import '../StyleComponent/SideBarFilter.css'
import FilterMoblie from './FilterMoblie';
import ItemFilter from './ItemFilter';
export default function SideBarFilter() {
  return (
   <Box position={{md : 'relative',xs : 'absolute'}} >
      <Box className='sideBar' display={{md : 'block',sm : 'none' , xs : 'none'}}>
          <ItemFilter />
     </Box>
    <Box display={{md : 'none',sm : 'block' , xs : 'block'}} sx={{position : 'sticky ' , left : '5px',top : 0,marginTop  : '20px'}}>
    <FilterMoblie />
    </Box>
   </Box>
  )
}
