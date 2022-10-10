import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Avatar,
  Button,
  IconButton,
  ListItem,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "@mui/system";
import { v4 } from "uuid";
import { useDispatch } from "react-redux";
import "@fontsource/roboto/500.css";
import PriceSell from "./PriceSell";
import { KEY_USER } from "../../constant/LocalStored";
import {  decreaseQuanlity, fetchDeleteCartRequest, increaseQuanlity } from "../../redux/client/cart/Actions";
export default function ItemCart({ value }) {
  const dispatch = useDispatch();
  const idUser = JSON.parse(localStorage.getItem(KEY_USER))._id;
  return (
    <>
      {
        <ListItem
          sx={{ borderBottom: "1px solid #C4C4C4" }}
          key={v4()}
          disableGutters
          secondaryAction={
            <IconButton
              onClick={() => dispatch(fetchDeleteCartRequest({user :idUser , product : value._id }))}
              aria-label="comment"
            >
              <DeleteIcon />
            </IconButton>
          }
        >
          {/* <Checkbox
        checked={value.isCheckedPayment}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      /> */}
          <Avatar
            sx={{ width: "70px", height: "70px", borderRadius: 0 }}
            alt="Remy Sharp"
            src={`/images/${value.images && value.images[0]}`}
          />
          <Stack margin="0 10px">
            <Typography variant="body1" fontWeight="500">
              {value.name}
            </Typography>

            <Stack direction="row" alignItems="center">
              <Button
                sx={{ padding: 0, minWidth: "40px" }}
                // disabled={c.current === 0}
                onClick={() => dispatch(decreaseQuanlity(value))}
                variant="outlined"
              >
                -
              </Button>
              <span style={{ margin: "0 10px" }}>{value.quanlity}</span>
              <Button
                sx={{ padding: 0, minWidth: "40px" }}
                onClick={() => dispatch(increaseQuanlity(value))}
                variant="outlined"
              >
                +
              </Button>
            </Stack>
          </Stack>
          <div>
            <PriceSell
              isSell={value.isSell}
              price={value.price}
              discount={value.discount}
              fontSize="16px"
            />
          </div>
        </ListItem>
      }
    </>
  );
}
