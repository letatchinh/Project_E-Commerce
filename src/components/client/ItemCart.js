import React, { useState } from "react";
import { Avatar, Button, Checkbox, IconButton, ListItem, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "@mui/system";
import { v4 } from "uuid";
import { useDispatch } from "react-redux";
import '@fontsource/roboto/500.css';
import {
  featchDecreaseItemRequest,
  featchIncreaseItemRequest,
  featchRemoveItemCartRequest,
  fecthAddListPaymentChecked,
  fecthRemoveListPaymentChecked,
} from "../../redux/login/Actions";
import PriceSell from "./PriceSell";
export default function ItemCart({ value }) {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    if (event.target.checked) {
      dispatch(fecthAddListPaymentChecked(value));
    } else {
      dispatch(fecthRemoveListPaymentChecked(value));
    }
  };
  return (
    <ListItem
      sx={{ opacity : (!value.isCheckedPayment) ? '0.3' : '1' ,  borderBottom: "1px solid #C4C4C4" }}
      key={v4()}
      disableGutters
      secondaryAction={
        <IconButton
          onClick={() => dispatch(featchRemoveItemCartRequest(value))}
          aria-label="comment"
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <Checkbox
        checked={value.isCheckedPayment}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
      <Avatar
        sx={{ width: "70px", height: "70px", borderRadius: 0 }}
        alt="Remy Sharp"
        src={value.image}
      />
      <Stack margin='0 35px'>
        
          <Typography variant="body1" fontWeight='500'>{value.name}</Typography>
        
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
      </Stack>
      <div><PriceSell
        isSell={value.isSell}
        price={value.price}
        discount={value.discount}
        fontSize="16px"
      /></div>
    </ListItem>
  );
}
