import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import { listImages } from "../../constant/Key";
import "../StyleComponent/Banner.css";
import CategoryBanner from "./CategoryBanner";
import CategoryBannerMobile from "./CategoryBannerMobile";

export default function BannerShowMainProduct() {

  const [active, setActive] = useState(0);
  const onHoverSetActive = useCallback((index) => {
    setActive(index);
  },[])
  return (
    <div className="boxBanner">
    {listImages.map((e,i) => <img
    key={v4()}
        className="imgHeader"
        style={{ opacity: active === i ? 1 : 0 }}
        src={e}
        alt="banner"
      />)}
     
      <div className="fillBanner">
        <CategoryBanner onHoverSetActive={onHoverSetActive} />
        <CategoryBannerMobile />
        <Stack margin="5rem auto" alignItems="center" spacing={1}>
          <Typography
            sx={{
              backgroundImage: "linear-gradient(90deg , #B3FFB4, #12FFF7)",
              backgroundClip: "text",
              color: "transparent",
              width: "max-content",
              animation: `AppearCategory 1s ease`,
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
            sx={{ animation: `AppearCategory2 3s ease` }}
          >
            High-quality materials – Luxurious design – Classy design
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            fontStyle="italic"
            color="white"
            sx={{ animation: `AppearCategory2 4s ease ` }}
          >
            Sale Off 30%
          </Typography>
          <Link to="/product/shirt">
            <Button
              sx={{
                color: "white",
                borderColor: "white",
                background: "#00000090",
                width: "100%",
                padding: "10px 100px",
                marginTop: "20px",
                animation: `AppearCategory3 2s ease `,
              }}
              variant="outlined"
            >
              Buy Now
            </Button>
          </Link>
        </Stack>
      </div>
    </div>
  );
}
