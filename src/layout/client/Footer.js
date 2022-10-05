import {
  Container,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { Stack } from "@mui/system";
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
  const mainBackGround = useSelector((state) => state.common.mainBackGround);
  return (
    <div style={{ background: mainBackGround, margin: "20px 0",position : 'relative' }}>
    <div className="buttonGoTop" style={{position : 'absolute',right : '10px',top : '40px',boxShadow : '0 0 5px 2px white', borderRadius : '50%',padding : '2px'}}><BackToTop/></div>
      <Container>
        <Grid container spacing={2}>
          <Grid item md={5} xs={6}>
            <Stack spacing={3}>
              <MyTypography fontWeight="400" fontSize="14px">
                “Đặt sự hài lòng của khách hàng là ưu tiên số 1 trong mọi suy
                nghĩ hành động của mình” là sứ mệnh, là triết lý, chiến lược..
                luôn cùng Ut Fashion tiến bước
              </MyTypography>
              <Stack spacing={1}>
                <MyTypography>ĐĂNG KÝ NHẬN THÔNG TIN</MyTypography>
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
                    color="primary"
                    sx={{ p: "10px" }}
                    aria-label="directions"
                  >
                    <SendIcon />
                  </IconButton>
                </Paper>
              </Stack>
              <Stack direction="row" spacing={2}>
                <IconFooter icon={<FacebookIcon color="primary" />} />
                <IconFooter icon={<InstagramIcon color="primary" />} />
                <IconFooter icon={<YouTubeIcon color="primary" />} />
                <IconFooter icon={<PinterestIcon color="primary" />} />
              </Stack>
            </Stack>
          </Grid>
          <Grid item md={2} xs={6}>
            <MyTypography>About us</MyTypography>
            <Stack>
              <MyTypography className="cardContentHover" fontSize="14px">
                Intro
              </MyTypography>
              <MyTypography className="cardContentHover" fontSize="14px">
                Contact
              </MyTypography>
              <MyTypography className="cardContentHover" fontSize="14px">
                recruit
              </MyTypography>
              <MyTypography className="cardContentHover" fontSize="14px">
                News
              </MyTypography>
            </Stack>
          </Grid>
          <Grid item md={4} xs={6}>
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" spacing={2}>
              <BlockIconFooter><LocationOnIcon color="primary" /></BlockIconFooter>
                <Stack>
                <MyTypography fontWeight="400" fontSize="14px">
                    Công ty cổ phần Thời trang Ut Fashion
                  </MyTypography>
                  <MyTypography fontWeight="400" fontSize="14px">
                    Địa chỉ: Đường An Định - Phường Việt Hòa - Thành phố Hải
                    Dương - Hải Dương
                  </MyTypography>
                 
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <BlockIconFooter><PhoneIcon color="primary"/></BlockIconFooter>
                <Stack>
                  <MyTypography fontWeight="400" fontSize="14px">
                    Liên hệ đặt hàng: 0905970965
                  </MyTypography>
                  <MyTypography fontWeight="400" fontSize="14px">
                    Thắc mắc đơn hàng: 0905970965
                  </MyTypography>
                  <MyTypography fontWeight="400" fontSize="14px">
                    Góp ý khiếu nại: 1800 2086
                  </MyTypography>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={2}>
                <BlockIconFooter><EmailIcon color="primary"/></BlockIconFooter>
                <MyTypography fontWeight="400" fontSize="14px">
                  Email: letatchinh123@gmail.com
                </MyTypography>
              </Stack>
            </Stack>
          </Grid>
         
        </Grid>
      </Container>
    </div>
  );
};
export default Footer;
