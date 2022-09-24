import {  Container, Stack } from "@mui/system";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ItemListOrder from "./ItemListOrder";
import {v4} from 'uuid'
import DetailListOrderUser from "./DetailListOrderUser";
import ContainerScoll from "./ContainerScoll";
export default function ListOrder() {
  const [status,setStatus] = useState(true)
  const [orderShow,setOrderShow] = useState(null)
  const handleClickSeeMore = (id) => {
    setStatus(false)
    setOrderShow(id)
  }
  const listOrders = useSelector((state) => state.user.loginSuccess.listOrder);
  return (
   status ?  <ContainerScoll sx={{ padding: "10px", color: "black" ,maxHeight : '22rem' , overflow : 'scroll' }}>
   <Stack spacing={2}>
    {listOrders && listOrders.map((e) =>  <ItemListOrder key={v4()} click={() => handleClickSeeMore(e.id)} id={e.id} timeOrder={e.timeOrder} totalBill={e.totalBill}/>)}
   </Stack>
 </ContainerScoll> :
 <DetailListOrderUser click={() => setStatus(true)} id={orderShow}/>
  );
}
