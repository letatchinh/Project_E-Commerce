import {
  Button,
  Link,
  Skeleton,
  Typography,
} from "@mui/material";
import { Container, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PriceSell from "../../../components/client/PriceSell";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import StyledRating from "../../../components/client/StyledRating";
import SelectDetailSize from "../../../components/client/SelectDetailSize";
import "../../../components/StyleComponent/Product.css";
import MyTypography from "../../../components/client/MyTypography";
import Category from "../../../layout/client/Category";
import { KEY_USER } from "../../../constant/LocalStored";
import {  fetchAddToCartRequestSaga } from "../../../redux/sagas/Mysaga";
import ContentTop from "../../../components/client/ContentTop";
import ListProductRef from "../../../components/client/ListProductRef";
import ListReview from "../../../components/client/ListReview.js";
import ErrorNoItem from "../../../components/client/ErrorNoItem";
import FormRating from "../../../components/client/FormRating";
import ImagesOfDeTail from "../../../components/client/ImagesOfDeTail";
import ButtonAddToCartDetail from "../../../components/client/ButtonAddToCartDetail";
export default function DetailProduct() {
  let params = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem(KEY_USER)) || "";
  const [itemm, setItem] = useState({});
  const {
    name,
    images,
    price,
    _id,
    discount,
    countInStock,
    quantitySold,
    description,
    rating,
    numReviews
  } = itemm;
  const [loading, setLoading] = useState(false);
  const mainColorText = useSelector((state) => state.colorCommon.mainColorText);
  const mainBackGround2 = useSelector(
    (state) => state.colorCommon.mainBackGround2
  );
  const mainBackGround = useSelector(
    (state) => state.colorCommon.mainBackGround
  );
  const dispatch = useDispatch();

  const [count, setCount] = useState(0);
  const [errorNoItem, setErrorNoItem] = useState(false);
  // const [nextItem, setNextItem] = useState(0);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/products/${params.productId}`)
      .then((res) => {
        setItem(res.data);
      })
      .catch((err) => setErrorNoItem(true))
      .finally(() => setLoading(false));
      window.scrollTo(0, 0);
  }, [params.productId]);
  const handleSetItem = (item) => {
    setItem(item)
  }
  const handleSetCount = () => {
    setCount(count + 1)
  }
  
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
                <ImagesOfDeTail images={images}/>
                  <Stack
                    className="rightTo"
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
                          Giá
                        </MyTypography>
                        <PriceSell discount={discount} price={price} />
                      </Stack>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{
                          padding: "10px",
                          borderBottom: "2px solid #f3f3f3",
                        }}
                      >
                        <MyTypography variant="h6" color={mainColorText}>
                          Đánh giá
                        </MyTypography>
                        <Stack direction="row">
                          <StyledRating
                            value={parseFloat(rating)}
                            readOnly={true}
                            precision={0.5}
                          />

                          <Link href="#review">
                            {" "}
                            <MyTypography variant="body2" component="span">
                              ({numReviews})
                            </MyTypography>
                          </Link>
                        </Stack>
                      </Stack>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{
                          padding: "10px",
                          borderBottom: "2px solid #f3f3f3",
                        }}
                      >
                        <MyTypography variant="h6" color={mainColorText}>
                          Đã bán
                        </MyTypography>
                        <MyTypography>{quantitySold}</MyTypography>
                      </Stack>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ padding: "10px" }}
                      >
                        <MyTypography variant="h6" color={mainColorText}>
                          Tồn kho
                        </MyTypography>
                        {countInStock === 0 ? (
                          <MyTypography color="red">
                            (Hết hàng){" "}
                          </MyTypography>
                        ) : (
                          <MyTypography>
                            ({countInStock}) Còn{" "}
                          </MyTypography>
                        )}
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
                      <Button
                        disabled={countInStock === 0}
                        onClick={async (e) => {
                          if (localStorage.getItem(KEY_USER)) {
                            await dispatch(
                              fetchAddToCartRequestSaga({itemCart : {
                                product: _id,
                                user: user._id,
                              }})
                            );
                            navigate("/cart");
                          } else {
                            navigate("/login");
                          }
                        }}
                        sx={{ width: "45%", textTransform: "capitalize" }}
                        variant="contained"
                      >
                        <Typography fontSize="1.2rem">Mua ngay</Typography>
                      </Button>            
                      <ButtonAddToCartDetail _id={_id}/>
                    </Stack>
                   {localStorage.getItem(KEY_USER) &&  <FormRating _id={_id} handleSetCount={handleSetCount} handleSetItem={handleSetItem}/>}
                  </Stack>
                </Stack>
                <Stack mt="1rem" spacing={2} alignItems="center">
                  <Typography
                    sx={{
                      color: "transparent",
                      backgroundImage:
                        "linear-gradient(to bottom , orange, red)",
                      backgroundClip: "text",
                    }}
                    variant="h5"
                  >
                    Mô tả sản phẩm
                  </Typography>
                  <MyTypography>{description}</MyTypography>
                </Stack>
                <Stack justifyContent="space-between">
                  <Stack sx={{ padding: "50px 10px" }}>
                    <MyTypography
                      id="review"
                      variant="h5"
                      color={mainColorText}
                    >
                      Đánh giá
                    </MyTypography>
                    <Stack width={{ md: "50%", xs: "100%" }} id="review">
                        {itemm && <ListReview item={itemm} />}
                    </Stack>
                  </Stack>
                  <Stack>
                    <ContentTop value="Sản phẩm liên quan" />
                    {itemm.category && (
                      <ListProductRef category={itemm.category}/>
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
