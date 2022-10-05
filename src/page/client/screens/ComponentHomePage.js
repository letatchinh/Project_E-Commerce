import { Container } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import SideBarFilter from "../../../components/client/SideBarFilter";
import ListProducts from "./ListProducts";
import Slider from '../../../layout/client/Slider'
import Category from '../../../layout/client/Category'
import SortBar from '../../../components/client/SortBar'

export default function ComponentHomePage() {
    const mainBackGround2 = useSelector((state) => state.common.mainBackGround2);
    const mainBackGround = useSelector((state) => state.common.mainBackGround);
    const inputSearch = useSelector((state) => state.shop.setSearchKeyword);
  return (
    <>
          <div style={{background : mainBackGround}}>
   <Container>
   <Slider />
   </Container>
    </div>
   <div style={{background  : mainBackGround2 , padding : '10px 0'}}>
     <Container>
     <Stack spacing={2}>
     <Category />
      <Stack padding='20px' justifyContent='space-around' direction='row' sx={{background : mainBackGround}}>
      { inputSearch &&  <SideBarFilter />}
        <Stack style={{width : '90%'}}>
        {inputSearch && <SortBar  />}
      <ListProducts />
        </Stack>
      </Stack> 
     </Stack>
     </Container>
   </div>
    </>
  )
}
