import React, { useEffect, useState } from 'react'
import {
    Avatar,
    Button,
    Checkbox,
    IconButton,
    ListItem,
  } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "@mui/system";
import styled from "styled-components";

import { v4 } from 'uuid';
import { useDispatch, useSelector} from 'react-redux';
import { featchDecreaseItemRequest, featchIncreaseItemRequest, featchRemoveItemCartRequest, fecthAddListPaymentChecked, fecthListPaymentChecked, fecthRemoveListPaymentChecked } from '../redux/login/Actions';
const SpanStylePrice = styled.span`
margin : 0 10px;
font-family: Montserrat, sans-serif;
font-weight : 500;
font-size : 18px
`
export default function ItemCart({value}) {
    const [checked, setChecked] = useState(true);
    const dispatch = useDispatch()
    const handleChange = (event) => {
        setChecked(event.target.checked);
       if(event.target.checked){
        dispatch(fecthAddListPaymentChecked(value))
       }
       else{
        dispatch(fecthRemoveListPaymentChecked(value))
       }
      };
  return (
    <ListItem
    sx={{ justifyContent: "space-around" , borderBottom : "2px solid #C4C4C4"}}
    key={v4()}
    disableGutters
    secondaryAction={
      <IconButton
        onClick={() => dispatch(featchRemoveItemCartRequest(value))
}
        aria-label="comment"
      >
        <DeleteIcon />
      </IconButton>
    }
  >
  <Checkbox
      checked={value.isCheckedPayment}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
    <Avatar
      sx={{ width: "100px", height: "100px" }}
      alt="Remy Sharp"
      src={value.image}
    />
    <Stack width="50%">
      <span
        style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 500 }}
      >
        {value.name}
      </span>
      <Stack direction="row" alignItems="center">
        <Button
          sx={{ padding: 0, minWidth: "40px" }}
          disabled={value.quanlity === 0}
          onClick={() => dispatch(featchDecreaseItemRequest(value))}
          variant="outlined"
        >
          -
        </Button>
        <span style={{ margin: "0 10px" }}>{value.quanlity}</span>
        <Button
          sx={{ padding: 0, minWidth: "40px" }}
          onClick={() => dispatch(featchIncreaseItemRequest(value))}
          variant="outlined"
        >
          +
        </Button>
      </Stack>
      <SpanStylePrice>
        {value.price * value.quanlity} Đ{" "}
      </SpanStylePrice>
      <SpanStylePrice
        style={{
          textDecoration: "line-through",
          fontSize: "12px",
          color: "#C4C4C4",
          display : (value.isSell) ? "block" : "none"
        }}
      >
        {value.price * value.quanlity} Đ
      </SpanStylePrice>
    </Stack>
  </ListItem>
  )
}
