import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../../layout/admin/Header";
import Sidebar from "../../../layout/admin/sidebar";
const HomePage = () => {
  const navigator = useNavigate();
  const [isClick, setClick] = useState(false);
  const [isDisplay, setDisplay] = useState(false);
  const [isClickMobile, setClickMobile] = useState(false);
  const handleClickMoblie = (e) => {
    setClickMobile(false);
  };
  const handleClickMenu = (e) => {
    setClick(!isClick);
    setClickMobile(true);
  };
  const handleDisplay = (e) => {
    setDisplay(!isDisplay);
  };
  const user = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    if (!user) {
      navigator("/admin/login");
    }
  }, [user]);
  const [isColor, setIsColor] = useState(false);
  const handleColor = () => {
    setIsColor(!isColor);
  };
  return (
    <>
      <div
        className={isClickMobile ? "" : "spMoblie"}
        style={{
          position: "fixed",
          inset: 0,
          display: isClickMobile ? "block" : "none",
        }}
        onClick={handleClickMoblie}
      ></div>
      <Sidebar
        click={isClick}
        handleClickMenu={handleClickMenu}
        isColor={isColor}
      />
      <div className={isClick ? "aside-mini" : ""}>
        <main
          className="main-wrap "
          style={{ background: isColor ? "#000" : "#f8f9fa" }}
        >
          <Header
            handleClickMenu={handleClickMenu}
            isDisplay={isDisplay}
            handleDisplay={handleDisplay}
            isColor={isColor}
            handleColor={handleColor}
          />
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default HomePage;
