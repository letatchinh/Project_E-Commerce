import { Alert, Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import { yupResolver } from '@hookform/resolvers/yup';
import AxiosUser from '../../apis/client/AxiosUser';
import LoadingCycleFullwitdh from './LoadingCycleFullwitdh';
import brcypt from 'bcryptjs'
import HideShowPassword from './HideShowPassword';

export default function FormNewPassword({display,email}) {
    const [isSuccess,setIsSuccess] = useState(false)
    const [loading,setLoading] = useState(false)
    const schema = yup.object().shape({
        password: yup.string().required("Required"),
        confirmPassword : yup.string().required("Required").oneOf([yup.ref('password'),null],"Password Dont match")
      });
    const { register, handleSubmit,  formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      });
      const onSubmit = async(data) => {
          setLoading(true)
        await AxiosUser.put("/api/users/resetPassword",{email : email , password : brcypt.hashSync(data.password,10)}).then(res => setIsSuccess(true))
        setLoading(false)
        }

  return (
    <form style={{flex : 1, padding : '50px' , display : display}} onSubmit={handleSubmit(onSubmit)}>
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
      <HideShowPassword error={errors.password !== undefined}  message={errors.password && errors.password.message}  {...register("password")}/>
      <HideShowPassword placeholder="Confirm Password" error={errors.confirmPassword !== undefined}  message={errors.confirmPassword && errors.confirmPassword.message}  {...register("confirmPassword")}/>
      {isSuccess ?  <Alert security='error'>Change Pass Success</Alert> :  <Button disabled={loading} sx={{backgroundImage: "linear-gradient(45deg, #E26560, #E36183)" ,borderRadius : '50px'}} fullWidth type="submit" variant="contained">
      {loading ? <LoadingCycleFullwitdh size="30px" /> : "Change"}
      </Button>}
     
     
    </Stack>
  </form>
  )
}

