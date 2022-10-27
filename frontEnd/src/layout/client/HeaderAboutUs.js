import { Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React  from 'react'
import {  useNavigate } from 'react-router-dom'
import ItemHeaderAboutUs from '../../components/client/ItemHeaderAboutUs'
import '../../components/StyleComponent/Header.css'

export default function HeaderAboutUs() {
  const navigate = useNavigate();

  return (
    
        <Stack  direction='row' padding={{md :'10px 50px' , xs : '10px 20px'}} alignItems='center' justifyContent='space-between' boxShadow='0 0 16px 8px #a7a7ff' sx={{background : "white"}} spacing={1}>
        <div style={{cursor : 'pointer'}} onClick={() => navigate(-1)}><Typography sx={{textShadow : '0 0 16px gray' , whiteSpace : 'nowrap' , display : 'inline'}}  className="myLogo" fontSize='3rem' color='white'>UT </Typography><Typography display='inline' className='myLogo' sx={{textShadow : '0 0 16px gray' ,color : 'white'}}>About</Typography></div>
        <Stack width='80%' direction='row' spacing={1}>
        <ItemHeaderAboutUs link='products' delay={0} value="Product"/>
        <ItemHeaderAboutUs link='about' delay={1}  active value="About Us"/>
        <ItemHeaderAboutUs link='' delay={2} value="Blog"/>
        <ItemHeaderAboutUs link='' delay={3} value="Home"/>
        </Stack>
        </Stack>
  )
}
