import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";
import SideBarFilter from "./SideBarFilter";
import SortBar from "./SortBar";
import LoadingHomePage from "./LoadingHomePage";
import { useQuery } from "@tanstack/react-query";
import { fetchSearch } from "../../apis/client/ProductApis";
import MyTypography from "./MyTypography";
import { useSearchParams } from "react-router-dom";
import ErrorNoItem from "./ErrorNoItem";
import ListProduct from "./ListProduct";
import { setCategorySearch } from "../../redux/filterProduct/Actions";
import Category from "../../layout/client/Category";
export default function Search({typeCategory}) {
  const dispatch = useDispatch()
  const keywordSearch = useSelector((state) => state.filterProduct.keyword);
  const type = useSelector((state) => state.filterProduct.type);
  const sortPrice = useSelector((state) => state.filterProduct.sortPrice);
  const sortRating = useSelector((state) => state.filterProduct.sortRating);
  const low5 = useSelector((state) => state.filterProduct.low5);
  const more10 = useSelector((state) => state.filterProduct.more10);
  const more50 = useSelector((state) => state.filterProduct.more50);
  const gteRating = useSelector((state) => state.filterProduct.gteRating);
  const [more, setMore] = useState(null);
  const [low, setLow] = useState(null);
  useEffect(() => {
    typeCategory && dispatch(setCategorySearch(typeCategory));
  }, [typeCategory]);
  useEffect(() => {
    const arrMore = [more10, more50];
    arrMore.sort();
    setMore(arrMore[0]);
    setLow(Math.max(low5));
  }, [more10, more50, low5]);
  let [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery(
    [
      {
        keywordSearch,
        type,
        page,
        sortPrice,
        sortRating,
        low,
        more,
        gteRating,
      },
    ],
    fetchSearch
  );
  useEffect(() => {
    let objectSearch = { name: keywordSearch, page: page };
    if (type) {
      objectSearch.category = type;
    }
    if (sortPrice) {
      objectSearch.sortPrice = sortPrice;
    }
    if (sortRating) {
      objectSearch.sortRating = sortRating;
    }
    if (low) {
      objectSearch.low = low;
    }
    if (more) {
      objectSearch.more = more;
    }
    if (gteRating) {
      objectSearch.gteRating = gteRating;
    }

    setSearchParams(objectSearch);
  }, [
    searchParams.get("name"),
    type,
    sortPrice,
    sortRating,
    low,
    more,
    page,
    gteRating,
  ]);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const mainBackGround = useSelector(
    (state) => state.colorCommon.mainBackGround
  );
  return (
    <>
<Category />
      <Stack sx={{background : mainBackGround}}  width="100%" direction="row" alignItems="center">
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
          {type || "All Products"}
        </Typography>
        <div
          style={{ flex: 1, height: "2px", background: "gray", width: "100%" }}
        ></div>
      </Stack>
    <Stack
      alignItems="center"
      spacing={1}
      padding={{md : "30px 50px", sm : "2px"}}
      sx={{ background: mainBackGround }}
      position="relative"
    >
  
      <Stack direction="row" width="100%">
        <Stack
          position={{ md: "relative", sm: "absolute", xs: "absolute" }}
          top={0}
        >
          <SideBarFilter setPage={() => setPage(1)} />
        </Stack>
        <Stack width="100%">
          <Stack direction="row" justifyContent="center" alignItems="center">
            <SortBar />
          </Stack>
          {isLoading ? <LoadingHomePage height="5rem" /> : data && data.products && data.products.length !== 0 ? (
            <ListProduct
              data={data.products}
              page={page}
              pages={data.pages}
              handleChange={handleChange}
            />
          ) : (
            <ErrorNoItem src="https://i.pinimg.com/originals/20/d3/8b/20d38b1d0d3304dd80adc2e4029278ac.png" />
          )}
        </Stack>
      </Stack>
    </Stack>
    </>
  );
}