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
export default function ListProductNew() {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios.get(`api/products/search?category=`).then(res => setData(res.data)).catch(err => console.log(err)).finally(() => setLoading(false))
    },[])
    const mainBackGround = useSelector((state) => state.colorCommon.mainBackGround);

  return (

     <Stack sx={{background : mainBackGround, padding : '10px'}}>
       <Stack direction='row' alignItems='center' justifyContent={{md : 'center' , xs : 'flex-start'}} spacing={2} position='relative'>
       <img style={{width  : '60px' ,height : '30px'}} src="https://upload.wikimedia.org/wikipedia/commons/9/95/New_logo.svg" alt="flashsale"/>
       <Link style={{position : 'absolute', right : 0}} to='new-product'>
         <Button   endIcon={<ChevronRightIcon/>}>See More</Button>
         </Link>
       </Stack>
       {
        loading ?  <LoadingListProduct limit={4}/> :  <ListProductCommon data={data} limit={4} />
       }
     </Stack>
  )
}
