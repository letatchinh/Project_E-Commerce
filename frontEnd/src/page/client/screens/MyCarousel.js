import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import ItemMyCarousel from './ItemMyCarousel'
import '../../../components/StyleComponent/MyCarousel.css'

export default function MyCarousel({data,limit,hover}) {
    const [list,setList] = useState([])
    useEffect(() => {
        const listTemp = []
        let count = Math.ceil(data.length / limit)
        let start = 0;
        
        while(count > 0){
            const newAr = data.slice(start,start+limit)
            listTemp.push(newAr)
            start = start + limit;
            count--
        }
       setList(listTemp)
    },[data])
  return (
    <Carousel  indicators={false} animation='slide' duration={1000} autoPlay={false}>
    {
        list.map( (item, i) => <ItemMyCarousel indexItem={i} hover={hover} key={i} item={item} /> )
    }
</Carousel>
  )
}
