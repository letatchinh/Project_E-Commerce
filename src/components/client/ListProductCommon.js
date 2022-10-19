import React, {  useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Stack } from "@mui/system";
import { v4 } from "uuid";
import ErrorNoItem from "./ErrorNoItem";
import MyPagination from "./MyPagination";
import ProductClient from "./ProductClient";
export default function ListProductCommon({ limit, data ,loading }) {
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
    <Stack spacing={4}>
      <Grid container spacing={3}>
        {list.length === 0 ? (
          <ErrorNoItem  />
        ) : (
          list &&
          list.map((e) => (
            <Grid className="abc" key={v4()} sm={4}  md={3} xs={6} item>
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
    </Stack>
  );
}
