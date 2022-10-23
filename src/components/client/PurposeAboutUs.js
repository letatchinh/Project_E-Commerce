import { Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import '../StyleComponent/ListProduct.css'
import MyTypography from './MyTypography';
export default function PurposeAboutUs({contentTop,contentBody}) {
    const componentRef = useRef();
    const [isAppear, setIsAppear] = useState(false);
    const mainBackGround2 = useSelector((state) => state.colorCommon.mainBackGround2);

    useEffect(() => {
        if (!componentRef?.current) return;
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            setIsAppear(true);
          }
        });
        observer.observe(componentRef.current);
      }, [componentRef]);
  return (
    <Paper className={isAppear ? "appear" : ""} ref={componentRef} elevation={3} sx={{padding : '30px' , flex : 1 , textAlign : 'center',background :mainBackGround2}}>
          <Stack alignItems='center'>
              <MyTypography sx={{fontSize : 'calc(0.5vw + 1rem)', whiteSpace : 'nowrap'}}>{contentTop}</MyTypography>
              <Typography sx={{fontSize : 'calc(0.2vw + 0.8rem)'}} color='#999' textAlign='center'>{contentBody}

</Typography>
          </Stack>
      </Paper>
  )
}
