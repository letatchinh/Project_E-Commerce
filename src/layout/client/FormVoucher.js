import { Button, CircularProgress, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import AxiosUser from '../../apis/client/AxiosUser';
import { fetchVoucher } from '../../redux/client/cart/Actions';

export default function FormVoucher() {
    const { register, handleSubmit,watch, setError, formState: { errors } } = useForm();
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const onSubmit = data => {
        setLoading(true)
        AxiosUser.get(`/api/vouchers/filterId/${data.voucher}`).then(res => dispatch(fetchVoucher(res.data.discount))).catch(err => setError('voucher',{type : 'notFoundVoucher',message : err.response.data.message}))
     setLoading(false)
    };
    console.log(errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <Stack direction='row' padding='20px 0' justifyContent='space-between'>
  <TextField helperText={errors.voucher && errors.voucher.message} error={errors && errors?.voucher !== undefined || errors.type === "notFoundVoucher"} {...register("voucher",{required : true})} sx={{width : '70%'}} size='small' color='primary' variant='outlined' placeholder='Voucher...'/>
  <Button height='100%' disabled={watch('voucher') === ""} variant='contained' type="submit" >{loading ? <CircularProgress sx={{width : '100%!important',height : '100%!important' , color : 'white'}}/>: 'apply'}</Button>
    </Stack>
</form>
  )
}
