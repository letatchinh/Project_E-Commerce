import React from 'react'
import {
    Avatar,
    ListItem,
  } from "@mui/material";
  import { Stack } from "@mui/system";
import PriceSell from './PriceSell'
export default function ItemPayment({value}) {
  return (
    <ListItem
    sx={{ justifyContent: "space-around" , borderBottom : "2px solid #C4C4C4"}}
    disableGutters
   
  >
    <Avatar
      sx={{ width: "100px", height: "100px" }}
      alt="Remy Sharp"
      src={value.image}
    />
    <Stack width="50%">
      <span
        style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 500 }}
      >
        {value.name}
      </span>
    </Stack>
      <PriceSell isSell={value.isSell} price={value.price}/>
  </ListItem>
  )
}
