import React from "react";
import {
  Avatar,
  IconButton,
  ListItem,
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
import { Link } from "react-router-dom";
import Dialo from "./Dialo";
export default function ItemCart({ value ,handleClose}) {
  const dispatch = useDispatch();
  const idUser = JSON.parse(localStorage.getItem(KEY_USER))._id;
  return (
    <>
      {
        <ListItem
          sx={{ borderBottom: "1px solid #C4C4C4" , justifyContent : 'space-between',paddingTop:'30px' }}
          key={v4()}
          disableGutters
          secondaryAction={
           <Dialo messenger="Are you ok?" click={() => dispatch(fetchDeleteCartRequest({user :idUser , product : value._id }))}>
              <IconButton
              
              aria-label="comment"
            >
              <DeleteIcon />
            </IconButton>
           </Dialo>
          }
        >
          <Link to={`/products/${value._id}`} onClick={handleClose}>
          <div style={{width : '70px' , height: "70px"}}>
          <Avatar
            sx={{ width: "100%", height: "100%", borderRadius: 0 }}
            alt="Remy Sharp"
            src={`/images/${value.images && value.images[0]}`}
          />
          </div>
          </Link>
          <Stack margin="0 10px"  width='60%'  overflow='hidden'>
           <TypographyThreeDot >
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
