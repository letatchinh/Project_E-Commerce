import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import React from 'react'
import { Stack } from '@mui/system'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckboxSideBar from './CheckboxSideBar';
import '../StyleComponent/SideBarFilter.css'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useDispatch } from 'react-redux';
import { fetchFilterPriceRequest } from '../../redux/sagas/Mysaga';
import {FILTER_LOW_50, FILTER_MORE_100, FILTER_MORE_200} from '../../redux/filterProduct/Types'
export default function SideBarFilter() {
  const dispatch = useDispatch()
  return (
    <div className='sideBar'>
  <Stack direction='row' alignItems='center'> <FilterAltIcon/><Typography variant='h6' fontWeight='bold' component='span'>Search Filter</Typography></Stack>
          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant='body1' fontWeight='bold'>Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <CheckboxSideBar filter={() => dispatch(fetchFilterPriceRequest(FILTER_MORE_200))}  label="Product (200k+)"/>
        <CheckboxSideBar filter={() => dispatch(fetchFilterPriceRequest(FILTER_MORE_100))} label="Product (100k+)"/>
        <CheckboxSideBar  filter={() => dispatch(fetchFilterPriceRequest(FILTER_LOW_50))} label="Product (50k-)"/>
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
    
    </div>
  )
}
