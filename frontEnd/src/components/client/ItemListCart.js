import { Button, Checkbox } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import MyTypography from "./MyTypography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { KEY_USER } from "../../constant/LocalStored";
import {
  decreaseQuanlity,
  fetchCartNew,
  fetchDeleteCartRequest,
  increaseQuanlity,
} from "../../redux/client/cart/Actions";
import { useDispatch, useSelector } from "react-redux";
import TypographyThreeDot from "./TypographyThreeDot";
import PriceSell from './PriceSell'
import ToastError from "./ToastError";
import Dialo from "./Dialo";
export default function ItemListCart({ item }) {
  const status = useSelector(state => state.colorCommon.status)
  const user = JSON.parse(localStorage.getItem(KEY_USER)) || "";

  const listCarts = useSelector((state) => state.cart.allListCart);
  const dispatch = useDispatch();
  const { name, images, price, quanlity, isChecked , discount,countInStock } = item;
  const [checked, setChecked] = useState(isChecked);
  const handleChange = async (event) => {
    if(event.target.checked){
      if(countInStock >= quanlity){
        setChecked(event.target.checked);
        const newListCart = listCarts.map((e) => {
          if (e._id === item._id) {
            e = { ...item, isChecked: event.target.checked };
          }
          return e;
        });
        await dispatch(fetchCartNew(newListCart));
      }
      else{
        ToastError(`${name} đã hết hàng`)
      }
    }
    else{
      setChecked(event.target.checked);
        const newListCart = listCarts.map((e) => {
          if (e._id === item._id) {
            e = { ...item, isChecked: event.target.checked };
          }
          return e;
        });
        await dispatch(fetchCartNew(newListCart));
    }
  };
 
  return (
    <Stack
      direction={{md : "row" ,sm : "row", xs : 'column'}}
      borderTop="1px solid #999"
      alignItems="center"
      spacing={{md : 0,sm : 1 , xs : 1}}
      justifyContent={{md : "space-between" , xs : 'start'}}
      padding={{md : "10px",xs : "10px 0"}}
    >
      <Stack direction="row" alignItems="center" spacing={1} width={{md : "60%",xs : '100%'}}>
        <Checkbox sx={{color : !status && 'white'}}
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
            if(countInStock > quanlity){
              dispatch(increaseQuanlity(item));
            }
            else{
              ToastError(`${name} đã hết hàng`)
            }
          }}
          variant="outlined"
          sx={{ minWidth: 0, borderRadius: 0 }}
        >
          +
        </Button>
       <Dialo messenger='Are you want to delete This item'   click={async() => {
           await dispatch(
              fetchDeleteCartRequest({ user: user._id, product: item._id })
            );
          }}> <Button
        
        >
          <DeleteOutlineIcon color="secondary" />
        </Button></Dialo>
      </Stack>
    </Stack>
  );
}
