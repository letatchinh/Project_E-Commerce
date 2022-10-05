import { Alert, Box, Button, Link, Skeleton, TextField, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddToCartRequest } from "../../../redux/login/Actions";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";
import ListReview from "../../../components/client/ListReview";
import { fetchAddRatingProductRequest } from "../../../redux/shopping/Shopping-actions";
import PriceSell from "../../../components/client/PriceSell";
import axios from "axios";
import { URL_BASE } from "../../../constant/UrlConstant";
import { useParams } from "react-router-dom";
import {getToday} from "../../../constant/FunctionCommom";
import StyledRating from "../../../components/client/StyledRating";
import { styled } from '@mui/material/styles';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
export default function DetailProduct() {
  const StyledTextField = styled(TextField)({
    '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline':{
      borderColor : '#1976d2!important'
    },
    '& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root':{
      color : '#1976d2'
    },
    '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root':{
      color : '#1976d2'
    },
    '& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root':{
      color : '#1976d2'
    }
  })
  const schema = yup.object().shape({
    comment: yup.string().required("Required").min(2).max(50),
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver : yupResolver(schema)
  });
  const [itemm, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  let params = useParams();
  const username = useSelector((state) => state.user.loginSuccess);
  const listProduct = useSelector((state) => state.shop.listProduct);
  const mainColorText = useSelector(state => state.common.mainColorText)
  const mainBackGround2 = useSelector((state) => state.common.mainBackGround2);
  const mainBackGround = useSelector((state) => state.common.mainBackGround);
  const { name, image, price, isSell,  rating, id, listRating , discount } = itemm;
  useEffect(() => {
    setLoading(true)
    axios
      .get(`${URL_BASE}listProduct?id=${params.productId}`)
      .then((res) => setItem(res.data[0]))
      .finally(() => setLoading(false));
   
  }, [listProduct]);
  useEffect(() => {
    axios
    .get(
      `${URL_BASE}listPayment?idUser=${username.id}&idProduct=${params.productId}`
    )
    .then((res) => {
      if (res.data.length !== 0) {
        setIsPayment(true);
      }
    })
    .catch((err) => console.log(err));
  },[username])
  const [value, setValue] = useState(null);
  const [isPayment, setIsPayment] = useState(false);
  const dispatch = useDispatch();
  console.log(errors);
  const onSubmit = (data) => {
    console.log(errors);
    const today = getToday();
    const sum = itemm.listRating.reduce((sum, arr) => sum + arr.rating, value);
    const newRating = (sum / (itemm.listRating.length + 1)).toFixed();
    dispatch(
      fetchAddRatingProductRequest(
        {
          ...itemm,
          listRating: [
            ...itemm.listRating,
            {
              ...data,
              rating: value,
              time: today,
              username: username.name,
              id: itemm.listRating.length + 1,
            },
          ],
          rating: newRating,
        },
        id
      )
    );
    reset()
  };
  return (
    <>
      {loading ? (
        <Stack>
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="circular" width={80} height={80} />
          <Skeleton variant="rectangular" width={420} height={120} />
          <Skeleton variant="rounded" width={420} height={120} />
        </Stack>
      ) : (
      <div style={{background : mainBackGround2 , padding : '20px 0'}}>
      <Container sx={{background : mainBackGround,padding : '10px 0'}}>
          <Stack  justifyContent="space-between" direction={{sm : 'row' , xs : 'column'}} spacing={1}>
          <Box sx={ {width :{sm : '50%' , xs : '100%'}}} >
            <img src={image} alt="name" />
          </Box>
            <Stack alignItems={{sm : 'flex-start', xs : 'center'}} width={{sm : '60%' , xs : '100%'}} spacing={2}>
              <Typography variant="h5" fontWeight="500" color={mainColorText}>
                {name}
              </Typography>
              <Stack
                width={{sm : '60%' , xs : '80%'}} 
                sx={{
                  padding: "20px",
                  border: "2px solid #f3f3f3",
                  borderRadius: "10px",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ borderBottom: "2px solid #f3f3f3", padding: "10px" }}
                >
                  <Typography variant="h6" color={mainColorText}>Price</Typography>
                  <PriceSell discount={discount} isSell={isSell} price={price} />
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ borderBottom: "2px solid #f3f3f3", padding: "10px" }}
                >
                  <Typography variant="h6" color={mainColorText}>Review</Typography>
                  <Stack direction="row">
    <StyledRating   value={parseInt(rating)} readOnly={true} />

                    <Link href="#review">
                      {" "}
                      <Typography variant="body2" component="span">
                        ({listRating && listRating.length})
                      </Typography>
                    </Link>
                  </Stack>
                </Stack>
                <Button
                  onClick={() =>
                    dispatch(
                      fetchAddToCartRequest({
                        ...itemm,
                        isCheckedPayment: true,
                      })
                    )
                  }
                  variant="outlined"
                  endIcon={<ShoppingCartIcon />}
                >
                  ADD
                </Button>
              </Stack>
              <Box width='80%'>
              <form  onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2} >
                  <Typography variant="h6" color={mainColorText}>WRITE A CUSTOMER REVIEW</Typography>
                  <Typography variant="h5" color={mainColorText}>Rating</Typography>
                  <StyledRating precision={0.5}
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }} />
                  <Typography variant="h5" color={mainColorText}>Comment</Typography>
                  <StyledTextField
                    {...register("comment")}
                    label="Write Commet Here ..."
                    variant="outlined"
                  />
                  <Button
                    disabled={value === null || !isPayment}
                    type="submit"
                    sx={{ width: "40%", marginLeft: "auto!important" }}
                    variant="contained"
                    endIcon={<SendIcon />}
                  >
                    Send
                  </Button>
                </Stack>
              </form>
              </Box>
              {errors.comment && errors.comment.type === "required" && (
                <Alert severity="error">{errors.comment.message}</Alert>
              )}
              {errors.comment && errors.comment.type === "min" && (
                <Alert severity="error">{errors.comment.message}</Alert>
              )}
              {errors.comment && errors.comment.type === "max" && (
                <Alert severity="error">{errors.comment.message}</Alert>
              )}
              {!isPayment && (
                <Alert severity="error">Chưa mua mà đòi Rating</Alert>
              )}
            </Stack>
          </Stack>
          <Stack  sx={{  padding : '50px 10px'}}>
            <Typography id="review" variant="h5" color={mainColorText}>
              Review
            </Typography>
            {listRating && <ListReview data={listRating} />}
          </Stack>
        </Container>
      </div>
      )}
    </>
  );
}
