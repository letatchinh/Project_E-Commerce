import { Button,  Stack } from '@mui/material'
import axios from 'axios'
import React, {  useEffect, useState } from 'react'
import { URL_BASE } from '../../constant/UrlConstant'
import ListProductCommon from './ListProductCommon'
import LoadingListProduct from './LoadingListProduct'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useSelector } from "react-redux";
import CountdownTimer from './CountdownTimer'
import { Link } from 'react-router-dom'

export default function ListProductSale() {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios.get(`${URL_BASE}listProduct?isSell=true`).then(res => setData(res.data)).catch(err => console.log(err)).finally(() => setLoading(false))
    },[])
    const mainBackGround = useSelector((state) => state.common.mainBackGround);
  return (
    <Stack sx={{background : mainBackGround, padding : '10px'}}>
       <Stack direction='row' alignItems='center' justifyContent={{md : 'center' , xs : 'flex-start'}} spacing={2} position='relative'>
       <img style={{width  : '114px' ,height : '30px'}} src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/flashsale/fb1088de81e42c4e538967ec12cb5caa.png" alt="flashsale"/> 
         <CountdownTimer/>
       <Link style={{position : 'absolute', right : 0}} to='/flash-sale'>
           <Button   endIcon={<ChevronRightIcon/>}>See More</Button>
       </Link>
       </Stack>
       {
        loading ?  <LoadingListProduct limit={4}/> :  <ListProductCommon data={data} limit={4} />
       }
     </Stack>
  )
}
