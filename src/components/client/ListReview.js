import { Button, Paper, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import { v4 } from 'uuid';
import AxiosUser from '../../apis/client/AxiosUser';
import LoadingHomePage from './LoadingHomePage';
import Review from './Review'

export default function ListReview({_id,count}) {
   
   const [listReview,setListReview] = useState([])
   const [loadingReview, setLoadingReview] = useState(false);
   const fetchreview = useCallback(async() =>{
      setLoadingReview(true)
      const res = await AxiosUser.get(`/api/reviews/getReviewByIdProduct/${_id}`)
      setListReview(res.data.reviews)
      setLoadingReview(false)
    },[count])
    useEffect(() => {
      _id && fetchreview()
    },[fetchreview])
   return (
     <>
      { loadingReview ? <LoadingHomePage/> : (listReview.length !== 0) ?
         listReview.map(e => <Review key={v4()}  item={e}/>) : <Paper sx={{padding : '50px',textAlign : 'center',backgroundColor : 'rgb(231, 235, 240)'}} elevation={3}><Typography lineHeight={3.5}>There are currently no reviews for this product. Be the first to review this product</Typography>
         <Button href='#comment' variant='contained'>Send Your Comment</Button></Paper>
        }
     </>
  )
}
