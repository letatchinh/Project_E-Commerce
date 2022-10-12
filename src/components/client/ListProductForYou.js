import { Button, Stack } from '@mui/material'
import axios from 'axios'
import React, {  useEffect, useRef, useState } from 'react'
import ListProductCommon from './ListProductCommon'
import LoadingListProduct from './LoadingListProduct'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useSelector } from "react-redux";
import MyTypography from './MyTypography'
import { Link } from 'react-router-dom'
export default function ListProductForYou() {
  const componentRef = useRef();
  const [isAppear, setIsAppear] = useState(false);
    const [data,setData] = useState([])
    const [dataRandom,setDataRandom] = useState([])
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios.get(`api/products/search?category=`).then(res => setData(res.data)).catch(err => console.log(err)).finally(() => setLoading(false))
    },[])
    useEffect(() => {
      if (!componentRef?.current) return;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsAppear(true);
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
// const random = Math.floor(Math.random() * data.length);
// console.log(random, data[random])
  return (

     <Stack className={isAppear ? "appear" : ""}
     ref={componentRef} sx={{background : mainBackGround, padding : '10px'}}>
       <Stack direction='row' alignItems='center' justifyContent={{md : 'center' , xs : 'flex-start'}} spacing={2} position='relative'>
       <img style={{width  : '30px' ,height : '30px'}} src="https://bizweb.dktcdn.net/100/438/408/themes/878697/assets/fire-icon-new.png?1664943619853" alt="flashsale"/>
       <MyTypography fontSize='1.5rem'>For You</MyTypography>
       <Link style={{position : 'absolute', right : 0}} to='trending-product'>
         <Button   endIcon={<ChevronRightIcon/>}>See More</Button>
       </Link>
       </Stack>
       {
        loading ?  <LoadingListProduct limit={8}/> :  <ListProductCommon data={dataRandom} limit={8} />
       }
     </Stack>
  )
}
