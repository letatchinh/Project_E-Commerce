import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import "../StyleComponent/Banner.css";
import CategoryBanner from "./CategoryBanner";
import CategoryBannerMobile from "./CategoryBannerMobile";
export default function BannerShowMainProduct() {
  return (
    <div className="boxBanner">
    <img className="imgHeader" src="https://www.glimpsefromtheglobe.com/wp-content/uploads/2016/12/1200px-Zara_Almere_-_Heren.jpg" alt="banner"/>
      <div className="fillBanner">
        <CategoryBanner />
        <CategoryBannerMobile />
        <Stack  margin="5rem auto" alignItems="center" spacing={1}>
          <Typography
            sx={{
              backgroundImage: "linear-gradient(90deg , #B3FFB4, #12FFF7)",
              backgroundClip: "text",
              color: "transparent",
              width: "max-content",
               animation : `AppearCategory 1s ease`
            }}
            variant="h4"
            textAlign="center"
            fontWeight="bold"
          >
            Shirt
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            fontStyle="italic"
            color="white"
            sx={{ animation : `AppearCategory2 3s ease`}}
          >
            High-quality materials – Luxurious design – Classy design
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            fontStyle="italic"
            color="white"
            sx={{ animation : `AppearCategory2 4s ease `}}

          >
            Sale Off 30%
          </Typography>
          <Button
            sx={{
              color: "white",
              borderColor: "white",
              background: "#00000090",
              width: "30%",
              padding: "10px 0",
              marginTop : '20px',
              animation : `AppearCategory3 2s ease `
            }}
            variant="outlined"
          >
            Buy Now
          </Button>
        </Stack>
      </div>
    </div>
  );
}
