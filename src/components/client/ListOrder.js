import {  Container, Stack } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import ItemListOrder from "./ItemListOrder";
import {v4} from 'uuid'
export default function ListOrder() {
  const listOrders = useSelector((state) => state.user.loginSuccess.listOrder);
  console.log(listOrders);
  return (
    <Container sx={{ padding: "10px", color: "black" ,maxHeight : '22rem' , overflow : 'scroll' }}>
      <Stack spacing={2}>
       {listOrders && listOrders.map((e) =>  <ItemListOrder key={v4()} id={e.id} timeOrder={e.timeOrder} totalBill={e.totalBill}/>)}
      </Stack>
    </Container>
  );
}
