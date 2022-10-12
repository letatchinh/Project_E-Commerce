import {   Stack } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ItemListOrder from "../../../components/client/ItemListOrder";
import {v4} from 'uuid'
import DetailListOrderUser from "../../../components/client/DetailListOrderUser";
import ContainerScoll from "../../../components/client/ContainerScoll";
import { reverses } from "../../../constant/FunctionCommom";
import ErrorNoItem from '../../../components/client/ErrorNoItem'
import { KEY_USER } from "../../../constant/LocalStored";
import { useNavigate } from "react-router-dom";
import ContentTop from '../../../components/client/ContentTop'
import AxiosUser from "../../../apis/client/AxiosUser";
import { Pagination } from "@mui/material";
export default function ListOrder() {
  const users = JSON.parse(localStorage.getItem(KEY_USER))
  const [page,setPage] = useState(1)
  const [list,setList] = useState([])
  const [count,setCount] = useState(0)
  const [loading,setLoading] = useState(false)
  const [status,setStatus] = useState(true)
  
  const [indexActive,setIndetActive] = useState(null)
  const handleClickSeeMore = (index) => {
    setStatus(false)
    setIndetActive(index)
  }
  const navigate = useNavigate()
  useEffect(() => {
    if(users === null){
      navigate('/login')
    }
  },[users])
  const fetchListOrder = useCallback(() => {
    setLoading(true)
    AxiosUser.get(`/api/orders/getOrderUser/${users._id}?pageNumber=${page}`).then(res => {
      setList(res.data.Orders)
      setPage(res.data.page)
      setCount(res.data.pages)
    }).catch(err => console.log(err)).finally(() => setLoading(false))
  },[page,users._id])
  useEffect(() => {
    fetchListOrder()
  },[fetchListOrder])
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
   <div>
   {loading && <div>...Loading</div>}
   <ContentTop value='List Order'/>
     {status ?  <Stack alignItems='center'>
      <ContainerScoll>
 {list.length === 0 
 ? <ErrorNoItem src='https://i.pinimg.com/originals/6f/fd/64/6ffd64c5366898c59bbc91d9aec935c3.png'/> 
 :   <Stack spacing={2}>
    {list && list.map((e,index) =>  <ItemListOrder key={v4()} click={() => handleClickSeeMore(index)} item={e} />)}
   </Stack>}
 </ContainerScoll>
 <Pagination onChange={handleChange} count={count}  variant="outlined" shape="rounded" />
     </Stack>:
 <DetailListOrderUser click={() => setStatus(true)} data={list[indexActive]}/>}
   </div>
  );
}
