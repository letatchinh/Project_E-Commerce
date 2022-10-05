import {  Grid} from "@mui/material";
import {  Stack } from "@mui/system";
import axios from "axios";
import React, { useCallback, useEffect,  useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { URL_BASE } from "../../../constant/UrlConstant";
import { fetchReceiveListShow } from "../../../redux/filterProduct/Actions";
import ErrorNoItem from "../../../components/client/ErrorNoItem";
import MyPagination from "../../../components/client/MyPagination";
import Product from "../../../components/client/Product";
import SkeletonPruductUser from "../../../components/client/SkeletonPruductUser";
export default function ListProducts() {
  const dispatch = useDispatch()
  const limit = 8;
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
}, [listProduct,inputSearch,page]);
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
  useEffect(() => {
    if(listReducer.length !== 0){
      setCount(Math.ceil(listReducer.length / limit));
    }
    else{
      setCount(Math.ceil(listMainReducer.length / limit));
    }
  },[listReducer])
  return (
    <>
   <Grid container spacing={3}>
{
loading
? Array.from(new Array(limit)).map((e) => (
    <Grid key={v4()} item xs={3}>
    <SkeletonPruductUser />
    </Grid>
  ))
: 
list.length === 0 ?  <ErrorNoItem src="https://cdn.dribbble.com/users/2382015/screenshots/6065978/no_result_still_2x.gif?compress=1&resize=400x300"/> 
:
(list &&
 list.map((e) => (
    <Grid className="abc" key={v4()} xs={6} md={(inputSearch) ? 4 : 3} item>
        <Product 
          item={e}
        />
    </Grid>
  )))}
</Grid>
{list.length !== 0 &&  <Stack alignItems="center" spacing={2} sx={{marginTop : '20px'}}>
<MyPagination  count={count} page={page} onChange={handleChange} />
</Stack>} 
    </>
  );
}