import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { formatterNumber } from "../../constant/FunctionCommom 2";

export default function PriceSell(props) {
  const { price, discount, fontSize , fontSizeDiscount } = props;
  console.log(price,"price");
  const isSell  = (discount > 0)
  return (
    <Stack spacing={1} direction="row" sx={{cursor : 'auto'}}>
      <span
        style={{
          display: isSell ? "block" : "none",
          color: isSell ? "#ee4d2d" : "#C4C4C4",
          fontSize: fontSize ? fontSize : "20px",
          fontWeight : 'bold',
          whiteSpace : 'nowrap'
        }}
      >
        {formatterNumber(price - (price * discount) / 100)} VND
      </span>
      <span
        style={{
          textDecoration: isSell  ? "line-through" : "none",
          color: isSell  ? "#ee4d2d" : "rgb(238, 77, 45)",
          fontWeight : 'bold',
          whiteSpace : 'nowrap',
          fontSize:
            !isSell  ? (fontSize ? fontSize : "20px") :  (fontSizeDiscount ? fontSizeDiscount : "14px"),
        }}
      >
        {formatterNumber(price)} VND
      </span>
    </Stack>
  );
}
