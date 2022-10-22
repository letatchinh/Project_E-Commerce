import React, { useCallback, useEffect, useRef, useState } from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "../StyleComponent/Product.css";
import { useDispatch, useSelector } from "react-redux";
import StyledRating from "./StyledRating";
import { Link, useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/system";
import { Avatar, Button } from "@mui/material";
import { v4 } from "uuid";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { KEY_USER } from "../../constant/LocalStored";
import { fetchAddToCartRequestSaga } from "../../redux/sagas/Mysaga";
import TypographyThreeDot from "./TypographyThreeDot";
import PriceSell from './PriceSell'
export default function ProductClient({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [isFetch,setIsFetch] = useState(false)
  const {
    name,
    images,
    price,
    _id,
    rating,
    numReviews
  } = item;
  const [review,setReview] = useState({numReview : 0,count : 0})
  const mainColorText = useSelector((state) => state.colorCommon.mainColorText);
  const mainTextShadow = useSelector((state) => state.colorCommon.mainTextShadow);
  const idUser = localStorage.getItem(KEY_USER) && JSON.parse(localStorage.getItem(KEY_USER))._id;
  const [active, setActive] = useState(0);
  const myRef = useRef()
  // const fetch = useCallback(() => {
  //   AxiosUser.get(`/api/reviews/SumReviewByIdProduct/${_id}`).then(res => setReview({...review,numReview :res.data.avgReview,count : res.data.totalReview})).catch(err => console.log(err))
  // },[isFetch])
  // useEffect(() => {
  //   isFetch && fetch()
  // },[fetch])
  useEffect(() => {
    if (!myRef?.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsFetch(true)
      }
    });
    observer.observe(myRef.current);
  }, [myRef]);
  return (
    <Box ref={myRef}
      sx={{
        boxShadow: "0 0 6px 2px #e5e3e3",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        margin: "5px 0",
        padding: "10px",
      }}
    >
      <div
        className="imgProduct"
        style={{
          position: "absolute",
          width: "50px",
          height: "20px",
          background: "#cd151c",
          right: "0",
          top: "0",
          zIndex: 1,
          borderBottomLeftRadius: "5px",
          display: item.discount > 0 ?"block" : "none",
        }}
      >
        <Typography color="white" fontSize="14px" textAlign="center">
          -{item.discount}%
        </Typography>
      </div>
      <div
        className="imgProduct"
        style={{
          position: "absolute",
          alignItems : 'center',
          justifyContent : 'center',
          width : 'max-content',
          height: "20px",
          padding : '0 5px',
          background: "#00000099",
          left: "0",
          top: "0",
          zIndex: 1,
          borderBottomLeftRadius: "5px",
          display: item.quantitySold > 0 ?"flex" : "none",
        }}
      >
        <Typography color="white" fontSize="calc(0.3vw + 8px)" textAlign="center">
          Sold {item.quantitySold}
        </Typography>
      </div>
      <Link to={`/products/${_id}`}>
        <Stack className="cardHover" sx={{ height: { md: "350px",sm : '400px', xs: "200px" }, objectFit: "cover" }}>
          <CardMedia
            className="imgProduct"
            sx={{ width : '100%' , height : '100%', objectFit: "cover" }}
            component="img"
            alt="green iguana"
            src={`/images/${images[active]}`}
          />
        </Stack>
      </Link>
      <Link to={`/products/${_id}`}>
        {/* <Typography
          className="cardContentHover"
          sx={{
            padding: "10px 0",
            fontSize: "calc(0.3vw + 10px)",
            textShadow : mainTextShadow
          }}
          
          variant="body2"
          fontWeight="400"
          color={mainColorText}
        >
          {name}
        </Typography> */}
        <div style={{padding : '5px 0' , height : '50px'}}><TypographyThreeDot className='cardContentHover'>{name}</TypographyThreeDot></div>
        <Stack direction='row' justifyContent='space-between'>
        <PriceSell fontSize="18px" price={price} discount={item.discount}/>
        <Button
          onClick={(e) => {
            e.preventDefault()
            if(localStorage.getItem(KEY_USER)){
              dispatch(
            fetchAddToCartRequestSaga({
        product: _id,
        user: idUser,
      })
    )
            }
            else{
              navigate("/login")
            }
          }}
          variant="outlined"
        >
          <AddShoppingCartIcon className="hoverIconAddCart" />
        </Button>
        </Stack>

      </Link>
      <CardContent sx={{ padding: "5px 0" , display : 'flex' , alignItems : 'center' }}>
        <StyledRating value={parseFloat(rating)} precision={.5} readOnly={true} size="small" />
        <Typography
          variant="body2"
          component="span"
          color={mainColorText}
        >
          ({numReviews})
        </Typography>
      </CardContent>
      <Stack
        className="scrollBarProduct"
        direction="row"
        spacing={1}
        padding="2px"
        maxWidth="100%"
        sx={{ overflowX: "scroll" }}
      >
        {images.map((e, i) => (
          <Avatar
            key={v4()}
            className="imgProduct"
            onClick={() => setActive(i)}
            alt="Avata"
            src={`/images/${images[i]}`}
            sx={{
              width: 40,
              height: 40,
              cursor: "pointer",
              padding: "1px",
              boxShadow: active === i ? " 0 0 2px 2px black" : "none",
            }}
          />
        ))}
      </Stack>
    
    </Box>
  );
}
