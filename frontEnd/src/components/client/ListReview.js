import { Button, Paper, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { v4 } from 'uuid';
import { fetchListReview } from '../../apis/client/ProductApis';
import LoadingHomePage from './LoadingHomePage';
import Review from './Review'

export default function ListReview({item}) {
   const {data,isFetchingNextPage ,refetch, isFetching, hasNextPage , fetchNextPage } = useInfiniteQuery(
    [item._id],
    ({ pageParam = 1 }) => fetchListReview({pageParam,_id : item._id}),
    {
      getNextPageParam :(_lastPage , pages) => {
        if(pages.length < _lastPage.pages){
          return pages.length + 1
        }
        else{
          return undefined
        }
      },
      enabled : Object.keys(item).length !== 0
    },
  );
  useEffect(() => {
item._id && refetch()
  },[item])
   return (
     <Stack>
{     data && data.pages.map(e => e.reviews.map(f => <Review key={v4()}  item={f}/>)) }
{data && data.pages[0].reviews.length === 0 ?  <Paper sx={{padding : '50px',textAlign : 'center',backgroundColor : 'rgb(231, 235, 240)'}} elevation={3}><Typography lineHeight={3.5}>Hiện tại không có đánh giá cho sản phẩm này. Hay la ngươi đâu tiên xem xet sản phẩm nay
</Typography>
         <Button href='#comment' variant='contained'>Gửi đánh giá của bạn</Button>
         </Paper> : 
          <Button sx={{width : '30%' , margin : '0 auto' , textTransform : 'capitalize'}}   disabled={!hasNextPage}  onClick={() => {fetchNextPage()}} variant='outlined'>
          Xem thêm
        </Button>}
        {isFetching &&  !isFetchingNextPage && <LoadingHomePage />}
        {isFetchingNextPage && <LoadingHomePage width='50%'/>}
       
     </Stack>
  )
}
