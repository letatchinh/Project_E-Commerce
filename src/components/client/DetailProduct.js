import { Alert, Box, Button, Link, Skeleton, TextField, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddToCartRequest } from "../../redux/login/Actions";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";
import Rating from "@mui/material/Rating";
import ListReview from "./ListReview";
import { fetchAddRatingProductRequest } from "../../redux/shopping/Shopping-actions";
import PriceSell from "./PriceSell";
import axios from "axios";
import { URL_BASE } from "../../constant/UrlConstant";
import { useParams } from "react-router-dom";
import {getToday} from "../../constant/FunctionCommom";
export default function DetailProduct() {
  const [itemm, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  let params = useParams();
  const username = useSelector((state) => state.user.loginSuccess);
  const listProduct = useSelector((state) => state.shop.listProduct);
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
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
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
      <div style={{background : 'rgb(244, 244, 244)' , padding : '20px 0'}}>
      <Container sx={{background : 'white',padding : '10px 0'}}>
          <Stack  justifyContent="space-between" direction={{sm : 'row' , xs : 'column'}} spacing={1}>
          <Box sx={ {width :{sm : '50%' , xs : '100%'}}} >
            <img src={image} alt="name" />
          </Box>
            <Stack alignItems={{sm : 'flex-start', xs : 'center'}} width={{sm : '60%' , xs : '100%'}} spacing={2}>
              <Typography variant="h5" fontWeight="500">
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
                  <Typography variant="h6">Price</Typography>
                  <PriceSell discount={discount} isSell={isSell} price={price} />
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ borderBottom: "2px solid #f3f3f3", padding: "10px" }}
                >
                  <Typography variant="h6">Review</Typography>
                  <Stack direction="row">
                    <Rating
                      name="read-only"
                      value={parseInt(rating)}
                      readOnly
                      size="small"
                    />

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
                  <Typography variant="h6">WRITE A CUSTOMER REVIEW</Typography>
                  <Typography variant="h5">Rating</Typography>
                  <Rating
                    name="half-rating"
                    precision={0.5}
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                  <Typography variant="h5">Comment</Typography>
                  <TextField
                    {...register("comment", { maxLength: 100 })}
                    id="outlined-basic"
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
              {errors.comment && errors.comment.type === "maxLength" && (
                <Alert severity="error">Không được quá 100 kí tự</Alert>
              )}
              {!isPayment && (
                <Alert severity="error">Chưa mua mà đòi Rating</Alert>
              )}
            </Stack>
          </Stack>
          <Stack  sx={{  padding : '50px 10px'}}>
            <Typography id="review" variant="h5">
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
