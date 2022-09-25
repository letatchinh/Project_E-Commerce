import {   Stack } from "@mui/system";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ItemListOrder from "./ItemListOrder";
import {v4} from 'uuid'
import DetailListOrderUser from "./DetailListOrderUser";
import ContainerScoll from "./ContainerScoll";
import { reverses } from "../../constant/FunctionCommom";
export default function ListOrder() {
  const [status,setStatus] = useState(true)
  const [orderShow,setOrderShow] = useState(null)
  const handleClickSeeMore = (id) => {
    setStatus(false)
    setOrderShow(id)
  }
  const listOrders = useSelector((state) => state.user.loginSuccess.listOrder);
  const listOrdersReverse =listOrders && reverses(listOrders)
  console.log(listOrdersReverse);
  return (
   status ?  <ContainerScoll sx={{ padding: "10px", color: "black" ,maxHeight : '22rem' , overflow : 'scroll' }}>
   <Stack spacing={2}>
    {listOrders && listOrdersReverse.map((e) =>  <ItemListOrder key={v4()} click={() => handleClickSeeMore(e.id)} id={e.id} timeOrder={e.timeOrder} totalBill={e.totalBill}/>)}
   </Stack>
 </ContainerScoll> :
 <DetailListOrderUser click={() => setStatus(true)} id={orderShow}/>
  );
}
