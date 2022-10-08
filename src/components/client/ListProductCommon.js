import React, { useCallback, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import SkeletonPruductUser from "./SkeletonPruductUser";
import ErrorNoItem from "./ErrorNoItem";
import Product from "./Product";
import MyPagination from "./MyPagination";
import ProductClient from "./ProductClient";
export default function ListProductCommon({ limit, data }) {
  const dispatch = useDispatch();
  const [start, setStart] = useState(0);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(data.slice(start, start + limit));
  }, [page, data]);
  useEffect(() => {
    setCount(Math.ceil(data.length / limit));
  }, [data]);
  const handleChange = (event, value) => {
    setPage(value);
    const newStart = (value - 1) * limit;
    setStart(newStart);
  };
  return (
    <div>
      <Grid container spacing={3}>
        {list.length === 0 ? (
          <ErrorNoItem src="https://cdn.dribbble.com/users/2382015/screenshots/6065978/no_result_still_2x.gif?compress=1&resize=400x300" />
        ) : (
          list &&
          list.map((e) => (
            <Grid className="abc" key={v4()} xs={6} md={3} item>
              <ProductClient item={e} />
            </Grid>
          ))
        )}
      </Grid>
      {list.length !== 0 && (
        <Stack alignItems="center" spacing={2} sx={{ marginTop: "20px" }}>
          <MyPagination count={count} page={page} onChange={handleChange} />
        </Stack>
      )}
    </div>
  );
}
