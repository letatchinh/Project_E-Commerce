import { Button, Paper, Typography } from '@mui/material';
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
     <>
{     data && data.pages.map(e => e.reviews.map(f => <Review key={v4()}  item={f}/>)) }
{data && data.pages[0].reviews.length === 0 ?  <Paper sx={{padding : '50px',textAlign : 'center',backgroundColor : 'rgb(231, 235, 240)'}} elevation={3}><Typography lineHeight={3.5}>There are currently no reviews for this product. Be the first to review this product</Typography>
         <Button href='#comment' variant='contained'>Send Your Comment</Button>
         </Paper> :  <Button sx={{width : '30%' , margin : '0 auto' , textTransform : 'capitalize'}}   disabled={!hasNextPage}  onClick={() => {fetchNextPage()}} variant='outlined'>
          See More
        </Button>}
        {isFetching &&  !isFetchingNextPage && <LoadingHomePage />}
        {isFetchingNextPage && <LoadingHomePage width='50%'/>}
       
     </>
  )
}
