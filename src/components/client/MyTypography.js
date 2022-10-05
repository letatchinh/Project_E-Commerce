import { Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';

export default function MyTypography({fontWeight,fontSize,children,variant,fontFamily,color,className}) {
    const mainColorText = useSelector((state) => state.common.mainColorText);

  return (
    <Typography className={className} fontWeight={fontWeight} fontSize={fontSize} variant={variant} fontFamily={fontFamily} color={(color) ? color : mainColorText}>
                  {children}
                </Typography>
  )
}
