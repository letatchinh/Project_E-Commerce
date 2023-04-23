import { Button, Stack } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ListProductCommon from "./ListProductCommon";
import LoadingListProduct from "./LoadingListProduct";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../StyleComponent/ListProduct.css";
import AxiosUser from "../../apis/client/AxiosUser";
import ListProduct from "./ListProduct";
export default function ListProductNew() {
  const componentRef = useRef();
  const [isAppear, setIsAppear] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isFetch, setIsFetch] = useState(false);
  const [page, setPage] = useState(1);
  const mainBackGround = useSelector(
    (state) => state.colorCommon.mainBackGround
  );

  const limit = 4;
  const fetch = useCallback(async () => {
    setLoading(true);
    AxiosUser.get(`api/products/filterNewProduct?page=${page}&limit=${limit}`)
      .then((res) => {setData(res.data); setLoading(false);})
      .catch((err) => console.log(err));
   
  }, [isFetch, page]);
  // const {data,isLoading } = useQuery([page,limit], fetchListSale , {enabled : !isFetch})
  useEffect(() => {
    isFetch && fetch();
  }, [fetch]);
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    if (!componentRef?.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsAppear(true);
        setIsFetch(true);
      }
    });
    observer.observe(componentRef.current);
  }, [componentRef]);
  return (
    <Stack
      spacing={1}
      className={isAppear ? "appear" : ""}
      ref={componentRef}
      sx={{ background: mainBackGround, padding: "10px", borderRadius: "30px" }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={{ md: "center", xs: "flex-start" }}
        spacing={2}
        position="relative"
      >
        <img
          style={{ width: "60px", height: "30px" }}
          src="https://upload.wikimedia.org/wikipedia/commons/9/95/New_logo.svg"
          alt="flashsale"
        />
        <Link style={{ position: "absolute", right: 0 }} to="new-product">
          <Button endIcon={<ChevronRightIcon />}>Xem thêm</Button>
        </Link>
      </Stack>
      {loading ? (
        <LoadingListProduct limit={4} />
      ) : (
        <ListProduct
          data={data.products}
          page={data.page}
          handleChange={handleChange}
          pages={data.pages}
        />
      )}
    </Stack>
  );
}
