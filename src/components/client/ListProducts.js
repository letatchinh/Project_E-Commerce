import { Grid, Pagination, Skeleton } from "@mui/material";
import {  Container, Stack } from "@mui/system";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import { URL_BASE } from "../../constant/UrlConstant";
import { fetchReceiveListShow } from "../../redux/filterProduct/Actions";
import Category from "./Category";
import ErrorNoItem from "./ErrorNoItem";
import Product from "./Product";
import SideBarFilter from "./SideBarFilter";
import Slider from "./Slider";
import SortBar from "./SortBar";
export default function ListProducts() {
  const dispatch = useDispatch()
  const limit = 4;
  const [start, setStart] = useState(0);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const listProduct = useSelector((state) => state.shop.listProduct);
  const inputSearch = useSelector((state) => state.shop.setSearchKeyword);
  const listReducer = useSelector((state) => state.filterProduct.listShow);
  const listMainReducer = useSelector((state) => state.filterProduct.listMain);
const fetchSearch = useCallback(async () => {
  if(inputSearch){
    setLoading(true)
    await axios
    .get(`${URL_BASE}listProduct?name_like=${inputSearch}`)
    .then((res) => {
      setCount(Math.ceil(res.data.length / limit));
      dispatch(fetchReceiveListShow(res.data))
      setPage(1)
      setStart(0)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }
}, [inputSearch,dispatch]);
useEffect(() => {
  fetchSearch();
}, [fetchSearch]);

const fetchNoSearch = useCallback(async () => {
  if(!inputSearch){
    setLoading(true)
    await axios
    .get(`${URL_BASE}listProduct?_page=${page}&_limit=${limit}`)
    .then((res) => {
      setCount(Math.ceil(listProduct.length / limit));
      setList(res.data)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }
}, [inputSearch,listProduct,page]);
useEffect(() => {
  fetchNoSearch();
}, [fetchNoSearch]);

useEffect(() => {
  if(listReducer.length !== 0){
    setList(listReducer.slice(start, start + limit))
  }
  else {
    setList(listMainReducer.slice(start, start + limit))
  }
},[start,listReducer,listMainReducer])

  const handleChange = (event, value) => {
    setPage(value);
    const newStart = (value - 1) * limit;
    setStart(newStart);
  };
  return (
    <>
   <Container>
   <Slider />
   </Container>
   <div style={{background  : '#F4F4F4' , padding : '10px 0'}}>
     <Container>
     <Stack spacing={2}>
     <Category />
      <Stack padding='20px' justifyContent='space-around' direction='row' sx={{background : 'white'}}>
      { inputSearch &&  <SideBarFilter />}
        <Stack style={{width : '90%'}}>
        {inputSearch && <SortBar  />}
        <Grid container spacing={3}>
          {loading
            ? Array.from(new Array(limit)).map((e) => (
                <Grid key={v4()} item xs={3}>
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="rectangular" width={210} height={60} />
                  <Skeleton variant="rounded" width={210} height={60} />
                </Grid>
              ))
            : list.length === 0 ?  <ErrorNoItem src="https://cdn.dribbble.com/users/2382015/screenshots/6065978/no_result_still_2x.gif?compress=1&resize=400x300"/> :(list &&
             list.map((e) => (
                <Grid className="abc" key={v4()} xs={6} md={3} item>
                  <Link to={`/products/${e.id}`}>
                    <Product
                      item={e}
                    />
                  </Link>
                </Grid>
              )))}
        </Grid>
       {list.length !== 0 &&  <Stack alignItems="center" spacing={2} sx={{marginTop : '20px'}}>
          <Pagination count={count} page={page} onChange={handleChange} />
        </Stack>}
        </Stack>
      </Stack> 
     </Stack>
     </Container>
   </div>
  
    </>
  );
}
