import { Accordion, AccordionDetails, AccordionSummary,  Typography } from '@mui/material'
import React from 'react'
import { Stack } from '@mui/system'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckboxSideBar from './CheckboxSideBar';
import '../StyleComponent/SideBarFilter.css'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilterPriceRequest } from '../../redux/sagas/Mysaga';
import {FILTER_LOW_50, FILTER_MORE_100, FILTER_MORE_200} from '../../redux/filterProduct/Types'
export default function ItemFilter() {
    const dispatch = useDispatch()
    const mainColorText = useSelector(state => state.colorCommon.mainColorText)
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
        <CheckboxSideBar filter={() => dispatch(fetchFilterPriceRequest(FILTER_MORE_200))}  label="Product (>20$)"/>
        <CheckboxSideBar filter={() => dispatch(fetchFilterPriceRequest(FILTER_MORE_100))} label="Product (>10$)"/>
        <CheckboxSideBar  filter={() => dispatch(fetchFilterPriceRequest(FILTER_LOW_50))} label="Product (<5$)"/>
        </AccordionDetails>
      </Accordion>
      <Accordion>
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
      </Accordion>
      </>
  )
}
