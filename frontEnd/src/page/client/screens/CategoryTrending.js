import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { fetchListHot } from "../../../apis/client/ProductApis";
import MyTypography from "../../../components/client/MyTypography";
export default function CategoryTrending() {
  const mainBackGround = useSelector(
    (state) => state.colorCommon.mainBackGround
  );
  const [page, setPage] = useState(1);
  const limit = 4;
  // const { data, isLoading } = useQuery([page,limit], fetchListHot);
  return (
    <Stack
      alignItems="center"
      spacing={1}
      padding="30px 50px"
      sx={{ background: mainBackGround }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={{ md: "center", xs: "flex-start" }}
        spacing={2}
      >
        <img
          style={{ width: "30px", height: "30px" }}
          src="https://bizweb.dktcdn.net/100/438/408/themes/878697/assets/fire-icon-new.png?1664943619853"
          alt="flashsale"
        />
        <MyTypography fontSize="1.5rem">Trending</MyTypography>
      </Stack>
        <Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* <Typography fontSize='1.2rem' color='#7a7a9d' sx={{textShadow : '0 0 1px gray'}}>{data?.length} Products</Typography> */}
          </Stack>
          {/* <ListProductCommon data={data} limit={16}/> */}
        </Stack>
    </Stack>
  );
}
