import React, { useState } from 'react'
import LoadingHomePageFull from '../../components/client/LoadingHomePageFull'
import SwitchBackGround from '../../components/client/SwitchBackGround'
import Header from "../../layout/client/Header/Index";

import Footer from '../../layout/client/Footer'
import { Button, Container, Paper, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import MyTextField from '../../components/client/MyTextField'
export default function ContactUsUser() {
  const { register, handleSubmit,reset,  formState: { errors } } = useForm();
  const mainBackGround = useSelector((state) => state.colorCommon.mainBackGround);
  const mainBackGround2 = useSelector((state) => state.colorCommon.mainBackGround2);
  const [status,setStatus] = useState(false)
  const [statusGif,setStatusGif] = useState(false)
  const onSubmit = data => {
    console.log(data);
    setStatus(true)
    reset()
  };
  return (
    <div style={{ minWidth: "435px", position: "relative" }}>
      <LoadingHomePageFull/>
      <Header contactActive/>
      <SwitchBackGround />
      <div style={{background: mainBackGround, padding : '100px 0'}}>
    <Container sx={{ width: {md : "60%" , xs : '100%'} }}>
       <Paper elevation={3} sx={{background: mainBackGround2,  display : 'flex' , flexDirection : {md : 'row' , xs : 'column'}}}>
       <form style={{flex : 1, padding : '50px'}} onSubmit={handleSubmit(onSubmit)}>
        <Stack alignItems={"center"} spacing={2}>
        <Typography sx={{ backgroundImage: 'linear-gradient(to right , orange, red)',
    backgroundClip: 'text',
    color: 'transparent',
    width: 'fit-content',}}>Dont Be Shy <img style={{width : '30px',height : '30px'}} src='https://icons.iconarchive.com/icons/google/noto-emoji-people-bodyparts/512/12050-waving-hand-icon.png' alt='hand'/></Typography>
          <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'>
          <Typography variant="h6" color='#888' >
            Contact Us
          </Typography>
         
          </Stack>
          <MyTextField  size='small' {...register("email")} label="Email" error={errors.email !== undefined}
            helperText={errors.email && errors?.email.message}/>
          <MyTextField {...register("messenger")}
            label="Messenger"
            variant="outlined"
            multiline
            rows={4}
            error={errors.messenger !== undefined}
            helperText={errors.messenger && errors?.messenger.message}/>
          <Button sx={{backgroundImage: "linear-gradient(45deg, #E26560, #E36183)" ,borderRadius : '50px'}} fullWidth type="submit" variant="contained">
            Send
          </Button>
        </Stack>
      </form>
      <Stack padding= '20px 0' spacing={2} color='white' justifyContent='center' alignItems='center' sx={{width : {md : '50%', sm : '100%'},backgroundImage: "linear-gradient(45deg, #E26560, #E36183)"}}>
            <Typography variant="h5"  fontWeight='bold'>Welcome to Contact Us</Typography>
            <Typography variant="body2"  fontWeight='bold' color='aqua'>Contact Us to Receiver a Small Gif</Typography>
           <Stack sx={{opacity : status ? 1 : 0,transition : '.5s ease'}} spacing={1} alignItems='center'>
           <Typography fontWeight='300'>Thank you for contacting us</Typography>
           <Button onClick={() => setStatusGif(true)} sx={{color : 'white' , borderColor : 'white' , borderRadius : '40px'}} variant="outlined">Open</Button>
           <Stack alignItems='center' sx={{opacity : statusGif ? 1 : 0, transition : '0.5s ease'}}>
           <Typography variant='h6' fontWeight='300'>GifCode Discount 15%</Typography>
           <Typography  fontWeight='300'>AHDHDH2332</Typography>
           </Stack>
           </Stack>
      </Stack>
       </Paper>
      
    </Container>
    </div>
      <Footer />
    
    </div>
  )
}
