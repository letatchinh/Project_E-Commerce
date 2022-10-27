import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React from "react";
import { Stack } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckboxSideBar from "./CheckboxSideBar";
import "../StyleComponent/SideBarFilter.css";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_GTE_RATING,
  SET_LTE_RATING,
  SET_SORT_PRICE_LESS_5,
  SET_SORT_PRICE_MORE_10,
  SET_SORT_PRICE_MORE_50,
} from "../../redux/filterProduct/Types";
import { setFilter } from "../../redux/filterProduct/Actions";
import StyledRating from "./StyledRating";
export default function ItemFilter({ setPage }) {
  const dispatch = useDispatch();
  const mainColorText = useSelector((state) => state.colorCommon.mainColorText);
  const low5 = useSelector((state) => state.filterProduct.low5);
  const more10 = useSelector((state) => state.filterProduct.more10);
  const more50 = useSelector((state) => state.filterProduct.more50);
  const gteRating = useSelector((state) => state.filterProduct.gteRating);
  const lteRating = useSelector((state) => state.filterProduct.lteRating);
console.log(gteRating,lteRating);
  return (
    <>
      <Stack
        padding="10px"
        justifyContent="center"
        direction="row"
        alignItems="center"
      >
        {" "}
        <FilterAltIcon color="primary" />
        <Typography
          variant="h6"
          fontWeight="bold"
          component="span"
          color={mainColorText}
        >
          Search Filter
        </Typography>
      </Stack>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="body1" fontWeight="bold">
            Price
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CheckboxSideBar
            isCheck={low5 === null}
            filter={() => {
              dispatch(setFilter({ type: SET_SORT_PRICE_LESS_5, filter: 5 }));
              setPage();
            }}
            unFilter={() => {
              dispatch(
                setFilter({ type: SET_SORT_PRICE_LESS_5, filter: null })
              );
              setPage();
            }}
            label="Product (<5$)"
          />
          <CheckboxSideBar
            isCheck={more10 === null}
            filter={() =>
              {dispatch(setFilter({ type: SET_SORT_PRICE_MORE_10, filter: 10 }));
              setPage()
              }
            }
            unFilter={() =>
             { dispatch(
                setFilter({ type: SET_SORT_PRICE_MORE_10, filter: null })
              );
              setPage()}
            }
            label="Product (>10$)"
          />
          <CheckboxSideBar
            isCheck={more50 === null}
            filter={() =>
              {dispatch(setFilter({ type: SET_SORT_PRICE_MORE_50, filter: 50 })); setPage()}
            }
            unFilter={() =>
              {dispatch(
                setFilter({ type: SET_SORT_PRICE_MORE_50, filter: null })
              ); setPage()}
            }
            label="Product (>50$)"
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="body1" fontWeight="bold">
            Rating
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CheckboxSideBar
            isCheck={gteRating === null}
            filter={() => {
              dispatch(setFilter({ type: SET_GTE_RATING, filter: 0 }));
              dispatch(setFilter({ type: SET_LTE_RATING, filter: 1 }));
              setPage();
            }}
            unFilter={() => {
              dispatch(
                setFilter({ type: SET_GTE_RATING, filter: null })
              );
              dispatch(
                setFilter({ type: SET_LTE_RATING, filter: null })
              );
              setPage();
            }}
            label={<div style={{marginBottom : '-3px'}}><StyledRating value={1} readOnly/></div>}
          />
         
        </AccordionDetails>
      </Accordion>
    </>
  );
}
