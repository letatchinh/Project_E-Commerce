import { Alert, Button, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegisterRequest } from '../../redux/login/Actions';

export default function Register() {
    const { register, handleSubmit,  formState: { errors } } = useForm();
    const [error,setError] = useState(false)
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const onSubmit = data => {
        const newUser = {
            username : data.username,
            password : data.password,
            listCarts : []
        }
        const flag = user.findIndex(e => e.username === newUser.username)
        if(flag === -1)
       { 
         dispatch(fetchRegisterRequest(newUser))
        alert("dkty rhanh cong")
        setError(false)
      }
      else{
        setError(true)
      }
    };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <Stack spacing={3} sx={{width : "30%" , margin : "0 auto"}}>
    <TextField  {...register("username",{ required: true })} label="UserName" variant="outlined" />
    <TextField  {...register("password",{ required: true })} type='password' label="PassWord" variant="outlined" />
    {errors.username && <span>This field is required</span>}
    {errors.password && <span>This field is required</span>}
    {error && <Alert severity="error">Tài khoản bị trùng</Alert>
} 
    <Button type='submit' variant="contained">Register</Button>
    </Stack>

  </form>
  )
}
