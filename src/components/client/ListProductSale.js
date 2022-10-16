import { Button, Stack } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { URL_BASE } from "../../constant/UrlConstant";
import ListProductCommon from "./ListProductCommon";
import LoadingListProduct from "./LoadingListProduct";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSelector } from "react-redux";
import CountdownTimer from "./CountdownTimer";
import { Link } from "react-router-dom";
import "../StyleComponent/ListProduct.css";
export default function ListProductSale() {
  const componentRef = useRef();
  const [isAppear, setIsAppear] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFetch,setIsFetch] = useState(false)
  const fetch = useCallback(async() => {
    setLoading(true)
    axios.get(`api/products/search?category=`).then(res => setData(res.data.products)).catch(err => console.log(err))
    setLoading(false)
  },[isFetch])
  useEffect(() => {
     isFetch && fetch()
  },[fetch])

  useEffect(() => {
    if (!componentRef?.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsAppear(true);
        setIsFetch(true)
      }
    });
    observer.observe(componentRef.current);
  }, [componentRef]);
  const mainBackGround = useSelector(
    (state) => state.colorCommon.mainBackGround
  );
  return (
    <Stack spacing={1}
      className={isAppear ? "appear" : ""}
      ref={componentRef}
      sx={{ background: mainBackGround, padding: "10px" , borderRadius : '30px' }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={{ md: "center", xs: "flex-start" }}
        spacing={2}
        position="relative"
      >
        <img
          style={{ width: "114px", height: "30px" }}
          src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/flashsale/fb1088de81e42c4e538967ec12cb5caa.png"
          alt="flashsale"
        />
        <CountdownTimer />
        <Link style={{ position: "absolute", right: 0 }} to="/flash-sale">
          <Button endIcon={<ChevronRightIcon />}>See More</Button>
        </Link>
      </Stack>
      {loading ? (
        <LoadingListProduct limit={4} />
      ) : (
        <ListProductCommon data={data} limit={4} />
      )}
    </Stack>
  );
}
