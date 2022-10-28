import {  Stack } from '@mui/system'
import React from 'react'
import Carousel from 'react-material-ui-carousel'
import ItemSlider from '../../components/client/ItemSlider'
import '../../components/StyleComponent/Slider.css'
import { Grid } from '@mui/material'
export default function Slider() {
    var items = [
        {
            image: "https://cf.shopee.vn/file/374ea744070b5452a57ade794777f483_xxhdpi",
        },
        {
            image: "https://cf.shopee.vn/file/f5f9063b9c38b9663fd50069f1ba6a96_xxhdpi",
        }
        ,
        {
            image: "https://cf.shopee.vn/file/47ffe4c3c3146654eb8b878aae4c4380_xxhdpi",
        }
    ]
  return (
    
        <Stack  direction='row' spacing={1} padding='5px'>
        <Carousel interval={1000} sx={{width : {md : '70%' , xs : '100%'}}}>
    {
        items.map( (item, i) => <ItemSlider key={i} image={item.image} /> )
    }
</Carousel>
    <Grid container width='30%' spacing={1} direction='column' sx={{display : {md : 'flex' , xs : 'none'}}}>
        <Grid sx={{padding : '0!important'}} xs={6}  item><img style={{height : '95%'}}  src='https://cf.shopee.vn/file/2e8185ab1a561691cb64f999ed6ffaa5_xhdpi' alt='bannder'/></Grid>
        <Grid sx={{padding : '0!important'}} padding='0' xs={6}  item><img style={{height : '95%'}}  src='https://cf.shopee.vn/file/fefc420dc359ec447ec376c40ac53458_xhdpi' alt='bannder'/></Grid>
    </Grid>
    </Stack>
    
  )
}
