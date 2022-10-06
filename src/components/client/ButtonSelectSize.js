import { Button } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'

export default function ButtonSelectSize({value,set,isActive}) {
    const ButtonStyled = styled(Button)({
        position : 'relative',
        '&::before':{
            content : "''",
            backgroundImage : `url("https://bizweb.dktcdn.net/100/438/408/themes/878697/assets/tick.png?1664989957591")`,
            position : 'absolute',
           bottom : 0,
           right : 0,
           backgroundRepeat: 'no-repeat',
            width : '21px',
            height : '21px',
            display : (isActive) ? 'block' : 'none'
        }
    })

  return (
    <ButtonStyled color={ isActive ? 'warning' : 'primary'} onClick={() => set(value)} sx={{width : '40px', height : '40px' , minWidth : 0}} variant='outlined'>
    {value}
</ButtonStyled>
   
  )
}
