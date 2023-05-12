import { Button, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../../redux/filterProduct/Actions'

export default function ItemCategory({value,image}) {
  const dispatch = useDispatch()
  return (
        <Button onClick={() => dispatch(setFilter({type : "SET_PAGE",filter : 1}))}  sx={{textTransform : 'capitalize' , width : '100px', height :' 100px' , margin : '5px 0'}} variant="outlined" >
       <Stack width='100%' alignItems='center'>
       {/* <img src={image} alt='2'/> */}
          <Typography textTransform='capitalize'>{value}</Typography>
       </Stack>
        </Button>
  )
}
