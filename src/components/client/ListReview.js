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
    console.log(listReview);
   return (
     <>
      { loadingReview ? <LoadingHomePage/> : 
         listReview.map(e => <Review key={v4()}  item={e}/>)
        }
     </>
  )
}
