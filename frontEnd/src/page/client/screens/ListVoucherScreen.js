import {  Stack } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import { fetchListVoucherScreen } from "../../../apis/client/ProductApis";
import CountdownTimer from "../../../components/client/CountdownTimer";
import ErrorNoItem from "../../../components/client/ErrorNoItem";
import ItemListVoucherScreen from "../../../components/client/ItemListVoucherScreen";
import LoadingHomePage from "../../../components/client/LoadingHomePage";
export default function ListVoucherScreen() {
  const componentRef = useRef();
const [enabled,setEnabled] = useState(false)
  const mainBackGround = useSelector(
    (state) => state.colorCommon.mainBackGround
  );
  const {data,isLoading} = useQuery([],fetchListVoucherScreen,{
    enabled : enabled
  })
  useEffect(() => {
    if (!componentRef?.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setEnabled(true)
      }
    });
    observer.observe(componentRef.current);
  }, [componentRef]);
  return (
    <Stack ref={componentRef}
      spacing={2}
      sx={{ background: mainBackGround, padding: {md : "20px 50px" , sm : "20px 0px"} }}
    >
      <Stack  alignItems='center' direction="row" justifyContent="center">
        <div style={{width : '100px'}}><img src="/images/saleLogo.png" alt="deal"/></div>
       <CountdownTimer timer="00:00:00"/>
      </Stack>
      <Stack direction="row" spacing={3} overflow='scroll'>
    { isLoading ? <LoadingHomePage /> :
      data ? data.map(e => <ItemListVoucherScreen item={e} key={v4()}/>) : <ErrorNoItem />
    }
      </Stack>
    </Stack>
  );
}
