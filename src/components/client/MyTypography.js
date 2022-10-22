import { Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';

export default function MyTypography({fontWeight,fontSize,children,variant,fontFamily,color,className,sx,display,textAlign}) {
    const mainColorText = useSelector((state) => state.colorCommon.mainColorText);
    const mainTextShadow = useSelector((state) => state.colorCommon.mainTextShadow);

  return (
    <Typography textAlign={textAlign} display={display} style={{textShadow : mainTextShadow}}  sx={{sx}} className={className} fontWeight={fontWeight} fontSize={fontSize} variant={variant} fontFamily={fontFamily} color={(color) ? color : mainColorText}>
                  {children}
                </Typography>
  )
}
