import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../../layout/admin/Header";
import Sidebar from "../../../layout/admin/sidebar";
const HomePage = () => {
  const navigator = useNavigate();
  const [isClick, setClick] = useState(false);
  const [isDisplay, setDisplay] = useState(false);
  const handleClickMenu = (e) => {
    setClick(!isClick);
  };
  const handleDisplay = (e) => {
    setDisplay(!isDisplay);
  };
  const user = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    if (!user) {
      // if (user.data.isAdmin) {
      navigator("/admin/login");
      // }
    }
  }, [user]);
  return (
    <>
      <Sidebar click={isClick} handleClickMenu={handleClickMenu} />
      <div className={isClick ? "aside-mini" : ""}>
        <main className="main-wrap">
          <Header
            handleClickMenu={handleClickMenu}
            isDisplay={isDisplay}
            handleDisplay={handleDisplay}
          />
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default HomePage;
