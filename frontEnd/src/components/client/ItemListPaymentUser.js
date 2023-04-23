import React, { useState } from 'react'
import { Button,  Stack, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../StyleComponent/ItemListPayment.css'
import { fetchAddToCartRequestSaga } from '../../redux/sagas/Mysaga'
import { KEY_USER } from '../../constant/LocalStored'
import PriceSell from './PriceSell'
import LoadingButton from '@mui/lab/LoadingButton';
export default function ItemListPaymentUser({data}) {
  const [loading,setLoading] = useState(false)
  const mainColorText = useSelector(state => state.colorCommon.mainColorText)
  const idUser = JSON.parse(localStorage.getItem(KEY_USER))
const {images,name , price,_id,discount}  = data
const dispatch = useDispatch()
const handleBuyAgain = async(e) => {
  e.preventDefault()
  setLoading(true)
  dispatch(
    fetchAddToCartRequestSaga({itemCart : {
      product: _id,
      user: idUser,
      },setLoading : () => setLoading(false)})
)
}
  return ( 
    <Link to={`/products/${_id}`} >
    <Stack className='itemListPayment' direction='row' spacing={3} borderBottom='1px solid #CACACA' padding='10px'>
    <img style={{width : '100px',height : '100px',objectFit : 'cover'}} src={`/images/${images[0]}`} alt='22'/>
    <Stack alignItems='flex-start'>
        <Typography variant='body1' fontWeight='bold' color={mainColorText}>{name}</Typography>
        <LoadingButton loadingIndicator="Loading…" loading={loading}  onClick={handleBuyAgain} type="button" variant='outlined'>Mua lại</LoadingButton>
    </Stack>
    <Typography sx={{marginLeft : 'auto!important'}} alignSelf='center' variant='h6'>
    <PriceSell discount={discount} price={price}/>
    </Typography>
</Stack>
 </Link>
  )
}
