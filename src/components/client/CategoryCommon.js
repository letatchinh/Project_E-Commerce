import { Typography } from '@mui/material'
import { Stack } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { URL_BASE } from '../../constant/UrlConstant'
import ListProductCommon from './ListProductCommon'
import SideBarFilter from './SideBarFilter'
import SortBar from './SortBar'
export default function CategoryCommon({type,valueOfContentTop}) {
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  useEffect(() => {
      setLoading(true)
      axios.get(`api/products/search?category=${type}`).then(res => setData(res.data)).catch(err => console.log(err)).finally(() => setLoading(false))
  },[])
  const mainBackGround = useSelector((state) => state.common.mainBackGround);
  return (
    <Stack  alignItems='center' spacing={1} padding='30px 50px' sx={{background :mainBackGround}}>
   
   <Typography color='#fcaf17' fontSize='1.5rem'>{valueOfContentTop}</Typography>
  
    <Stack width='100%' borderTop='4px solid rgb(238, 77, 45)' direction='row' >
    <SideBarFilter/>
   <Stack flex={1}>
    <Stack  direction='row' justifyContent='space-between'   alignItems='center'>
       <Typography fontSize='1.2rem' color='#7a7a9d' sx={{textShadow : '0 0 1px gray'}}>{data?.length} Products</Typography>
        <SortBar />
       </Stack>
       {loading ? <p>loading...</p> : <ListProductCommon data={data} limit={16}/>}
       
   </Stack>
    </Stack>
    </Stack>
  )
}
