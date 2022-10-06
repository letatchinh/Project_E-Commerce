import {
  Container,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
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
import MyTypography from "../../components/client/MyTypography";
import BlockIconFooter from "../../components/client/BlockIconFooter";
const Footer = () => {
  const CustomTypoGraphy = styled(Typography)({
    color : 'white'
  })
  return (
    <div style={{ background: 'linear-gradient(rgb(238, 77, 45), rgb(255, 115, 55))', paddingBottom: "20px",position : 'relative' }}>
    <div className="buttonGoTop" style={{position : 'absolute',right : '10px',top : '40px',boxShadow : '0 0 5px 2px white', borderRadius : '50%',padding : '2px'}}><BackToTop/></div>
      <Container>
        <Grid container spacing={2}>
          <Grid item md={5} xs={6}>
            <Stack spacing={3}>
              <CustomTypoGraphy   fontWeight="400" fontSize="14px">
                “Đặt sự hài lòng của khách hàng là ưu tiên số 1 trong mọi suy
                nghĩ hành động của mình” là sứ mệnh, là triết lý, chiến lược..
                luôn cùng Ut Fashion tiến bước
              </CustomTypoGraphy>
              <Stack spacing={1}>
                <CustomTypoGraphy>ĐĂNG KÝ NHẬN THÔNG TIN</CustomTypoGraphy>
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
                  sx={{color : 'white', p: "10px"}}
                    aria-label="directions"
                  >
                    <SendIcon />
                  </IconButton>
                </Paper>
              </Stack>
              <Stack direction="row" spacing={2}>
                <IconFooter icon={<FacebookIcon sx={{color : 'white'}} />} />
                <IconFooter icon={<InstagramIcon sx={{color : 'white'}} />} />
                <IconFooter icon={<YouTubeIcon sx={{color : 'white'}} />} />
                <IconFooter icon={<PinterestIcon sx={{color : 'white'}} />} />
              </Stack>
            </Stack>
          </Grid>
          <Grid item md={2} xs={6}>
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
          </Grid>
          <Grid item md={4} xs={12}>
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" spacing={2}>
              <BlockIconFooter><LocationOnIcon sx={{color : 'white'}} /></BlockIconFooter>
                <Stack>
                <CustomTypoGraphy fontWeight="400" fontSize="14px">
                    Công ty cổ phần Thời trang Ut Fashion
                  </CustomTypoGraphy>
                  <CustomTypoGraphy fontWeight="400" fontSize="14px">
                    Địa chỉ: Đường An Định - Phường Việt Hòa - Thành phố Hải
                    Dương - Hải Dương
                  </CustomTypoGraphy>
                 
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <BlockIconFooter><PhoneIcon sx={{color : 'white'}}/></BlockIconFooter>
                <Stack>
                  <CustomTypoGraphy fontWeight="400" fontSize="14px">
                    Liên hệ đặt hàng: 0905970965
                  </CustomTypoGraphy>
                  <CustomTypoGraphy fontWeight="400" fontSize="14px">
                    Thắc mắc đơn hàng: 0905970965
                  </CustomTypoGraphy>
                  <CustomTypoGraphy fontWeight="400" fontSize="14px">
                    Góp ý khiếu nại: 1800 2086
                  </CustomTypoGraphy>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={2}>
                <BlockIconFooter><EmailIcon sx={{color : 'white'}}/></BlockIconFooter>
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
