import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import '../StyleComponent/Banner.css'
export default function ItemCategoryBanner({value,linkTo,delay,onHoverSetActive}) {
  return (
      <Link 
      style={{ animation : `AppearCategory ${delay}s ease`}}
       to={linkTo}>
<Typography onMouseEnter={onHoverSetActive} textTransform='capitalize' className='ItemCategoryBanner' fontSize='18px' color='white' sx={{padding : '10px 25px' , borderRadius : '25px'}}>
{value}
</Typography>
      </Link>
    
  )
}

