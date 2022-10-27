import { Stack } from '@mui/material';
import React, { useState } from 'react'
import MyCarousel from '../../page/client/screens/MyCarousel';
import "../StyleComponent/Product.css"

export default function ImagesOfDeTail({images}) {
    const [active, setActive] = useState(0);
    const onHoverChangeActive = (index) => {
        setActive(index);
      };
  return (
    <Stack
    className="leftTo"
    margin="0 auto"
    sx={{ width: { md: "35%", sm: "70%", xs: "90%" } }}
    spacing={1}
  >
    {images && (
      <img
        style={{ height: "30rem" }}
        src={`/images/${images[active]}`}
        alt="name"
      />
    )}
    {images && (
      <MyCarousel
        hover={onHoverChangeActive}
        limit={4}
        data={images}
      />
    )}
  </Stack>
  )
}
