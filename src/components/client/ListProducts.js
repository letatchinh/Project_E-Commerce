import { Grid, Pagination, Skeleton } from "@mui/material";
import { Container, Stack } from "@mui/system";
import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import { URL_BASE } from "../../constant/UrlConstant";
import Product from "./Product";
export default function ListProducts() {
  const limit = 4;
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const listProduct = useSelector((state) => state.shop.listProduct);
  const fetch = useCallback(async () => {
    setLoading(true)
    await axios
    .get(`${URL_BASE}listProduct?_page=${page}&_limit=${limit}`)
    .then((res) => {
      setList(res.data)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [page]);
  useEffect(() => {
    fetch();
  }, [fetch]);
  useMemo(() => {
    setCount(Math.ceil(listProduct.length / limit));
  }, [listProduct]);
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <>
      <Container>
        <Grid container spacing={3}>
          {loading
            ? Array.from(new Array(limit)).map((e) => (
                <Grid key={v4()} item xs={3}>
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="rectangular" width={210} height={60} />
                  <Skeleton variant="rounded" width={210} height={60} />
                </Grid>
              ))
            : list &&
              list.map((e) => (
                <Grid className="abc" key={v4()} xs={6} md={3} item>
                  <Link to={`/products/${e.id}`}>
                    <Product
                      item={e}
                    />
                  </Link>
                </Grid>
              ))}
        </Grid>
        <Stack alignItems="center" spacing={2} sx={{marginTop : '20px'}}>
          <Pagination count={count} page={page} onChange={handleChange} />
        </Stack>
      </Container>
    </>
  );
}
