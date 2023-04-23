import React, { useEffect, useRef, useState } from "react";
import { Button, Grid } from "@mui/material";
import { v4 } from "uuid";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchListRef } from "../../apis/client/ProductApis";
import ListProductLoadMore from "./ListProductLoadMore";
import LoadingHomePage from "./LoadingHomePage";
import { Stack } from "@mui/system";
export default function ListProductRef({ category }) {
  const [isFetch,setIsFetch] = useState(false)
const {data,isFetchingNextPage , isFetching, hasNextPage , fetchNextPage } = useInfiniteQuery(
  [category],
  ({ pageParam = 1 }) => fetchListRef({pageParam,category : category}),
  {
    getNextPageParam :(_lastPage , pages) => {
      if(pages.length < _lastPage.pages){
        return pages.length + 1
      }
      else{
        return undefined
      }
    },
    enabled : category !== undefined && isFetch
  },
);
const componentRef = useRef()
useEffect(() => {
  if (!componentRef?.current) return;
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      setIsFetch(true)
    }
  });
  observer.observe(componentRef.current);
}, [componentRef]);
  return (
    <Stack ref={componentRef}>
      {data && data.pages.map(e => <ListProductLoadMore key={v4()} data={e.products}/>)}
        {isFetchingNextPage && <LoadingHomePage width='50%'/>}
      <Button sx={{width : '30%' , margin : '0 auto' , textTransform : 'capitalize'}}   disabled={!hasNextPage}  onClick={() => {fetchNextPage()}} variant='outlined'>
          Xem thêm
        </Button>
        {isFetching &&  !isFetchingNextPage && <LoadingHomePage />}
    </Stack>
  );
}
