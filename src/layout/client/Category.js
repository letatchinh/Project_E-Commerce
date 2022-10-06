import { Grid } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import ContentTop from "../../components/client/ContentTop";
import ItemCategory from "../../components/client/ItemCategory";
export default function Category() {
  const listCategory = [
    {
      name: "shirt",
      image:
        "https://images.asos-media.com/products/new-look-button-through-shirt-in-white/203560005-1-white?$n_480w$&wid=476&fit=constrain",
    },
    {
      name: "coat",
      image:
        "https://cdni.llbean.net/is/image/wim/260347_0_44?hei=1095&wid=950&resMode=sharp2&defaultImage=llbprod/A0211793_2",
    },
    {
      name: "trousers",
      image:
        "https://images.asos-media.com/products/stradivarius-wide-leg-relaxed-dad-trousers-in-grey/201385176-1-grey?$n_480w$&wid=476&fit=constrain",
    },
    {
      name: "dress",
      image:
        "https://www.bootbarn.com/dw/image/v2/BCCF_PRD/on/demandware.static/-/Sites-master-product-catalog-shp/default/dw5adca99d/images/838/2000364838_001_P1.JPG?sw=600&sh=600&sm=fit&q=50",
    },
    {
      name: "bikini",
      image:
        "https://my-test-11.slatic.net/p/ee3229a128f97f5317ff579854fa09f7.jpg",
    },
    {
      name: "shorts",
      image:
        "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/8c21a747-cd31-4ade-83c8-5e7610f057c6/10k-2-in-1-running-shorts-QBd76d.png",
    },
  ];
  const mainBackGround = useSelector((state) => state.common.mainBackGround);

  return (
    <Stack sx={{ background: mainBackGround }}>
      <ContentTop value="CATEGORY" />
      <Grid container
        direction="row"
        flexWrap="wrap"
        padding="10px"
        spacing={2}
        alignItems='center'
        justifyContent='center'
      >
        {listCategory.map((e) => (
          <Grid key={v4()} item>
          <Link to={`/${e.name}`}>
          <ItemCategory  value={e.name} image={e.image} />
          </Link>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
