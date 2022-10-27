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
  SET_SORT_PRICE_LESS_5,
  SET_SORT_PRICE_MORE_10,
  SET_SORT_PRICE_MORE_50,
} from "../../redux/filterProduct/Types";
import { setFilter } from "../../redux/filterProduct/Actions";
import ButtonFilterRating from "./ButtonFilterRating";
import MyTypography from "./MyTypography";
export default function ItemFilter({ setPage }) {
  const dispatch = useDispatch();
  const mainColorText = useSelector((state) => state.colorCommon.mainColorText);
  const mainBackGround2 = useSelector((state) => state.colorCommon.mainBackGround2);
  const low5 = useSelector((state) => state.filterProduct.low5);
  const more10 = useSelector((state) => state.filterProduct.more10);
  const more50 = useSelector((state) => state.filterProduct.more50);
  const gteRating = useSelector((state) => state.filterProduct.gteRating);
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
      <Accordion sx={{background : mainBackGround2}} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <MyTypography variant="body1" fontWeight="bold">
            Price
          </MyTypography>
        </AccordionSummary>
        <AccordionDetails>
          <CheckboxSideBar
            isCheck={low5 !== null}
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
            isCheck={more10 !== null}
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
            isCheck={more50 !== null}
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
      <Accordion sx={{background : mainBackGround2}} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <MyTypography variant="body1" fontWeight="bold">
            Rating
          </MyTypography>
        </AccordionSummary>
        <AccordionDetails>
        <ButtonFilterRating active={gteRating === 0} value={0} setPage={setPage}/>
        </AccordionDetails>
        <AccordionDetails>
        <ButtonFilterRating active={gteRating === 1} value={1} setPage={setPage}/>
        </AccordionDetails>
        <AccordionDetails>
        <ButtonFilterRating active={gteRating === 2} value={2} setPage={setPage}/>
        </AccordionDetails>
        <AccordionDetails>
        <ButtonFilterRating active={gteRating === 3} value={3} setPage={setPage}/>
        </AccordionDetails>
        <AccordionDetails>
        <ButtonFilterRating active={gteRating === 4} value={4} setPage={setPage}/>
        </AccordionDetails>
        <AccordionDetails>
        <ButtonFilterRating active={gteRating === 5} value={5} setPage={setPage}/>
        </AccordionDetails>
       
      </Accordion>
    </>
  );
}
