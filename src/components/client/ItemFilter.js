import { Accordion, AccordionDetails, AccordionSummary,  Typography } from '@mui/material'
import React from 'react'
import { Stack } from '@mui/system'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckboxSideBar from './CheckboxSideBar';
import '../StyleComponent/SideBarFilter.css'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useDispatch, useSelector } from 'react-redux';
import { SET_SORT_PRICE_LESS_5, SET_SORT_PRICE_MORE_10, SET_SORT_PRICE_MORE_50} from '../../redux/filterProduct/Types'
import { setFilter } from '../../redux/filterProduct/Actions';
export default function ItemFilter() {
    const dispatch = useDispatch()
    const mainColorText = useSelector(state => state.colorCommon.mainColorText)
    const low5 = useSelector((state) => state.filterProduct.low5);
    const more10 = useSelector((state) => state.filterProduct.more10);
    const more50 = useSelector((state) => state.filterProduct.more50);
    
  return (
    <>
    <Stack padding='10px' justifyContent='center' direction='row' alignItems='center'> <FilterAltIcon color='primary'/><Typography variant='h6' fontWeight='bold' component='span' color={mainColorText}>Search Filter</Typography></Stack>
          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant='body1' fontWeight='bold'>Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <CheckboxSideBar isCheck={low5 === null}  filter={() => dispatch(setFilter({type : SET_SORT_PRICE_LESS_5,filter : 5}))} unFilter={() => dispatch(setFilter({type : SET_SORT_PRICE_LESS_5,filter : null}))}  label="Product (<5$)"/>
        <CheckboxSideBar isCheck={more10 === null} filter={() => dispatch(setFilter({type : SET_SORT_PRICE_MORE_10,filter : 10}))} unFilter={() => dispatch(setFilter({type : SET_SORT_PRICE_MORE_10,filter : null}))}  label="Product (>10$)"/>
        <CheckboxSideBar isCheck={more50 === null} filter={() => dispatch(setFilter({type : SET_SORT_PRICE_MORE_50,filter : 50}))} unFilter={() => dispatch(setFilter({type : SET_SORT_PRICE_MORE_50,filter : null}))}  label="Product (>50$)"/>
       
        </AccordionDetails>
      </Accordion>
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant='body1' fontWeight='bold'>Rating</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Highest
          </Typography>
        </AccordionDetails>
        <AccordionDetails>
          <Typography>
            Lowest
          </Typography>
        </AccordionDetails>
      </Accordion> */}
      </>
  )
}
