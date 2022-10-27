import {  Stack, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import '../StyleComponent/ListProduct.css'

export default function PersonalityAboutUs({contentTop,contentBody,image}) {
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
    <Stack className={isAppear ? "appear" : ""}  ref={componentRef} spacing={1} textAlign='center' flex={1}>
    <div style={{width : '100%' , height : '14rem'}}><img style={{width : '100%' , height : '100%' , objectFit : 'cover'}} src={image} alt="a"/></div>
    <Typography variant="h6">{contentTop}</Typography>
    <Typography variant="body1" color='#999'>
    {contentBody}
    </Typography>
</Stack>
  )
}
