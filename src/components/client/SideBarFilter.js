import {Box} from '@mui/material'
import React from 'react'
import '../StyleComponent/SideBarFilter.css'
import FilterMoblie from './FilterMoblie';
import ItemFilter from './ItemFilter';
export default function SideBarFilter({setPage}) {
  return (
   <Box position='relative' >
      <Box className='sideBar' display={{md : 'block',sm : 'none' , xs : 'none'}}>
          <ItemFilter setPage={setPage}/>
     </Box>
    <Box display={{md : 'none',sm : 'block' , xs : 'block'}} sx={{position : 'sticky ' , left : '5px',top : 0,marginTop  : '20px'}}>
    <FilterMoblie setPage={setPage}/>
    </Box>
   </Box>
  )
}
