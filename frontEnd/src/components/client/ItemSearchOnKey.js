import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import MyTypography from './MyTypography'
import PriceSell from './PriceSell';
import TypographyThreeDot from './TypographyThreeDot';
import '../StyleComponent/Text.css'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function ItemSearchOnKey({active,item,clickClose}) {
    const { name, images, price,  _id, discount } = item;
    const navigate = useNavigate()
    const handleClick = () => {
    clickClose() ;
     navigate(`/products/${_id}`)
    }
  return (
   
        <Button onClick={handleClick} fullWidth  size="large" variant={active ? "contained" : "outlined"}  sx={{display : 'flex' , alignItems : 'center' , justifyContent : 'space-between',marginTop : '5px' ,textTransform : 'capitalize',padding : {md : "10px 20px" , xs : "0"} }} >
                    <Stack direction='row' alignItems='center' spacing={{md : 2 ,xs : 0}}>
                      <div style={{width : '50px'}}>
                      <img src={`/images/${images[0]}`} alt="s"/>
                      </div>
                      <Stack margin="0 10px"  width='70%'  overflow='hidden'>
           <TypographyThreeDot className="maxRow">
              {name}
              </TypographyThreeDot>
          </Stack>
                    </Stack>
                    <PriceSell fontSize="14px" fontSizeDiscount='10px' price={price} discount={discount}/>

                  </Button>
   
  )
}
