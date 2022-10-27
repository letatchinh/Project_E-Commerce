import { Box, Button, Drawer } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import ItemCategoryBanner from "./ItemCategoryBanner";
import ItemFilter from "./ItemFilter";
import ListIcon from "@mui/icons-material/List";
import { listCategory } from "../../constant/Key";
import { v4 } from "uuid";
import { Link } from "react-router-dom";
export default function CategoryBannerMobile() {
  const [state, setState] = useState({
    left: false,
  });
  const toggleDrawer = (anchor, open) => () => {
    setState({ ...state, [anchor]: open });
  };
  const list = () => (
    <Box
      sx={{ width: 200, height: "100%", background: "black" }}
      role="presentation"
    >
      <Stack>
      {
        listCategory.map((e,i) =>  <ItemCategoryBanner key={v4()} delay={i*0.5} value={e.name} linkTo={`/product/${e.name}`} />
)
      }
      <ItemCategoryBanner delay={3.5} value="About us" linkTo={'/about'}/>
      <ItemCategoryBanner delay={4} value="Contact" linkTo={'/contact'}/>
      <ItemCategoryBanner delay={4.5} value="Products" linkTo={'/products'}/>
      
      </Stack>
    </Box>
  );
  return (
    <Stack sx={{display : {md : 'none' , xs : 'flex'} , position : 'absolute' , top : 0, left : 0}} direction="row" justifyContent="flex-end">
      <Button style={{ zIndex: 1000 }} onClick={toggleDrawer("left", true)}>
        <div
          style={{
            border: "1px solid white",
            color: "white",
            padding: "7px 10px",
            borderRadius: "5px",
            opacity: !state.left ? 1 : 0,
          }}
        >
          <ListIcon />
        </div>
      </Button>
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </Stack>
  );
}
