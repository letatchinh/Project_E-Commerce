import { Grid } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import ContentTop from "../../components/client/ContentTop";
import ItemCategory from "../../components/client/ItemCategory";
import { listCategory } from "../../constant/Key";
export default function Category() {
  const mainBackGround = useSelector((state) => state.colorCommon.mainBackGround);
  return (
    <Stack sx={{ background: mainBackGround }}>
      {/* <ContentTop value="CATEGORY" /> */}
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
