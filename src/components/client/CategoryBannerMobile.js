import { Box, Button, Drawer } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import ItemCategoryBanner from "./ItemCategoryBanner";
import ItemFilter from "./ItemFilter";
import ListIcon from "@mui/icons-material/List";
import { listCategory } from "../../constant/Key";
export default function CategoryBannerMobile() {
  const [state, setState] = useState({
    left: false,
  });
  const toggleDrawer = (anchor, open) => () => {
    console.log("ok");
    setState({ ...state, [anchor]: open });
  };
  const list = () => (
    <Box
      sx={{ width: 200, height: "100%", background: "black" }}
      role="presentation"
    >
      <Stack>
      {
        listCategory.map((e,i) =>  <ItemCategoryBanner delay={i*0.5} value={e.name} linkTo={`/${e.name}`} />
)
      }
      </Stack>
    </Box>
  );
  return (
    <Stack sx={{display : {md : 'none' , xs : 'flex'}}} direction="row" justifyContent="flex-end">
      <Button style={{ zIndex: 10000 }} onClick={toggleDrawer("left", true)}>
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
