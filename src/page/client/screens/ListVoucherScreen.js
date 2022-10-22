import {  Stack } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import { fetchListVoucherScreen } from "../../../apis/client/ProductApis";
import ItemListVoucherScreen from "../../../components/client/ItemListVoucherScreen";
import MyTypography from "../../../components/client/MyTypography";

export default function ListVoucherScreen() {
  const mainBackGround = useSelector(
    (state) => state.colorCommon.mainBackGround
  );
  const {data,isLoading} = useQuery([],fetchListVoucherScreen)
  console.log(data);
  return (
    <Stack
      spacing={2}
      sx={{ background: mainBackGround, padding: {md : "20px 50px" , sm : "20px 0px"} }}
    >
      <Stack direction="row" justifyContent="space-between">
        <MyTypography>Deal For You</MyTypography>
      </Stack>
      <Stack direction="row" spacing={3} overflow='scroll'>
    {
      data && data.map(e => <ItemListVoucherScreen item={e} key={v4()}/>)
    }
      </Stack>
    </Stack>
  );
}
