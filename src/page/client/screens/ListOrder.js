import {   Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
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
export default function ListOrder() {
  const users = JSON.parse(localStorage.getItem(KEY_USER))
  const navigate = useNavigate()
  useEffect(() => {
    if(users === null){
      navigate('/login')
    }
  },[users])
  const [status,setStatus] = useState(true)
  const [orderShow,setOrderShow] = useState(null)
  const handleClickSeeMore = (id) => {
    setStatus(false)
    setOrderShow(id)
  }
  const listOrders = useSelector((state) => state.user.loginSuccess.listOrder);
  const listOrdersReverse =listOrders && reverses(listOrders)
  return (
   <div>
   <ContentTop value='List Order'/>
     {status ?  <ContainerScoll>
 {listOrders && listOrders.length === 0 ? <ErrorNoItem src='https://i.pinimg.com/originals/6f/fd/64/6ffd64c5366898c59bbc91d9aec935c3.png'/> :   <Stack spacing={2}>
    {listOrders && listOrdersReverse.map((e) =>  <ItemListOrder key={v4()} click={() => handleClickSeeMore(e.id)} id={e.id} timeOrder={e.timeOrder} totalBill={e.totalBill}/>)}
   </Stack>}
 </ContainerScoll> :
 <DetailListOrderUser click={() => setStatus(true)} id={orderShow}/>}
   </div>
  );
}
