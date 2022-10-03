import { ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
export default function ItemInfoUser({ icon, value }) {
  const mainColorText = useSelector(state => state.common.mainColorText)
  return (
    <ListItem>
      <ListItemIcon color="primary">{icon}</ListItemIcon>
      {/* <ListItemText color='white' primary={value} /> */}
      <Typography color={mainColorText}>{value}</Typography>
    </ListItem>
  );
}
