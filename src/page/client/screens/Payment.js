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
import { fetchAddListOrderRequest } from "../../../redux/login/Actions";
import {getToday} from "../../../constant/FunctionCommom";
import ErrorNoItem from '../../../components/client/ErrorNoItem'
import { KEY_USER } from "../../../constant/LocalStored";
import { useNavigate } from "react-router-dom";
import PaymentApi from "../../../apis/PaymentApi";
export default function Payment() {
  const mainBackGround = useSelector(state => state.colorCommon.mainBackGround)
  const mainBackGround2 = useSelector(state => state.colorCommon.mainBackGround2)
  const mainColorText = useSelector(state => state.colorCommon.mainColorText)
  const users = JSON.parse(localStorage.getItem(KEY_USER))
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
  const [activeStep, setActiveStep] = useState(0);
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
  const listCheckedPayment = useSelector(
    (state) => state.user.loginSuccess.listCarts
  );
  useEffect(() => {
    const newList = listCheckedPayment.filter(
      (e) => e.isCheckedPayment === true
    );
    setListChecked(newList);
  }, [listCheckedPayment]);
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
    const today = getToday();
    const newOrder = {
      addressShip: user.address,
      id: v4(),
      listProductOrder: listChecked,
      status: false,
      taxShip: distance * 2000,
      timeOrder: today,
      totalBill: totalPrice + distance * 2000,
    };
    const newUser = {
      ...user,
      listOrder: [...user.listOrder, newOrder],
      listCarts: [],
    };
    await dispatch(fetchAddListOrderRequest(newUser));
   await listChecked.map(e => PaymentApi.add({idProduct : e.id,idUser : user.id}))
    setActiveStep(2);
  };
  return (
    <>
        <div style={{ background: mainBackGround2, padding: "20px" }}>
        {activeStep === 0  && <ErrorNoItem src='https://bizweb.dktcdn.net/100/351/215/themes/713955/assets/empty-cart.png?1617619216743'/>}
          {activeStep === 1  && (
            <Container sx={{ background: 'white', borderRadius: "10px" }}>
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
                        value="visa"
                        control={<Radio />}
                        label={
                          <img
                            style={{ width: "50px" }}
                            src="https://vietjet.asia/assets/uploads/2017/06/L%E1%BB%A3i-%C3%ADch-t%E1%BB%AB-vi%E1%BB%87c-s%E1%BB%AD-d%E1%BB%A5ng-visa-card.png"
                            alt="visa"
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
                            alt="visa"
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
          { activeStep === 2 && (
            <Container sx={{ background: 'white', borderRadius: "10px"  , padding : '10px'}}>
              <OrderSuccess />
            </Container>
          )}
        </div>
      
    </>
  );
}
