import {
  Container,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { Stack, styled } from "@mui/system";
import { useSelector } from "react-redux";
import "../../components/StyleComponent/Footer.css";
import BackToTop from "../../components/client/BackToTop";
import SendIcon from "@mui/icons-material/Send";
import IconFooter from "../../components/client/IconFooter";
import "../../components/StyleComponent/Product.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import BlockIconFooter from "../../components/client/BlockIconFooter";
const Footer = () => {
  const CustomTypoGraphy = styled(Typography)({
    color: "white",
  });
  const statusThemme = useSelector((state) => state.colorCommon.status);
  const [statusEmailFooter,setStatusEmailFooter] = useState(false)
  return (
    <div
      style={{
        background: statusThemme
          ? "linear-gradient(rgb(238, 77, 45), rgb(255, 115, 55))"
          : "#00255E",
        paddingBottom: "20px",
        paddingTop: "20px",
        position: "relative",
      }}
    >
      <div
        className="buttonGoTop"
        style={{
          position: "absolute",
          right: "10px",
          top: "40px",
          boxShadow: "0 0 5px 2px white",
          borderRadius: "50%",
          padding: "2px",
        }}
      >
        <BackToTop />
      </div>
      <Container>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item md={5} sm={6} xs={12}>
            <Stack spacing={3}>
              <CustomTypoGraphy fontWeight="400" fontSize="14px">
                “Put customer satisfaction as the number 1 priority in every
                thought think your actions" is the mission, philosophy,
                strategy.. Always move forward with Ut Fashion
              </CustomTypoGraphy>
              <Stack spacing={1}>
                <CustomTypoGraphy>Subscribe to our newsletter to receive news,
Special offers and exclusive promotions</CustomTypoGraphy>
{statusEmailFooter ? <Typography color='#00fff2'> Thank you for subscribing to receive information</Typography> 
: 
                 <Paper
                  variant="outlined"
                  component="form"
                  sx={{
                    p: "0 4px",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Write Email Here..."
                  />
                  <Divider sx={{ height: 28 }} orientation="vertical" />
                  <IconButton
                    sx={{ color: "#1976D2", p: "10px" }}
                    aria-label="directions"
                    onClick={() => setStatusEmailFooter(true)}
                  >
                    <SendIcon />
                  </IconButton>
                </Paper>
}
              
                
              </Stack>
              <Stack direction="row" spacing={2}>
                <IconFooter href='https://www.facebook.com/chinh.le.3994885' icon={<FacebookIcon sx={{ color: "white" }} />} />
                <IconFooter href="https://www.instagram.com/explore/tags/%C3%ADnstagram/top/?hl=vi" icon={<InstagramIcon sx={{ color: "white" }} />} />
                <IconFooter href="https://www.youtube.com/channel/UCCiPAoJWH0pUFypZb7JZWXw" icon={<YouTubeIcon sx={{ color: "white" }} />} />
                <IconFooter href="https://www.pinterest.com/" icon={<PinterestIcon sx={{ color: "white" }} />} />
              </Stack>
            </Stack>
          </Grid>
          <Grid item>
            <Stack marginRight={{ md: 0, xs: "4rem" }}>
              <CustomTypoGraphy>About us</CustomTypoGraphy>
              <Stack>
                <CustomTypoGraphy className="cardContentHover" fontSize="14px">
                  Intro
                </CustomTypoGraphy>
                <CustomTypoGraphy className="cardContentHover" fontSize="14px">
                  Contact
                </CustomTypoGraphy>
                <CustomTypoGraphy className="cardContentHover" fontSize="14px">
                  recruit
                </CustomTypoGraphy>
                <CustomTypoGraphy className="cardContentHover" fontSize="14px">
                  News
                </CustomTypoGraphy>
              </Stack>
            </Stack>
          </Grid>
          <Grid item md={4} xs={12}>
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <BlockIconFooter>
                  <LocationOnIcon sx={{ color: "white" }} />
                </BlockIconFooter>
                <Stack>
                  <CustomTypoGraphy fontWeight="400" fontSize="14px">
                    Ut Fashion Joint Stock Company
                  </CustomTypoGraphy>
                  <CustomTypoGraphy fontWeight="400" fontSize="14px">
                    Address: 67 Nguyen Dinh Chieu , Khue My , Ngu Hanh Son , Da
                    Nang city
                  </CustomTypoGraphy>
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <BlockIconFooter>
                  <PhoneIcon sx={{ color: "white" }} />
                </BlockIconFooter>
                <Stack>
                  <CustomTypoGraphy fontWeight="400" fontSize="14px">
                    Contact to order: 0905970965
                  </CustomTypoGraphy>
                  <CustomTypoGraphy fontWeight="400" fontSize="14px">
                    Order inquiries: 0905970965
                  </CustomTypoGraphy>
                  <CustomTypoGraphy fontWeight="400" fontSize="14px">
                    Comments and complaints: 1800 2086
                  </CustomTypoGraphy>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={2}>
                <BlockIconFooter>
                  <EmailIcon sx={{ color: "white" }} />
                </BlockIconFooter>
                <CustomTypoGraphy fontWeight="400" fontSize="14px">
                  Email: letatchinh123@gmail.com
                </CustomTypoGraphy>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default Footer;
