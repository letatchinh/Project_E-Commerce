import React from "react";
import {
  Avatar,
  IconButton,
  ListItem,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "@mui/system";
import { v4 } from "uuid";
import { useDispatch } from "react-redux";
import "@fontsource/roboto/500.css";
import { KEY_USER } from "../../constant/LocalStored";
import {  fetchDeleteCartRequest} from "../../redux/client/cart/Actions";
import TypographyThreeDot from "./TypographyThreeDot";
import PriceSell from './PriceSell'
export default function ItemCart({ value }) {
  const dispatch = useDispatch();
  const idUser = JSON.parse(localStorage.getItem(KEY_USER))._id;
  return (
    <>
      {
        <ListItem
          sx={{ borderBottom: "1px solid #C4C4C4" , justifyContent : 'space-between' }}
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
          <Avatar
            sx={{ width: "70px", height: "70px", borderRadius: 0 }}
            alt="Remy Sharp"
            src={`/images/${value.images && value.images[0]}`}
          />
          <Stack margin="0 10px" width='60%'  overflow='hidden'>
           <TypographyThreeDot>
              {value.name}
              </TypographyThreeDot>
          </Stack>
          <div>
            <PriceSell fontSize="14px" fontSizeDiscount='10px' price={value.price} discount={value.discount}/>
          </div>
        </ListItem>
      }
    </>
  );
}
