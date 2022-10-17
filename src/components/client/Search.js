import React, {  useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import {  Stack } from "@mui/system";
import { Grid,  Typography } from "@mui/material";
import { v4 } from "uuid";
import SideBarFilter from "./SideBarFilter";
import SortBar from "./SortBar";
import LoadingHomePage from "./LoadingHomePage";
import { useQuery } from "@tanstack/react-query";
import { fetchSearch } from "../../apis/client/ProductApis";
import ProductClient from "./ProductClient";
import MyPagination from "./MyPagination";
import MyTypography from "./MyTypography";
import { useSearchParams } from "react-router-dom";
import ErrorNoItem from "./ErrorNoItem";
export default function Search() {
  const keywordSearch = useSelector((state) => state.filterProduct.keyword);
  const type = useSelector((state) => state.filterProduct.type);
  const sortPrice = useSelector((state) => state.filterProduct.sortPrice);
  const sortRating = useSelector((state) => state.filterProduct.sortRating);
  const low5 = useSelector((state) => state.filterProduct.low5);
  const more10 = useSelector((state) => state.filterProduct.more10);
  const more50 = useSelector((state) => state.filterProduct.more50);
  const [more,setMore] = useState(null)
  const [low,setLow] = useState(null)
  useEffect(() => {
    const arrMore = [more10,more50]
    arrMore.sort()
    setMore(arrMore[0])
    setLow(Math.max(low5))
  },[more10,more50,low5])
  let [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useQuery(
    [keywordSearch,type,page,sortPrice,sortRating,low,more],
    fetchSearch
  )
useEffect(() => {
  let objectSearch = {name : keywordSearch , page : page}
  if(type){
    objectSearch.category = type
  }
  if(sortPrice){
    objectSearch.sortPrice = sortPrice
  }
  if(sortRating){
    objectSearch.sortRating = sortRating
  }
  if(low){
    objectSearch.low = low
  }
  if(more){
    objectSearch.more = more
  }
  setSearchParams(objectSearch) 
},[searchParams.get('name'),type,sortPrice,sortRating,low,more])
  const handleChange = (event, value) => {
    setPage(value);
  };
  const mainBackGround = useSelector(
    (state) => state.colorCommon.mainBackGround
  );


  return  (
    <Stack
    alignItems="center"
    spacing={1}
    padding="30px 50px"
    sx={{ background: mainBackGround}}
  >
    {(data && data.products.length !== 0) ? <MyTypography sx={{textAlign : 'left'}}>Result find for key : {keywordSearch}</MyTypography>
    : <MyTypography fontSize='1.5rem'>No result for find</MyTypography>}
    <Stack direction="row" width='100%'>
      <SideBarFilter />
      <Stack width='100%'>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            fontSize="1.2rem"
            color="#7a7a9d"
            sx={{ textShadow: "0 0 1px gray" }}
          >
            {data && data.products?.length} Products
          </Typography>
          <SortBar />
        </Stack>
        {
           (isLoading) ? <LoadingHomePage height="5rem" /> 
           : (data.products.length !== 0) ? <Stack>
          <Grid container spacing={3} width='100%'>
            {data.products &&
              data.products.map((e) => (
                <Grid className="abc" key={v4()} xs={6} md={3} item>
                  <ProductClient item={e} />
                </Grid>
              ))}
          </Grid>
          <Stack alignItems="center" spacing={2} sx={{ marginTop: "20px" }}>
            <MyPagination
              count={data.pages}
              page={page}
              onChange={handleChange}
            />
          </Stack>
        </Stack>
        : 
       
        <ErrorNoItem/>
     
  

        }
       
      </Stack>
    </Stack>
  </Stack>
  )
  


  
  
}
