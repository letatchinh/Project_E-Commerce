import {
  Alert,
  Box,
  Button,
  Link,
  Skeleton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Container, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";
import PriceSell from "../../../components/client/PriceSell";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import StyledRating from "../../../components/client/StyledRating";
import { styled } from "@mui/material/styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import MyCarousel from "./MyCarousel";
import SelectDetailSize from "../../../components/client/SelectDetailSize";
import "../../../components/StyleComponent/Product.css";
import MyTypography from "../../../components/client/MyTypography";
import Category from "../../../layout/client/Category";
import { KEY_USER } from "../../../constant/LocalStored";
import { fetchAddToCartRequestSaga } from "../../../redux/sagas/Mysaga";
import ContentTop from "../../../components/client/ContentTop";
import ListProductCommon from "../../../components/client/ListProductCommon";
import AxiosUser from "../../../apis/client/AxiosUser";
import ListReview from "../../../components/client/ListReview.js";
import ToastSuccess from "../../../components/client/ToastSuccess";
import ErrorNoItem from "../../../components/client/ErrorNoItem";
export default function DetailProduct() {

  let params = useParams();
  const navigate = useNavigate();
  const StyledTextField = styled(TextField)({
    "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
      borderColor: "#1976d2!important",
    },
    "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
      color: "#1976d2",
    },
    "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
      color: "#1976d2",
    },
    "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root": {
      color: "#1976d2",
    },
  });
  const schema = yup.object().shape({
    comment: yup.string().required("Required").min(2).max(50),
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const user = JSON.parse(localStorage.getItem(KEY_USER)) || "";
  const [itemm, setItem] = useState({});
  const { name, images, price,  _id, discount,rating,numReviews } = itemm;
  const [listItem, setListItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  const [review,setReview] = useState({rating : 0,numReviews : 0})
  const [active, setActive] = useState(0);
  const [count, setCount] = useState(0);
  const [errorNoItem, setErrorNoItem] = useState(false);
  // const [nextItem, setNextItem] = useState(0);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/products/${params.productId}`)
      .then((res) => {
        setReview({rating : res.data.rating,numReviews : res.data.numReviews})
        setItem(res.data)
      })
      .catch((err) => setErrorNoItem(true))
      .finally(() => setLoading(false));
  }, [params.productId]);
  const mainColorText = useSelector((state) => state.colorCommon.mainColorText);
  const mainBackGround2 = useSelector(
    (state) => state.colorCommon.mainBackGround2
  );
  const mainBackGround = useSelector(
    (state) => state.colorCommon.mainBackGround
  );
  useEffect(() => {
    AxiosUser.get(`/api/products/search?category=${itemm.category}`).then(
      (res) => setListItem(res.data.products)
    );
    AxiosUser.get(`/api/orders/checkPayment/${user._id}?product=${_id}`)
      .then((res) => setIsPayment(res.data.isPayment))
      .catch((err) => console.log(err));
    window.scrollTo(0, 0)
  }, [itemm]);
  const [value, setValue] = useState(null);
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    const newComment = {
      name: user.name,
      comment: data.comment,
      rating: value,
      user: user._id,
      product: _id,
    };
    AxiosUser.post("/api/reviews/add", newComment).then((res) => {
      AxiosUser.get(`/api/reviews/SumReviewByIdProduct/${_id}`).then(res => setReview({rating : res.data.avgReview,numReviews : res.data.totalReview})).catch(err => console.log(err))
      ToastSuccess("Tks For your Comment");
      setCount(count + 1);
      reset();
    }).catch(err => console.log(err));
  };
  const onHoverChangeActive = (index) => {
    setActive(index);
  };
  return (
    <>
        {/* <Button onClick={() => navigate(`/products/${nextItem}`)} variant="outlined">Next</Button> */}
      {errorNoItem ? (
        <div style={{ padding: "5rem" }}>
          <ErrorNoItem />
        </div>
      ) : (
        <div>
          <Category />
          {loading ? (
            <Stack>
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="circular" width={80} height={80} />
              <Skeleton variant="rectangular" width={420} height={120} />
              <Skeleton variant="rounded" width={420} height={120} />
            </Stack>
          ) : (
            <div style={{ background: mainBackGround2, padding: "20px 0" }}>
              <Container sx={{ background: mainBackGround, padding: "10px 0" }}>
                <Stack
                  justifyContent="space-between"
                  direction={{ md: "row", xs: "column" }}
                  spacing={1}
                >
                  <Stack
                    margin="0 auto"
                    sx={{ width: { md: "35%", sm: "70%", xs: "100%" } }}
                    spacing={1}
                  >
                    {images && (
                      <img
                        style={{ height: "30rem" }}
                        src={`/images/${images[active]}`}
                        alt="name"
                      />
                    )}
                    {images && (
                      <MyCarousel
                        hover={onHoverChangeActive}
                        limit={4}
                        data={images}
                      />
                    )}
                  </Stack>
                  <Stack
                    margin="0 auto"
                    alignItems={{ md: "flex-start", xs: "center" }}
                    width={{ md: "60%", xs: "100%" }}
                    spacing={2}
                  >
                    <MyTypography
                      variant="h5"
                      fontWeight="500"
                      color={mainColorText}
                    >
                      {name}
                    </MyTypography>
                    <Stack
                      width={{ sm: "60%", xs: "80%" }}
                      sx={{
                        padding: "20px",
                        border: "2px solid #f3f3f3",
                        borderRadius: "10px",
                      }}
                    >
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{
                          borderBottom: "2px solid #f3f3f3",
                          padding: "10px",
                        }}
                      >
                        <MyTypography variant="h6" color={mainColorText}>
                          Price
                        </MyTypography>
                        <PriceSell
                          discount={discount}
                          price={price}
                        />
                      </Stack>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ padding: "10px" }}
                      >
                        <MyTypography variant="h6" color={mainColorText}>
                          Review
                        </MyTypography>
                        <Stack direction="row">
                          <StyledRating
                            value={parseFloat(review.rating)}
                            readOnly={true}
                            precision={0.5}
                          />

                          <Link href="#review">
                            {" "}
                            <MyTypography variant="body2" component="span">
                              ({review.numReviews})
                            </MyTypography>
                          </Link>
                        </Stack>
                      </Stack>
                    </Stack>
                    <SelectDetailSize />
                    {/* <AmoutDetailToOrder /> */}
                    <Stack
                      direction="row"
                      width="70%"
                      justifyContent="space-between"
                    >
                      {/* <Tooltip placement="top-end" title="Đang bảo trì"> */}
                        <Button onClick={async(e) => {
            if(localStorage.getItem(KEY_USER)){
             await dispatch(
            fetchAddToCartRequestSaga({
        product: _id,
        user: user._id,
      })
    )
    navigate("/cart")
            }
            else{
              navigate("/login")
            }
          }}
                          sx={{ width: "45%", textTransform: "capitalize" }}
                          variant="contained"
                        >
                          <Typography fontSize="1.2rem">Buy</Typography>
                        </Button>
                      {/* </Tooltip> */}
                      <Button
                        onClick={() => {
                          if (localStorage.getItem(KEY_USER)) {
                            dispatch(
                              fetchAddToCartRequestSaga({
                                product: _id,
                                user: user._id,
                              })
                            );
                          } else {
                            navigate("/login");
                          }
                        }}
                        sx={{
                          display: "block",
                          width: "45%",
                          textTransform: "capitalize",
                          background: "rgba(255,87,34,0.1)",
                          borderColor: "#ee4d2d",
                          color: "#ee4d2d",
                        }}
                        color="warning"
                        variant="outlined"
                      >
                        <ShoppingCartIcon />
                        <MyTypography>Add To Cart</MyTypography>
                      </Button>
                    </Stack>
                    <Box width="80%">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack id='comment' spacing={2}>
                          <MyTypography variant="h6" color={mainColorText}>
                            WRITE A CUSTOMER REVIEW
                          </MyTypography>
                          <MyTypography variant="h5" color={mainColorText}>
                            Rating
                          </MyTypography>
                          <StyledRating
                            precision={0.5}
                            value={value}
                            onChange={(event, newValue) => {
                              setValue(newValue);
                            }}
                          />
                          <MyTypography variant="h5" color={mainColorText}>
                            Comment
                          </MyTypography>
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
                <Stack justifyContent="space-between">
                  <Stack sx={{ padding: "50px 10px" }}>
                    <MyTypography
                      id="review"
                      variant="h5"
                      color={mainColorText}
                    >
                      Review
                    </MyTypography>
                    <div id="review">
                      <ListReview count={count} _id={_id} />
                    </div>
                  </Stack>
                  <Stack>
                    <ContentTop value="Product Lien Quan" />
                    {listItem && (
                      <ListProductCommon data={listItem} limit={4} />
                    )}
                  </Stack>
                </Stack>
              </Container>
            </div>
          )}
        </div>
      )}
    </>
  );
}
