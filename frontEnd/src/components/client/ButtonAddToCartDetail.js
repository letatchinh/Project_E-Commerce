import LoadingButton from '@mui/lab/LoadingButton'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { KEY_USER } from '../../constant/LocalStored'
import { fetchAddToCartRequestSaga } from '../../redux/sagas/Mysaga'
import { useNavigate } from 'react-router-dom'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import MyTypography from './MyTypography'
export default function ButtonAddToCartDetail({_id}) {
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem(KEY_USER))
    const handleAddToCart = (e) => {
        e.preventDefault()
        if(localStorage.getItem(KEY_USER)){
          setLoading(true)
          dispatch(
        fetchAddToCartRequestSaga({itemCart : {
          product: _id,
          user: user._id,
          },setLoading : () => setLoading(false)})
    )
        }
        else{
          navigate("/login")
        }
      }
  return (
    <LoadingButton sx={{
        display: "block",
        width: "45%",
        textTransform: "capitalize",
        background: "rgba(255,87,34,0.1)",
        borderColor: "#ee4d2d",
        color: "#ee4d2d",
      }}
      color="warning"
      variant="outlined" onClick={handleAddToCart} loading={loading} >
    <ShoppingCartCheckoutIcon className="hoverIconAddCart" />
    <MyTypography>Thêm vào giỏ hàng</MyTypography>
</LoadingButton>
  )
}
