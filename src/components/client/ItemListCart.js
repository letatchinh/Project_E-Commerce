import { Button, Checkbox, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import MyTypography from "./MyTypography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { KEY_USER } from "../../constant/LocalStored";
import {
  decreaseQuanlity,
  fetchCart,
  fetchCartNew,
  fetchDeleteCartRequest,
  increaseQuanlity,
} from "../../redux/client/cart/Actions";
import { useDispatch, useSelector } from "react-redux";
import TypographyThreeDot from "./TypographyThreeDot";
import PriceSell from './PriceSell'
export default function ItemListCart({ item }) {
  const listCarts = useSelector((state) => state.cart.allListCart);
  const dispatch = useDispatch();
  const { name, images, price, quanlity, isChecked , discount } = item;
  const [checked, setChecked] = useState(isChecked);
  const handleChange = async (event) => {
    setChecked(event.target.checked);
    const newListCart = listCarts.map((e) => {
      if (e._id === item._id) {
        e = { ...item, isChecked: event.target.checked };
      }
      return e;
    });
    await dispatch(fetchCartNew(newListCart));
  };
  const idUser = JSON.parse(localStorage.getItem(KEY_USER))._id;

  return (
    <Stack
      direction="row"
      borderTop="1px solid #999"
      alignItems="center"
      justifyContent="space-between"
      padding="10px"
    >
      <Stack direction="row" alignItems="center" spacing={1} width="60%">
        <Checkbox
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
       <div  style={{ width: "70px", height: "70px" }}> 
       <img style={{height : '100%' ,objectFit:'cover'}}
          src={`  /images/${images[0]}`}
          alt="s"
        /></div>
        <div style={{width : '70%'}}><TypographyThreeDot>{name}</TypographyThreeDot></div>
      </Stack>
      <Stack alignItems="center" width="20%">
        <PriceSell discount={discount} price={price}/>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
        disabled={quanlity === 1}
          onClick={() => {
            dispatch(decreaseQuanlity(item));
          }}
          variant="outlined"
          sx={{ minWidth: 0, borderRadius: 0 }}
        >
          -
        </Button>
       <div style={{padding : '0 10px'}}> <MyTypography
          fontWeight="bold"
        >
          {quanlity}
        </MyTypography></div>
        <Button
          onClick={() => {
            dispatch(increaseQuanlity(item));
          }}
          variant="outlined"
          sx={{ minWidth: 0, borderRadius: 0 }}
        >
          +
        </Button>
        <Button
          onClick={async() => {
           await dispatch(
              fetchDeleteCartRequest({ user: idUser, product: item._id })
            );
          }}
        >
          <DeleteOutlineIcon color="secondary" />
        </Button>
      </Stack>
    </Stack>
  );
}
