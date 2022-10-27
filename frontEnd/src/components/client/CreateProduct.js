import { Button, FormControl, FormHelperText, InputAdornment,OutlinedInput,TextField } from '@mui/material'
import { Box, Container, Stack } from '@mui/system'
import React from 'react'
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import { useDispatch } from 'react-redux';
import {  fetchAddProductRequest } from '../../redux/shopping/Shopping-actions';
import { useForm } from 'react-hook-form';
export default function CreateProduct() {
  const { setValue, register, handleSubmit, watch, formState: {errors } } = useForm();
  const dispatch = useDispatch()
  const onSubmit = (data) => {
    let sellPrice = 0;
    if(data.isSell === 'true'){
       sellPrice = watch("price") - watch("price")*(watch("discount")/100)
    }
    dispatch(fetchAddProductRequest({...data,rating : 0,listRating : [],sellPrice : sellPrice}))
    alert("Add Thanh cong")
  };
  return (
    <Container sx={{width : "30%"}}>
     <form onSubmit={handleSubmit(onSubmit)}>
     <Stack spacing={2}>
     <Typography textAlign="center" variant="h3" gutterBottom>
        NEW PRODUCT
      </Typography>
      <TextField {...register("name")}  label="Name" variant="outlined" />
      <TextField {...register("price")} label="Price" type="number"/>
      <TextField {...register("image")}  label="Image" variant="outlined" />
      <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{height : "50px"}} fullWidth>
      <select  style={{height : "100%"}} {...register("isSell",{
        onChange : (e) => {
          if(e.target.value === 'false'){
            setValue('discount',0)
          }
        }
      })}>
        <option value={false}>Not Sell</option>
        <option value={true}>Sell</option>
      </select>
      </FormControl>
    </Box>
      <OutlinedInput
          sx={{display : (watch("isSell")==='true') ? "inline-flex" : "none"}}
          id="outlined-adornment-weight"
           type='number'
          defaultValue={1}
           {...register("discount",{min : 0 , max : 100})}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
          <FormHelperText id="outlined-weight-helper-text">discount</FormHelperText>

      <Button type='submit' variant='contained'>Post</Button>
     </Stack>
    </form>
    </Container>
  )
}
