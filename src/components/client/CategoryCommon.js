import { Typography } from '@mui/material'
import { Stack } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useSearchParams } from 'react-router-dom'
import AxiosUser from '../../apis/client/AxiosUser'
import Category from '../../layout/client/Category'
import { setCategorySearch } from '../../redux/filterProduct/Actions'
import ListProductCommon from './ListProductCommon'
import LoadingHomePage from './LoadingHomePage'
import SideBarFilter from './SideBarFilter'
import SortBar from './SortBar'
export default function CategoryCommon({type,valueOfContentTop}) {
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
      setLoading(true)
      AxiosUser.get(`/api/products/search?category=${type}`).then(res => setData(res.data.products)).catch(err => console.log(err)).finally(() => setLoading(false))
      dispatch(setCategorySearch(type))
  },[type])
  const mainBackGround = useSelector((state) => state.colorCommon.mainBackGround);
  return (
    <Stack   alignItems='center' spacing={1} padding='30px 50px' sx={{background :mainBackGround , width : '100%'}}>
   <Category />
   <Stack width = '100%' direction='row' alignItems='center' >
     <div style={{flex : 1 , height : '2px' , background : 'gray', width : '100%'}}></div>
     <Typography sx={{border : "2px solid gray" , padding : '5px' , borderRadius : '10px'}} color='#fcaf17' fontSize='1.5rem'>{valueOfContentTop}</Typography>
     <div style={{flex : 1 , height : '2px' , background : 'gray', width : '100%'}}></div>
   </Stack>
  
    <Stack width='100%'  direction='row' >
    <SideBarFilter/>
   <Stack flex={1}>
    <Stack  direction='row' justifyContent='space-between'   alignItems='center'>
       <Typography fontSize='1.2rem' color='#7a7a9d' sx={{textShadow : '0 0 1px gray'}}>{data?.length} Products</Typography>
        <SortBar />
       </Stack>
       {loading ? <LoadingHomePage height='21rem'/> : <ListProductCommon data={data} limit={16}/>}
       
   </Stack>
    </Stack>
    </Stack>
  )
}
