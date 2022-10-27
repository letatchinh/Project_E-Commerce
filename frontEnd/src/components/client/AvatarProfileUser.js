import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar } from "@mui/material";
import { KEY_USER } from "../../constant/LocalStored";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import FilterIcon from "@mui/icons-material/Filter";
export default function AvatarProfileUser() {
  const [fill, setFill] = useState(false);
  const users = JSON.parse(localStorage.getItem(KEY_USER)) || "";
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickCloseFill = () => {
    setFill(false);
  };
  const handleChangeAvatar = (e) => {
      console.log(e.target.file);
  }
//   console.log(values);
  return (
    <div style={{ margin: "0 auto" }}>
      <div
        onClick={handleClickCloseFill}
        style={{
          position: "fixed",
          inset: 0,
          background: "#0000007a",
          zIndex: fill ? 100 : -1,
        }}
      ></div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        disabled={fill}
      >
        <Avatar
          sx={{
            height: "170px",
            width: "170px",
            margin: "0 auto",
            transform: fill
              ? "scale(2.8) translateX(10vw) translateY(10%)"
              : "scale(1)",
            zIndex: fill ? 101 : 1,
            transition: "1s ease",
            borderRadius: fill ? 0 : "50%",
          }}
          alt="Remy Sharp"
          src={users.avatar === "" ? `/images/img02.png` : `/images/${users.avatar}`}
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuItem
          sx={{ gap: "5px" }}
          onClick={() => {
            handleClose();
            setFill(true);
          }}
        >
          <ImageSearchIcon /> See Avatar
        </MenuItem>
        {/* <MenuItem sx={{ gap: "5px" }} onClick={handleClose}>
          <label
            style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom : 0 , cursor : 'pointer' }}
            htmlFor="files"
          >
            {" "}
            <FilterIcon /> Edit Avatar
          </label>
          <input onChange={handleChangeAvatar} multiple type="file" id="files"  style={{ display: "none" }} />
        </MenuItem> */}
      </Menu>
    </div>
  );
}
