import { ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
export default function ItemInfoUser({ icon, value }) {
  const mainColorText = useSelector(state => state.colorCommon.mainColorText)
  return (
    <ListItem>
      <Stack direction='row' spacing={3}>
      {icon}
      <Typography color={mainColorText}>{value}</Typography>
      </Stack>
    </ListItem>
  );
}
