import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

export default function PriceSell(props) {
  const { isSell, price, discount, fontSize } = props;
  return (
    <Stack>
      <Typography color='warning'>{price}</Typography>
    </Stack>
    // <Stack direction="row" sx={{cursor : 'auto'}}>
    //   <span
    //     style={{
    //       display: isSell === "true" ? "block" : "none",
    //       color: isSell ? "#ee4d2d" : "#C4C4C4",
    //       fontSize: fontSize ? fontSize : "20px",
    //     }}
    //   >
    //     đ{price - (price * discount) / 100}
    //   </span>
    //   <span
    //     style={{
    //       textDecoration: isSell === "true" ? "line-through" : "none",
    //       color: isSell === "false" ? "#ee4d2d" : "#C4C4C4",
    //       fontSize:
    //         isSell === "false" ? (fontSize ? fontSize : "20px") : "12px",
    //     }}
    //   >
    //     đ{price}
    //   </span>
    // </Stack>
  );
}
