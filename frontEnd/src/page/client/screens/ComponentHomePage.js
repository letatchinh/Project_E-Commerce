import { Container } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import Slider from "../../../layout/client/Slider";
import Category from "../../../layout/client/Category";
import ListProductSale from "../../../components/client/ListProductSale";
import ListProductNew from "../../../components/client/ListProductNew";
import ListProductTrending from "../../../components/client/ListProductTrending";
import BannerShowMainProduct from "../../../components/client/BannerShowMainProduct";
import ListProductForYou from "../../../components/client/ListProductForYou";
import ListVoucherScreen from "./ListVoucherScreen";

export default function ComponentHomePage() {
  const mainBackGround2 = useSelector(
    (state) => state.colorCommon.mainBackGround2
  );
  const mainBackGround = useSelector(
    (state) => state.colorCommon.mainBackGround
  );
  return (
    <>
      <div style={{ background: mainBackGround }}>
        <BannerShowMainProduct />
        <Container>
          <Slider />
        </Container>
      </div>
      <div style={{ background: mainBackGround2, padding: "10px 0" }}>
        <Container>
          <Stack spacing={2}>
            <Category />
            {/* <ListVoucherScreen /> */}
            <ListProductSale />
            <ListProductNew />
            <ListProductTrending />
            <ListProductForYou />
          </Stack>
        </Container>
      </div>
    </>
  );
}
