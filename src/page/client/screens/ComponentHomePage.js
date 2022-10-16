import { Container } from "@mui/material";
import { Stack } from "@mui/system";
import React ,{ lazy } from "react";
import { useSelector } from "react-redux";
import SideBarFilter from "../../../components/client/SideBarFilter";
import Slider from '../../../layout/client/Slider'
import Category from '../../../layout/client/Category'
import SortBar from '../../../components/client/SortBar'
import ListProductCommon from "../../../components/client/ListProductCommon";
import ListProductSale from "../../../components/client/ListProductSale";
import ListProductNew from "../../../components/client/ListProductNew";
import ListProductTrending from "../../../components/client/ListProductTrending";
import BannerShowMainProduct from "../../../components/client/BannerShowMainProduct";
import ListProductForYou from "../../../components/client/ListProductForYou";


export default function ComponentHomePage() {
    const mainBackGround2 = useSelector((state) => state.colorCommon.mainBackGround2);
    const mainBackGround = useSelector((state) => state.colorCommon.mainBackGround);
    const keywordSearch = useSelector((state) => state.filterProduct.keyword);
    return (
    <>
<div style={{background : mainBackGround}}>
<BannerShowMainProduct />
   <Container>
   <Slider />
   </Container>

    </div>
   <div style={{background  : mainBackGround2 , padding : '10px 0'}}>
     <Container>
     <Stack spacing={2}>
     <Category />
    <ListProductSale />
   <ListProductNew />
    <ListProductTrending />
    <ListProductForYou />
      <Stack id='search' padding='20px' justifyContent='space-around' direction='row' sx={{background : mainBackGround}}>
      { keywordSearch &&  <SideBarFilter />}
        <Stack style={{width : '90%'}}>
        {keywordSearch && <SortBar  />}
      <Stack>
        <ListProductForYou />
      </Stack>
        </Stack>
      </Stack> 
     </Stack>
     </Container>
   </div>
    </>
  )
}
