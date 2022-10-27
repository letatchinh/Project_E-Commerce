import {Tab , Typography } from "@mui/material";
import React, { useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import '../StyleComponent/Icons.css'
import { useSelector } from "react-redux";
export default function TabsComponent() {
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const mainColorText = useSelector(state => state.colorCommon.mainColorText)

  return (
    <TabContext  value={value}>
      <TabList className='tabsss' onChange={handleChange} aria-label="lab API tabs example">
        <Tab label="Payment" value="1" />
        <Tab  label="Help" value="2" />
        <Tab label="About Us" value="3" />
      </TabList>
      <TabPanel value="1">
        <img
          src="https://cf.shopee.vn/file/d4bbea4570b93bfd5fc652ca82a262a8"
          alt="s"
        />
      </TabPanel>
      <TabPanel value="2">
        <Typography variant="body2" color={mainColorText}>Call Me : 0905970965</Typography>
      </TabPanel>
      <TabPanel value="3">
        <Typography variant="body2" fontWeight="300"  color={mainColorText}>
          For businesses who are still struggling with starting their About
          page, here is a writing structure that you can refer to. A small note
          is that using first person (me, we) will help businesses build a
          better personal connection with customers. Standard structure for a
          business presentation:
        </Typography>
      </TabPanel>
    </TabContext>
  );
}
