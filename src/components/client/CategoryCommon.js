import { Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { fetchSearch } from "../../apis/client/ProductApis";
import Category from "../../layout/client/Category";
import { setCategorySearch } from "../../redux/filterProduct/Actions";
import ErrorNoItem from "./ErrorNoItem";
import LoadingHomePage from "./LoadingHomePage";
import MyPagination from "./MyPagination";
import ProductClient from "./ProductClient";
import SideBarFilter from "./SideBarFilter";
import SortBar from "./SortBar";
export default function CategoryCommon({ type, valueOfContentTop }) {
  const keywordSearch = useSelector((state) => state.filterProduct.keyword);
  // const type = useSelector((state) => state.filterProduct.type);
  const sortPrice = useSelector((state) => state.filterProduct.sortPrice);
  const sortRating = useSelector((state) => state.filterProduct.sortRating);
  const low5 = useSelector((state) => state.filterProduct.low5);
  const more10 = useSelector((state) => state.filterProduct.more10);
  const more50 = useSelector((state) => state.filterProduct.more50);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(null);
  const [low, setLow] = useState(null);

  useEffect(() => {
    const arrMore = [more10, more50];
    arrMore.sort();
    setMore(arrMore[0]);
    setLow(Math.max(low5));
  }, [more10, more50, low5]);
  const dispatch = useDispatch();
  const query = useQuery(
    [keywordSearch, type, page, sortPrice, sortRating, low, more],
    fetchSearch
  );
  const { data, isLoading } = query
  useEffect(() => {
    // setLoading(true)
    // AxiosUser.get(`/api/products/search?category=${type}`).then(res => setData(res.data.products)).catch(err => console.log(err)).finally(() => setLoading(false))
    dispatch(setCategorySearch(type));
  }, [type]);
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
      sx={{ background: mainBackGround, width: "100%" }}
    >
      <Category />
      <Stack width="100%" direction="row" alignItems="center">
        <div
          style={{ flex: 1, height: "2px", background: "gray", width: "100%" }}
        ></div>
        <Typography
          sx={{
            border: "2px solid gray",
            padding: "5px",
            borderRadius: "10px",
          }}
          color="#fcaf17"
          fontSize="1.5rem"
        >
          {valueOfContentTop}
        </Typography>
        <div
          style={{ flex: 1, height: "2px", background: "gray", width: "100%" }}
        ></div>
      </Stack>

      <Stack width="100%" direction="row">
        <SideBarFilter />
        <Stack flex={1}>
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
              {/* {data.products.length} Products */}
            </Typography>
            <SortBar />
          </Stack>
          {isLoading ? (
            <LoadingHomePage height="21rem" />
          ) :
           (
             <Stack spacing={4}>
      <Grid container spacing={3}>
        {data && data.products.length === 0 ? (
          <ErrorNoItem src="https://cdn.dribbble.com/users/2382015/screenshots/6065978/no_result_still_2x.gif?compress=1&resize=400x300" />
        ) : (
          data &&
          data.products.map((e) => (
            <Grid className="abc" key={v4()} xs={6} md={3} item>
              <ProductClient item={e} />
            </Grid>
          ))
        )}
      </Grid>
      {data && data.products.length !== 0 && (
        <Stack alignItems="center" spacing={2} sx={{ marginTop: "20px" }}>
          <MyPagination count={data.pages} page={page} onChange={handleChange} />
        </Stack>
      )}
    </Stack>
           
          )
          }
        </Stack>
      </Stack>
    </Stack>
  );
}
 