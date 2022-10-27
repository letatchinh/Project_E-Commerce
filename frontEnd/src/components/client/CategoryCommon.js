import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearch } from "../../apis/client/ProductApis";
import Category from "../../layout/client/Category";
import { setCategorySearch } from "../../redux/filterProduct/Actions";
import ListProduct from "./ListProduct";
import LoadingHomePage from "./LoadingHomePage";
import SideBarFilter from "./SideBarFilter";
import SortBar from "./SortBar";
export default function CategoryCommon({ type, valueOfContentTop ,limit}) {
  const keywordSearch = useSelector((state) => state.filterProduct.keyword);
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
  const temp={
    keywordSearch,
type,
page,
sortPrice,
sortRating,
low,
more,
limit
  }
  const query = useQuery(
    [temp],
    fetchSearch
  );
  const { data, isLoading } = query
  useEffect(() => {
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
      
      padding={{md : "0 50px 30px", xs : "0 2px 30px"}}
      sx={{ background: mainBackGround, width: "100%" }}
    >
      <Category />
      <Stack  width="100%" direction="row" alignItems="center">
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

      <Stack  width="100%" direction="row">
        <SideBarFilter setPage={handleChange}/>
        <Stack minWidth='320px' flex={1}>
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
            </Typography>
            <SortBar />
          </Stack>
          {isLoading ? (
            <LoadingHomePage height="21rem" />
          ) :
           (
             <Stack spacing={4}>
             <ListProduct data={data.products} page={page} pages={data.pages} handleChange={handleChange}/>
    </Stack>
           
          )
          }
        </Stack>
      </Stack>
    </Stack>
  );
}
 