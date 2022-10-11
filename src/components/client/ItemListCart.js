import { Button, Checkbox, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import MyTypography from "./MyTypography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { KEY_USER } from "../../constant/LocalStored";
import {
  decreaseQuanlity,
  fetchCart,
  fetchDeleteCartRequest,
  fetchTotalBill,
  increaseQuanlity,
} from "../../redux/client/cart/Actions";
import { useDispatch, useSelector } from "react-redux";
export default function ItemListCart({ item }) {
  const listCarts = useSelector((state) => state.cart.listCarts);
  const totalBill = useSelector((state) => state.cart.totalBill);
  const dispatch = useDispatch();
  const { name, images, price, quanlity, isChecked } = item;
  const [checked, setChecked] = useState(isChecked);
  const handleChange = async (event) => {
    setChecked(event.target.checked);
    const newListCart = listCarts.map((e) => {
      if (e._id === item._id) {
        e = { ...item, isChecked: event.target.checked };
      }
      return e;
    });
    await dispatch(fetchCart(newListCart));
    dispatch(fetchTotalBill());
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
      <Stack direction="row" alignItems="center" spacing={1} width="40%">
        <Checkbox
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
        <img
          style={{ width: "70px", height: "70px" }}
          src={`/images/${images[0]}`}
          alt="s"
        />
        <MyTypography sx={{ width: "50%" }}>{name}</MyTypography>
      </Stack>
      <Stack alignItems="center" width="10%">
        <Typography color="#f57224" fontSize="18px">
          {price} VND
        </Typography>
        <Button
          onClick={async() => {
           await dispatch(
              fetchDeleteCartRequest({ user: idUser, product: item._id })
            );
            dispatch(fetchTotalBill());
          }}
        >
          <DeleteOutlineIcon color="secondary" />
        </Button>
      </Stack>
      <Stack
        direction="row"
        width="14%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
          onClick={() => {
            dispatch(decreaseQuanlity(item));
            dispatch(fetchTotalBill());
          }}
          variant="outlined"
          sx={{ minWidth: 0, borderRadius: 0 }}
        >
          -
        </Button>
        <MyTypography
          fontWeight="bold"
          sx={{
            borderTop: "1px solid rgba(25, 118, 210, 0.5)",
            height: "100%",
            padding: "5px 20px",
            borderBottom: "1px solid rgba(25, 118, 210, 0.5)",
          }}
        >
          {quanlity}
        </MyTypography>
        <Button
          onClick={() => {
            dispatch(increaseQuanlity(item));
            dispatch(fetchTotalBill());
          }}
          variant="outlined"
          sx={{ minWidth: 0, borderRadius: 0 }}
        >
          +
        </Button>
      </Stack>
    </Stack>
  );
}
