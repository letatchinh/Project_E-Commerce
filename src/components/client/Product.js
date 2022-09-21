import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch } from 'react-redux';
import { fetchAddToCartRequest } from '../../redux/login/Actions';
import Rating from '@mui/material/Rating';
import '../StyleComponent/Product.css'
import PriceSell from './PriceSell';
export default function Product(props) {
  const {name , image , price , isSell , item ,rating , listRating} = props
  const dispatch = useDispatch()
  return (
    <Card className='cardHover' sx={{display : "flex" , flexDirection : "column" ,position : "relative" , cursor:"pointer"  }}>
    <CardMedia sx={{position : "absolute" , width : "30%" , left : "-5px" , top : "-8px" , display : (isSell === 'true') ? "block" : "none"}} component="img" alt='sale' image='https://tochat.be/click-to-chat/wp-content/uploads/2020/09/sale-logo-download.png'/>
      <CardMedia className='imgProduct' sx={{height: '250px',objectFit : 'cover'}}
        component="img"
        alt="green iguana"
        image={image}
      />
      <CardContent sx={{padding : '5px'}}>
        <Typography  gutterBottom variant="body1"   >
          {name}
        </Typography>
        <PriceSell price={price} isSell={isSell}/>
      </CardContent>
     <CardContent sx={{padding : '5px'}} >
     <Rating name="read-only" value={parseInt(rating)} readOnly size="small"/>
 <Typography  gutterBottom variant="h6" component="span">
          ({listRating.length})
        </Typography>
     </CardContent>
      
    </Card>
  );
}

