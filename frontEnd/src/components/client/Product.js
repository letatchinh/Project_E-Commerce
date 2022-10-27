import React, { useState } from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "../StyleComponent/Product.css";
import PriceSell from "./PriceSell";
import { useDispatch, useSelector } from "react-redux";
import StyledRating from "./StyledRating";
import { Link } from "react-router-dom";
import { Box, Stack } from "@mui/system";
import { Avatar, Button } from "@mui/material";
import { v4 } from "uuid";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { fetchAddToCartRequest } from "../../redux/login/Actions";
import ChatIcon from '@mui/icons-material/Chat';
export default function Product({ item }) {
  const dispatch = useDispatch();
  const { name, image, price, isSell, rating, listRating, discount } = item;
  const mainColorText = useSelector((state) => state.colorCommon.mainColorText);
  const [active, setActive] = useState(0);
  return (
    <Box
      className="boxMain"
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        margin: "5px 0",
        padding: "5px",
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
          display: isSell === "true" ? "block" : "none",
        }}
      >
        <Typography color="white" fontSize="14px" textAlign="center">
          -{discount}%
        </Typography>
      </div>
      <Link to={`/products/${item.id}`}>
        <div className="cardHover">
          <CardMedia
            className="imgProduct"
            sx={{ height: { md: "300px", xs: "200px" }, objectFit: "cover" }}
            component="img"
            alt="green iguana"
            src={image[active]}
          />
        </div>
      </Link>
      <Link to={`/products/${item.id}`}>
        <Typography
          className="cardContentHover"
          sx={{
            padding: "10px 5px 0",
            height: "56px",
            fontSize: "calc(0.3vw + 10px)",
          }}
          gutterBottom
          variant="body2"
          fontWeight="400"
          color={mainColorText}
        >
          {name}
        </Typography>
        <PriceSell discount={discount} price={price} isSell={isSell} />
      </Link>
      <CardContent sx={{ padding: "5px" }}>
        <StyledRating value={parseInt(rating)} readOnly={true} size="small" />
        <Typography
          gutterBottom
          variant="body2"
          component="span"
          color={mainColorText}
        >
          ({listRating.length})
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
        {image.map((e, i) => (
          <Avatar
            key={v4()}
            className="imgProduct"
            onClick={() => setActive(i)}
            alt="Avata"
            src={image[i]}
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
      <Stack
        className="ButtonHoverAddAndBut"
        direction="row"
        justifyContent="space-between"
        sx={{
          position: "absolute",
          width: "100%",
          height: "30px",
          bottom: "0",
          opacity: 0,
        }}
      >
        {/* <Button className="hoverAddCart"
          onClick={() =>
            dispatch(
              fetchAddToCartRequest({
                ...item,
                isCheckedPayment: true,
              })
            )
          }
          variant="outlined"
          sx={{ width: "100%" ,background : 'rgba(255,87,34,0.1)',borderColor : '#ee4d2d',color : '#ee4d2d'}}
        >
          <AddShoppingCartIcon className="hoverIconAddCart" />
        </Button> */}
        <Button variant="outlined" sx={{ width: "40%" }}>
         <ChatIcon/>
        </Button>
      </Stack>
    </Box>
  );
}
