import { Stack } from '@mui/material'
import React from 'react'
import ItemSearchOnKey from './ItemSearchOnKey'
import {v4} from 'uuid'
import { useSelector } from 'react-redux'
export default function ListItemSearchOnKey({data,clickClose}) {
    const mainBackGround = useSelector((state) => state.colorCommon.mainBackGround);
  return (
    <Stack  sx={{position : 'absolute' , top : '100%', width : '100%' ,left : 0,right : 0 ,background : mainBackGround ,borderRadius : '20px', padding : '20px 10px' , zIndex : 10, border : "1px solid #1976d2"}}>
    {data && data.map(e =>  <ItemSearchOnKey clickClose={clickClose}  key={v4()}  item={e}/>)}
    </Stack>
  )
}
