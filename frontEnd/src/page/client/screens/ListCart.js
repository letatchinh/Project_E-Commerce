import { Button, Checkbox, FormControlLabel,  Typography } from '@mui/material'
import { Container, Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ItemListCart from '../../../components/client/ItemListCart'
import PlaceIcon from '@mui/icons-material/Place';
import { v4 } from 'uuid'
import { checkedAllProductRequest, fetchTaxShip, fetchTotalBill, fetchVoucher } from '../../../redux/client/cart/Actions'
import { Link } from 'react-router-dom'
import '../../../components/StyleComponent/ListCart.css'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { KEY_USER } from '../../../constant/LocalStored'
import ErrorNoItem from '../../../components/client/ErrorNoItem'
import FormChangeAddress from '../../../components/client/FormChangeAddress'
import axios from 'axios'
import  '../../../components/StyleComponent/Linkcss.css'
import FormVoucher from '../../../layout/client/FormVoucher'
import MyStepper from './MyStepper'
import MyTypography from '../../../components/client/MyTypography'
import { formatterNumber } from '../../../constant/FunctionCommom 2'
export default function ListCart() {
    const background2 = useSelector(state => state.colorCommon.mainBackGround2)
    const backgroundWhite = useSelector(state => state.colorCommon.mainBackGround)
    const status = useSelector(state => state.colorCommon.status)
    const listCarts = useSelector(state => state.cart.allListCart)
    const [loadingDistance,setLoadingDistance] = useState(false)
    const [distance, setDistance] = useState(0);
    const user = JSON.parse(localStorage.getItem(KEY_USER)) || ""
    const [isCheck,setIsCheck] = useState(false)
    const [checkedAll, setCheckedAll] = useState(false);
    const totalBill = useSelector(state => state.cart.totalBill)
    const taxShip = useSelector(state => state.cart.taxShip)
    const voucher = useSelector(state => state.cart.voucher)
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(fetchTotalBill())
     setIsCheck(listCarts.some(e => e.isChecked))
    },[listCarts,dispatch])
    useEffect(() => {
      dispatch(fetchTaxShip(parseFloat((distance * 8000).toFixed(0))))
    },[distance,dispatch])
    useEffect(() => {
      if(totalBill + taxShip < voucher){
        dispatch(fetchVoucher({discount : 0,_id : null}))
      }
    },[totalBill,taxShip])

    const SubAddress = useSelector(state => state.cart.SubAddress)
    const steps = [
      "Thêm vào giỏ hàng",
      "Chọn phương thức thanh toán",
      "Đợi admin kiểm tra giỏ hàng",
    ];
    useEffect(() => {
      
     if(SubAddress || user.address){
      setLoadingDistance(true)
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${SubAddress || user.address}.json?access_token=pk.eyJ1IjoibGV0YXRjaGluaCIsImEiOiJjbDhjd2x1NTkwMzV0M3BvYmpweWJwZG9hIn0.crltMkQeuF92KSs1DRH2pQ`
        )
        .then((res) => axios
            .get(
              `https://api.mapbox.com/directions/v5/mapbox/driving/108.24861,16.03083;${res.data.features[0].center[0]},${res.data.features[0].center[1]}?geometries=geojson&access_token=pk.eyJ1IjoibGV0YXRjaGluaCIsImEiOiJjbDhjd2x1NTkwMzV0M3BvYmpweWJwZG9hIn0.crltMkQeuF92KSs1DRH2pQ`
            )
            .then((res) =>
              {
           setLoadingDistance(false)
             if(parseFloat((res.data.routes[0].distance / 900).toFixed(1)) <= 0){
              setDistance(0)
             }else{

               setDistance((res.data.routes[0].distance / 900).toFixed(1) - 1)
             }
              }
            )
        )
        .catch((err) => {});
     }
    }, [user.address,SubAddress]);
     const handleChange = (event) => {
      setCheckedAll(event.target.checked);
      dispatch(checkedAllProductRequest(event.target.checked))
    };
  return (
    <div style={{background : background2 , padding : '2rem 0' }}>
    <Container  >
                <MyStepper activeStep={0} steps={steps}/>
        <Stack direction={{md : 'row' , sm : 'column'}} spacing={1} >
        <Stack width={{md : '70%' , sm : '100%'}} spacing={1} sx={{background : backgroundWhite, padding:'10px',borderRadius:'20px'}}>
        <Stack width = '100%' direction='row' alignItems='center' >
     <div style={{flex : 1 , height : '2px' , background : 'gray', width : '100%'}}></div>
     <Typography sx={{border : "2px solid gray" , padding : '7px' , borderRadius : '10px'}} color={status ? 'black' : 'white'} fontSize='1.5rem'>Giỏ hàng</Typography>
     <div style={{flex : 1 , height : '2px' , background : 'gray', width : '100%'}}></div>
   </Stack> 
   {listCarts && listCarts.length !== 0 && 
   <FormControlLabel sx={{color : !status && 'white'}} control={<Checkbox sx={{color : !status && 'white'}}  checked={checkedAll} onChange={handleChange}  />} label={!checkedAll ? "Chọn tất cả" : "Bỏ Chọn tất cả"} />
   }
                    {listCarts && listCarts.length === 0 ? <div style={{margin : '0 auto'}}><ErrorNoItem /></div>: listCarts.map(e =>  <ItemListCart key={v4()} item={e}/>)}
        </Stack>
        <Stack textAlign={{md : 'left', sm : 'center'}} spacing={3} sx={{background : backgroundWhite, padding:'10px',borderRadius:'20px'}}>
        <Stack  spacing={1} borderBottom='1px solid #999' padding='10px 0'>
          <Typography  textAlign={{md : 'left', sm : 'center'}} color='#9e9e9e' fontSize='14px'>Địa chỉ</Typography>
            <Stack direction='row' sx={{color : '#9e9e9e'}} alignItems='center' spacing={1} >
         {(SubAddress || user.address) &&  <PlaceIcon/>}
          <MyTypography  fontSize='13px' fontWeight='medium'>{SubAddress|| user.address  || ""} </MyTypography>
         
           </Stack>
           <FormChangeAddress />
        </Stack>
        <Stack spacing={1} >
          <MyTypography fontSize='1.2rem'>Thông tin đơn hàng</MyTypography>
          <Stack direction='row' justifyContent='space-between'>
            <MyTypography fontSize='14px' color='#757575'>Tồng tiền sản phẩm</MyTypography>
            <MyTypography>{formatterNumber(totalBill)} VND</MyTypography>
          </Stack>
          <Stack direction='row' justifyContent='space-between'>
          <MyTypography fontSize='14px' color='#757575'>Phí ship ({distance} km)</MyTypography>
          {loadingDistance ? <div>...loading</div> : <MyTypography>{formatterNumber((distance * 8000).toFixed(0))} VND</MyTypography>}
            
          </Stack>
          {/* <Stack direction='row' justifyContent='space-between'>
          <MyTypography fontSize='14px' color='#757575'>Giảm giá</MyTypography>
            <MyTypography>-{voucher} VND</MyTypography>
          </Stack> */}
           <Typography sx={{opacity : voucher !== 0 ? 1 : 0 , transition : '0.5s ease',backgroundImage: 'linear-gradient(to right , orange, red)',
    backgroundClip: 'text',
    color: 'transparent',
    width: 'fit-content',}}><img style={{width : '30px'}} src="https://cdn-icons-png.flaticon.com/128/2548/2548362.png" alt='ll'/>{`congrats you got ${voucher}$ ​​off from voucher`}</Typography>
        </Stack>
    {/* <FormVoucher /> */}
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography fontSize='14px' color='#757575'>Tổng tiền đơn hàng</Typography>
            <Typography color='#f57224' fontSize='1.3rem'>{formatterNumber(totalBill + taxShip - voucher)} VND</Typography>
        </Stack>
        <Link className={(((!isCheck || user.address === "" ) && (!isCheck || !SubAddress))) ? 'disableLink': " "} to='/payment'><Button endIcon={<ArrowForwardIcon className='surFaceArrow'/>}  disabled={(((!isCheck || user.address === "" ) && (!isCheck || !SubAddress)))} sx={{width : '100%'}} color='warning' variant='contained'>Xác nhận đơn hàng</Button></Link>
        </Stack>
        </Stack>
    </Container>
    </div>
  )
}
