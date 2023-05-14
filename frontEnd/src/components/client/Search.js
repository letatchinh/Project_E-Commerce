import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";
import SideBarFilter from "./SideBarFilter";
import SortBar from "./SortBar";
import LoadingHomePage from "./LoadingHomePage";
import { useQuery } from "@tanstack/react-query";
import { fetchSearch } from "../../apis/client/ProductApis";
import { useSearchParams } from "react-router-dom";
import ErrorNoItem from "./ErrorNoItem";
import ListProduct from "./ListProduct";
import {
  fetchFilter,
  setCategorySearch,
  setFilter,
} from "../../redux/filterProduct/Actions";
import Category from "../../layout/client/Category";
import ButtonRemoveAllFilter from "./ButtonRemoveAllFilter";
export default function Search({ typeCategory }) {
  const dispatch = useDispatch();
  const [fetch, setFetch] = useState(false);
  const keyword = useSelector((state) => state.filterProduct.keyword);
  const category = useSelector((state) => state.filterProduct.category);
  const sortPrice = useSelector((state) => state.filterProduct.sortPrice);
  const sortRating = useSelector((state) => state.filterProduct.sortRating);
  const sortNew = useSelector((state) => state.filterProduct.sortNew);
  const sortSold = useSelector((state) => state.filterProduct.sortSold);
  // const low5 = useSelector((state) => state.filterProduct.low5);
  // const more10 = useSelector((state) => state.filterProduct.more10);
  // const more50 = useSelector((state) => state.filterProduct.more50);
  const gteRating = useSelector((state) => state.filterProduct.gteRating);
  const max = useSelector((state) => state.filterProduct.max);
  const min = useSelector((state) => state.filterProduct.min);
  const page = parseInt(useSelector((state) => state.filterProduct.page));
  useEffect(() => {
    typeCategory && dispatch(setCategorySearch(typeCategory));
  }, [typeCategory]);
  // useEffect(() => {
  //   const arrMore = [more10, more50];
  //   arrMore.sort();
  //   dispatch(setFilter({ type: "SET_MORE", filter: arrMore[0] }));
  //   dispatch(setFilter({ type: "SET_LOW", filter: Math.max(low5) }));
  // }, [more10, more50, low5,dispatch]);
  let [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    let params = [];
    for (let entry of searchParams.entries()) {
      params.push(entry);
    }
    dispatch(fetchFilter(params));
  }, []);
  const { data, isLoading } = useQuery(
    [
      {
        keyword,
        category,
        page,
        sortPrice,
        sortRating,
        sortNew,
        sortSold,
        min,
        max,
        gteRating,
      },
    ],
    fetchSearch
  );
  const fetchFillterCallBack = useCallback(async () => {
    let objectSearch = { keyword: keyword, page: page };
    if (category) {
      objectSearch.category = category;
    }
    if (sortPrice) {
      objectSearch.sortPrice = sortPrice;
    }
    if (sortRating) {
      objectSearch.sortRating = sortRating;
    }
    if (sortNew) {
      objectSearch.sortNew = sortNew;
    }
    if (sortSold) {
      objectSearch.sortSold = sortSold;
    }
    if (min) {
      objectSearch.min = min;
    }
    if (max) {
      objectSearch.max = max;
    }

    if (gteRating) {
      objectSearch.gteRating = gteRating;
    }
    await setSearchParams(objectSearch);
  }, [
    searchParams.get("keyword"),
    keyword,
    category,
    sortPrice,
    sortRating,
    sortNew,
    sortSold,
    min,
    max,
    page,
    gteRating,
    setSearchParams,
  ]);
  useEffect(() => {
    fetchFillterCallBack();
  }, [fetchFillterCallBack]);
  const handleChange = (event, value) => {
    dispatch(setFilter({ type: "SET_PAGE", filter: value }));
  };
  const mainBackGround = useSelector(
    (state) => state.colorCommon.mainBackGround
  );
  return (
    <>
      <Category />
      <Stack
        sx={{ background: mainBackGround }}
        width="100%"
        direction="row"
        alignItems="center"
      >
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
          {category || "Tất cả sản phẩm"}
        </Typography>
        <div
          style={{ flex: 1, height: "2px", background: "gray", width: "100%" }}
        ></div>
      </Stack>
      <Stack
        alignItems="center"
        spacing={1}
        padding={{ md: "30px 50px", sm: "2px" }}
        sx={{ background: mainBackGround }}
        position="relative"
      >
        <Stack direction="row" width="100%" position="relative">
          <Stack
            position={{ md: "relative", sm: "absolute", xs: "absolute" }}
            top={0}
          >
            <SideBarFilter />
          </Stack>
          <ButtonRemoveAllFilter />
          <Stack width="100%">
            <Stack direction="row" justifyContent="center" alignItems="center">
              <SortBar />
            </Stack>
            {isLoading ? (
              <LoadingHomePage height="5rem" />
            ) : data && data.products && data.products.length !== 0 ? (
              <ListProduct
                data={data.products}
                page={page}
                pages={data.pages}
                handleChange={handleChange}
              />
            ) : (
              <ErrorNoItem
                inSearch={true}
                src="https://i.pinimg.com/originals/20/d3/8b/20d38b1d0d3304dd80adc2e4029278ac.png"
              />
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
