import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import '../StyleComponent/Product.css'
import PriceSell from './PriceSell';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import StyledRating from './StyledRating';
export default function Product({item}) {
  const {name , image , price , isSell ,rating , listRating , discount} = item
  const mainBackGround2 = useSelector((state) => state.common.mainBackGround2);
  const mainColorText = useSelector(state => state.common.mainColorText)
  const mainColorRating = useSelector(state => state.common.mainColorRating)

  return (
    <Card className='cardHover' sx={{display : "flex" , flexDirection : "column" ,position : "relative" , cursor:"pointer" ,background :mainBackGround2 }}>
    <CardMedia sx={{position : "absolute" , width : "30%" , left : "-5px" , top : "-8px" , display : (isSell === 'true') ? "block" : "none"}} component="img" alt='sale' image='https://tochat.be/click-to-chat/wp-content/uploads/2020/09/sale-logo-download.png'/>
      <CardMedia className='imgProduct' sx={{height:{md : '150px' , xs : '130px'},objectFit : 'cover'}}
        component="img"
        alt="green iguana"
        image={image}
      />
      <CardContent sx={{padding : '5px'}}>
        <Typography  gutterBottom variant="body2"  fontWeight='400' color={mainColorText} >
          {name}
        </Typography>
        <PriceSell discount={discount} price={price} isSell={isSell}/>
      </CardContent>
     <CardContent sx={{padding : '5px'}} >
     <StyledRating  value={parseInt(rating)} readOnly={true} size="small"/>
 <Typography  gutterBottom variant="body2" component="span" color={mainColorText}>
          ({listRating.length})
        </Typography>
     </CardContent>
      
    </Card>
  );
}

