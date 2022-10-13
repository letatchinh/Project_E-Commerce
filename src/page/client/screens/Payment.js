import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { Container, Stack } from "@mui/system";
import React, { useEffect, useMemo, useState } from "react";
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
import { fetchAddOrderRequest, fetchCartRequest } from "../../../redux/sagas/Mysaga";
export default function Payment() {
  const config = {
    headers: { Authorization: `Bearer ${getToken()}` }
  };
  const mainBackGround = useSelector(state => state.colorCommon.mainBackGround)
  const mainBackGround2 = useSelector(state => state.colorCommon.mainBackGround2)
  const mainColorText = useSelector(state => state.colorCommon.mainColorText)
  const listCarts = useSelector(state => state.cart.listCarts)
  const users = JSON.parse(localStorage.getItem(KEY_USER))
  const idUser = JSON.parse(localStorage.getItem(KEY_USER))._id
  const navigate = useNavigate()
  useEffect(() => {
    if(users === null){
      navigate('/login')
    }
  },[users])
  const dispatch = useDispatch();
  const steps = [
    "Add to Cart",
    "Choose Payment Method",
    "Wait admin Check Order",
  ];
  const [activeStep, setActiveStep] = useState(1);
  const [distance, setDistance] = useState(0);
  const user = useSelector((state) => state.user.loginSuccess);
  useEffect(() => {
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${user.address}.json?access_token=pk.eyJ1IjoibGV0YXRjaGluaCIsImEiOiJjbDhjd2x1NTkwMzV0M3BvYmpweWJwZG9hIn0.crltMkQeuF92KSs1DRH2pQ`
      )
      .then((res) => {
        axios
          .get(
            `https://api.mapbox.com/directions/v5/mapbox/driving/108.24861,16.03083;${res.data.features[0].center[0]},${res.data.features[0].center[1]}?geometries=geojson&access_token=pk.eyJ1IjoibGV0YXRjaGluaCIsImEiOiJjbDhjd2x1NTkwMzV0M3BvYmpweWJwZG9hIn0.crltMkQeuF92KSs1DRH2pQ`
          )
          .then((res) =>
            setDistance((res.data.routes[0].distance / 1000).toFixed(1))
          );
      })
      .catch((err) => {});
  }, [user]);
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

  const CalTotal = () => {
    const total = listChecked.reduce((sum, arr) => {
      if (arr.isSell) {
        return (
          sum +
          (parseInt(arr.price) -
            (parseInt(arr.price) * parseInt(arr.discount)) / 100) *
            arr.quanlity
        );
      } else {
        return sum + parseInt(arr.price) * arr.quanlity;
      }
    }, 0);
    return total;
  };
  const totalPrice = useMemo(() => CalTotal(), [listChecked]);
  const handlePayment = async () => {
    const now = moment()._d;
    const filnalList = listChecked.map(e => ({
      name : e.name,
      qty : e.quanlity,
      images : e.images,
      price : e.price,
      product : e._id
    }))
    const newOrder = {
      user : idUser,
      orderItem :filnalList,
      shippingAddress : {
        address: "kkk",
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
      shippingPrice : distance * 2000,
      totalPrice : totalPrice + distance * 2000,
      isPaid : value === "Paypal" ? true : false,
      paidAt : value === "Paypal" ? now : ""
    };
 await dispatch(fetchAddOrderRequest({newOrder,config}))
  // dispatch(fetchCartRequest())
  setActiveStep(2)
  };
  return (
    <>
        <div style={{ background: mainBackGround2, padding: "20px", position : 'relative' }}>
        {listChecked.length === 0  &&  <Stack>
          <Link style={{position : 'absolute' , top : '2rem' , left : '5rem'}} to='/cart'><Button startIcon={<ArrowBackIosIcon/>} >Back</Button></Link>
        {/* <ErrorNoItem src='https://bizweb.dktcdn.net/100/351/215/themes/713955/assets/empty-cart.png?1617619216743'/> */}
        </Stack>}
          {activeStep === 1 && listChecked.length !== 0  && (
            <Container sx={{ background: 'white', borderRadius: "10px", position : 'relative' }}>
            <Link style={{position : 'absolute' , top : '2rem' , left : '2rem'}} to='/cart'><Button startIcon={<ArrowBackIosIcon/>} >Back</Button></Link>
              <Stack
                spacing={3}
                borderBottom="2px solid #C4C4C4"
                padding="20px"
                textAlign="center"
              >
                <Typography variant="h4">Payment </Typography>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel color='primary'>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
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
                  <Typography variant="h6">Phí Ship ( {distance}km)</Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {distance * 2000} VND
                  </Typography>
                </Stack>
                <Stack
                  width="100%"
                  justifyContent="space-between"
                  direction="row"
                >
                  <Typography variant="h6" fontWeight="bold">
                    Total
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {totalPrice + distance * 2000} VND
                  </Typography>
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
                      <Typography variant="h5" fontWeight="bold">
                        Payment Method
                      </Typography>
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={value}
                    >
                      <FormControlLabel
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
                      />
                      <FormControlLabel
                        onChange={handleChange}
                        value="shipCod"
                        control={<Radio />}
                        label="ShipCod"
                      />
                      <FormControlLabel
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
                      />
                    </RadioGroup>
                  </FormControl>
                </Stack>
                <Button
                  disabled={value === ""}
                  variant="contained"
                  onClick={handlePayment}
                >
                  <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                    Payment
                  </Typography>
                </Button>
              </Stack>
            </Container>) }
          { activeStep === 2  && (
            <Container sx={{ background: 'white', borderRadius: "10px"  , padding : '10px'}}>
              <OrderSuccess />
            </Container>
          )}
        </div>
      
    </>
  );
}
