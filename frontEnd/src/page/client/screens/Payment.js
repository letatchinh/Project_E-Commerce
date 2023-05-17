import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Container, Stack } from "@mui/system";
import React, { useEffect,  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import axios from "axios";
import OrderSuccess from "../../../components/client/OrderSuccess";
import ItemDetailistOrderUser from "../../../components/client/ItemDetailistOrderUser";
import ErrorNoItem from '../../../components/client/ErrorNoItem'
import { KEY_USER } from "../../../constant/LocalStored";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import moment from "moment";
import getToken from "../../../constant/getTokenUser";
import { PayPalButton } from 'react-paypal-button-v2'
import { fetchAddOrderRequest} from "../../../redux/sagas/Mysaga";
import AxiosUser from "../../../apis/client/AxiosUser";
import ToastError from "../../../components/client/ToastError";
import MyStepper from "./MyStepper";
import MyTypography from "../../../components/client/MyTypography";
import { formatterNumber } from "../../../constant/FunctionCommom 2";
export default function Payment() {
  const config = {
    headers: { Authorization: `Bearer ${getToken()}` }
  };
  const totalBill = useSelector(state => state.cart.totalBill)

  const mainBackGround = useSelector(state => state.colorCommon.mainBackGround)
  const mainBackGround2 = useSelector(state => state.colorCommon.mainBackGround2)
  const status = useSelector(state => state.colorCommon.status)

  const listCarts = useSelector(state => state.cart.allListCart)
  const [sdkReady,setSdkReady]=useState(false)
  const users = JSON.parse(localStorage.getItem(KEY_USER))

  const navigate = useNavigate()
  useEffect(() => {
    if(users === null){
      navigate('/login')
    }
  },[users])
  const dispatch = useDispatch();
  const steps = [
    "Thêm vào giỏ hàng",
    "Chọn phương thức thanh toán",
    "Đợi admin kiểm tra giỏ hàng",
  ];
  const [activeStep, setActiveStep] = useState(1);
  const taxShip = useSelector(state => state.cart.taxShip)
  const voucher = useSelector(state => state.cart.voucher)
  const SubAddress = useSelector(state => state.cart.SubAddress)
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const [listChecked, setListChecked] = useState([]);
  useEffect(() => {
    const newList = listCarts.filter(
      (e) => e.isChecked
    );
    setListChecked(newList);
  }, [listCarts]);
  useEffect(()=>{
    if(listChecked.length !== 0){
      setActiveStep(1)
    }
  },[listChecked])
  const setStep = () => {
    setActiveStep(2)
  }
  const handlePayment = async () => {
    const now = moment()._d;
    const listToCheckStock = listChecked.map(e => ({product : e._id,quanlity : e.quanlity}))
    // CHECK IN SERVER STOCK
 AxiosUser.post("/api/products/checkCountInStock",listToCheckStock).then(res => {
  if(res.data.status){
    const filnalList = listChecked.map(e => ({
      pricePure : e.pricePure,
      name : e.name,
      qty : e.quanlity,
      images : e.images,
      price : (e.discount > 0) ? e.newPrice : e.price,
      product : e._id
    }))
    const newOrder = {
      user : users._id,
      orderItem :filnalList,
      shippingAddress : {
        address: SubAddress || users.address || "",
            city: "aa",
            postalCode: "POX : 12233",
            country: "aaa"
      },
      paymentMethod : value,
      paymentResult:{
        id : v4(),
        status : value === "Paypal" ? true : false,
        update_time : now,
        email_address : users.email,

      },
      taxPrice : 10,
      voucher : voucher,
      shippingPrice : taxShip,
      totalPrice : parseFloat((parseFloat(totalBill) + taxShip - voucher).toFixed(2)),
      priceBill : (parseFloat(totalBill)).toFixed(2),
      isPaid : value === "Paypal" ? true : false,
      paidAt : value === "Paypal" ? now : ""
    };
  dispatch(fetchAddOrderRequest({newOrder,config,setStep}))
  }
  else{
    res.data.listOutOfStock.map(e => ToastError(`${e.name} hết hàng , kho còn ${e.countInStock}`))
  }
  })
   
  };
  useEffect(() => {
    const addPaypalScript = async() => {
      const {data : clientId} = await axios.get("/api/config/paypal").catch(err => console.log());
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true;
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }
if(value === ""){
  if(!window.paypal){
    addPaypalScript()
  }
  else{
    setSdkReady(true)
  }
}
  },[dispatch,value])
  const successPaymentPaypal = (result) => {
    if(result.status === "COMPLETED"){
      handlePayment()
    }
  }
  return (
    <>
        <div style={{ background: mainBackGround, padding: "20px", position : 'relative' }}>
        {listChecked.length === 0 && activeStep !== 2  &&  <Stack>
          <Link style={{position : 'absolute' , top : '2rem' , left : '5rem'}} to='/cart'><Button startIcon={<ArrowBackIosIcon/>} >Quay lại</Button></Link>
        <ErrorNoItem src='https://bizweb.dktcdn.net/100/351/215/themes/713955/assets/empty-cart.png?1617619216743'/>
        </Stack>}
          {activeStep === 1 && listChecked.length !== 0  && (
            <Container sx={{ background: mainBackGround2, borderRadius: "10px", position : 'relative' }}>
            <Link style={{position : 'absolute' , top : '2rem' , left : '2rem'}} to='/cart'><Button startIcon={<ArrowBackIosIcon/>} >Quay lại</Button></Link>
              <Stack
                spacing={3}
                borderBottom="2px solid #C4C4C4"
                padding="20px"
                textAlign="center"
              >
                <MyTypography variant="h4">Thanh toán </MyTypography>
                <MyStepper activeStep={1} steps={steps}/>

              </Stack>
              <Stack>
                {listChecked?.map((value) => (
                  <ItemDetailistOrderUser key={v4()} value={value} />
                ))}
              </Stack>
              <Stack
                spacing={1}
                sx={{ width: "400px", padding: "40px", marginLeft: "auto" }}
              >
               <Stack
                  width="100%"
                  justifyContent="space-between"
                  direction="row"
                >
                  <MyTypography variant="h6">Tổng giá trị :</MyTypography>
                  <MyTypography variant="h6" fontWeight="bold">
                  {formatterNumber(totalBill)} VND
                  </MyTypography>
                  
                </Stack>
                <Stack
                  width="100%"
                  justifyContent="space-between"
                  direction="row"
                >
                  <MyTypography variant="h6">Phí ship :</MyTypography>
                  <MyTypography variant="h6" fontWeight="bold">
                  {formatterNumber(taxShip)} VND
                  </MyTypography>
                  
                </Stack>
                {/* <Stack
                  width="100%"
                  justifyContent="space-between"
                  direction="row"
                >
                 <MyTypography variant="h6">Giảm giá :</MyTypography>
                  <MyTypography variant="h6" fontWeight="bold">
                  -{voucher} $
                  </MyTypography>
                  
                </Stack> */}
                <Stack
                  width="100%"
                  justifyContent="space-between"
                  direction="row"
                >
                  <MyTypography variant="h6" fontWeight="bold">
                    Tổng tiền đơn hàng
                  </MyTypography>
                  <MyTypography variant="h6" fontWeight="bold">
                    {formatterNumber(totalBill + taxShip - voucher)} VND
                  </MyTypography>
                </Stack>
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  padding: "20px",
                  borderBottom: "2px solid #C4C4C4",
                  borderTop: "2px solid #C4C4C4",
                }}
              >
                <Stack>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      <MyTypography variant="h5" fontWeight="bold">
                        Phương thức thanh toán
                      </MyTypography>
                    </FormLabel>
                    <RadioGroup
                      row
                      sx={{color : !status && 'white'}}
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={value}
                    >
                      {/* <FormControlLabel
                        onChange={handleChange}
                        value="Paypal"
                        control={<Radio />}
                        label={
                          <img
                            style={{ width: "50px" }}
                            src="https://vietjet.asia/assets/uploads/2017/06/L%E1%BB%A3i-%C3%ADch-t%E1%BB%AB-vi%E1%BB%87c-s%E1%BB%AD-d%E1%BB%A5ng-visa-card.png"
                            alt="Paypal"
                          />
                        }
                      /> */}
                      <FormControlLabel 
                        onChange={handleChange}
                        value="shipCod"
                        control={<Radio />}
                        label="ShipCod"
                      />
                      {/* <FormControlLabel 
                        onChange={handleChange}
                        value="Paypal"
                        control={<Radio />}
                        label="Chuyển khoản"
                      /> */}
                      {/* <FormControlLabel
                        value="disabled"
                        disabled
                        control={<Radio />}
                        label={
                          <img
                            style={{ width: "50px" }}
                            src="https://play-lh.googleusercontent.com/dQbjuW6Jrwzavx7UCwvGzA_sleZe3-Km1KISpMLGVf1Be5N6hN6-tdKxE5RDQvOiGRg"
                            alt="Paypal"
                          />
                        }
                      /> */}
                    </RadioGroup>
                  </FormControl>
                  {
                    sdkReady &&  value === "Paypal" && <PayPalButton amount={totalBill && (parseFloat((parseFloat(totalBill) + taxShip - voucher).toFixed(2)))} onSuccess={successPaymentPaypal}/> 
                  }
                </Stack>
                <Button
                  disabled={value !== "shipCod"}
                  variant="contained"
                  onClick={handlePayment}
                >
                  <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                    Thanh toán
                  </Typography>
                </Button>
              </Stack>
            </Container>) }
          { activeStep === 2  && (
            <Container sx={{ background: mainBackGround2 , borderRadius: "10px"  , padding : '10px'}}>
              <OrderSuccess />
            </Container>
          )}
        </div>
      
    </>
  );
}
