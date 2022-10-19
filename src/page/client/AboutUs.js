import { Container, Stack } from "@mui/system";
import React from "react";
import HeaderAboutUs from "../../layout/client/HeaderAboutUs";
import "../../components/StyleComponent/Header.css";
import { Paper, Typography } from "@mui/material";
import Footer from "../../layout/client/Footer";
import PurposeAboutUs from "../../components/client/PurposeAboutUs";
import PersonalityAboutUs from "../../components/client/PersonalityAboutUs";
import Header from "../../layout/client/Header/Index";

export default function AboutUs() {
  return (
    <Stack position="relative">
      {/* <HeaderAboutUs /> */}
      <Header aboutActive/>
      <div className="fillTopAboutUs">
      </div>
      <div className="InFillTopAboutUs">
        <div className="ItemInFillTopAboutUs">
          <Typography sx={{fontSize : 'calc(0.5vw + 30px)'}}      fontWeight="300" textAlign='center'>
            UT is the leading e-commerce platform in Southeast Asia and Taiwan.
          </Typography>
          <Typography sx={{fontSize : 'calc(0.5vw + 10px)'}} fontWeight='300' textAlign='center'>
            Launched in 2015, the UT commerce platform was built to provide
            users with an easy, safe and fast experience when shopping online
            through a strong payment support and operating system. We strongly
            believe that the online shopping experience should be simple, easy
            and emotionally pleasurable. This belief inspires and drives us
            every day at UT.
          </Typography>
        </div>
      </div>
     <div style={{background : 'white' , padding : '2rem 0'}}>
     <Container sx={{marginTop : '2rem', marginBottom : '2rem' }}>
      <Stack direction={{md : 'row' , xs : 'column'}} justifyContent='space-between' spacing={10}>
      <PurposeAboutUs contentTop="Our purpose" contentBody="We believe in the transformative power of technology and want to change the world for the better by providing a platform to connect buyers and sellers within one community."/>
      <PurposeAboutUs contentTop="Our Positioning" contentBody="To Internet users across the region, Shopee offers a one-stop online shopping experience that provides a wide selection of products, a social community for exploration, and seamless fulfilment services."/>
      </Stack>
      </Container>
      <Container>
          <Paper elevation={3} sx={{padding : '30px' ,textAlign : 'center'}}>
              <Stack spacing={2} >
                <Typography variant="h5">
                Our Personality
                </Typography>
                <Typography  variant="body1" color='#999' sx={{marginBottom : '2rem!important'}}>
                To define who we are - how we talk, behave or react to any given situation - in essence, we are Simple, Happy and Together. These key attributes are visible at every step of the Shopee journey.
                </Typography>
                <Stack direction={{md : 'row' , xs : 'column'}} spacing={2} justifyContent='space-between'>
                   <PersonalityAboutUs image="https://cdn.dribbble.com/users/1292088/screenshots/17605335/media/8da5eb8a8b70bc3e3906bcad3c7f0fc6.png?compress=1&resize=1600x1200&vertical=top"  contentTop="Simple" contentBody="We believe in simplicity and integrity, ensuring a life that’s honest, down to earth and true to self."/>
                   <PersonalityAboutUs image="https://deo.shopeemobile.com/shopee/shopee-careers-live-vn/assets/img/Illustration_2_1.4599c77f.png"  contentTop="Happy" contentBody="We are friendly, fun-loving and bursting with heaps of energy, spreading the joy with everyone we meet.  "/>
                   <PersonalityAboutUs image="https://deo.shopeemobile.com/shopee/shopee-careers-live-vn/assets/img/Illustration_3_1.277cccfb.png"  contentTop="Together" contentBody=" We enjoy spending quality time together while shopping online with friends and family - doing the things we love as one big unit. "/>
                </Stack>
              </Stack>
          </Paper>
      </Container>
     </div>
     <Footer/>
    </Stack>
  );
}
