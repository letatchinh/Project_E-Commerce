import React from 'react'
import { v4 } from 'uuid';
import Review from './Review'

export default function ListReview({data}) {
   const dataReverse = data.sort(function(a, b){return b.id - a.id})
   return (
     <>
      {
         dataReverse && dataReverse.map(e => <Review key={v4()} comment={e.comment} rating={e.rating} time={e.time} username={e.username}/>)
        }
     </>
  )
}
