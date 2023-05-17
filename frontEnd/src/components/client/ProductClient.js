import React, { useState } from "react";
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
import LoadingButton from "@mui/lab/LoadingButton";
export default function ProductClient({ item }) {
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // const [isFetch,setIsFetch] = useState(false)
  const {
    name,
    images,
    price,
    _id,
    rating,
    newPrice,
    numReviews,
    countInStock
  } = item;
  const mainColorText = useSelector((state) => state.colorCommon.mainColorText);
  const idUser = localStorage.getItem(KEY_USER) && JSON.parse(localStorage.getItem(KEY_USER))._id;
  const [active, setActive] = useState(0);
  const handleAddToCart = (e) => {
    e.preventDefault()
    if(localStorage.getItem(KEY_USER)){
      setLoading(true)
      dispatch(
    fetchAddToCartRequestSaga({itemCart : {
      product: _id,
      user: idUser,
      },setLoading : () => setLoading(false)})
)
    }
    else{
      navigate("/login")
    }
  }
  // const myRef = useRef()
  // useEffect(() => {
  //   if (!myRef?.current) return;
  //   const observer = new IntersectionObserver(([entry]) => {
  //     if (entry.isIntersecting) {
  //       setIsFetch(true)
  //     }
  //   });
  //   observer.observe(myRef.current);
  // }, [myRef]);
  return (
    <Box
    //  ref={myRef}
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
          height: "25px",
          background: "#cd151c",
          right: "0",
          top: "0",
          zIndex: 1,
          borderBottomLeftRadius: "5px",
          display: item.discount > 0 ? "block" : "none",
        }}
      >
        <Typography color="white" fontSize="16px" textAlign="center">
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
          Đã bán {item.quantitySold}
        </Typography>
      </div>
      <Link to={`/products/${_id}`}>
        <Stack position='relative' className="cardHover" sx={{ height: { md: "350px",sm : '400px', xs: "200px" }, objectFit: "cover" }}>
          <CardMedia
            className="imgProduct"
            sx={{ width : '100%' , height : '100%', objectFit: "cover" , opacity : countInStock === 0 ? 0.6 : 1}}
            component="img"
            alt="green iguana"
            src={`/images/${images[active]}`}
          />
       {countInStock === 0 &&  <Stack sx={{position : 'absolute' , inset : 0,justifyContent : 'center' , alignItems : 'center'}}><Typography sx={{ padding : '3rem 1.5rem' ,borderRadius : '50%' , backgroundColor : '#00000079'}} color='white' variant="body1">Hết hàng</Typography></Stack>}
        </Stack>
      </Link>
      <Link to={`/products/${_id}`}>
        <div style={{padding : '5px 0' , height : '50px'}}><TypographyThreeDot className='cardContentHover'>{name}</TypographyThreeDot></div>
        <Stack direction='row' justifyContent='space-between'>
        <PriceSell fontSize="18px" price={price} discount={item.discount}/>
  

       

        </Stack>

      </Link>
      <CardContent sx={{ padding: "5px 0" , display : 'flex' , alignItems : 'center',justifyContent : 'space-between' }}>
        <div><StyledRating value={parseFloat(rating)} precision={.5} readOnly={true} size="small" />
        <Typography
          variant="body2"
          component="span"
          color={mainColorText}
        >
          ({numReviews})
        </Typography></div>
        <LoadingButton onClick={handleAddToCart} loading={loading} variant="outlined">
        <AddShoppingCartIcon className="hoverIconAddCart" />
</LoadingButton>
      </CardContent>
      {/* <Stack
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
      </Stack> */}
    
    </Box>
  );
}
