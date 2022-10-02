import { Grid, Typography } from '@mui/material';
import React from 'react';
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { Stack } from '@mui/system';
import TabsComponent from '../../components/client/TabsComponent';
import { useSelector } from 'react-redux';
 const Footer = () => {
const mainBackGround = useSelector(state => state.common.mainBackGround)
const mainColorText = useSelector(state => state.common.mainColorText)
  return (
    <div style={{background : mainBackGround}}>
      <Stack sx={{ width : '50%'}} alignItems='center' margin='0 auto'>
      <TabsComponent />
     <Typography variant='h5' color={mainColorText}> Contact me</Typography>
      <Stack direction='row' spacing={2}>
    <FacebookIcon color={mainColorText}/>
    <InstagramIcon/>
    <YouTubeIcon/>
    <PinterestIcon/>
      </Stack>
      <Stack>
        Thank Yous
      </Stack>
    </Stack>
    </div>
  );
};
export default Footer