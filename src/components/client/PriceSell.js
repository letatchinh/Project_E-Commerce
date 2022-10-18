import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

export default function PriceSell(props) {
  const { price, discount, fontSize , fontSizeDiscount } = props;
  const isSell  = (discount > 0)
  return (
    <Stack spacing={1} direction="row" sx={{cursor : 'auto'}}>
      <span
        style={{
          display: isSell ? "block" : "none",
          color: isSell ? "#ee4d2d" : "#C4C4C4",
          fontSize: fontSize ? fontSize : "20px",
          whiteSpace : 'nowrap'
        }}
      >
        {price - (price * discount) / 100} $
      </span>
      <span
        style={{
          textDecoration: isSell  ? "line-through" : "none",
          color: isSell  ? "#ee4d2d" : "rgb(238, 77, 45)",
          whiteSpace : 'nowrap',
          fontSize:
            !isSell  ? (fontSize ? fontSize : "20px") :  (fontSizeDiscount ? fontSizeDiscount : "12px"),
        }}
      >
        {price} $
      </span>
    </Stack>
  );
}
