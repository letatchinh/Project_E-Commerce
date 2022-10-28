import { Stack } from '@mui/material'
import axios from 'axios'
import React, {  useCallback, useEffect, useRef, useState } from 'react'
import LoadingListProduct from './LoadingListProduct'
import { useSelector } from "react-redux";
import MyTypography from './MyTypography'
import ListProduct from './ListProduct'
export default function ListProductTrending() {
  const componentRef = useRef();
  const [isAppear, setIsAppear] = useState(false);
    const [data,setData] = useState([])
    const [page,setPage] = useState(1)
    const [loading,setLoading] = useState(false)
    const [isFetch,setIsFetch] = useState(false)
    const fetch = useCallback(async() => {
      setLoading(true)
     await axios.get(`api/products/filterHotProduct?page=${page}`).then(res => {setData(res.data);setLoading(false)}).catch(err => console.log(err))
    },[isFetch,page])
    useEffect(() => {
       isFetch &&  fetch()
    },[fetch])
    useEffect(() => {
      if (!componentRef?.current) return;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsAppear(true);
          setIsFetch(true)
        }
      });
      observer.observe(componentRef.current);
    }, [componentRef]);
    const mainBackGround = useSelector((state) => state.colorCommon.mainBackGround);
    const handleChange = (event, value) => {
      setPage(value);
    };
  return (

     <Stack  spacing={1} className={isAppear ? "appear" : ""}
     ref={componentRef} sx={{background : mainBackGround, padding : '10px', borderRadius : '30px'}}>
       <Stack direction='row' alignItems='center' justifyContent={{md : 'center' , xs : 'flex-start'}} spacing={2} position='relative'>
       <img style={{width  : '30px' ,height : '30px'}} src="https://bizweb.dktcdn.net/100/438/408/themes/878697/assets/fire-icon-new.png?1664943619853" alt="flashsale"/>
       <MyTypography fontSize='1.5rem'>Hot</MyTypography>
       {/* <Link style={{position : 'absolute', right : 0}} to='trending-product'>
         <Button   endIcon={<ChevronRightIcon/>}>See More</Button>
       </Link> */}
       </Stack>
       {
        loading ?  <LoadingListProduct limit={4}/> :  
        <ListProduct data={data.products} page={data.page} handleChange={handleChange} pages={data.pages}/>
       }
     </Stack>
  )
}
