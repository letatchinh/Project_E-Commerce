import { Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import '../StyleComponent/ListProduct.css'
export default function PurposeAboutUs({contentTop,contentBody}) {
    const componentRef = useRef();
    const [isAppear, setIsAppear] = useState(false);
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
    <Paper className={isAppear ? "appear" : ""} ref={componentRef} elevation={3} sx={{padding : '30px' , flex : 1 , textAlign : 'center'}}>
          <Stack alignItems='center'>
              <Typography sx={{fontSize : 'calc(0.5vw + 1rem)', whiteSpace : 'nowrap'}}>{contentTop}</Typography>
              <Typography sx={{fontSize : 'calc(0.2vw + 0.8rem)'}} color='#999' textAlign='center'>{contentBody}

</Typography>
          </Stack>
      </Paper>
  )
}
