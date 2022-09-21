import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
export default function ItemInfoUser({icon,value}) {
  return (
    <ListItem
            >
              <ListItemIcon>
                {icon}
              </ListItemIcon>
              <ListItemText primary={value} />
            </ListItem>
  )
}
