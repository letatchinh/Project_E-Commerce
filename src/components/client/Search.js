import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import productApi from "../../apis/productApi";
import { Container, Stack } from "@mui/system";
import { Grid, Pagination } from "@mui/material";
import { v4 } from "uuid";
import Product from "./Product";
import Header from "../../layout/Header/Index"
export default function Search() {
  const limit = 4;
  const [start, setStart] = useState(0);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [listShow, setListShow] = useState([]);
  const setInputSearch = useSelector((state) => state.shop.setSearchKeyword);
  const fetchSearch = useCallback(async () => {
    const res = await productApi.searchItem(setInputSearch);
    setListShow(res.data.slice(start, start + limit));
    setCount(Math.ceil(res.data.length / limit));
  }, [page, setInputSearch]);
  useEffect(() => {
    fetchSearch();
  }, [fetchSearch]);
  const handleChange = (event, value) => {
    setPage(value);
    const newStart = (value - 1) * limit;
    setStart(newStart);
  };
  return  <>
     <Header />
  
{  listShow.length === 0 ? (
    <img style={{width : "50%" , marginLeft : "25%"}}
      src="https://i.pinimg.com/originals/20/d3/8b/20d38b1d0d3304dd80adc2e4029278ac.png"
      alt="error"
    />
  ) :
   (
    <Container>
      <Grid container spacing={3}>
        {listShow &&
          listShow.map((e) => (
            <Grid key={v4()} xs={3} item>
              <Product
                item={e}
                image={e.image}
                name={e.name}
                price={e.price}
                isSell={e.isSell}
                id={e.id}
                listRating={e.listRating}
                rating={e.rating}
              />
            </Grid>
          ))}
      </Grid>
      <Stack spacing={2} alignItems='center'>
        <Pagination count={count} page={page} onChange={handleChange} />
      </Stack>
    </Container>
  )}
  </>
}
