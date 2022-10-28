import { Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import { fetchListNew } from "../../../apis/client/ProductApis";
import LoadingHomePage from "../../../components/client/LoadingHomePage";
import MyPagination from "../../../components/client/MyPagination";
import ProductClient from "../../../components/client/ProductClient";
export default function CategoryNew() {
  const [page, setPage] = useState(1);
  const limit = 8
  const { data,  isLoading } = useQuery(
    [page, limit],
    fetchListNew
  );
  console.log(data);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const mainBackGround = useSelector(
    (state) => state.colorCommon.mainBackGround
  );
  return (
    <Stack
    
      alignItems="center"
      spacing={1}
      padding="30px 50px"
      sx={{ background: mainBackGround}}
    >
      <img
        style={{ width: "60px", height: "30px" }}
        src="https://upload.wikimedia.org/wikipedia/commons/9/95/New_logo.svg"
        alt="flashsale"
      />
      <Stack direction="row" width='100%'>
        {/* <SideBarFilter /> */}
        <Stack width='100%'>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              fontSize="1.2rem"
              color="#7a7a9d"
              sx={{ textShadow: "0 0 1px gray" }}
            >
              {data && data.count} Products
            </Typography>
            {/* <SortBar /> */}
          </Stack>
          {
             (isLoading) ? <LoadingHomePage height="5rem" /> : <Stack>
            <Grid container spacing={3} width='100%'>
              {data.products &&
                data.products.map((e) => (
                  <Grid className="abc" key={v4()} xs={6} md={3} item>
                    <ProductClient item={e} />
                  </Grid>
                ))}
            </Grid>
            <Stack alignItems="center" spacing={2} sx={{ marginTop: "20px" }}>
              <MyPagination
                count={data.pages}
                page={page}
                onChange={handleChange}
              />
            </Stack>
          </Stack>
    
  
          }
         
        </Stack>
      </Stack>
    </Stack>
  );
}
