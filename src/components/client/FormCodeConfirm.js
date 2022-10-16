import { Alert, Button, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import { yupResolver } from '@hookform/resolvers/yup';
import MyTypography from './MyTypography';
export default function FormCodeConfirm({code,display,setStatus}) {
    const [isTrue,setIsTrue] = useState('')
    const [timesWrong,setTimesWrong] = useState(0)
    const schema = yup.object().shape({
        code: yup.string().required("Required")
      });
      useEffect(() => {
        if(timesWrong === 5){
        }
      },[timesWrong])
    const { register, handleSubmit,  formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      });
      const onSubmit = data => {
        if(data.code === code){
            setStatus()
        }
   else{
       setIsTrue(false)
       setTimesWrong(timesWrong+1)
   }
      };
  return (
   <>
       {timesWrong <=5 ?  <form style={{flex : 1, padding : '50px' , display : display}} onSubmit={handleSubmit(onSubmit)}>
    <Stack alignItems={"center"} spacing={2}>
      <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'>
      <Typography variant="h6" color='#888' >
        Forgot Password
      </Typography>
      <Stack direction='row' spacing={1}>
        <FacebookOutlinedIcon color='primary' sx={{cursor : 'pointer' ,fontSize : '30px'}}/>
        <img style={{width : '28px' , height : '28px' , marginTop : '1px' ,cursor : 'pointer'}} src="https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK" alt="google"/>
      </Stack>
      </Stack>
      <MyTypography fontSize='1rem'>We Sent Code Confirm in Your Email , please Check your Email (5 times Check)</MyTypography>
      <TextField size="small" 
        {...register("code")}
        fullWidth
        label="Code"
        variant="outlined"
        error={errors.code !== undefined}
        helperText={errors.code && errors?.code.message}
      />
      <Button sx={{backgroundImage: "linear-gradient(45deg, #E26560, #E36183)" ,borderRadius : '50px'}} fullWidth type="submit" variant="contained">
        Confirm
      </Button>
      <Alert sx={{display : isTrue===false ? "flex" : "none" , width : '100%'}} severity="error">Wrong Confirm Code</Alert>

    </Stack>
  </form> : <Alert sx={{flex : 1}} severity="error">Sorry We cant help you</Alert>}
   </>
  )
}
