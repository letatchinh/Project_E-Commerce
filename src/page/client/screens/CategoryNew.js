import { Typography } from '@mui/material'
import { Stack } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CountdownTimer from '../../../components/client/CountdownTimer'
import ListProductCommon from '../../../components/client/ListProductCommon'
import SideBarFilter from '../../../components/client/SideBarFilter'
import SortBar from '../../../components/client/SortBar'
import { URL_BASE } from '../../../constant/UrlConstant'
export default function CategoryNew() {
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  useEffect(() => {
      setLoading(true)
      axios.get(`${URL_BASE}listProduct?isSell=true`).then(res => setData(res.data)).catch(err => console.log(err)).finally(() => setLoading(false))
  },[])
  const mainBackGround = useSelector((state) => state.colorCommon.mainBackGround);
  return (
    <Stack alignItems='center' spacing={1} padding='30px 50px' sx={{background :mainBackGround}}>
    <img style={{width  : '60px' ,height : '30px'}} src="https://upload.wikimedia.org/wikipedia/commons/9/95/New_logo.svg" alt="flashsale"/>
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
