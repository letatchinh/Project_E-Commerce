import { Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { useQuery} from '@tanstack/react-query'
import React, {  useState } from 'react'
import { useSelector } from 'react-redux'
import {  fetchListSale } from '../../../apis/client/ProductApis'
import CountdownTimer from '../../../components/client/CountdownTimer'
import ListProduct from '../../../components/client/ListProduct'
import LoadingHomePage from '../../../components/client/LoadingHomePage'
export default function CategoryFlashSale() {
  const [page,setPage] = useState(1)
  const limit = 8;
  const {data,isLoading } = useQuery([page,limit], fetchListSale)
  const mainBackGround = useSelector((state) => state.colorCommon.mainBackGround);
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <Stack  alignItems='center' spacing={1} padding='30px 50px' sx={{background :mainBackGround}}>
    <Stack  direction='row' alignItems='center' justifyContent={{md : 'center' , xs : 'flex-start'}} spacing={2} position='relative'>
       <img style={{width  : '114px' ,height : '30px'}} src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/flashsale/fb1088de81e42c4e538967ec12cb5caa.png" alt="flashsale"/> 
         <CountdownTimer/>
       </Stack>
    <Stack direction='row' width='100%'>
    {/* <SideBarFilter/> */}
   <Stack width='100%'>
    <Stack width='100%' direction='row' justifyContent='space-between'   alignItems='center'>
       <Typography fontSize='1.2rem' color='#7a7a9d' sx={{textShadow : '0 0 1px gray'}}>{data && data.count} Products</Typography>
        {/* <SortBar /> */}
       </Stack>
     { isLoading ? <LoadingHomePage /> : data && <ListProduct data={data.products} page={data.page} pages={data.pages} handleChange={handleChange}/>}
   </Stack>
    </Stack>
    </Stack>
  )
}
