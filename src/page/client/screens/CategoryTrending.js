import { Typography } from '@mui/material'
import { Stack } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CountdownTimer from '../../../components/client/CountdownTimer'
import ListProductCommon from '../../../components/client/ListProductCommon'
import MyTypography from '../../../components/client/MyTypography'
import SideBarFilter from '../../../components/client/SideBarFilter'
import SortBar from '../../../components/client/SortBar'
import { URL_BASE } from '../../../constant/UrlConstant'
export default function CategoryTrending() {
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  useEffect(() => {
      setLoading(true)
      axios.get(`${URL_BASE}listProduct?isSell=true`).then(res => setData(res.data)).catch(err => console.log(err)).finally(() => setLoading(false))
  },[])
  const mainBackGround = useSelector((state) => state.common.mainBackGround);
  return (
    <Stack alignItems='center' spacing={1} padding='30px 50px' sx={{background :mainBackGround}}>
     <Stack direction='row' alignItems='center' justifyContent={{md : 'center' , xs : 'flex-start'}} spacing={2}>
       <img style={{width  : '30px' ,height : '30px'}} src="https://bizweb.dktcdn.net/100/438/408/themes/878697/assets/fire-icon-new.png?1664943619853" alt="flashsale"/>
       <MyTypography fontSize='1.5rem'>Trending</MyTypography>
       </Stack>
    <Stack direction='row'>
    <SideBarFilter/>
   <Stack>
    <Stack direction='row' justifyContent='space-between'   alignItems='center'>
       <Typography fontSize='1.2rem' color='#7a7a9d' sx={{textShadow : '0 0 1px gray'}}>{data?.length} Products</Typography>
        <SortBar />
       </Stack>
       <ListProductCommon data={data} limit={16}/>
   </Stack>
    </Stack>
    </Stack>
  )
}
