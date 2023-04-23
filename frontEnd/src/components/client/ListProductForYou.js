import { Stack } from '@mui/material'
import axios from 'axios'
import React, {  useCallback, useEffect, useRef, useState } from 'react'
import ListProductCommon from './ListProductCommon'
import LoadingListProduct from './LoadingListProduct'
import { useSelector } from "react-redux";
import MyTypography from './MyTypography'
export default function ListProductForYou() {
  const componentRef = useRef();
  const [isAppear, setIsAppear] = useState(false);
    const [data,setData] = useState([])
    const limit = 16;
    const [dataRandom,setDataRandom] = useState([])
    const [loading,setLoading] = useState(false)
    const [isFetch,setIsFetch] = useState(false)
    const fetch = useCallback(async() => {
      setLoading(true)
      axios.get(`api/products/search?category=&limit=${limit}`).then(res => {setData(res.data.products);setLoading(false)}).catch(err => console.log(err))
      
    },[isFetch])
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
    useEffect(() => {
      let count = data.length;
      let listRamdom = [];
      let listArrayAppear = [];
      while(count > 0)
      {
        const random = Math.floor(Math.random() * data.length);
       if(listArrayAppear.indexOf(random) === -1){
         listArrayAppear.push(random);
         listRamdom.push(data[random])
         count--
       }
      }
      setDataRandom(listRamdom)
    },[data])
  return (

     <Stack  spacing={1} className={isAppear ? "appear" : ""}
     ref={componentRef} sx={{background : mainBackGround, padding : '10px', borderRadius : '30px'}}>
       <Stack direction='row' alignItems='center' justifyContent={{md : 'center' , xs : 'flex-start'}} spacing={2} position='relative'>
       <img style={{width  : '30px' ,height : '30px'}} src="https://bizweb.dktcdn.net/100/438/408/themes/878697/assets/fire-icon-new.png?1664943619853" alt="flashsale"/>
       <MyTypography fontSize='1.5rem'>Dành cho bạn</MyTypography>
       </Stack>
       {
        loading ?  <LoadingListProduct limit={limit}/> :  <ListProductCommon data={dataRandom} limit={limit} />
       }
     </Stack>
  )
}
