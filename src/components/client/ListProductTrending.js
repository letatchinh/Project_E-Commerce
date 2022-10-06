import { Button, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, {  useEffect, useState } from 'react'
import { URL_BASE } from '../../constant/UrlConstant'
import ListProductCommon from './ListProductCommon'
import LoadingListProduct from './LoadingListProduct'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useSelector } from "react-redux";
import MyTypography from './MyTypography'
import { Link } from 'react-router-dom'
export default function ListProductTrending() {
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
       <img style={{width  : '30px' ,height : '30px'}} src="https://bizweb.dktcdn.net/100/438/408/themes/878697/assets/fire-icon-new.png?1664943619853" alt="flashsale"/>
       <MyTypography fontSize='1.5rem'>Trending</MyTypography>
       <Link style={{position : 'absolute', right : 0}} to='trending-product'>
         <Button   endIcon={<ChevronRightIcon/>}>See More</Button>
       </Link>
       </Stack>
       {
        loading ?  <LoadingListProduct limit={4}/> :  <ListProductCommon data={data} limit={4} />
       }
     </Stack>
  )
}
