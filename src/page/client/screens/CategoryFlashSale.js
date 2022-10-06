import { Typography } from '@mui/material'
import { Stack } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ContentTopCategory from '../../../components/client/ContentTopCategory'
import CountdownTimer from '../../../components/client/CountdownTimer'
import ListProductCommon from '../../../components/client/ListProductCommon'
import MyTypography from '../../../components/client/MyTypography'
import SideBarFilter from '../../../components/client/SideBarFilter'
import SortBar from '../../../components/client/SortBar'
import { URL_BASE } from '../../../constant/UrlConstant'
export default function CategoryFlashSale() {
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  useEffect(() => {
      setLoading(true)
      axios.get(`${URL_BASE}listProduct?isSell=true`).then(res => setData(res.data)).catch(err => console.log(err)).finally(() => setLoading(false))
  },[])
  const mainBackGround = useSelector((state) => state.common.mainBackGround);
  return (
    <Stack alignItems='center' spacing={1} padding='30px 50px' sx={{background :mainBackGround}}>
    <Stack direction='row' alignItems='center' justifyContent={{md : 'center' , xs : 'flex-start'}} spacing={2} position='relative'>
       <img style={{width  : '114px' ,height : '30px'}} src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/flashsale/fb1088de81e42c4e538967ec12cb5caa.png" alt="flashsale"/> 
         <CountdownTimer/>
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
